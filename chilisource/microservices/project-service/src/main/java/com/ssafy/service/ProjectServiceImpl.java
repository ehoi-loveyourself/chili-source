package com.ssafy.service;

import com.ssafy.client.AuthServiceClient;
import com.ssafy.config.loginuser.User;
import com.ssafy.dto.request.ProjectCreateRequest;
import com.ssafy.dto.request.ProjectTokenUpdateRequest;
import com.ssafy.dto.request.ProjectUpdateRequest;
import com.ssafy.dto.response.ProjectResponse;
import com.ssafy.dto.response.TokenResponse;
import com.ssafy.entity.Project;
import com.ssafy.entity.UserProject;
import com.ssafy.exception.NotAuthorizedException;
import com.ssafy.exception.NotFoundException;
import com.ssafy.repository.ProjectRepo;
import com.ssafy.repository.RoleRepo;
import com.ssafy.repository.UserProjectRepo;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

import static com.ssafy.exception.NotAuthorizedException.*;
import static com.ssafy.exception.NotFoundException.*;

@RequiredArgsConstructor
@Service
@Transactional(readOnly = true)
public class ProjectServiceImpl implements ProjectService {
    private final ProjectRepo projectRepo;
    private final UserProjectRepo userProjectRepo;
    private final RoleRepo roleRepo;
    private final AuthServiceClient authServiceClient;

    @Override
    public ProjectResponse getProject(Long projectId) {
        Project project = projectRepo.findById(projectId)
                .orElseThrow(() -> new NotFoundException(PROJECT_NOT_FOUND));

        return ProjectResponse.builder()
                .id(project.getId())
                .name(project.getName())
                .description(project.getDescription())
                .image(project.getImage())
                .jiraProject(project.getJiraProject())
                .gitRepo(project.getGitRepo())
                .tokenList(getTokenList(project))
                .build();
    }

    // 프로젝트 목록 조회
    @Override
    public List<ProjectResponse> getProjectByUserId(Long userId) {
        List<Project> responses = projectRepo.findProjectByUserId(userId);

        return responses.stream()
                .map(project -> ProjectResponse.builder()
                        .id(project.getId())
                        .name(project.getName())
                        .description(project.getDescription())
                        .image(project.getImage())
                        .jiraProject(project.getJiraProject())
                        .gitRepo(project.getGitRepo())
                        .tokenList(getTokenList(project))
                        .build())
                .collect(Collectors.toList());
    }

    // 프로젝트 생성
    @Override
    @Transactional
    public void createProject(ProjectCreateRequest request, Long userId) {
        Project project = Project.builder()
                .name(request.getName())
                .description(request.getDescription())
                .build();
        projectRepo.save(project);

        UserProject userProject = UserProject.builder()
                .userId(userId)
                .project(project)
                .role(roleRepo.findById(1L).get())
                .build();
        userProjectRepo.save(userProject);

        return;
    }

    // 프로젝트 수정
    @Override
    @Transactional
    public void updateProject(ProjectUpdateRequest request) {
        Project project = projectRepo.findById(request.getId())
                .orElseThrow(() -> new NotFoundException(PROJECT_NOT_FOUND));
        project.update(request.getName(), request.getDescription());
    }

    @Override
    public void updateProjectImage(String image, Long projectId, Long userId) {
        Project project = projectRepo.findById(projectId)
                .orElseThrow(() -> new NotFoundException(PROJECT_NOT_FOUND));

        UserProject userProjectManager = userProjectRepo.findByUserIdAndProjectId(userId, projectId)
                .orElseThrow(() -> new NotFoundException(USER_PROJECT_NOT_FOUND));

        if (!userProjectManager.getRole().getModify()) {
            throw new NotAuthorizedException(MODIFY_NOT_AUTHORIZED);
        }

        project.updateImage(image);
    }

    // 프로젝트 삭제
    @Override
    @Transactional
    public void deleteProject(Long projectId, Long userId) {
        UserProject userProjectManager = userProjectRepo.findByUserIdAndProjectId(userId, projectId)
                .orElseThrow(() -> new NotFoundException(USER_PROJECT_NOT_FOUND));
        if (userProjectManager.getRole().getRemove()) {
            Project project = projectRepo.findById(projectId)
                    .orElseThrow(() -> new NotFoundException(PROJECT_NOT_FOUND));
            projectRepo.delete(project);
        } else {
            throw new NotAuthorizedException(REMOVE_NOT_AUTHORIZED);
        }
    }

    @Override
    public void updateProjectToken(User user, ProjectTokenUpdateRequest request) {
        Project project = projectRepo.findById(request.getProjectId())
                .orElseThrow(() -> new NotFoundException(PROJECT_NOT_FOUND));

        UserProject userProjectManager = userProjectRepo.findByUserIdAndProjectId(user.getId(), request.getProjectId())
                .orElseThrow(() -> new NotFoundException(USER_PROJECT_NOT_FOUND));

        if (!userProjectManager.getRole().getName().equalsIgnoreCase("MASTER")) {
            throw new NotAuthorizedException(CREATE_NOT_AUTHORIZED);
        }

        List<TokenResponse> tokenResponses = authServiceClient.getToken(user);

        TokenResponse tokenResponse = null;
        switch (request.getName().toUpperCase()) {
            case "JIRA":
                for (TokenResponse tr : tokenResponses) {
                    if (tr.getTokenCodeId() == 0L) {
                        tokenResponse = tr;
                    }
                }

                if (tokenResponse != null) {
                    project.updateJira(tokenResponse.getValue(), request.getDetail());
                } else {
                    throw new NotFoundException(TOKEN_NOT_CONNECTED);
                }
                break;
            case "GIT":
                for (TokenResponse tr : tokenResponses) {
                    if (tr.getTokenCodeId() == 1L) {
                        tokenResponse = tr;
                    }
                }

                if (tokenResponse != null) {
                    project.updateGit(tokenResponse.getValue(), request.getDetail());
                } else {
                    throw new NotFoundException(TOKEN_NOT_CONNECTED);
                }
                break;
            default:
                break;
        }
    }

    @Override
    public void deleteProjectToken(User user, Long projectId, String name) {
        Project project = projectRepo.findById(projectId)
                .orElseThrow(() -> new NotFoundException(PROJECT_NOT_FOUND));

        UserProject userProjectManager = userProjectRepo.findByUserIdAndProjectId(user.getId(), projectId)
                .orElseThrow(() -> new NotFoundException(USER_PROJECT_NOT_FOUND));

        if (!userProjectManager.getRole().getName().equalsIgnoreCase("MASTER")) {
            throw new NotAuthorizedException(REMOVE_NOT_AUTHORIZED);
        }

        switch (name.toUpperCase()) {
            case "JIRA":
                project.deleteJira();
                break;
            case "GIT":
                project.deleteGit();
                break;
            default:
                break;
        }
    }

    private List<String> getTokenList(Project project) {
        List<String> tokenList = new ArrayList<>();

        if (project.getJiraToken() != null) tokenList.add("JIRA");
        if (project.getGitToken() != null) tokenList.add("GIT");

        return tokenList;
    }
}

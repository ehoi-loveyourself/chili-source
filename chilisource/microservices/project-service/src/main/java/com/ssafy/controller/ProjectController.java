package com.ssafy.controller;

import com.ssafy.config.loginuser.LoginUser;
import com.ssafy.config.loginuser.User;
import com.ssafy.dto.request.ProjectCreateRequest;
import com.ssafy.dto.request.ProjectUpdateRequest;
import com.ssafy.dto.response.ProjectResponse;
import com.ssafy.service.ProjectService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RequiredArgsConstructor
@RestController
public class ProjectController {
    private final ProjectService projectService;
    
    // 프로젝트 조회
    @GetMapping
    public ResponseEntity<?> getProject(@LoginUser User user) {
        List<ProjectResponse> responses = projectService.getProjectByUserId(user.getId());
        return ResponseEntity.ok()
                .body(responses);
    }
    
    // 프로젝트 생성
    @PostMapping
    public ResponseEntity<?> createProject(ProjectCreateRequest request,  @LoginUser User user) {
        projectService.createProject(request, user.getId());
        return ResponseEntity.ok()
                .build();
    }

    // 프로젝트 수정
    @PutMapping
    public ResponseEntity<?> updateProject(ProjectUpdateRequest request) {
        projectService.updateProject(request);
        return ResponseEntity.ok()
                .build();
    }

    // 프로젝트 삭제
    @DeleteMapping("{projectId}")
    public ResponseEntity<?> deleteProject(@PathVariable Long projectId, @LoginUser User user) {
        projectService.deleteProject(projectId, user.getId());
        return ResponseEntity.ok()
                .build();
    }
}

package com.ssafy.dto.response;

import com.ssafy.dto.response.jira.sprint.JiraSprintResponse;
import io.swagger.annotations.ApiModel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.List;

@Getter
@NoArgsConstructor
@ApiModel(value = "현 프로젝트의 스프린트 목록")
public class SprintListResponse {
    private List<JiraSprintResponse> sprints;

    @Builder
    public SprintListResponse(List<JiraSprintResponse> sprints) {
        this.sprints = sprints;
    }
}
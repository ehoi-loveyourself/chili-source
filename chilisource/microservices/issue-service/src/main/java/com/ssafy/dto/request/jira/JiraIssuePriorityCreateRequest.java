package com.ssafy.dto.request.jira;

import io.swagger.annotations.ApiModelProperty;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class JiraIssuePriorityCreateRequest {
    @ApiModelProperty(hidden = true)
    private String name;

    @Builder
    public JiraIssuePriorityCreateRequest(String name) {
        this.name = name;
    }
}

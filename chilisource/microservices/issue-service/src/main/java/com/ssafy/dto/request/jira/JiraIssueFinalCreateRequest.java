package com.ssafy.dto.request.jira;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class JiraIssueFinalCreateRequest {
    private JiraIssueBulkCreateRequest request;

    @Builder
    public JiraIssueFinalCreateRequest(JiraIssueBulkCreateRequest request) {
        this.request = request;
    }
}
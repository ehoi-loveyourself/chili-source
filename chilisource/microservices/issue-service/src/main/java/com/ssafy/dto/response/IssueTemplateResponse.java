package com.ssafy.dto.response;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
@ApiModel(value = "이슈 템플릿 정보")
public class IssueTemplateResponse {
    @ApiModelProperty(value = "id")
    private Long issueTemplateId;

    @ApiModelProperty(value = "이슈 타입")
    private String issueType;

    @ApiModelProperty(value = "간략 설명")
    private String summary;

    @ApiModelProperty(value = "상세 설명")
    private String description;

    @ApiModelProperty(value = "담당자")
    private String assignee;

    @ApiModelProperty(value = "우선 순위")
    private String priority;

    @ApiModelProperty(value = "에픽 링크")
    private String epicLink;

//    private Long sprint;

    @ApiModelProperty(value = "스토리 포인트")
    private Double storyPoints;

    @Builder
    public IssueTemplateResponse(Long issueTemplateId, String issueType, String summary, String description, String assignee, String priority, String epicLink, Double storyPoints) {
        this.issueTemplateId = issueTemplateId;
        this.issueType = issueType;
        this.summary = summary;
        this.description = description;
        this.assignee = assignee;
        this.priority = priority;
        this.epicLink = epicLink;
//        this.sprint = sprint;
        this.storyPoints = storyPoints;
    }
}

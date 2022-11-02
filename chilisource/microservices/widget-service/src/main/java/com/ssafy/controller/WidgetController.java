package com.ssafy.controller;

import com.ssafy.config.WidgetType;
import com.ssafy.config.loginuser.LoginUser;
import com.ssafy.config.loginuser.User;
import com.ssafy.dto.request.*;
import com.ssafy.service.SsafyGitlabService;
import com.ssafy.service.WidgetCodeService;
import com.ssafy.service.WidgetService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiParam;
import lombok.RequiredArgsConstructor;
import org.apache.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import java.util.List;

@RestController
@RequiredArgsConstructor
@Api(tags = "위젯")
public class WidgetController {
    private final WidgetService widgetService;
    private final WidgetCodeService widgetCodeService;
    private final SsafyGitlabService ssafyGitlabService;

    @GetMapping("/widget-codes")
    @ApiOperation(value = "위젯 코드 리스트 조회")
    public ResponseEntity<?> getWidgetCodeList() {
        return ResponseEntity.ok(widgetCodeService.getWidgetCodeList());
    }

    @PostMapping("/widget-codes")
    @ApiOperation(value = "위젯 코드 생성")
    public ResponseEntity<?> createWidgetCode(
            @RequestBody WidgetCodeCreateRequest request
    ) {
        widgetCodeService.createWidgetCode(request);
        return ResponseEntity.ok().build();
    }

    @PutMapping("/widget-codes")
    @ApiOperation(value = "위젯 코드 수정")
    public ResponseEntity<?> updateWidgetCode(
            @RequestBody WidgetCodeUpdateRequest request
    ) {
        widgetCodeService.updateWidgetCode(request);
        return ResponseEntity.ok().build();
    }

    @DeleteMapping("/widget-codes/{widgetCodeId")
    @ApiOperation(value = "위젯 코드 삭제")
    public ResponseEntity<?> deleteWidgetCode(
            @ApiParam(value = "위젯 코드 pk")  @PathVariable(name = "widgetCodeId") String widgetCodeId
    ) {
        widgetCodeService.deleteWidgetCode(widgetCodeId);
        return ResponseEntity.ok().build();
    }

    @GetMapping("/widgets/{projectId}")
    @ApiOperation(value = "위젯 리스트 조회")
    public ResponseEntity<?> getWidgetList(
            @ApiParam(value = "프로젝트 pk") @PathVariable(name = "projectId") Long projectId
    ) {
        return ResponseEntity.ok(widgetService.getWidgetList(projectId));
    }

    @PostMapping("/widgets")
    @ApiOperation(value = "위젯 생성")
    public ResponseEntity<?> createWidget(
            @RequestBody WidgetCreateRequest request
    ) {
        widgetService.createWidget(request);
        return ResponseEntity.ok().build();
    }

    @PutMapping("/widgets/loc")
    @ApiOperation(value = "위젯 순서 수정")
    public ResponseEntity<?> updateLocWidget(
            @RequestBody List<WidgetLocUpdateRequest> requests
    ) {
        widgetService.updateLoc(requests);
        return ResponseEntity.ok().build();
    }

    @PutMapping("/widgets/{widgetId}")
    @ApiOperation(value = "위젯 수정")
    public ResponseEntity<?> updateWidget(
            @ApiParam(value = "위젯 pk") @PathVariable(name = "widgetId") Long widgetId,
            @RequestBody WidgetUpdateRequest request
    ) {
        widgetService.updateWidget(request, widgetId);
        return ResponseEntity.ok().build();
    }

    @DeleteMapping("/widgets/{widgetId}")
    @ApiOperation(value = "위젯 삭제")
    public ResponseEntity<?> deleteWidget(
            @ApiParam(value = "위젯 pk") @PathVariable(name = "widgetId") Long widgetId
    ) {
        widgetService.deleteWidget(widgetId);
        return ResponseEntity.ok().build();
    }

    @DeleteMapping("/widgets/{projectId}")
    @ApiOperation(value = "프로젝트에 생성된 위젯 삭제")
    public ResponseEntity<?> deleteAllWidget(
            @ApiParam(value = "프로젝트 pk") @PathVariable(name = "projectId") Long projectId
    ) {
        widgetService.deleteAllWidget(projectId);
        return ResponseEntity.ok().build();
    }

    @GetMapping("/widgets/small/{projectId}/{widgetType}")
    @ApiOperation(value = "프로젝트에 생성된 특정 위젯 조회")
    public ResponseEntity<?> getSmallWidget(
            HttpServletRequest request,
            @LoginUser User user,
            @ApiParam(value = "프로젝트 pk") @PathVariable("projectId") Long projectId,
            @ApiParam(value = "위젯 코드 pk") @PathVariable("widgetType") String widgetType,
            @RequestParam(required = false, name = "tokenCodeId") String tokenCodeId,
            @RequestParam(required = false, name = "branch") String branch
    ) {
        WidgetType type = WidgetType.valueOf(widgetType.toUpperCase());
        String accessToken = request.getHeader(HttpHeaders.AUTHORIZATION);
        switch (type) {
            case SSAFYGITLAB: {
                if (branch == null)
                    return ResponseEntity.ok(ssafyGitlabService.findMergeRequest(accessToken, tokenCodeId, projectId, user.getId()));
                else
                    return ResponseEntity.ok(ssafyGitlabService.findCommits(accessToken, tokenCodeId, projectId, user.getId(), branch));
            }
//            case GITLAB: {
//
//            }
//            case GITHUB: {
//
//            }
            default: {
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
            }
        }
    }
}

package com.ssafy.client;

import feign.Response;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PathVariable;

@FeignClient(name = "widget-service", url = "https://{주소}/widget-service")
public interface WidgetServiceClient {
    @DeleteMapping("/widgets/all/{projectId}")
    Response deleteAllWidget(@PathVariable("projectId") Long projectId);
}

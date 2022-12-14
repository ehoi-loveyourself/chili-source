package com.ssafy.client;

import com.ssafy.dto.response.TokenResponse;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.http.HttpHeaders;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestHeader;

import java.util.List;

@FeignClient(name = "auth-service", url = "https://{주소}/auth-service")
public interface AuthServiceClient {
    // 토큰 정보 조회
    @GetMapping("/tokens/{tokenCodeId}")
    TokenResponse getToken(
            @RequestHeader(HttpHeaders.AUTHORIZATION) List<String> auths,
            @PathVariable(name = "tokenCodeId") String tokenCodeId
    );
}

package com.ssafy.dto.request;

import io.swagger.annotations.ApiModelProperty;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class TokenCodeUpdateRequest {
    @ApiModelProperty(value = "토큰 코드 pk")
    private String id;

    @Builder
    public TokenCodeUpdateRequest(String id) {
        this.id = id;
    }
}

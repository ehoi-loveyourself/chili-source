package com.ssafy.service;

import com.ssafy.config.Constant;
import com.ssafy.dto.request.UserCreateRequest;
import com.ssafy.dto.request.UserUpdateRequest;
import com.ssafy.dto.response.UserListResponse;
import com.ssafy.dto.response.UserResponse;
import com.ssafy.entity.User;
import com.ssafy.exception.NotFoundException;
import com.ssafy.repository.UserRepo;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

import static com.ssafy.exception.NotFoundException.USER_NOT_FOUND;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
@Slf4j
public class UserServiceImpl implements UserService {
    private final UserRepo userRepo;

    @Transactional
    @Override
    public UserResponse getUser(Constant.SocialLoginType socialLoginType, UserCreateRequest request) {
        switch (socialLoginType) {
            case GOOGLE: {
                User user = userRepo.findByGoogle(request.getEmail())
                        .orElseGet(() -> {
                            User newUser = User.builder()
                                    .name(request.getName())
                                    .socialLoginType(socialLoginType)
                                    .email(request.getEmail())
                                    .image(request.getImage())
                                    .build();
                            userRepo.save(newUser);
                            return newUser;
                        });
                if (!user.isActive()) user.setActive();
                return UserResponse.builder()
                        .id(user.getId())
                        .name(user.getName())
                        .image(user.getImage())
                        .build();
            }
            default: {
                throw new IllegalArgumentException("알 수 없는 소셜 유저 형식입니다.");
            }
        }
    }

    @Override
    public UserResponse getUserInfo(Long userId) {
        User user = userRepo.findById(userId)
                .orElseThrow(() -> new NotFoundException(USER_NOT_FOUND));
        return UserResponse.builder()
                .id(user.getId())
                .name(user.getName())
                .image(user.getImage())
                .build();
    }

    @Override
    public UserListResponse getUserList(String email) {
        List<UserResponse> googleUsers = userRepo.findByGoogleContains(email).stream()
                .map(user -> UserResponse.builder()
                        .id(user.getId())
                        .name(user.getName())
                        .image(user.getImage())
                        .build())
                .collect(Collectors.toList());
        List<UserResponse> naverUsers = userRepo.findByNaverContains(email).stream()
                .map(user -> UserResponse.builder()
                        .id(user.getId())
                        .name(user.getName())
                        .image(user.getImage())
                        .build())
                .collect(Collectors.toList());
        List<UserResponse> kakaoUsers = userRepo.findByKakaoContains(email).stream()
                .map(user -> UserResponse.builder()
                        .id(user.getId())
                        .name(user.getName())
                        .image(user.getImage())
                        .build())
                .collect(Collectors.toList());
        return UserListResponse.builder()
                .googleUsers(googleUsers)
                .naverUsers(naverUsers)
                .kakaoUsers(kakaoUsers)
                .build();
    }

    @Override
    @Transactional
    public void updateUserInfo(UserUpdateRequest request, Long userId) {
        User user = userRepo.findById(userId)
                .orElseThrow(() -> new NotFoundException(USER_NOT_FOUND));
        user.updateInfo(request.getName());
    }

    @Override
    @Transactional
    public void updateUserImage(String image, Long userId) {
        User user = userRepo.findById(userId)
                .orElseThrow(() -> new NotFoundException(USER_NOT_FOUND));
        user.updateImage(image);
    }

    @Override
    @Transactional
    public void withdraw(Long userId) {
        User user = userRepo.findById(userId)
                .orElseThrow(() -> new NotFoundException(USER_NOT_FOUND));
        user.withdraw();
    }

    @Override
    public List<UserResponse> getUserList(List<Long> userIds) {
        List<UserResponse> userResponses = userRepo.findByIdIn(userIds).stream()
                .map(user -> UserResponse.builder()
                        .id(user.getId())
                        .name(user.getName())
                        .image(user.getImage())
                        .build())
                .collect(Collectors.toList());
        return userResponses;
    }
}

import React from 'react';

import { StyledMarginY, StyledFlexRowItemsCenter, StyledUserName } from './style';

import Circle from 'components/atoms/Circle';
import Button from 'components/atoms/Button';

import { theme } from 'styles/theme';
import { UseMutateFunction } from '@tanstack/react-query';

interface propsType {
  userImage: string;
  userName: string;
  projectId: number;
  userId: number;
  postInviteTeam: UseMutateFunction<void, unknown, { projectId: number; userId: number }, unknown>;
}

/**
 * @description
 * 프로젝트 생성 단계 가운데, 깃 연동을 담당하는 컴포넌트
 *
 * @example
 *
 * @param {string}    userImage   초대할 사용자 프로필 이미지
 * @param {string}    userName    초대할 사용자 이름
 * @param {projectId} project_id  초대할 프로젝트 ID
 * @param {number}    userId      초대할 사용자 ID
 * @param {UseMutateFunction<void, unknown, { projectId: number; userId: number }, unknown>} postInviteTeam   팀에 초대하는 react-query 커스텀 훅
 *
 *
 * @author bell
 */

const index = ({ userImage, userName, projectId, userId, postInviteTeam }: propsType) => {
  return (
    <StyledMarginY>
      <StyledFlexRowItemsCenter>
        <Circle height="30px" isImage={true} url={userImage}></Circle>
        <StyledUserName>{userName}</StyledUserName>
        <Button
          width="70px"
          borderColor={theme.button.gray}
          backgroundColor={theme.button.green}
          isHover={true}
          clickHandler={() => {
            postInviteTeam({ projectId, userId });
          }}
        >
          초대
        </Button>
      </StyledFlexRowItemsCenter>
    </StyledMarginY>
  );
};

export default index;

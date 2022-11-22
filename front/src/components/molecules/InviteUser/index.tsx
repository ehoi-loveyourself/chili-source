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
 * @param {number | undefined}                projectId           프로젝트 ID
 * @param {Dispatch<SetStateAction<boolean>>} setIsLinkedGitLab   깃랩이 연동되었는지 여부 설정용 setState 함수
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

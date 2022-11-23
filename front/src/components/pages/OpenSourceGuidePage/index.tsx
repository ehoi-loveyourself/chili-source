import React from 'react';

import { StyledContainer } from './style';

import HeaderInit from 'components/organisms/common/HeaderInitNav';
import SideBar from 'components/organisms/guide/SideBar';
import Main from 'components/organisms/guide/Main';
/**
 * @description
 * 오픈소스 가이드 페이지
 *
 * @author bell
 */
const index = () => {
  return (
    <>
      <HeaderInit />
      <StyledContainer>
        <SideBar />
        <Main />
      </StyledContainer>
    </>
  );
};

export default index;

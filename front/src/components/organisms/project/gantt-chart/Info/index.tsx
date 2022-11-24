// API & Library
import { FaLightbulb } from 'react-icons/fa';

// Styles
import {
  StyledInfo,
  StyledMarginTop,
  StyledPadding,
  StyledFlexColCenter,
  StyledH4,
  StyledMarginBottom,
  StyledDescription,
} from './style';

// Components
import Sheet from 'components/atoms/Sheet';

/**
 * @description
 * 간트차트 페이지 상단의 기능 소개 부분
 *
 * @author inte
 */

export const Info = () => {
  // Return
  return (
    <>
      <StyledInfo>
        <StyledMarginTop>
          <Sheet
            width="280px"
            height="150px"
            isShadow={true}
            backgroundColor={'#fcfcfc'}
            isHover={true}
          >
            <StyledPadding>
              <StyledFlexColCenter>
                <StyledH4 className="hover-text">
                  간트 차트
                  <span className="hover-text">
                    <FaLightbulb style={{ position: 'relative', top: '2px', left: '8px' }} />
                  </span>
                </StyledH4>
                <StyledMarginBottom />
                <StyledDescription className="hover-text">
                  <li>
                    등록된 이슈들의 날짜와 달성률을 조작
                    <br />
                    &nbsp;&nbsp;&nbsp;&nbsp; 하여 팀원들과 일정을 정리하세요
                  </li>
                </StyledDescription>
              </StyledFlexColCenter>
            </StyledPadding>
          </Sheet>
        </StyledMarginTop>
      </StyledInfo>
    </>
  );
};

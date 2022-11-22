import { MouseEventHandler } from 'react';

import { Button, styledType } from './style';

interface propsType extends styledType {
  children?: React.ReactNode;
  clickHandler?: MouseEventHandler<HTMLButtonElement>;
}

/**
 *
 * @description
 * Button 생성 컴포넌트
 *
 * @example
 * 디폴트 구현
 * <Button width={'100px'} height={'40px'}></Button>
 *
 * 배경 / 테두리 색 변경
 * <Button backgroundColor={'red'} borderColor={'blue'}></Button>
 *
 * hover 시 배경색 바뀌는 버튼(테두리 색으로 변경)
 * <Button backgroundColor={'red'} borderColor={'blue'} isHover></Button>
 *
 * 클릭 불가능한 버튼
 * <Button backgroundColor={'red'} borderColor={'blue'} isDisabled></Button>
 *
 * @param {ReactNode?}                             children        버튼 안에 들어갈 내용
 * @param {string?}                                width           버튼 width [default: 100px]
 * @param {string?}                                height          버튼 height [default: 40px]
 * @param {string?}                                fontSize        폰트 크기 [default: 0.85rem]
 * @param {string?}                                margin          margin 크기 [default: 0px]
 * @param {string?}                                backgroundColor 버튼 배경색 [default: #FFFFFF]
 * @param {string?}                                borderColor     버튼 테두리색 [default: #FFFFFF]
 * - 특정 경우를 제외하고 color가 borderColor를 따라간다.
 * - backgroundColor가 theme.button.lightgray(=#F8F8F8)일때는 black(=#000000)을 color로 지정
 * @param {boolean?}                               isHover         hover 기능 넣을 버튼을 위해 추가한 props [default: false]
 * - hover 시 backgroundColor는 borderColor를 따라간다.
 * - hover 시 borderColor가 props로 주어질 때는 white(=#FFFFFF), 주어지지 않을 때는 black(=#000000)을 color로 지정
 * @param {boolean?}                               isDisabled      비활성화 상태임을 나타내기 위해 추가한 props [default: false]
 * - 해당 props 부여 시 borderColor, color가 gray(=#D9D9D9)로 설정되며 클릭이 불가능해진다.
 * @param {MouseEventHandler<HTMLButtonElement>?}  clickHandler    버튼 클릭 이벤트 [default: undefined]
 *
 * @author dbcs
 */

const index = ({
  children,
  width,
  height,
  fontSize,
  margin,
  backgroundColor,
  borderColor,
  isHover,
  isDisabled,
  clickHandler,
}: propsType) => {
  return (
    <Button
      width={width}
      height={height}
      fontSize={fontSize}
      margin={margin}
      backgroundColor={backgroundColor}
      borderColor={borderColor}
      isHover={isHover}
      isDisabled={isDisabled}
      onClick={clickHandler}
    >
      {children}
    </Button>
  );
};

export default index;

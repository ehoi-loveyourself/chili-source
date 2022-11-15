import styled from 'styled-components';
import tw from 'twin.macro';

export interface styledType {
  height?: string;
  width?: string;
}

export const StyledWidgetBlockContainer = styled.div<styledType>`
  ${tw`flex w-full overflow-x-scroll`}
  transform:rotateX(180deg);
  -ms-transform: rotateX(180deg);
  -webkit-transform: rotateX(180deg);
`;

export const StyledWidgetBlockBox = styled.div<styledType>`
  ${tw`overflow-y-scroll`}
  direction: rtl;
  transform: rotateX(180deg);
  -ms-transform: rotateX(180deg);
  -webkit-transform: rotateX(180deg);
`;

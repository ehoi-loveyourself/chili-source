// API & Library
import styled from 'styled-components';
import tw from 'twin.macro';

export interface styledType {
  isActive?: boolean;
}

export const StyledWidgetTrashCan = styled.div<styledType>`
  ${tw`w-full flex justify-center items-center`}
  height: ${({ isActive }) => (isActive ? '12rem' : '72px')};
  transition: 200ms all;
`;

export const StyledWidgetTrashCanContent = styled.div<styledType>`
  ${tw`flex justify-center items-center`}
  height: ${({ isActive }) => (isActive ? 'calc(100% - 16px)' : '40px')};
  width: ${({ isActive }) => (isActive ? 'calc(100% - 16px)' : '210px')};
  border: 1px solid black;
  border-radius: 20px;
  transition: 200ms all;
  background-color: ${({ isActive }) => (isActive ? 'red' : '')};
`;

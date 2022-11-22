import styled from 'styled-components';
import tw from 'twin.macro';

export const StyledPage = styled.div`
  ${tw`w-full flex flex-col`}
  height: calc(100vh - 92px);
  max-height: calc(100vh - 92px);
`;

export const StyledHeader = styled.div``;

export const StyledBody = styled.div`
  ${tw`h-full w-full flex flex-col justify-center items-center overflow-auto`}
`;

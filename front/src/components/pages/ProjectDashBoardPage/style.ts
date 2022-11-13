import styled from 'styled-components';
import tw from 'twin.macro';

export const StyledPage = styled.div`
  ${tw`h-screen w-full flex flex-col`}
`;
StyledPage.defaultProps = {};

export const StyledHeader = styled.div`
  height: 1rem;
  min-height: 1rem;
`;

export const StyledBody = styled.div`
  ${tw`flex flex-col items-center flex-1`}
`;

export const StyledSection = styled.div`
  ${tw`w-full flex`}
  max-width: 100%;
`;

import { ReactNode } from 'react';
import { StyledGanttBar, styledType } from './style';

interface propsType extends styledType {
  children?: ReactNode;
}

/**
 * @author inte
 */
export const GanttBar = ({}: propsType) => {
  return (
    <>
      <StyledGanttBar></StyledGanttBar>
    </>
  );
};

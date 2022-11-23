// API & Library
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

// Styles
import { StyledMain } from './style';

// Components
import { GanttGraph } from './GanttGraph';
import { GanttList } from './GanttList';

/**
 * @description
 * 간트차트 페이지 하단의 기능 부분
 * 그래프 기능을 사용할 수 있다.
 * @author inte
 */
export const Main = () => {
  // Init
  return (
    <DndProvider backend={HTML5Backend}>
      <StyledMain className="main">
        {/* <GanttList /> */}
        <GanttGraph />
      </StyledMain>
    </DndProvider>
  );
};

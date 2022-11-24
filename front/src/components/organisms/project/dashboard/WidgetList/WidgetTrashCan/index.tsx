// API & Library
import { useDrop } from 'react-dnd';
import { BsTrash } from 'react-icons/bs';
import { itemType } from '../';

// Styles
import { StyledWidgetTrashCan, StyledWidgetTrashCanContent } from './style';

interface propsType {
  data?: any;
  onThrow?: any;
  isLast?: any;
  className?: any;
  path?: any;
}

/**
 * @description
 * 위젯을 삭제하기 위한 휴지통 컴포넌트
 * 위젯을 드래그해서 해당 컴포넌트 영역에 드래그 앤 드롭 시 위젯이 삭제된다.
 *
 * @param {any?} onThrow  위젯 삭제 액션 수행하는 함수
 *
 * @author inte
 */

export const WidgetTrashCan = ({ onThrow }: propsType) => {
  // Init
  const [{ isOver, canDrop }, drop] = useDrop({
    accept: [
      'ITEM',
      'COLUMN',
      'CALENDAR',
      'FIGMA',
      'GANTT',
      'GATHER',
      'JIRA',
      'SSAFYGITLAB',
      'WEBEX',
      'ZOOM',
    ],
    drop: (item: itemType) => {
      onThrow(item);
    },
    collect: monitor => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop(),
    }),
  });

  const isActive = isOver && canDrop;

  return (
    <>
      <StyledWidgetTrashCan ref={drop} isActive={isActive}>
        <StyledWidgetTrashCanContent isActive={isActive}>
          <BsTrash />
        </StyledWidgetTrashCanContent>
      </StyledWidgetTrashCan>
    </>
  );
};

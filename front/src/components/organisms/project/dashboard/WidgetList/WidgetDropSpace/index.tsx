// API & Library
import { ReactNode } from 'react';
import { useDrop } from 'react-dnd';
import { itemType } from '../';

// Styles
import { StyledWidgetDropSpace, styledType } from './style';

interface propsType extends styledType {
  children?: ReactNode;
  data?: any;
  onDrop?: any;
  path?: string;
  type?: string;
}

/**
 *
 * @param {ReactNode} children      위젯 안에 들어갈 기능 종류
 * @param {any}       onDrop        드롭다운 동작 수행하는 함수
 * @param {boolean}   isHorizontal  가로 모양으로 들어가기 위한 props 값
 * @param {boolean}   isLast        마지막 줄에 들어갈 위젯의 디자인 적용을 위한 props 값
 * @param {string?}   path          (column, row) 위치 정보
 * @param {string?}   type          위젯의 크기 타입(1x1, 2x2, 4x2..)
 *
 * @author inte
 */

export const WidgetDropSpace = ({
  children,
  onDrop,
  isHorizontal,
  isLast,
  path,
  type,
}: propsType) => {
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
      'EXAMPLE',
    ],
    drop: item => {
      const dropItem: itemType = {
        type,
        id: 0,
        path,
        children: [],
      };
      onDrop(dropItem, item);
    },
    collect: monitor => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop(),
    }),
  });

  const isActive = isOver && canDrop;

  return (
    <StyledWidgetDropSpace
      className="widget-drop-space"
      ref={drop}
      isActive={isActive}
      isLast={isLast}
      isHorizontal={isHorizontal}
    >
      {children}
    </StyledWidgetDropSpace>
  );
};

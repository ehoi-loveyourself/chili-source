// API & Library
import { useRef } from 'react';
import { useDrag } from 'react-dnd';
import { itemType } from '../';

// Styles
import {
  StyledWidgetListColumn,
  StyledWidgetListColumnLabel,
  StyledWidgetListItemContainer,
  StyledWidgetListItemBox,
} from './style';

// Components
import { WidgetDropSpace } from '../WidgetDropSpace';
import { WidgetListItem } from '../WidgetListItem';
import { Widget } from 'components/molecules/Widget';

interface propsType {
  id: number;
  type: string;
  children?: itemType[];
  dropHandler?: any;
  path?: string;
}
/**
 * @description
 * 위젯의
 *
 * @param {number}      id          위젯 ID
 * @param {string}      type        위젯의 크기 타입(1x1, 2x2, 4x2..)
 * @param {itemType[]?} children    위젯에 들어가는 기능 정보
 * @param {any?}        dropHandler 드롭다운 역할하는 함수
 * @param {string?}     path        (column, row) 위치 정보
 *
 * @author inte
 */
export const WidgetListColumn = ({ id, type, path, dropHandler, children }: propsType) => {
  const col = useRef(null);

  const [{ isDragging }, drag] = useDrag({
    type,
    item: {
      id,
      type,
      path,
      children,
    },
    collect: monitor => ({
      isDragging: !!monitor.isDragging(),
    }),
  });

  const opacity = isDragging ? 0 : 1;
  drag(col);

  return (
    <StyledWidgetListColumn className="widget-list-column" ref={col} style={{ opacity }}>
      <StyledWidgetListColumnLabel className="widget-list-column-label">
        <Widget type="LABEL"></Widget>
      </StyledWidgetListColumnLabel>
      {children
        ? children.map(({ id, type, url }, index) => {
            return (
              <StyledWidgetListItemContainer className="widget-list-item-container" key={id}>
                <WidgetDropSpace
                  onDrop={dropHandler}
                  type="ITEM"
                  path={`${path}-${index}`}
                  isHorizontal={true}
                />
                <StyledWidgetListItemBox>
                  <WidgetDropSpace onDrop={dropHandler} type="ITEM" path={`${path}-${index}`} />
                  <WidgetListItem id={id} type={type} path={`${path}-${index}`} url={url} />
                  <WidgetDropSpace onDrop={dropHandler} type="ITEM" path={`${path}-${index + 1}`} />
                </StyledWidgetListItemBox>
                <WidgetDropSpace
                  onDrop={dropHandler}
                  type="ITEM"
                  path={`${path}-${index + 1}`}
                  isHorizontal={true}
                />
              </StyledWidgetListItemContainer>
            );
          })
        : ''}
      <WidgetDropSpace
        onDrop={dropHandler}
        type="ITEM"
        path={`${path}-${children?.length}`}
        isHorizontal={true}
        isLast={true}
      >
        <Widget type="ADD" path={`${path}-${children?.length}`}></Widget>
      </WidgetDropSpace>
    </StyledWidgetListColumn>
  );
};

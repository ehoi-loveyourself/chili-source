// API & Library
import { useRef } from 'react';
import { useDrag } from 'react-dnd';

// Styles
import { StyledWidgetListItem } from './style';

// Components
import { Widget } from 'components/molecules/Widget';

interface propsType {
  id?: number;
  type?: string;
  path?: string;
  url?: string | null;
}

/**
 * @description
 *
 * @param {number?}         id    위젯 ID
 * @param {string?}         type  위젯의 크기 타입(1x1, 2x2, 4x2..)
 * @param {string?}         path  (column, row) 위치 정보
 * @param {string? | null}  url   위젯 url
 *
 * @author inte
 */

export const WidgetListItem = ({ id, type, path, url }: propsType) => {
  const item = useRef(null);

  const [{ isDragging }, drag] = useDrag({
    type: type ? type : 'ITEM',
    item: {
      id,
      type,
      path,
    },
    collect: monitor => ({
      isDragging: !!monitor.isDragging(),
    }),
  });

  const opacity = isDragging ? 0 : 1;
  drag(item);

  return (
    <StyledWidgetListItem className="widget-list-item" ref={item} style={{ opacity }}>
      <Widget id={id} type={type} url={url} path={path}></Widget>
    </StyledWidgetListItem>
  );
};

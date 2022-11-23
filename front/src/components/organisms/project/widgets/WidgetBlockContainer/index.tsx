// Styles
import { StyledWidgetBlockContainer, StyledWidgetBlockBox } from './style';

// Components
import { WidgetBlock } from 'components/molecules/WidgetBlock';

/**
 * @description
 * 위젯 선택 페이지의 기능별 위젯들을 담은 컨테이너 영역
 *
 * @author inte
 */

export const WidgetBlockContainer = () => {
  // Init
  const widgetBlockData = [[], []];

  return (
    <>
      <StyledWidgetBlockContainer>
        <StyledWidgetBlockBox>
          <h4 style={{ textAlign: 'center' }}>- 네이티브 위젯 -</h4>
          <WidgetBlock type="CALENDAR"></WidgetBlock>

          <WidgetBlock type="GANTT"></WidgetBlock>
        </StyledWidgetBlockBox>
        <StyledWidgetBlockBox>
          <h4 style={{ textAlign: 'center' }}>- 지라 서비스 위젯 -</h4>

          <WidgetBlock type="JIRA"></WidgetBlock>
        </StyledWidgetBlockBox>
        <StyledWidgetBlockBox>
          <h4 style={{ textAlign: 'center' }}>- 사이트 링크 위젯 -</h4>
          <WidgetBlock type="FIGMA"></WidgetBlock>
          <WidgetBlock type="GATHER"></WidgetBlock>
          <WidgetBlock type="SSAFYGITLAB"></WidgetBlock>
          <WidgetBlock type="WEBEX"></WidgetBlock>
          <WidgetBlock type="ZOOM"></WidgetBlock>
        </StyledWidgetBlockBox>
      </StyledWidgetBlockContainer>
    </>
  );
};

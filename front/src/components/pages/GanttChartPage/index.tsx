// styles
import { StyledPage, StyledHeader, StyledBody } from './style';

// Components
import HeaderNav from 'components/organisms/common/HeaderServiceNav';
import { Info, Main } from 'components/organisms/project/gantt-chart';
/**
 * @description
 * 간트차트 페이지
 *
 * @author inte
 */

const GanttChartPage = () => {
  return (
    <>
      <StyledPage className="page">
        <StyledHeader className="header">
          <HeaderNav />
        </StyledHeader>
        <StyledBody className="body">
          <Info />
          <Main />
        </StyledBody>
      </StyledPage>
    </>
  );
};

export default GanttChartPage;

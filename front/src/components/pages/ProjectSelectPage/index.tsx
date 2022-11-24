// Components
import HeaderInitNav from 'components/organisms/common/HeaderInitNav';
import ProjectSelectPage from 'components/organisms/projects/Main';

/**
 * @description
 * 프로젝트 선택 페이지
 *
 * @author bell
 */
const index = () => {
  if (localStorage.getItem('project-tab-list')) {
    const projectTabList = JSON.parse(localStorage.getItem('project-tab-list') as string);
    const newProjectTabList = [...projectTabList];
    newProjectTabList.forEach(item => {
      item.isActivated = false;
      item.widgetList = {
        dashboard: true,
        'gantt-chart': false,
        calendar: false,
        setting: false,
        issues: false,
      };
    });
    localStorage.setItem('project-tab-list', JSON.stringify(newProjectTabList));
  }
  return (
    <>
      <HeaderInitNav />
      <ProjectSelectPage />
    </>
  );
};

export default index;

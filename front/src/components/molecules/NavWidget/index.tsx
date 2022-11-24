import { ReactNode } from 'react';
import { StyledNav, styledType } from './style';

interface propsType extends styledType {
  children?: ReactNode;
}

/**
 * @description
 * 위젯 탭을 관리하는 컴포넌트
 *
 * @example
 * // projectTabList = JSON.parse(localStorage.getItem('project-tab-list') as string);
 * <NavWidget>
      {projectTabList.map(
        ({ isActivated, widgetList, id }: tabType) =>
          isActivated && (
            <>
              <Tab
                ~~
              ></Tab>
              <Tab
                ~~
              ></Tab>
            </>
          ),
      )}
    </NavWidget>
 * 
 * @param {ReactNode?} children       - 위젯 탭 컴포넌트
 *
 * @author bell
 */
const index = ({ children }: propsType) => {
  return <StyledNav>{children}</StyledNav>;
};

export default index;

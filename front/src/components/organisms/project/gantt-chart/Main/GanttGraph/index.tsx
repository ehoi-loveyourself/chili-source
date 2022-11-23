// API & Library
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useGetGanttTasks, useUpdateGantt, useDeleteGantt } from 'hooks/project';
import { Gantt, Task, ViewMode } from 'gantt-task-react';

// Styles
import 'gantt-task-react/dist/index.css';
import { StyledGanttGraph } from './style';

// Components
import FillButton from 'components/atoms/FillButton';

/**
 * @description
 * 간트차트 기능 중 그래프 기능
 * 시간 단위별 이슈 일정 열람, 이슈 날짜 지정 및 삭제가 가능하다.
 *
 * @author inte
 */
export const GanttGraph = () => {
  // Init
  const { projectId } = useParams();
  const ganttTasks = useGetGanttTasks(1, Number(projectId)).data;
  const updateGanttTask = useUpdateGantt().mutate;
  const deleteGanttTask = useDeleteGantt().mutate;

  const [isChecked, setIsChecked] = useState(true);
  const [view, setView] = useState<ViewMode>(ViewMode.Day);

  let columnWidth = 65;
  if (view === ViewMode.Year) {
    columnWidth = 350;
  } else if (view === ViewMode.Month) {
    columnWidth = 300;
  } else if (view === ViewMode.Week) {
    columnWidth = 250;
  }

  // Methods
  const getStartEndDateForProject = (tasks: Task[], projectId: string) => {
    const projectTasks = tasks.filter(t => t.project === projectId);
    let start = projectTasks[0].start;
    let end = projectTasks[0].end;

    for (let i = 0; i < projectTasks.length; i++) {
      const task = projectTasks[i];
      if (start.getTime() > task.start.getTime()) {
        start = task.start;
      }
      if (end.getTime() < task.end.getTime()) {
        end = task.end;
      }
    }
    return [start, end];
  };

  const dataChangeHandler = (task: Task) => {
    if (!ganttTasks) return;

    let newTasks = ganttTasks.map(t => (t.id === task.id ? task : t));
    if (task.project) {
      const [start, end] = getStartEndDateForProject(newTasks, task.project);
      const project = newTasks[newTasks.findIndex(t => t.id === task.project)];
      if (project.start.getTime() !== start.getTime() || project.end.getTime() !== end.getTime()) {
        const changedProject = { ...project, start, end };
        newTasks = newTasks.map(t => (t.id === task.project ? changedProject : t));
      }
    }

    task.start.setHours(task.start.getHours() + 9);
    task.end.setHours(task.end.getHours() + 9);

    const params = {
      userId: task.displayOrder,
      id: Number(task.id),
      startTime: task.start.toISOString(),
      endTime: task.end.toISOString(),
    };

    updateGanttTask(params);

    // setTasks(newTasks);
  };

  const doubleClickHandler = (task: Task) => {
    const conf = window.confirm(`${task.name} 이슈를 삭제해도될까요?`);
    if (conf) {
      deleteGanttTask(Number(task.id));
    }
    return conf;
  };

  const clickHandler = (task: Task) => {
    task.start.setHours(task.start.getHours() + 9);
    task.end.setHours(task.end.getHours() + 9);

    const params = {
      userId: task.displayOrder,
      id: Number(task.id),
      startTime: task.start.toISOString(),
      endTime: task.end.toISOString(),
      progress: task.progress,
    };

    updateGanttTask(params);
  };

  const renderGantt = () => {
    if (ganttTasks && ganttTasks.length != 0) {
      return (
        <>
          <Gantt
            tasks={ganttTasks}
            viewMode={view}
            onDateChange={dataChangeHandler}
            onProgressChange={clickHandler}
            onDoubleClick={doubleClickHandler}
            onClick={clickHandler}
            columnWidth={columnWidth}
            listCellWidth={isChecked ? '160px' : ''}
          />
        </>
      );
    } else {
      return (
        <>
          <div>현재 데이터가 없습니다.</div>
        </>
      );
    }
  };

  const renderBtn = () => {
    return (
      <>
        <div
          style={{
            height: '100%',
            width: '100%',
            borderRadius: '25px',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: isChecked ? '#f4f4f4' : '#ffffff',
            boxShadow: isChecked
              ? 'inset 4px 4px 10px -1px rgba(0, 0, 0, 0.25), inset -4px -4px 10px -1px rgba(255, 255, 255, 0.25)'
              : '4px 4px 10px -1px rgba(0, 0, 0, 0.25), -4px -4px 10px -1px rgba(255, 255, 255, 0.25)',
          }}
        >
          {isChecked ? '이슈 내용 숨기기' : '이슈 내용 보기'}
        </div>
      </>
    );
  };

  // Return
  return (
    <>
      <StyledGanttGraph>
        <div style={{ marginBottom: '8px', display: 'flex', gap: '8px', alignItems: 'center' }}>
          <div onClick={() => setIsChecked(!isChecked)} style={{ height: '50px', width: '120px' }}>
            {renderBtn()}
          </div>
          <FillButton
            width="50px"
            height="50px"
            clickHandler={() => setView(ViewMode.Hour)}
            isHover={true}
            hoverColor="#00875a"
            backgroundColor={(() => {
              if (view == ViewMode.Hour) return '#00875a';
              return '#54c270';
            })()}
          >
            시간 단위
          </FillButton>
          <FillButton
            width="50px"
            height="50px"
            clickHandler={() => setView(ViewMode.Day)}
            isHover={true}
            hoverColor="#00875a"
            backgroundColor={(() => {
              if (view == ViewMode.Day) return '#00875a';
              return '#54c270';
            })()}
          >
            일<br />
            단위
          </FillButton>
          <FillButton
            width="50px"
            height="50px"
            clickHandler={() => setView(ViewMode.Month)}
            isHover={true}
            hoverColor="#00875a"
            backgroundColor={(() => {
              if (view == ViewMode.Month) return '#00875a';
              return '#54c270';
            })()}
          >
            월<br />
            단위
          </FillButton>
          <FillButton
            width="50px"
            height="50px"
            clickHandler={() => setView(ViewMode.Year)}
            isHover={true}
            hoverColor="#00875a"
            backgroundColor={(() => {
              if (view == ViewMode.Year) return '#00875a';
              return '#54c270';
            })()}
          >
            년<br />
            단위
          </FillButton>
        </div>
        {renderGantt()}
      </StyledGanttGraph>
    </>
  );
};

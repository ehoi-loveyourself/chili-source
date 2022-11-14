// import { useState } from 'react';

import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import { StyledCalendar } from './style';
import {
  useDeleteGantt,
  useGetGanttChart,
  useGetTeamForProject,
  usePostCreateGantt,
  useUpdateGantt,
} from 'hooks/project';

import { useLocation } from 'react-router-dom';

import { useEffect } from 'react';

interface issueType {
  ganttChartId: number;
  title: string;
  start: string;
  end: string;
  color: string;
  issueCode: string;
  issueSummary: string;
  userId: string;
}

/**
 * @description
 * Calendar API를 렌더링하는 컴포넌트
 * SideBar 지라 이슈들을 가져와 매핑하는 역할을 한다.
 *
 * @author bell
 */
const index = () => {
  const location = useLocation();

  const projectId = +location.pathname.split('/')[2];

  const getGanttChart = useGetGanttChart(1, projectId);
  const postCreateGantt = usePostCreateGantt();
  const updateGantt = useUpdateGantt();
  const deleteGantt = useDeleteGantt();

  const getTeamForProject = useGetTeamForProject(projectId);

  const matchColorHandler = (userId: string) => {
    if (getTeamForProject.data) {
      const idx = getTeamForProject.data.findIndex(item => item.userId === +userId);
      if (idx > -1) {
        return getTeamForProject.data[idx].userColor;
      }
    }
    return '#FFFFFF';
  };

  const renderingDBIssuesHandler = () => {
    const arr = new Array<issueType>();
    if (getGanttChart.data) {
      for (const item of getGanttChart.data) {
        arr.push({
          title: item.issueSummary,
          start: item.startTime.split('T')[0],
          end: item.endTime.split('T')[0],
          color: matchColorHandler(item.userId),
          issueSummary: item.issueSummary,
          issueCode: item.issueCode,
          userId: item.userId,
          ganttChartId: item.id,
        });
      }
    }
    return arr;
  };

  useEffect(() => {
    if (postCreateGantt.isSuccess) {
      getGanttChart.refetch();
    }
    if (updateGantt.isSuccess) {
      getGanttChart.refetch();
    }
    if (deleteGantt.isSuccess) {
      getGanttChart.refetch();
    }
  }, [postCreateGantt.isSuccess, updateGantt.isSuccess, deleteGantt.isSuccess]);

  return (
    <StyledCalendar>
      <FullCalendar
        plugins={[dayGridPlugin, interactionPlugin]}
        timeZone={'UTC'}
        initialView={'dayGridMonth'}
        selectable={true}
        droppable={true}
        editable={true}
        events={renderingDBIssuesHandler()}
        eventResize={({ event, el }) => {
          // const startDateFormat = new Date(new Date(event.startStr).getTime()).toISOString();
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          const props = el.fcSeg.eventRange.def.extendedProps;

          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          const startDateFormat = new Date(event.start).toISOString() as string;
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          const endDateFormat = new Date(event.end).toISOString() as string;
          console.log(startDateFormat, endDateFormat);
          updateGantt.mutate({
            id: props.ganttChartId,
            issueCode: props.issueCode,
            issueSummary: props.issueSummary,
            userId: props.userId,
            startTime: startDateFormat,
            endTime: endDateFormat,
          });
        }}
        eventReceive={({ event, draggedEl }) => {
          const startDateFormat = new Date(new Date(event.startStr).getTime()).toISOString();
          const endDateFormat = startDateFormat.split('T')[0] + 'T23:59:59.000Z';

          postCreateGantt.mutate({
            issueCode: draggedEl.dataset.issue_code as string,
            issueSummary: draggedEl.dataset.issue_summary as string,
            projectId: Number(draggedEl.dataset.project_id as string),
            userId: Number(draggedEl.dataset.user_id),
            startTime: startDateFormat,
            endTime: endDateFormat,
          });
          event.remove();
        }}
        eventDrop={({ event, el }) => {
          // const startDateFormat = new Date(new Date(event.startStr).getTime()).toISOString();
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          const props = el.fcSeg.eventRange.def.extendedProps;

          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          const startDateFormat = new Date(event.start).toISOString() as string;
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          const endDateFormat = new Date(event.end).toISOString() as string;
          console.log(startDateFormat, endDateFormat);
          updateGantt.mutate({
            id: props.ganttChartId,
            issueCode: props.issueCode,
            issueSummary: props.issueSummary,
            userId: props.userId,
            startTime: startDateFormat,
            endTime: endDateFormat,
          });
        }}
        eventContent={({ event }) => {
          return (
            <div
              style={{
                padding: '2px 4px',
                overflow: 'hidden',
                whiteSpace: 'nowrap',
                textOverflow: 'ellipsis',
              }}
              onDoubleClick={() => deleteGantt.mutate(event._def.extendedProps.ganttChartId)}
            >
              {event.title}
            </div>
          );
        }}
        eventMouseEnter={e => {
          e.el.style.transform = 'scale(1.05)';
          e.el.style.transition = 'transform 0.1s linear';
        }}
        eventMouseLeave={e => (e.el.style.transform = 'scale(1)')}
      />
    </StyledCalendar>
  );
};

export default index;

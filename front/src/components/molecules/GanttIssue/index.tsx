// API & Library
import { ReactNode } from 'react';

// Styles
import {
  StyledGanttIssue,
  StyledGanttIssueLabel,
  StyledGanttIssueDetail,
  StyledGanttIssueLine,
  StyledGanttIssueData,
  StyledGanttIssueStart,
  StyledGanttIssueStartLabel,
  StyledGanttIssueProgress,
  StyledGanttIssueEnd,
  StyledGanttIssueEndLabel,
  styledType,
} from './style';

// Components
import Text from 'components/atoms/Text';
import Circle from 'components/atoms/Circle';

interface propsType extends styledType {
  color?: string;
  img?: string;
  name?: string;
  children?: ReactNode;
  issueSummary?: string;
  startTime?: Date;
  endTime?: Date;
  progress?: number;
  version?: number;
}

/**
 * @description
 * 특정 이슈의 내용, 진행도 등의 정보를 띄워준다.
 *
 * @example
 * // GanttIssue 내의 props는 전부 커스텀 훅 useGetWidgetGanttData()에서 가져온 값
 * 
 * <GanttIssue
      color={color}
      img={img}
      name={name}
      issueSummary={issueSummary}
      startTime={new Date(startTime || '')}
      endTime={new Date(endTime || '')}
      progress={progress}
      version={version}
    />
 * 
 * @param {string?}     color           커스텀 훅으로 불러온 간트 데이터의 색 값
 * @param {string?}     img             커스텀 훅으로 불러온 간트 데이터의 이미지 경로
 * @param {string?}     name            커스텀 훅으로 불러온 간트 데이터의 이름
 * @param {ReactNode?}  children        커스텀 훅으로 불러온 간트 데이터의 color
 * @param {string?}     issueSummary    커스텀 훅으로 불러온 간트 데이터의 이슈 내용
 * @param {Date?}       startTime       커스텀 훅으로 불러온 간트 데이터의 이슈 시작 시간
 * @param {Date?}       endTime         커스텀 훅으로 불러온 간트 데이터의 이슈 종료 시간
 * @param {number?}     progress        커스텀 훅으로 불러온 간트 데이터의 진행도
 * @param {number?}     version         커스텀 훅으로 불러온 간트 데이터의 버전 데이터
 * 
 * @author inte
 */
export const GanttIssue = ({
  color,
  img,
  name,
  version,
  startTime,
  endTime,
  progress,
  issueSummary,
}: propsType) => {
  return (
    <>
      <StyledGanttIssue>
        <StyledGanttIssueLabel color={color}>
          <Circle height="30px">
            <img src={img} alt="사진" />
          </Circle>
          <div style={{ flexGrow: 1, paddingLeft: '8px' }}>{name}</div>
          <Circle height="30px">{version}</Circle>
        </StyledGanttIssueLabel>
        <StyledGanttIssueDetail>{issueSummary}</StyledGanttIssueDetail>
        <StyledGanttIssueLine></StyledGanttIssueLine>
        <StyledGanttIssueData>
          <StyledGanttIssueStart>
            <StyledGanttIssueEndLabel>
              <div>시작일</div>
            </StyledGanttIssueEndLabel>
            <div>{startTime?.toISOString().replace('T', ' ').replace(/\..*/, '')}</div>
          </StyledGanttIssueStart>
          <StyledGanttIssueProgress>
            <Text message={`${progress}%`} isFill={true}></Text>
          </StyledGanttIssueProgress>
          <StyledGanttIssueEnd>
            <StyledGanttIssueEndLabel>
              <div>완료일</div>
            </StyledGanttIssueEndLabel>
            <div>{endTime?.toISOString().replace('T', ' ').replace(/\..*/, '')}</div>
          </StyledGanttIssueEnd>
        </StyledGanttIssueData>
      </StyledGanttIssue>
    </>
  );
};

import { useState } from 'react';
import { StyledIssuesPage, StyledHeader, StyledBody } from './style';
import IssueTemplate from 'components/organisms/project/issues/IssueTemplate';
import MiddleBucket from 'components/organisms/project/issues/MiddleBucket';
import HeaderNav from 'components/organisms/common/HeaderServiceNav';
interface epicType {
  fields: {
    summary: string;
  };
  key: string;
}
export interface issueType extends templateType {
  issueId: number;
}
export interface templateType {
  issueTemplateId: number;
  projectId: number;
  issueType: string;
  summary: string;
  description: string;
  assignee: string;
  priority: string;
  epicLink: string;
  sprint: number;
  storyPoints: number;
  userImage: string;
}

/**
 * @description
 * 미들버킷 페이지
 * 이슈템플릿과 미들버킷 기능 사용 가능
 *
 * @author dbcs
 */
const index = () => {
  const dummyIssue: issueType = {
    issueTemplateId: 0,
    issueId: 0,
    projectId: 0,
    issueType: '',
    summary: '',
    description: '',
    assignee: '',
    priority: '',
    epicLink: '',
    sprint: 0,
    storyPoints: 0,
    userImage: '',
  };
  const [issue, setIssue] = useState<issueType>(dummyIssue);
  const [isInsert, setIsInsert] = useState(false);

  return (
    <StyledIssuesPage>
      <HeaderNav></HeaderNav>
      <StyledBody>
        <IssueTemplate issue={issue} setIssue={setIssue} setIsInsert={setIsInsert}></IssueTemplate>
        <MiddleBucket issue={issue} isInsert={isInsert} setIsInsert={setIsInsert}></MiddleBucket>
      </StyledBody>
    </StyledIssuesPage>
  );
};

export default index;

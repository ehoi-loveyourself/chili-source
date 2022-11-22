import { useMutation, useQuery } from '@tanstack/react-query';

import { issue, project } from 'api/rest';

import { AxiosError } from 'axios';

/**
 * @description
 * 비동기 함수 getUserInfo를 수행하는 useQuery 함수를 관리하는 커스텀 훅
 *
 * @author bell
 */
export const useGetJiraProjectList = () => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return useQuery<any, AxiosError>(['jira-project-list'], () => issue.getJiraProjectList(), {
    enabled: false,
  });
};

/**
 * @description
 * done이 되지 않은 자신의 지라 이슈들을 모두 가져오는 API 요청 함수를 다루는 커스텀 훅
 *
 * @author bell
 */
export const useGetIssuesNotDone = (projectId: number) => {
  return useQuery(['get-jira-issues-not-done', projectId], () => issue.getIssuesNotDone(projectId));
};

/**
 * @description
 * issueKey를 통해 지라 이슈의 상세정보를 가져오는 API 요청 함수를 호출하는 커스텀 훅
 *
 * @author bell
 */
export const useGetIssueByIssueKey = (issuekey: string) => {
  return useQuery([`get-jira-issue-by-issue-key-${issuekey}`], () =>
    issue.getIssueByIssueKey(issuekey),
  );
};

/**
 * @description
 * issueKey를 통해 해당 Jira issue의 스토리 포인트와 summary를 업데이트 API 요청 함수를 호출하는 커스텀 훅
 *
 * @author bell
 */
export const useUpdateIssueByIssueKey = () => {
  interface requestBodyType {
    issueKey: string;
    projectId: number;
    statusId: number;
    storyPoints: number;
    summary: string;
  }
  return useMutation(({ issueKey, projectId, statusId, storyPoints, summary }: requestBodyType) =>
    issue.updateIssueByIssueKey(issueKey, projectId, statusId, storyPoints, summary),
  );
};

/**
 * @description
 * 해당 IssueTemplate 데이터를 가져오는 호출하는 커스텀 훅
 *
 * @author bell
 */
export const useGetIssueTemplateList = (pjtId: number) => {
  return useQuery(['get-issueTemplateList', pjtId], () => issue.getIssueTemplateList(pjtId));
};

/**
 * @description
 * 연동된 JiraProject의 epic 데이터를 모두 가져오는 api를 호출하는 커스텀 훅
 *
 * @author bell
 */
export const useGetEpicList = (pjtId: number) => {
  return useQuery(['get-epicList', pjtId], () => issue.getEpicList());
};

/**
 * @description
 * 연동된 JiraProject의 스프린트를 모두 가져오는 api를 호출하는 커스텀 훅
 *
 * @author bell
 */
export const useGetSprintList = (pjtId: number) => {
  return useQuery(['get-springList', pjtId], () => issue.getSprintList(pjtId));
};

/**
 * @description
 * 해당 이슈 템플릿을 삭제하는 api를 호출하는 커스텀 훅
 *
 * @author bell
 */
export const useDeleteIssueTemplate = () => {
  return useMutation((issueTemplateId: number) => issue.deleteIssueTemplate(issueTemplateId));
};

/**
 * @description
 * 이슈템플릿을 추가하는 api를 호출하는 커스텀 훅
 *
 * @author bell
 */
export const usePostCreateIssueTemplate = () => {
  interface requestBodyType {
    projectId: number;
    issueType: string;
    summary: string;
    description: string;
    assignee: string;
    priority: string;
    epicLink: string;
    sprint: number;
    storyPoints: number;
  }
  return useMutation(
    ({
      projectId,
      issueType,
      summary,
      description,
      assignee,
      priority,
      epicLink,
      sprint,
      storyPoints,
    }: requestBodyType) =>
      issue.postCreateIssueTemplate(
        projectId,
        issueType,
        summary,
        description,
        assignee,
        priority,
        epicLink,
        sprint,
        storyPoints,
      ),
  );
};

/**
 * @description
 * 이슈템플릿을 수정하는 api를 호출하는 커스텀 훅
 *
 * @author bell
 */
export const usePutEditIssueTemplate = () => {
  interface requestBodyType {
    projectId: number;
    issueType: string;
    summary: string;
    description: string;
    priority: string;
    epicLink: string;
    storyPoints: number;
    issueTemplateId: number;
  }
  return useMutation(
    ({
      projectId,
      issueType,
      summary,
      description,
      priority,
      epicLink,
      storyPoints,
      issueTemplateId,
    }: requestBodyType) =>
      issue.putEditIssueTemplate(
        projectId,
        issueType,
        summary,
        description,
        priority,
        epicLink,
        storyPoints,
        issueTemplateId,
      ),
  );
};

/**
 * @description
 * 해당 유저가 가지고 있는 해당 프로젝트의 미들버킷리스트를 가져오는 api를 호출하는 커스텀 훅
 *
 * @author bell
 */
export const useGetMiddeBucketList = (pjtId: number) => {
  return useQuery(['get-middle-bucket-list', pjtId], () => issue.getMiddleBucketList(pjtId));
};

/**
 * @description
 * 해당 미들버킷 내의 이슈리스트를 가져오는 api를 호춣는 커스텀 훅
 *
 * @author bell
 */
export const useGetIssueListInMiddleBucket = (middleBucketId: number) => {
  return useQuery(
    ['get-issue-list-for-middle-bucket', middleBucketId],
    () => issue.getIssueListInMiddleBucket(middleBucketId),
    { enabled: false },
  );
};

/**
 * @description
 * 미들버킷 내의 해당 이슈를 삭제하는 api를 호출하는 커스텀 훅
 *
 * @author bell
 */
export const useDeleteIssueInMiddeBucket = () => {
  interface pathType {
    middleBucketId: number;
    middleBucketIssueId: number;
  }
  return useMutation(({ middleBucketId, middleBucketIssueId }: pathType) =>
    issue.deleteIssueInMiddleBucket(middleBucketId, middleBucketIssueId),
  );
};

/**
 * @description
 * 해당 미들버킷에 이슈를 등록하는 API를 호출하는 커스텀 훅
 *
 * @author bell
 */
export const usePostAddIssue = () => {
  interface requestBodyType {
    middleBucketId: number;
    assignee: string;
    description: string;
    epicLink: string;
    issueType: string;
    priority: string;
    sprint: number;
    storyPoints: number;
    summary: string;
  }
  return useMutation(
    ({
      middleBucketId,
      assignee,
      description,
      epicLink,
      issueType,
      priority,
      sprint,
      storyPoints,
      summary,
    }: requestBodyType) =>
      issue.postAddIssue(
        middleBucketId,
        assignee,
        description,
        epicLink,
        issueType,
        priority,
        sprint,
        storyPoints,
        summary,
      ),
  );
};

/**
 * @description
 * 미들 버킷을 생성하는 API를 호출하는 함수
 *
 * @author bell
 */
export const usePostCreateMiddleBucket = () => {
  interface requestBodyType {
    name: string;
    projectId: number;
  }
  return useMutation(({ name, projectId }: requestBodyType) =>
    issue.postCreateMiddleBucket(name, projectId),
  );
};

/**
 * @description
 * 해당 미들 버킷을 삭제하는 API를 호출하는 함수
 *
 * @author bell
 */
export const useDeleteMiddleBucket = () => {
  return useMutation((middleBucketId: number) => issue.deleteMiddleBucket(middleBucketId));
};

/**
 * @description
 * 해당 미들 버킷을 수정하는 API를 호출하는 함수
 *
 * @author bell
 */
export const usePutEditMiddleBucket = () => {
  interface requestBodyType {
    name: string;
    middleBucketId: number;
  }
  return useMutation(({ name, middleBucketId }: requestBodyType) =>
    issue.putEditMiddleBucket(name, middleBucketId),
  );
};

/**
 * @description
 * 미들 버킷의 내용을 바탕으로 지라 프로젝트의 이슈를 생성해주는 API를 호출하는 함수
 *
 * @author bell
 */
export const usePostSendToJira = () => {
  interface requestBodyType {
    middleBucketId: number;
    projectId: number;
  }
  return useMutation(({ middleBucketId, projectId }: requestBodyType) =>
    issue.postSendToJira(middleBucketId, projectId),
  );
};

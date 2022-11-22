// REACT LIBRARY
import { useState, useEffect, useRef, MouseEvent } from 'react';
import { useParams } from 'react-router-dom';

// STYLE
import {
  StyledIssueTemplate,
  StyledIssueTemplateHeader,
  StyledIssueTemplateBody,
  StyledIssueBundle,
  StyledIssueInfo,
  StyledIssueInfoHeader,
  StyledIssueInfoBody,
  StyledFlexCenter,
  StyledH2,
  StyledHeight,
  StyledLinkageToken,
  StyledDescription,
  StyledBar,
  StyledText,
} from './style';

// HOOKS
import { useGetProject } from 'hooks/project';
import { useGetUserInfoHandler } from 'hooks/user';
import {
  useDeleteIssueTemplate,
  useGetIssueTemplateList,
  useGetSprintList,
  useGetEpicList,
  usePostCreateIssueTemplate,
  usePutEditIssueTemplate,
} from 'hooks/issue';

// import { templateType } from 'components/pages/IssuesPage';

import Notification from 'components/atoms/Notification';
import Issue from 'components/molecules/Issue';
import Circle from 'components/atoms/Circle';
import Text from 'components/atoms/Text';
import Sheet from 'components/atoms/Sheet';
import Button from 'components/atoms/Button';
import InputBox from 'components/molecules/InputBox';
import TextAreaBox from 'components/molecules/TextAreaBox';
import { theme } from 'styles/theme';
import { HiPlus } from 'react-icons/hi';

import { Select, FormControl, InputLabel, MenuItem } from '@mui/material';

interface templateType {
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

const index = (props: any) => {
  const { projectId } = useParams();
  const pjtId = Number(projectId);

  // react-query
  const getProject = useGetProject(pjtId).data;
  const getUser = useGetUserInfoHandler();
  const getEpicList = useGetEpicList(pjtId);
  const deleteIssueTemplate = useDeleteIssueTemplate();
  const getIssueTemplateList = useGetIssueTemplateList(pjtId);
  const getSprintList = useGetSprintList(pjtId);
  const postCreateIssueTemplate = usePostCreateIssueTemplate();
  const putEditIssueTemplate = usePutEditIssueTemplate();

  const myImg = getUser.data ? getUser.data.image : '';
  const [isAdd, setIsAdd] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [editNo, setEditNo] = useState(0);
  const [sprintId, setSprintId] = useState<number>(-1);

  const issue = {
    issueTemplateId: props.issue.issueTemplateId,
    projectId: props.issue.projectId,
    issueType: props.issue.issueType,
    summary: props.issue.summary,
    description: props.issue.description,
    reporter: props.issue.reporter,
    assignee: getUser.data ? getUser.data.name : '',
    priority: props.issue.priority,
    epicLink: props.issue.epicLink,
    sprint: sprintId,
    storyPoints: props.issue.storyPoints,
    userImage: myImg,
  };

  const setInfoHandler = (issue: templateType) => {
    props.setIssue(issue);
  };
  const deleteHandler = (issueTemplateId: number) => {
    deleteIssueTemplate.mutateAsync(issueTemplateId).then(() => getIssueTemplateList.refetch());
  };
  const editEnableHandler = (issueTemplateId: number) => {
    setIsEdit(true);
    setIsAdd(false);
    setEditNo(issueTemplateId);
  };
  const addEnableHandler = () => {
    setIsAdd(true);
    setIsEdit(false);
  };

  const IssueTemplateList =
    getIssueTemplateList.data &&
    getIssueTemplateList.data.map((issue: templateType) => (
      <Issue
        width={'380px'}
        marginX={'5px'}
        marginY={`5px`}
        issueTemplateId={issue.issueTemplateId}
        projectId={pjtId}
        issueType={issue.issueType}
        summary={issue.summary}
        description={issue.description}
        reporter={getUser.data ? getUser.data.name : ''}
        assignee={getUser.data ? getUser.data.name : ''}
        priority={issue.priority}
        epicLink={issue.epicLink}
        storyPoints={issue.storyPoints}
        // userImage={myImg}
        assigneeName={issue.assignee}
        clickHandler={setInfoHandler}
        deleteHandler={deleteHandler}
        editEnableHandler={editEnableHandler}
      />
    ));

  useEffect(() => {
    setType(issue.issueType);
  }, [issue.issueType]);
  useEffect(() => {
    setPriority(issue.priority);
  }, [issue.priority]);
  useEffect(() => {
    setEpicLink(issue.epicLink);
  }, [issue.epicLink]);

  const [type, setType] = useState<string>('Story');
  const [priority, setPriority] = useState<string>('Highest');
  const priorityList = ['Highest', 'High', 'Medium', 'Low', 'Lowest'];
  const [epicLink, setEpicLink] = useState<string>('');
  const changeHandler = (e: any, content: string) => {
    const value = e.target.value;
    content === 'type'
      ? setType(value)
      : content === 'priority'
      ? setPriority(value)
      : content === 'epicLink'
      ? setEpicLink(value)
      : content === 'sprint'
      ? setSprintId(value)
      : '';
  };

  const projectRef = useRef<HTMLInputElement>(null);
  const summaryRef = useRef<HTMLInputElement>(null);
  const descriptionRef = useRef<HTMLTextAreaElement>(null);
  const storyPointsRef = useRef<HTMLInputElement>(null);

  const [templateId, setTemplateId] = useState<number>(0);

  const addTemplateHandler = () => {
    issue.issueTemplateId = templateId;
    issue.projectId = projectId;
    issue.issueType = type;
    issue.summary = summaryRef.current ? summaryRef.current.value : '';
    issue.description = descriptionRef.current ? descriptionRef.current.value : '';
    issue.epicLink = epicLink;
    issue.priority = priority;
    issue.storyPoints = storyPointsRef.current ? Number(storyPointsRef.current.value) : '';
    issue.userImage = myImg;
    summaryRef.current ? (summaryRef.current.value = '') : '';
    descriptionRef.current ? (descriptionRef.current.value = '') : '';
    storyPointsRef.current ? (storyPointsRef.current.value = '0') : '';

    setTemplateId(templateId + 1);
    // issues.push(issue);
    // setIssues(issues);
    setIsAdd(false);
    postCreateIssueTemplate
      .mutateAsync({
        projectId: issue.projectId,
        issueType: issue.issueType,
        summary: issue.summary,
        description: issue.description,
        assignee: issue.assignee,
        priority: issue.priority,
        epicLink: issue.epicLink,
        sprint: issue.sprint,
        storyPoints: issue.storyPoints,
      })
      .then(() => getIssueTemplateList.refetch());
  };

  const editTemplateHandler = () => {
    const issues = getIssueTemplateList.data ? [...getIssueTemplateList.data] : [];

    issues.forEach(issue => {
      if (issue.issueTemplateId === editNo) {
        issue.issueType = type;
        summaryRef.current ? (issue.summary = summaryRef.current.value) : '';
        descriptionRef.current ? (issue.description = descriptionRef.current.value) : '';
        issue.priority = priority;
        issue.epicLink = epicLink;
        storyPointsRef.current ? (issue.storyPoints = Number(storyPointsRef.current.value)) : '';
        putEditIssueTemplate
          .mutateAsync({
            projectId: issue.projectId,
            issueType: issue.issueType,
            summary: issue.summary,
            description: issue.description,
            priority: issue.priority,
            epicLink: issue.epicLink,
            storyPoints: issue.storyPoints,
            issueTemplateId: issue.issueTemplateId,
          })
          .then(() => {
            getIssueTemplateList.refetch();
          });
      }
    });
    setIsEdit(false);
  };

  const insertIssueHandler = () => {
    props.setIssue({
      templateId: props.issue.templateId,
      projectId: projectId,
      issueType: type,
      summary: summaryRef.current ? summaryRef.current.value : '',
      description: descriptionRef.current ? descriptionRef.current.value : '',
      epicLink: epicLink,
      assignee: issue.assignee,
      priority: priority,
      sprint: sprintId,
      storyPoints: storyPointsRef.current ? Number(storyPointsRef.current.value) : '',
    });
    props.setIsInsert(true);
  };
  return (
    <>
      {deleteIssueTemplate.isSuccess && (
        <Notification check={true} message="이슈 템플릿을 삭제하였습니다." width="300px" />
      )}
      {putEditIssueTemplate.isSuccess && (
        <Notification
          check={true}
          message="이슈 템플릿을 성공적으로 수정하였습니다."
          width="300px"
        />
      )}
      {postCreateIssueTemplate.isSuccess && (
        <Notification
          check={true}
          message="이슈템플릿을 성공적으로 생성하였습니다."
          width="300px"
        />
      )}
      <StyledIssueBundle>
        <StyledIssueTemplate>
          <StyledIssueTemplateHeader>
            <StyledFlexCenter>
              <Circle height="80px" backgroundColor={theme.color.primary} isInnerShadow={true}>
                <Circle height={'70px'} isImage={true} url={getProject ? getProject.image : ''} />
              </Circle>
              <StyledBar className="hover-bg"></StyledBar>
              <StyledHeight>
                <StyledH2 className="hover-text">
                  {getProject && getProject.name ? getProject.name : '[빈 프로젝트 명]'}
                </StyledH2>
                <StyledDescription className="hover-text">
                  {getProject && getProject.description
                    ? getProject.description
                    : '[빈 프로젝트 설명]'}
                </StyledDescription>
                <StyledLinkageToken>
                  <p className="hover-text">
                    {getProject && getProject.gitRepo && `gitRepository : ${getProject.gitRepo}`}
                  </p>
                  <p className="hover-text">
                    {getProject &&
                      getProject.jiraProject &&
                      `jiraProject : ${getProject.jiraProject}`}
                  </p>
                </StyledLinkageToken>
              </StyledHeight>
            </StyledFlexCenter>
          </StyledIssueTemplateHeader>
          <Sheet isShadow={true} width={'400px'}>
            <StyledIssueTemplateBody>
              <StyledText>
                <Text
                  isFill={false}
                  message={'Issue Templates'}
                  fontSize={'1.5rem'}
                  fontWeight={'bold'}
                />
                <Button
                  width={'40px'}
                  height={'40px'}
                  margin={'0 0 0 10px'}
                  borderColor={'#d9d9d9'}
                  clickHandler={addEnableHandler}
                  isHover
                >
                  <HiPlus size={'1.5rem'} />
                </Button>
              </StyledText>
              <Sheet borderColor={'transparent'} flex={'column'} isOverflowYScroll>
                <StyledIssueTemplateBody>{IssueTemplateList}</StyledIssueTemplateBody>
              </Sheet>
            </StyledIssueTemplateBody>
          </Sheet>
        </StyledIssueTemplate>
        <StyledIssueInfo>
          <StyledIssueInfoHeader>
            <Button
              borderColor={theme.issue.bug}
              isDisabled={!isAdd}
              isHover
              margin={'0 0 0 10px'}
              clickHandler={addTemplateHandler}
            >
              Add Template
            </Button>
            <Button
              borderColor={theme.issue.story}
              isDisabled={!isEdit}
              isHover
              margin={'0 0 0 10px'}
              clickHandler={editTemplateHandler}
            >
              Edit Template
            </Button>
            <Button
              borderColor={theme.issue.task}
              isHover
              margin={'0 0 0 10px'}
              clickHandler={insertIssueHandler}
            >
              Insert Bucket
            </Button>
          </StyledIssueInfoHeader>
          <Sheet isShadow={true} flex={'column'} height={'90%'} isOverflowYScroll={true}>
            <StyledIssueInfoBody>
              <InputBox
                isRow={false}
                labelName={'프로젝트'}
                inputValue={getProject ? getProject.name : ''}
                ref={projectRef}
                labelMarginBottom={'10px'}
                disabled
              />
              <FormControl fullWidth style={{ margin: '5px 0 5px 0', padding: '0 5px 0 5px' }}>
                <InputLabel id="demo-simple-select-label">이슈 유형</InputLabel>
                <Select
                  labelId="inputType-Label"
                  id="inputType"
                  value={type}
                  label="이슈 유형"
                  onChange={e => {
                    changeHandler(e, 'type');
                  }}
                >
                  <MenuItem value={'Story'}>스토리</MenuItem>
                  <MenuItem value={'Task'}>태스크</MenuItem>
                  <MenuItem value={'Bug'}>버그</MenuItem>
                </Select>
              </FormControl>
              <InputBox
                isRow={false}
                labelName={'요약'}
                inputValue={props.issue.summary}
                ref={summaryRef}
                labelMarginBottom={'10px'}
              />
              <TextAreaBox
                isRow={false}
                labelName={'설명'}
                textAreaValue={props.issue.description}
                ref={descriptionRef}
                labelMarginBottom={'10px'}
                nonResize
              />
              <FormControl fullWidth style={{ margin: '5px 0 5px 0', padding: '0 5px 0 5px' }}>
                <InputLabel id="demo-simple-select-label">우선순위</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={priority}
                  label="우선순위"
                  onChange={e => {
                    changeHandler(e, 'priority');
                  }}
                >
                  {priorityList.map((p, idx) => {
                    return (
                      <MenuItem key={idx} value={p}>
                        {p}
                      </MenuItem>
                    );
                  })}
                </Select>
              </FormControl>

              <FormControl fullWidth style={{ margin: '5px 0 5px 0', padding: '0 5px 0 5px' }}>
                <InputLabel id="demo-simple-select-label">Epic Link</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={epicLink}
                  label="Epic Link"
                  onChange={e => {
                    changeHandler(e, 'epicLink');
                  }}
                >
                  {getEpicList.data &&
                    getEpicList.data.issues.map((epic, idx) => {
                      return (
                        <MenuItem key={idx} value={epic.key}>
                          {epic.fields.summary}
                        </MenuItem>
                      );
                    })}
                </Select>
              </FormControl>
              <FormControl fullWidth style={{ margin: '5px 0 5px 0', padding: '0 5px 0 5px' }}>
                <InputLabel id="demo-simple-select-label">스프린트</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  label="스프린트"
                  onChange={e => {
                    changeHandler(e, 'sprint');
                  }}
                >
                  {getSprintList.data &&
                    getSprintList.data.sprints.map((sprint, idx) => {
                      return (
                        <MenuItem key={idx} value={sprint.id}>
                          {sprint.name}
                        </MenuItem>
                      );
                    })}
                </Select>
              </FormControl>
              <InputBox
                isRow={false}
                labelName={'Story Points'}
                inputValue={props.issue.storyPoints + ''}
                ref={storyPointsRef}
                labelMarginBottom={'10px'}
              />
            </StyledIssueInfoBody>
          </Sheet>
        </StyledIssueInfo>
      </StyledIssueBundle>
    </>
  );
};

export default index;

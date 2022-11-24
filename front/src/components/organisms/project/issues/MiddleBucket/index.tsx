// REACT LIBRARY
import { useEffect, useState, useRef } from 'react';
import { useParams } from 'react-router-dom';

// STYLE
import {
  MiddleBucket,
  StyledBucketHeader,
  StyledBucketBody,
  StyledIssue,
  StyledBetween,
  StyledCenter,
} from './style';

// HOOKS
// import issueAxios from 'api/rest/issue';
import { useGetUserInfoHandler } from 'hooks/user';

// MOLECULES
import IssueBar from 'components/molecules/IssueBar';
import InputBox from 'components/molecules/InputBox';

// ATOMS
import Circle from 'components/atoms/Circle';
import Sheet from 'components/atoms/Sheet';
import Button from 'components/atoms/Button';
import Text from 'components/atoms/Text';

// ICONS
import { ImBin } from 'react-icons/im';
import { HiPlus, HiPencil } from 'react-icons/hi';
import { theme } from 'styles/theme';
import { FaJira } from 'react-icons/fa';
import { Select, FormControl, InputLabel, MenuItem, Modal, Box, Typography } from '@mui/material';
import {
  useDeleteIssueInMiddeBucket,
  useDeleteMiddleBucket,
  useGetIssueListInMiddleBucket,
  useGetMiddeBucketList,
  usePostAddIssue,
  usePostCreateMiddleBucket,
  usePostSendToJira,
  usePutEditMiddleBucket,
} from 'hooks/issue';

interface requestType {
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

/**
 * @description
 * 미들버킷 페이지의 미들버킷 기능.
 * 미들버킷 내에 저장된 이슈를 지라로 전송할 수 있다.
 *
 * @param {any} props 부모 컴포넌트로부터 받아오는 props(issue state, 이슈템플릿에서의 insert toggle state, setState)
 *
 * @author dbcs
 */

const index = (props: any) => {
  const [issueId, setIssueId] = useState(0);

  const { projectId } = useParams();
  const pjtId = Number(projectId);

  interface bucketType extends requestType {
    issueId: number;
  }

  const issue = {
    issueId: issueId,
    issueType: props.issue.issueType,
    summary: props.issue.summary,
    description: props.issue.description,
    assignee: props.issue.assignee,
    priority: props.issue.priority,
    epicLink: props.issue.epicLink,
    sprint: props.issue.sprint,
    storyPoints: props.issue.storyPoints,
    userImage: props.issue.userImage,
  };

  const [bucketId, setBucketId] = useState<number>(-1);

  // react-query
  const getUser = useGetUserInfoHandler();
  const getMiddleBucketList = useGetMiddeBucketList(pjtId);
  const getIssueListForMiddleBucket = useGetIssueListInMiddleBucket(bucketId as number);
  const deleteIssueInMiddleBucket = useDeleteIssueInMiddeBucket();
  const postAddIssue = usePostAddIssue();
  const postCreateMiddleBucket = usePostCreateMiddleBucket();
  const deleteMiddleBucket = useDeleteMiddleBucket();
  const putEditMiddleBucket = usePutEditMiddleBucket();
  const postSendToJira = usePostSendToJira();

  const myImg = getUser.data ? getUser.data.image : '';

  const [received, setReceived] = useState(false);
  useEffect(() => {
    if (props.isInsert) {
      const request: requestType = {
        middleBucketId: bucketId,
        assignee: issue.assignee,
        description: issue.description,
        epicLink: issue.epicLink,
        issueType: issue.issueType,
        priority: issue.priority,
        sprint: issue.sprint,
        storyPoints: issue.storyPoints,
        summary: issue.summary,
      };

      setIssueId(issueId + 1);

      postAddIssue.mutateAsync(request).then(() => getIssueListForMiddleBucket.refetch());

      setReceived(true);
      props.setIsInsert(false);
    }
  }, [props.isInsert]);

  useEffect(() => {
    if (bucketId >= 0) {
      getIssueListForMiddleBucket.refetch();
    }
  }, [bucketId]);

  useEffect(() => {
    if (received) {
      setReceived(false);
    }
  }, [received]);

  const deleteHandler = (issueId: number) => {
    deleteIssueInMiddleBucket
      .mutateAsync({
        middleBucketId: bucketId,
        middleBucketIssueId: issueId,
      })
      .then(() => getIssueListForMiddleBucket.refetch());
  };

  const deleteMiddleBucketHandler = () => {
    deleteMiddleBucket.mutateAsync(bucketId).then(() => getMiddleBucketList.refetch());
  };

  const sendToJiraHandler = () => {
    postSendToJira.mutate({ middleBucketId: bucketId, projectId: pjtId });
  };

  const [modalOpen, setModalOpen] = useState(false);
  const [addButtonOpen, setAddButtonOpen] = useState(false);
  const [editButtonOpen, setEditButtonOpen] = useState(false);

  const showModalHandler = () => {
    setModalOpen(true);
  };
  const closeModalHandler = () => {
    setModalOpen(false);
    setAddButtonOpen(false);
    setEditButtonOpen(false);
  };
  const inputBoxRef = useRef<HTMLInputElement>(null);
  const changeHandler = (e: any, content: string) => {
    const value = e.target.value;
    content === 'bucket' ? setBucketId(value) : '';
  };

  const BarList =
    getIssueListForMiddleBucket.data &&
    getIssueListForMiddleBucket.data.issueList.map(issue => (
      <StyledIssue>
        <Circle
          height={'20px'}
          backgroundColor={'red'}
          margin={'10px'}
          fontColor={'white'}
          fontWeight={'bold'}
          isClickable
          clickHandler={() => deleteHandler(issue.issueId)}
        >
          -
        </Circle>
        <IssueBar
          issueId={issue.issueId}
          issueType={issue.issueType}
          summary={issue.summary}
          description={issue.description}
          epicLink={issue.epicLink}
          assignee={issue.assignee}
          priority={issue.priority}
          sprint={issue.sprint}
          storyPoints={issue.storyPoints}
          userImage={myImg}
        />
      </StyledIssue>
    ));
  return (
    <MiddleBucket>
      <StyledBucketHeader>
        <div style={{ display: 'flex', alignItems: 'end' }}>
          <FormControl style={{ minWidth: 200 }}>
            <InputLabel id="demo-simple-select-label">미들버킷</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              label="미들버킷"
              sx={{ width: '200px' }}
              onChange={e => {
                changeHandler(e, 'bucket');
              }}
            >
              {getMiddleBucketList.data &&
                getMiddleBucketList.data.map((mb, idx) => {
                  return (
                    <MenuItem key={idx} value={mb.middleBucketId}>
                      {mb.name}
                    </MenuItem>
                  );
                })}
            </Select>
          </FormControl>
          <Button
            borderColor={theme.issue.task}
            width={'40px'}
            height={'40px'}
            margin={'5px 5px 5px 10px'}
            clickHandler={() => {
              showModalHandler();
              setAddButtonOpen(true);
            }}
            isHover
          >
            <HiPlus size={'1.2rem'} />
          </Button>
          <Modal
            open={modalOpen}
            onClose={closeModalHandler}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box
              sx={{
                position: 'absolute' as const,
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                width: 480,
                bgcolor: 'background.paper',
                p: 4,
                outline: 'none',
              }}
            >
              <Typography id="modal-modal-title" variant="h6" component="h2">
                <StyledBetween>
                  {addButtonOpen && (
                    <Text
                      isFill={false}
                      message={'Add MiddleBucket'}
                      fontSize={'1.5rem'}
                      fontWeight={'bold'}
                    />
                  )}
                  {editButtonOpen && (
                    <Text
                      isFill={false}
                      message={'Edit MiddleBucket'}
                      fontSize={'1.5rem'}
                      fontWeight={'bold'}
                    />
                  )}
                </StyledBetween>
              </Typography>
              <Typography id="modal-modal-inputbox" variant="h6" component="h2">
                <InputBox
                  ref={inputBoxRef}
                  labelName={'Bucket Name'}
                  isRow={false}
                  containerPadding={'0 0 16px'}
                  inputPlaceHolder={'이름을 입력하세요'}
                />
              </Typography>
              <StyledCenter>
                {addButtonOpen && (
                  <Button
                    borderColor={theme.issue.story}
                    clickHandler={() => {
                      const name = inputBoxRef.current ? inputBoxRef.current.value : '';
                      // issueAxios.postCreateMiddleBucket(name, pjtId);
                      postCreateMiddleBucket
                        .mutateAsync({ name, projectId: pjtId })
                        .then(() => getMiddleBucketList.refetch());
                      closeModalHandler();
                      // window.location.reload();
                    }}
                    isHover
                  >
                    Add Bucket
                  </Button>
                )}
                {editButtonOpen && (
                  <Button
                    borderColor={theme.issue.story}
                    clickHandler={() => {
                      const name = inputBoxRef.current ? inputBoxRef.current.value : '';
                      // issueAxios.putEditMiddleBucket(name, bucketId);
                      putEditMiddleBucket
                        .mutateAsync({ name, middleBucketId: bucketId })
                        .then(() => getMiddleBucketList.refetch());
                      closeModalHandler();
                      // window.location.reload();
                    }}
                    isHover
                  >
                    Edit Bucket
                  </Button>
                )}
              </StyledCenter>
            </Box>
          </Modal>
          <Button
            borderColor={theme.issue.story}
            width={'40px'}
            height={'40px'}
            margin={'5px'}
            clickHandler={() => {
              showModalHandler();
              setEditButtonOpen(true);
            }}
            isHover
          >
            <HiPencil size={'1.2rem'} />
          </Button>
          <Button
            borderColor={theme.issue.bug}
            width={'40px'}
            height={'40px'}
            margin={'5px'}
            clickHandler={deleteMiddleBucketHandler}
            isHover
          >
            <ImBin size={'1rem'} />
          </Button>
        </div>

        <Button
          borderColor={'#1973ee'}
          isHover
          width={'40px'}
          height={'40px'}
          margin={'5px'}
          clickHandler={() => {
            sendToJiraHandler();
          }}
        >
          <FaJira size={'1.8rem'} />
        </Button>
      </StyledBucketHeader>
      <Sheet
        isShadow={true}
        flex={'column'}
        height={'90%'}
        isOverflowYScroll={true}
        maxWidth={'538px'}
      >
        <StyledBucketBody>{BarList}</StyledBucketBody>
      </Sheet>
    </MiddleBucket>
  );
};
export default index;

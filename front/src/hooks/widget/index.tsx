//  API & Library
import { useParams } from 'react-router-dom';
import { useQuery, useQueryClient, useMutation } from '@tanstack/react-query';
import { widget } from 'api/rest';

/**
 * @description
 * 위젯의 레이아웃을 서버 단에서 가져와 생성하고 클라이언트 단에 저장하는 커스텀 훅
 *
 * @author inte
 */
export const useGetLayout = () => {
  // Init
  interface itemType {
    id: number;
    type?: string;
    path?: string;
    url?: string | null;
    children: itemType[];
  }

  const { projectId } = useParams();

  // Return
  return useQuery(
    ['layout', projectId],
    async () => {
      const updatedLayout: itemType[] = [{ id: 0, children: [] }];

      const response = await widget.getWidgetList(Number(projectId));

      console.log('[set layout response]: ', response);

      response.map(({ id, widgetCode, widgetRow, widgetCol, requestUrl }) => {
        while (updatedLayout.length <= widgetCol) {
          updatedLayout.push({ id: 0, children: [] });
        }
        while ((updatedLayout[widgetCol].children.length || 0) <= widgetRow) {
          updatedLayout[widgetCol].children.push({ id: 0, children: [] });
        }
        if (updatedLayout[widgetCol].children) {
          updatedLayout[widgetCol].children[widgetRow] = {
            id,
            type: widgetCode,
            children: [],
            url: requestUrl,
          };
        }
      });

      console.log('[set layout calc data]: ', updatedLayout);

      return updatedLayout;
    },
    {
      staleTime: Infinity,
    },
  );
};

/**
 * @description
 * 위젯 추가가 있었을 경우, 재조정을 하는 함수
 *
 * @returns
 */
export const useAddLayout = () => {
  //  Init
  interface requestType {
    projectId: number;
    widgetCodeId: string;
    widgetCol: number;
    widgetRow: number;
    requestUrl?: string;
  }

  const queryClient = useQueryClient();

  return useMutation(
    async ({ projectId, widgetCodeId, widgetCol, widgetRow, requestUrl }: requestType) =>
      await widget.addWidget(projectId, widgetCodeId, widgetCol, widgetRow, requestUrl),
    {
      onSuccess: () => {
        // 요청이 성공한 경우
        setTimeout(() => {
          queryClient.invalidateQueries(['layout']);
        }, 100); // 요청이 성공한 경우, DB 연산 시간 0.1s 를 주고 queryKey 유효성 제거
      },
      onError: () => {
        alert('위젯 추가에 실패했습니다.');
      },
    },
  );
};

/**
 * @description
 * 위젯 삭제가 있었을 경우, 재조정을 하는 함수
 *
 * @returns
 */
export const useDeleteLayout = () => {
  //  Init
  interface itemType {
    id: number;
    type?: string;
    path?: string;
    children: itemType[];
  }

  interface paramsType {
    deletedItems: itemType[];
    updatedLayout: itemType[];
  }

  interface requestType {
    id: number;
    widgetCol: number;
    widgetRow: number;
  }

  const queryClient = useQueryClient();

  return useMutation(
    async ({ deletedItems, updatedLayout }: paramsType) => {
      const updatedWidgetList: requestType[] = [];
      updatedLayout.map((item, index) => {
        const widgetCol = index;
        item.children.map(({ id }, index) => {
          if (id == 0) return;
          const widgetRow = index;
          updatedWidgetList.push({
            id,
            widgetCol,
            widgetRow,
          });
        });
      });
      console.log('[삭제할 위젯]', deletedItems);
      console.log('[변경된 레이아웃]', updatedWidgetList);
      await deletedItems.map(async ({ id }) => {
        await widget.deleteWidget(id);
      });
      console.log('[변경할 데이터]', updatedWidgetList);
      const resp = await widget.setWidgetList(updatedWidgetList);
      console.log('[데이터 변경 응답]', resp);
    },
    {
      onSuccess: () => {
        setTimeout(() => {
          queryClient.invalidateQueries(['layout']);
        }, 100); // 요청이 성공한 경우, DB 연산 시간 0.1s 를 주고 queryKey 유효성 제거
      },
      onError: () => {
        alert('위젯 삭제에 실패했습니다.');
      },
    },
  );
};

/**
 * @description
 * 위젯들의 위치 변경이 있을 경우, 재조정을 하는 함수
 *
 * @returns
 */
export const useSetLayout = () => {
  //  Init
  interface itemType {
    id: number;
    type?: string;
    path?: string;
    children: itemType[];
  }

  interface requestType {
    id: number;
    widgetCol: number;
    widgetRow: number;
  }

  const queryClient = useQueryClient();

  return useMutation(
    async (updatedLayout: itemType[]) => {
      const updatedWidgetList: requestType[] = [];

      updatedLayout.map((item, index) => {
        const widgetCol = index;
        item.children.map(({ id }, index) => {
          if (id == 0) return;
          const widgetRow = index;

          updatedWidgetList.push({
            id,
            widgetCol,
            widgetRow,
          });
        });
      });

      console.log('[변경할 데이터]', updatedWidgetList);
      await widget.setWidgetList(updatedWidgetList);
    },
    {
      onSuccess: () => {
        // 요청이 성공한 경우
        setTimeout(() => {
          queryClient.invalidateQueries(['layout']);
        }, 100); // 요청이 성공한 경우, DB 연산 시간 0.1s 를 주고 queryKey 유효성 제거
      },
      onError: () => {
        alert('위젯 조작에 실패했습니다.');
      },
    },
  );
};

export const useGetGitlabRepositories = (tokenCodeId: string) => {
  return useQuery(['get-repositories'], () => widget.getGitlabRepositories(tokenCodeId), {
    enabled: false,
  });
};

export const useGetGitMRorCommit = (
  branch: string | null,
  projectId: number,
  tokenCodeId: string,
  widgetType: string,
) => {
  return useQuery(['get-git-mr-or-commit', branch ? '1' : '2'], () =>
    widget.getGitMRorCommit(branch, projectId, tokenCodeId, widgetType),
  );
};

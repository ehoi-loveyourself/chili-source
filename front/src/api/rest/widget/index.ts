// API & Library
import { createAxiosApi } from 'api/axios';

// Init
const widgetAxios = createAxiosApi('widget-service');

/**
 * @description
 * http://k7b2071.p.ssafy.io/widget-service/ 이하의 url의 요청을 보낼 프라미스 객체를 리턴하는 함수들
 *
 * @example
 * ```
 * // rest 라이브러리 임포트
 * import { widget } from 'api/rest'
 *
 * // IFFE 방식 또는 프라미스 객체를 활용하는 어떤 방법이던 상관없음
 * ( async () => {const tokenCodes = await widget.getTokenCodes} )();
 * ```
 *
 * @author inte
 */
export default {
  /**
   * @description
   * 특정 프로젝트 ID를 가진 프로젝트의 위젯 리스트를 가져오는 API
   * @param {number} projectId 프로젝트 ID
   * @returns
   */
  getWidgetList: (projectId: number) => {
    interface responseType {
      id: number;
      name: string;
      widgetRow: number;
      widgetCol: number;
      widgetCode: string;
      requestUrl: string | null;
      detailRequestUrl: string | null;
    }
    return new Promise<responseType[]>((resolve, reject) => {
      widgetAxios
        .get(`/widgets/${projectId}`)
        .then(response => {
          resolve(response.data);
        })
        .catch(error => {
          reject(error);
        });
    });
  },

  /**
   * @description
   * 위젯을 추가하는 API
   *
   * @param {number} projectId      프로젝트 ID
   * @param {string} widgetCodeId   위젯코드 ID
   * @param {number} widgetCol      위젯 열 번호
   * @param {number} widgetRow      위젯 행 번호
   * @param {string} url            url
   * @returns
   */
  addWidget: (
    projectId: number,
    widgetCodeId: string,
    widgetCol: number,
    widgetRow: number,
    url?: string,
  ) => {
    // Init
    interface requestType {
      name: string;
      projectId: number;
      widgetCodeId: string;
      widgetCol: number;
      widgetRow: number;
      url: string;
    }

    interface responseType {
      message: string;
    }

    // Data
    const payload: requestType = {
      name: '-',
      url: url || '',
      projectId,
      widgetCodeId,
      widgetCol,
      widgetRow,
    };

    return new Promise<responseType[]>((resolve, reject) => {
      widgetAxios
        .post(`/widgets/`, payload)
        .then(response => {
          resolve(response.data);
        })
        .catch(error => {
          reject(error);
        });
    });
  },

  /**
   * @description
   * 위젯을 삭제하는 API
   *
   * @param {number} widgetId 위젯 ID
   * @returns
   */

  deleteWidget: (widgetId: number) => {
    return new Promise<string>((resolve, reject) => {
      widgetAxios
        .delete(`/widgets/${widgetId}`)
        .then(response => {
          resolve(response.data);
        })
        .catch(error => {
          reject(error);
        });
    });
  },

  /**
   * @description
   * 위젯 리스트를 set하는 API
   *
   * @param payload id, 행번호, 열번호를 가진 객체
   * @returns
   */
  setWidgetList: (payload: { id: number; widgetRow: number; widgetCol: number }[]) => {
    return new Promise((resolve, reject) => {
      widgetAxios
        .put(`/widgets/loc`, payload)
        .then(response => {
          resolve(response);
        })
        .catch(error => {
          reject(error);
        });
    });
  },

  /**
   * @description
   * 깃랩 레포지토리를 가져오는 API
   *
   * @param {string} tokenCodeId 토큰코드 ID
   * @returns
   */
  getGitlabRepositories: (tokenCodeId: string) => {
    interface returnType {
      id: number;
      description: string;
      name: string;
      name_with_namespace: string;
      path: string;
      path_with_namespace: string;
      default_branch: string;
      ssh_rul_to_repo: string | null;
      http_url_to_repo: string;
      web_url: string;
    }
    return new Promise<returnType[]>((resolve, reject) => {
      widgetAxios
        .get(`/git/repositories`, { params: { tokenCodeId } })
        .then(response => {
          resolve(response.data);
        })
        .catch(error => {
          reject(error);
        });
    });
  },

  /**
   * @description
   * 머지 리퀘스트 또는 커밋 이력을 가져오는 API
   *
   * @param {string | null} branch  브랜치 이름
   * @param {number} projectId      프로젝트 ID
   * @param {string} tokenCodeId    토큰코드 ID
   * @param {string} widgetType     크기별 위젯 종류
   * @returns
   */
  getGitMRorCommit: (
    branch: string | null,
    projectId: number,
    tokenCodeId: string,
    widgetType: string,
  ) => {
    interface branchType {
      name: string;
      web_url: string;
    }
    interface mergeType {
      author: {
        id: number;
        name: string;
        username: string;
        state: string;
        avatar_url: string;
        web_url: string;
      };
      description: string;
      title: string;
      web_url: string;
    }
    interface responseType {
      branches: branchType[];
      mergeRequestResponses: mergeType[];
    }
    return new Promise<responseType>((resolve, reject) => {
      widgetAxios
        .get(
          `/widgets/small/${widgetType}?projectId=${projectId}&branch${
            branch ? `=${branch}` : ''
          }&tokenCodeId=${tokenCodeId}`,
        )
        .then(response => {
          console.log(response);
          resolve(response.data);
        })
        .catch(error => {
          reject(error);
        });
    });
  },
};

import { ChangeEvent } from 'react';

import { useQuery, useMutation } from '@tanstack/react-query';

import { project } from 'api/rest';

/**
 * @description
 * 해당 프로젝트id의 데이터를 가져오는 API 요처함수를 다루는 custom-hook
 *
 * @author bell
 */
export const useGetProject = (projectId: number) => {
  return useQuery(['get-project', projectId], () => project.getProject(projectId));
};

/**
 * @description
 * 해당 유저가 가지고 있는 토큰과 연관되는 우리 서비스를 모두 가져오는
 * API 요청 함수를 다루는 custom-hook
 *
 * @author bell
 */
export const useGetProjects = () => {
  return useQuery(['get-projects'], () => project.getProjects(), {
    staleTime: Infinity,
  });
};

/**
 * @description
 * 프로젝트 생성 시켜주는 API 요청 함수를 다루는 custom-hook
 * 로고 이미지를 넣는 경우가 있기 때문에, form-data 형식으로 통신해야한다.
 *
 * @author bell
 */
export const usePostCreateProjectHandler = () => {
  interface requestBodyType {
    projectName: string;
    projectDescription: string;
    image: ChangeEvent<HTMLInputElement>;
  }
  return useMutation(({ projectName, projectDescription, image }: requestBodyType) =>
    project.postCreateProject(projectName, projectDescription, image),
  );
};

/**
 * @description
 * 프로젝트를 삭제시키는 API 요청 함수를 다루는 custom-hook
 *
 * @author bell
 */
export const useDeleteProject = () => {
  interface pathType {
    projectId: number;
  }
  return useMutation(({ projectId }: pathType) => project.deleteProject(projectId));
};

/**
 * @description
 * 생성한 프로젝트와 토큰을 연결하는 API 요청 함수를 다루는 custom-hook
 *
 * @author bell
 */
export const usePostConnectTokenToProject = () => {
  interface requestBodyType {
    detail: string;
    name: string;
    projectId: number;
  }
  return useMutation(({ detail, name, projectId }: requestBodyType) =>
    project.postConnectTokenToProject(detail, name, projectId),
  );
};

/**
 * @description
 * 해당 프로젝트에 참가하고 있는 모든 팀원을 불러오는 API 요청 함수를 다루는 custom-hook
 *
 * @author bell
 */
export const useGetTeamForProject = (projectId: number) => {
  return useQuery(['get-team-for-project', projectId], () => project.getTeamForProject(projectId));
};

/**
 * @description
 * 프로젝트의 제목과 설명을 수정하는 API 요청하는 함수를 다루는 custom-hook
 *
 * @author bell
 */
export const useUpdateProject = () => {
  interface requestBodyType {
    projectId: number;
    projectName: string;
    projectDescription: string;
  }
  return useMutation(({ projectId, projectName, projectDescription }: requestBodyType) =>
    project.updateProject(projectId, projectName, projectDescription),
  );
};

/**
 * @description
 * 프로젝트의 로고를 수정하는 API 요청하는 함수를 다루는 custom-hook
 *
 * @author bell
 */
export const useUpdateProjectImage = () => {
  interface requestType {
    projectId: number;
    image: ChangeEvent<HTMLInputElement>;
  }

  return useMutation(({ projectId, image }: requestType) =>
    project.updateProjectImage(projectId, image),
  );
};

/**
 * @description
 * 프로젝트에 참여하는 유저들의 권한 수정을 요청하는 함수를 다루는 custom-hook
 *
 * @author bell
 */
export const useUpdateTeamRole = () => {
  interface requestType {
    projectId: number;
    roleId: string;
    userId: number;
  }

  return useMutation(({ projectId, roleId, userId }: requestType) =>
    project.updateTeamRole(projectId, roleId, userId),
  );
};

/**
 * @description
 * 프로젝트에 참여하는 유저들의 색상 변경을 요청하는 함수를 다루는 custom-hook
 *
 * @author bell
 */
export const useUpdateTeamColor = () => {
  interface requestType {
    projectId: number;
    userColor: string;
    userId: number;
  }

  return useMutation(({ projectId, userColor, userId }: requestType) =>
    project.updateTeamColor(projectId, userColor, userId),
  );
};

/**
 * @description
 * 프로젝트에 유저를 초대하는 API 요청하는 함수를 다루는 커스텀 훅
 *
 * @author bell
 */
export const usePostInviteTeam = () => {
  interface requestBodyType {
    projectId: number;
    userId: number;
  }
  return useMutation(({ projectId, userId }: requestBodyType) =>
    project.postInviteTeam(projectId, userId),
  );
};

/**
 * @description
 * 프로젝트에서 해당 유저를 강퇴시키는 API를 요청하는 함수를 다루는 커스텀 훅
 *
 * @author bell
 */
export const useDeleteFireTeam = () => {
  interface queryType {
    fireUserId: number;
    projectId: number;
  }
  return useMutation(({ fireUserId, projectId }: queryType) =>
    project.deleteTeamFire(fireUserId, projectId),
  );
};

// API & Library
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

import { auth } from 'api/rest';

/**
 * @description
 * 유저 로그인 클릭 후 로딩 페이지
 *
 * @author inte
 */
const UserLoginLoadingPage = () => {
  // Init
  const locate = useLocation();

  // 로그인 Lock
  // const clickHandler = async () => {
  //   // IFFE
  //   await (async () => {
  //     const params = new URLSearchParams(locate.search.substring(1));
  //     console.log('[code]:', params.get('code'));
  //     console.log('[엑세드 토큰 발급 시도]');
  //     try {
  //       await auth.loginCallback('google', params.get('code') || '');
  //     } finally {
  //       location.href = localStorage.getItem('URL') || '/';
  //     }
  //   })();
  // };

  // 로그인 UnLock
  useEffect(() => {
    // IFFE
    (async () => {
      const params = new URLSearchParams(locate.search.substring(1));
      console.log('[code]:', params.get('code'));
      console.log('[엑세드 토큰 발급 시도]');
      try {
        await auth.loginCallback('google', params.get('code') || '');
      } finally {
        location.href = localStorage.getItem('URL') || '/';
      }
    })();
  }, []);

  return (
    <>
      <div>로그인 중 입니다...</div>
    </>
  );
};

export default UserLoginLoadingPage;

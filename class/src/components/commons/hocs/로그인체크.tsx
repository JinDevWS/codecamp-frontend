import { useRouter } from "next/router";
import { useEffect } from "react";
import { useRecoilValueLoadable } from "recoil";
import { restoreAccessTokenLoadable } from "../../../commons/stores";

export const 로그인체크 = (컴포넌트: any) => (프롭스: any) => {
  const router = useRouter();
  const aaa = useRecoilValueLoadable(restoreAccessTokenLoadable);

  // 1. 로그인체크(refreshToken 이전 방식)
  // useEffect(() => {
  //   if (!localStorage.getItem("accessToken")) {
  //     alert("로그인 후 이용 가능합니다!!");
  //     void router.push("/section23/23-05-login-check-hoc");
  //   }
  // }, []);

  // 2. 로그인체크(refreshToken 이후 방식) : 안좋음. _app.tsx에 이어서 총 2번 요청하게 됨
  // useEffect(() => {
  //   void getAccessToken().then((newAccessToken) => {
  //     if (newAccessToken === undefined) {
  //       alert("로그인 후 이용 가능합니다!!");
  //       void router.push("/section23/23-05-login-check-hoc");
  //     }
  //   });
  // }, []);

  // 3. 로그인체크(refreshToken 이후 방식): 좋음. 함수를 공유함으로써 _app.tsx에 이어서 총 1번만 요청하게 됨.
  useEffect(() => {
    aaa.toPromise().then((newAccessToken) => {
      if (newAccessToken === undefined) {
        alert("로그인 후 이용 가능합니다!");
        void router.push("/section23/23-05-login-check-hoc");
      }
    });
  }, []);
  return <컴포넌트 {...프롭스} />;
};

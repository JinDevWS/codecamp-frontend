import { useRouter } from "next/router";
import { useEffect } from "react";

export const 로그인체크 = (컴포넌트: any) => (프롭스: any) => {
  const router = useRouter();
  useEffect(() => {
    if (!localStorage.getItem("accessToken")) {
      alert("로그인 후 이용 가능합니다!!");
      void router.push("/section23/23-05-login-check-hoc");
    }
  }, []);

  return <컴포넌트 {...프롭스} />;
};

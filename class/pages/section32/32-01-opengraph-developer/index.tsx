// 개발자일 때 => 디스코드, 카카오톡, 슬랙 등

import axios from "axios";
import { wrapAsync } from "../../../src/commons/libraries/asyncFunc";

export default function OpengraphDeveloperPage(): JSX.Element {
  const onClickEnter = async (): Promise<void> => {
    // 1. 채팅 데이터에 주소가 있는지 찾기(예: http 로 시작하는)

    // 2. 해당 주소로 스크래핑하기
    // 네이버는 CORS 가 허용 안되어 있음. 스크래핑도 콜스가 허용된 사이트에서만 가능
    // 콜스 허용된 사이트 찾아서 연습해 보기
    // 실제로는 콜스 문제 때문에 프록시 서버 사용해야 함...
    // const result = await axios.get("https://www.naver.com");
    const result = await axios.get(
      "http://localhost:3000/section32/32-01-opengraph-provider",
    );
    console.log(result.data);

    // 3. 매타태그에서 오픈그래프(og:) 찾기
    console.log(
      result.data.split("<meta").filter((el: string) => el.includes("og:")),
    );
  };
  return (
    <button onClick={wrapAsync(onClickEnter)}>채팅 입력 후 엔터치기!!</button>
  );
}

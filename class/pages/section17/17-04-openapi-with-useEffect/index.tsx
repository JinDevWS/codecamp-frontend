import axios from "axios";
import { useEffect, useState } from "react";

export default function RestGetPage(): JSX.Element {
  // 사진이라는 건 일반적으로 주소로 사용을 함.
  // 그리고 이 주소 형태를 접속하게 되면 그 주소로부터 사진을 다운받아오게끔 구현이 되어 있음
  // 페이지를 열자마자 사진 요청을 하고 싶다??
  // useQuery? 근데 useQuery 는 Apollo Client 쓸 때 했던 것
  // 그거 말고 엑시오스로 하는 방법은?

  // async function onClickSync() {
  //   const result = await axios.get("https://dog.ceo/api/breeds/image/random");
  //   console.log(result.data.message); // 사진 주소
  // }

  // 이렇게 그냥 함수에 넣지 말고 화면 켜지자마자 바로 실행되게끔 하면 되지 않나?
  // export default async function RestGetPage() { 이렇게 여기에 async 붙이고?
  //
  // const result = await axios.get("https://dog.ceo/api/breeds/image/random");
  // console.log(result.data.message); // 사진 주소
  //
  // 결론적으로 말하면 우선 이렇게는 되지가 않는다. 함수로 감싸주고 async 붙여야지, export default 부분에 붙이면 안됨.
  // 그리고 문제가 하나 더 있는게,
  // 받아온 사진주소를 이미지라는 스테이트에 넣고 싶다고 해 보자.
  // const [dog, setDog] = useState("");
  // const result = await axios.get("https://dog.ceo/api/breeds/image/random");
  // console.log(result.data.message); // 사진 주소 를 성공적으로 받아왔다고 치더라도
  // setDog(result.data.message); // 바뀜과 동시에 리렌더되고, 리렌더되면서 또 바뀌려하고, 또 리렌더..  무한루프에 빠진다.

  const [dog, setDog] = useState("");

  // 한 번만 실행되어, 무한루프를 방지함
  useEffect(() => {
    const onCLickSync = async (): Promise<void> => {
      const result = await axios.get("https://dog.ceo/api/breeds/image/random");
      console.log(result.data.message);

      // 어? useEffect 에서 set state 하지 말라고 하지 않았나?
      // 근데 useEffect 안에 있으니까, 다 끝나고 한 번만 실행된다.(요청 들어가는 시점이 useQuery 보다 조금 더 느리다)
      // 그러면 이런 REST API 도 useQuery 같은 게 혹시 없을까?
      // 있음. ReactQuery 라고. 그래프큐엘에서 아폴로클라이언트 사용하는것과 비슷.
      // 참고로 ReactQuery 에서도 그래프큐엘 지원하지만 아폴로클라이언트를 더 많이 쓴다.
      // 그래서 이런 라이브러리를 사용하지 않는다 라고 하면 유저 이펙트에서 화면이 다 그려지고 나서
      // 즉 useEffect 에서 실행하도록 해주면 됨
      setDog(result.data.message);
    };
    void onCLickSync(); // 이런식으로 함수로 한번 감싸주어 useEffect 내에서 async 와 await 을 사용할 수 있다.
  }, []);

  return (
    <div>
      <img src={dog} />
      {/* <button onClick={onClickSync}>동기 호출</button> */}
    </div>
  );
}

import { useRouter } from "next/router";

export default function staticRoutingPage() {
  const router = useRouter();

  const onClickMove1 = () => {
    router.push("/section05/05-02-static-routing-board-moved/1");
  };

  const onClickMove2 = () => {
    router.push("/section05/05-02-static-routing-board-moved/2");
  };

  const onClickMove3 = () => {
    router.push("/section05/05-02-static-routing-board-moved/3");
  };

  return (
    <div>
      <button onClick={onClickMove1}>페이지1 이동하기</button>
      <button onClick={onClickMove2}>페이지2 이동하기</button>
      <button onClick={onClickMove3}>페이지3 이동하기</button>
    </div>
  );
}

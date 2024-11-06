import { useRouter } from "next/router";

export default function staticRoutingPage() {
  const router = useRouter();

  const onClickMove1 = () => {
    router.push("/section05/05-04-dynamic-routing-board-query-moved/1");
  };

  return (
    <div>
      <button onClick={onClickMove1}>페이지1 이동하기</button>
    </div>
  );
}

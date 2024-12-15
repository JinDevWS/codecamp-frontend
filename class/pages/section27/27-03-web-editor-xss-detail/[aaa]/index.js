import { useQuery, gql } from "@apollo/client";
import { useRouter } from "next/router";
import Dompuryfy from "dompurify";

const FETCH_BOARD = gql`
  query fetchBoard($boardId: ID!) {
    fetchBoard(boardId: $boardId) {
      _id
      writer
      title
      contents
    }
  }
`;

export default function staticRoutingMovedPage() {
  const router = useRouter();

  const { data } = useQuery(FETCH_BOARD, {
    variables: { boardId: router.query.aaa },
  });

  // html 이 들어있는 문장을 태그가 있는 그대로 넣어줘~ 라는 뜻임.
  // const myhtml = {
  //   __html: data?.fetchBoard?.contents,
  // };

  return (
    <div>
      {/* <div>
        동적(다이나믹) 페이지 {router.query.aaa}번 이동이 완료되었습니다
      </div> */}
      <div>작성자: {data?.fetchBoard?.writer}</div>
      <div>제목: {data?.fetchBoard?.title}</div>
      {/* <div>내용: {data?.fetchBoard?.contents}</div> */}
      {/* html 이 들어있는 문장을 태그가 있는 그대로 넣어줘~ 라는 뜻임. */}
      {/* <div dangerouslySetInnerHTML={myhtml} /> */}
      {typeof window !== "undefined" && (
        <div
          dangerouslySetInnerHTML={{
            __html: Dompuryfy.sanitize(data?.fetchBoard?.contents),
          }}
        />
      )}
    </div>
  );
}

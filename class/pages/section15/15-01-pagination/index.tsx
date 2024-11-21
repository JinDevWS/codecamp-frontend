import { useQuery, gql } from "@apollo/client";
import type {
  IQuery,
  IQueryFetchBoardsArgs,
} from "../../../src/commons/types/generated/types";
import { MouseEvent } from "react";

const FETCH_BOARDS = gql`
  query fetchBoards($page: Int) {
    fetchBoards(page: $page) {
      _id
      writer
      title
      contents
    }
  }
`;

export default function staticRoutingMovedPage(): JSX.Element {
  const { data, refetch } = useQuery<
    Pick<IQuery, "fetchBoards">,
    IQueryFetchBoardsArgs
  >(FETCH_BOARDS);

  console.log(data?.fetchBoards);

  // 리페치 함수 실행하고 그냥 끝남. 디비에서 뭘 가져다줘 요청하고 기다리는게 아니고.
  // 따라서 그냥 void 로 해도 됨.
  const onClickPage = (event: MouseEvent<HTMLSpanElement>): void => {
    void refetch({ page: Number(event.currentTarget.id) });
  };
  //   const onClickPage2 = (): void => {
  //     void refetch({ page: 2 });
  //   };
  //   const onClickPage3 = (): void => {
  //     void refetch({ page: 3 });
  //   };

  return (
    <div>
      {data?.fetchBoards.map((el) => (
        <div key={el._id}>
          <span style={{ margin: "10px" }}>{el.title}</span>
          <span style={{ margin: "10px" }}>{el.writer}</span>
        </div>
      ))}
      {
        // 중괄호로 감싸줘야 얘가 문자열 "[1, 2, 3]" 이 아닌 자바스크립트 코드로 읽힌다.
        // [1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((el, index) => {
        //   <span key={index + 1} onClick={onClickPage}>
        //     {index + 1}
        //   </span>;
        // })
        // 페이지네이션에서 el은 안쓴다.(무슨 값이든 상관없기 때문에.)
        // 그래서 보통 _ 라고 표기한다. (안쓴다는 거 알아보기 쉬우라고)
        // ["철수", 1, 1, 1, 1, "영희", "아무값이나상관없음", 1, 1, 1].map(
        //   (_, index) => {
        //     <span key={index + 1} onClick={onClickPage}>
        //       {index + 1}
        //     </span>;
        //   },
        // )
        // 아래와 같이 1, 1, 1, ... 1, 1 이 부분을 축약할 수 없을까?
        // 축약 가능하다.
        // [1, 1, 1, 1, 1, 1, 1, 1, 1, 1].map((_, index) => {
        //   <span key={index + 1} onClick={onClickPage}>
        //     {index + 1}
        //   </span>;
        // })
      }
      {
        // 10칸짜리 배열을 만들고 전부 1로 채우세요
        new Array(10).fill(1).map((_, index) => (
          <span key={index + 1} id={String(index + 1)} onClick={onClickPage}>
            {index + 1}
          </span>
        ))
      }

      {/* <span id="1" onClick={onClickPage1}>
        1
      </span>
      <span id="2" onClick={onClickPage2}>
        2
      </span>
      <span id="3" onClick={onClickPage3}>
        3
      </span> */}
    </div>
  );
}

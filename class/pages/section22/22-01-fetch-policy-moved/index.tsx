import { useQuery, gql } from "@apollo/client";
import type {
  IQuery,
  IQueryFetchBoardsArgs,
} from "../../../src/commons/types/generated/types";

const FETCH_BOARDS = gql`
  query fetchBoards {
    fetchBoards {
      _id
      writer
    }
  }
`;

export default function staticRoutingMovedPage(): JSX.Element {
  const { data } = useQuery<Pick<IQuery, "fetchBoards">, IQueryFetchBoardsArgs>(
    FETCH_BOARDS,
  );

  return (
    <div>
      {/* 
        개발자 도구를 잘 보면, 데이터 받아온 게 없는데도 아래 내용을 잘만 그려줌.
        왜?
        글로벌 스테이트에 저장이(캐시가) 되어 있기 때문에
        다시 백엔드 요청을 할 필요가 없이 캐시에서 꺼내오는 것이다.
        */}
      {data?.fetchBoards.map((el) => (
        <div key={el._id}>
          <span style={{ margin: "10px" }}>{el.title}</span>
          <span style={{ margin: "10px" }}>{el.writer}</span>
        </div>
      ))}
    </div>
  );
}

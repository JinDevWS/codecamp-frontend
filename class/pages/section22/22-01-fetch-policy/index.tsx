import { useQuery, gql } from "@apollo/client";
import type {
  IQuery,
  IQueryFetchBoardsArgs,
} from "../../../src/commons/types/generated/types";
import { useState } from "react";
import FetchPolicyExample from "../../../src/components/units/22-fetch-policy";
import { useRouter } from "next/router";

const FETCH_BOARDS = gql`
  query fetchBoards {
    fetchBoards {
      _id
      writer
      title
      contents
    }
  }
`;

export default function staticRoutingMovedPage(): JSX.Element {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);

  const { data } = useQuery<Pick<IQuery, "fetchBoards">, IQueryFetchBoardsArgs>(
    FETCH_BOARDS,
  );

  // 1. 새로운 컴포넌트 등장 시에도 글로벌 스테이트 값이 유지되는지?
  const onClickIsOpen = (): void => {
    setIsOpen(true);
  };

  // 2. 새로운 페이지 이동시에도 글로벌 스테이트 값이 유지되는지?
  // 페이지 이동시에는 1. 과 다르게 백엔드에서 데이터 받아오네???
  // 왜일까?
  // 페이지를 이동할 때마다 가장 먼저 실행되는 것은 app.tsx 이다.
  // app.tsx 의 ApolloSetting 을 command 누르고 마우스 클릭 해서 타고 들어가보면,
  // client 부분에,
  // cache: new InMemoryCache(), // 컴 메모리에 백엔드에서 가져온 데이터 저장
  // 이런 부분이 있다. 그러니까 페치보드 이런거 해서 어디 저장하냐? 바로 여기다가 저장함.
  // 근데 페이지 이동하게 되면 app 컴포넌트가 새롭게 다시 실행이 된다.
  // new InMemoryCache() 가 재실행되면서 새로운게 다시 만들어지는 것이다.
  // 그러다보니 기존 게 싹 다 지워졌기 떄문에 어쩔 수 없이 새 페이지에서는 새 걸 다시 받아오게 된다.
  // 해결방법? 페이지 이동할 때마다 new 가 안 되게 방어해 주면 된다.
  const onClickMove = (): void => {
    void router.push("/section22/22-01-fetch-policy-moved");
  };

  return (
    <div>
      <button onClick={onClickIsOpen}>
        1. 버튼을 클릭하면 새로운 컴포넌트가 나타납니다!!!
      </button>
      {isOpen && <FetchPolicyExample />}
      =================================
      <button onClick={onClickMove}>
        2. 버튼을 클릭하면 페이지가 이동합니다!!!
      </button>
    </div>
  );
}

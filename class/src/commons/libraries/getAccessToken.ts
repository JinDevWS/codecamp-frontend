import { gql, GraphQLClient } from "graphql-request";
import type { IMutation } from "../types/generated/types";

const RESTORE_ACCESS_TOKEN = gql`
  mutation {
    restoreAccessToken {
      accessToken
    }
  }
`;

export const getAccessToken = async (): Promise<string | undefined> => {
  // 2. refreshToken 으로 accessToken 을 재발급 받기
  //
  // 여기서는 useMutation을 할 수가 없다.
  // 왜??
  // 아폴로 셋팅이 끝나고, 그 셋팅이 전달된 이후에 (밑의 new ApolloClient 부분)
  // 그제서야 useQuery, useMutation 이런 것들이 가능하기 때문.
  // 여기서는 현재 셋팅 중이기 때문에 안 되는 것임.
  // 그러면 어떻게? axios 같은 도움을 주는 라이브러리가 있다.
  //

  try {
    const graphQlClient = new GraphQLClient(
      "https://backend-practice.codebootcamp.co.kr/graphql",
      { credentials: "include" },
    );
    const result =
      await graphQlClient.request<Pick<IMutation, "restoreAccessToken">>(
        RESTORE_ACCESS_TOKEN,
      );
    const newAccessToken = result.restoreAccessToken.accessToken;
    return newAccessToken;
  } catch (error) {
    if (error instanceof Error) console.log(error.message);
  }
};

// const qqq: string = "안녕하세요";

// console.log(qqq);

import { DataSource } from "typeorm";
import { Board } from "./Board.postgress";
import { gql, ApolloServer } from "apollo-server";

const typeDefs = gql`
  type Query {
    fetchBoards: String
  }
  type Mutation {
    createBoard: String
  }
`;

const resolvers = {
  Query: {
    // 누군가 해당 api를 요청했다면 아래의 함수가 실행됩니다.
    fetchBoards: () => {
      return "fetchBoards를 요청하셨습니다.";
    },
  },

  mutation: {
    createBoard: () => {
      return "createBoard를 요청하셨습니다.";
    },
  },
};

// typeDefs와 resolvers는 위에 우리가 만들어준 타입과 api 입니다.
const server = new ApolloServer({
  typeDefs: typeDefs,
  resolvers: resolvers,
});

const AppDataSource = new DataSource({
  type: "postgres",
  host: "34.64.244.122",
  port: 5001,
  username: "postgres",
  password: "postgres2022",
  database: "postgres",
  entities: [Board],
  synchronize: true,
  logging: true,
});

AppDataSource.initialize()
  .then(() => {
    console.log("DB 접속에 성공했습니다!!!");

    startStandaloneServer(server).then(() => {
      //성공시 실행
      // 서버접속 완료시에 콘솔표기
      console.log("접속 완료!");
      server.listen({ port: 4000 });
    });
  })
  .catch((error) => {
    console.log("DB 접속에 실패했습니다!!!");
    console.log("원인: ", error);
  });

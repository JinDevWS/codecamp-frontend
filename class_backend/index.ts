// const qqq: string = "안녕하세요";

// console.log(qqq);

import { DataSource } from "typeorm";
import { Board } from "./Board.postgress";
import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";

// API-DOCS 만들기
const typeDefs = `#graphql
  input createBoardInput {
    writer: String
    title: String
    contents: String
  }

  type MyBoard {
    number: Int
    writer: String
    title: String
    contents: String
  }

  type Query {
    fetchBoards: [MyBoard]
  }
  type Mutation {
    # 연습용(backend-example 방식)
    # createBoard(writer: String, title:String, contents: String): String

    # 실무용(backend-practice 방식)
    createBoard(createBoardInput: createBoardInput): String
  }
`;

// API 만들기
const resolvers = {
  Query: {
    // 누군가 해당 api를 요청했다면 아래의 함수가 실행됩니다.
    fetchBoards: async () => {
      // 1. 모두 꺼내기
      const result = await Board.find();
      // const result = await Board.find({ where: { isDeleted: false } }); // 실무에서는 이렇게 삭제했다치자 들만 쏙 뺴고 보여준다.
      console.log(result);

      // 2. 한 개만 꺼내기
      // const result = await Board.findOne({
      //   where: { number: 3 },
      // });

      return result;
    },
  },

  Mutation: {
    // createBoard: async (parent: any, args: any, context: any, info: any) => {
    createBoard: async (args: any) => {
      await Board.insert({
        // writer: args.createBoardInput.writer,
        // title: args.createBoardInput.title,
        // contents: args.createBoardInput.contents,

        ...args.createBoardInput,
      });

      return "createBoard(게시글 등록)를 요청하셨습니다.";
    },

    // updateBoard: async () => {
    //   // 3번 게시글을 영희로 바꿔줘!
    //   Board.update({ number: 3 }, { writer: "영희" });
    // },

    // deleteBoard: async () => {
    //   await Board.delete({ number: 3 });

    //   // 3번 게시글 삭제했다 치자!(고객 복원요청 대비, 직원 실수 방지 등의 이유로 이렇게 실무에서 많이 함)
    //   // 소프트 딜리트
    //   // isDeleted 가 초기값인 false면 삭제 안된거, true면 삭제된거
    //   // 좋긴 좋은데 삭제날짜도 있음 좋겠어
    //   await Board.update({ number: 3 }, { isDeleted: true });
    //   // deletedAt이 초기값인 NULL이면 삭제 안된거, 날짜가 들어가있으면 삭제된거
    //   Board.update({ number: 3 }, { deletedAt: new Date() });
    // },
  },
};

// typeDefs와 resolvers는 위에 우리가 만들어준 타입과 api 입니다.
const server = new ApolloServer({
  typeDefs: typeDefs,
  resolvers: resolvers,
  // cors: true, // 모든 사이트의 콜스 풀기

  // 선택한 사이트만 풀어주고 싶을 때 (환경 따라 다름)
  // cors: {
  //   origin: ["http://naver.com"],
  // },
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
  .then(async () => {
    console.log("DB 접속에 성공했습니다!!!");

    // startStandaloneServer(server).then(() => {
    //   //성공시 실행
    //   // 서버접속 완료시에 콘솔표기
    //   console.log("접속 완료!");

    // });

    const { url } = await startStandaloneServer(server, {
      context: async ({ req }) => ({ token: req.headers.token }),
      listen: { port: 4000 },
    });
    console.log(`🚀  Server ready at ${url}`);
  })
  .catch((error) => {
    console.log("DB 접속에 실패했습니다!!!");
    console.log("원인: ", error);
  });

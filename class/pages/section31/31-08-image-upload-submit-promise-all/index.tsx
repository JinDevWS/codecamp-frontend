import { gql, useMutation } from "@apollo/client";
import { ChangeEvent, useState } from "react";
import { wrapAsync } from "../../../src/commons/libraries/asyncFunc";
import { IMutation } from "../../../src/commons/types/generated/types.js";

const 나의그래프큐엘셋팅 = gql`
  mutation createBoard($createBoardInput: CreateBoardInput!) {
    createBoard(createBoardInput: $createBoardInput) {
      _id
    }
  }
`;

const UPLOAD_FILE = gql`
  mutation uploadFile($file: Upload!) {
    uploadFile(file: $file) {
      url
    }
  }
`;

export default function ImageUploadPage(): JSX.Element {
  const [imageUrls, setImageUrls] = useState(["", "", ""]);
  const [files, setFiles] = useState<File[]>([]);

  const [나의함수] = useMutation(나의그래프큐엘셋팅);
  const [uploadFile] = useMutation<Pick<IMutation, "uploadFile">>(UPLOAD_FILE);

  const onClickSubmit = async () => {
    // 1. uploadFile
    // 1-1. 안 좋은 예제 - await를 매번 기다림 => for 문을 사용해도 마찬가지(이유: i 값에 의존하기 때문에...)
    // const resultFile0 = await uploadFile({ variables: { files: files[0] } });
    // const resultFile1 = await uploadFile({ variables: { files: files[1] } });
    // const resultFile2 = await uploadFile({ variables: { files: files[2] } });
    // const url0 = resultFile0.data?.uploadFile.url;
    // const url1 = resultFile1.data?.uploadFile.url;
    // const url2 = resultFile2.data?.uploadFile.url;
    // const results = [url0, url1, url2];
    //
    // 1-2. 좋은 예제 - Promise.all 사용
    // const results = await Promise.all([
    //   uploadFile({ variables: { files: files[0] } }),
    //   uploadFile({ variables: { files: files[1] } }),
    //   uploadFile({ variables: { files: files[2] } }),
    // ]);
    // console.log(results); // [resultFile0, resultFile1, resultFile2]
    // const resultUrls = results.map((el) => el.data?.uploadFile.url);
    //
    // 1-3. 좋은 예제 - Promise.all 사용 => map을 사용해 리팩토링
    // 어? for 문이랑 map 이랑 똑같은 거 아닌가요? for문 안에서 await 쓰지 말라면서요?
    // for 문 안에서의 await -> i는 0부터 3까지 올라가야 하는데, 0이 끝나야지만 1이 시작될 수 있는 구조
    // map 안의 await -> 1,2,3번째가 서로가 서로를 기다리지 않고 동시 실행 가능
    const results = await Promise.all(
      files.map(async (el) => await uploadFile({ variables: { file: el } })),
    );
    console.log(results);
    const resultUrls = results.map((el) => el.data?.uploadFile.url);

    // 2. createBoard
    const result = await 나의함수({
      variables: {
        createBoardInput: {
          writer: "철수",
          password: "1234",
          title: "제목입니다~~~",
          contents: "내용입니다~~~",
          images: resultUrls,
        },
      },
    });
    console.log(result);
  };

  const onChangeFile =
    (index: number) =>
    async (event: ChangeEvent<HTMLInputElement>): Promise<void> => {
      // 배열로 들어오는 이유: multiple 일 때, 여러개 드래그 가능
      // 옵셔녈 체이닝 활용
      const file = event.target.files?.[0];
      if (file === undefined) return;
      console.log(file);
      console.log("파일까지 나옴");

      // 1. 임시 URL 생성 - 가짜: 내 브라우저에서만 접근 가능
      const result = URL.createObjectURL(file);
      console.log(result);

      // 2. 임시 URL 생성 - 진짜: 다른 브라우저에서도 접근 가능
      // 브라우저 호환성을 위해, 이 진짜 URL 을 사용하기로 함.
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);
      fileReader.onload = (event) => {
        if (typeof event.target?.result === "string") {
          console.log("사진이 문자열(string)로 변환됨");

          const tempUrls = [...imageUrls];
          tempUrls[index] = event.target?.result;
          setImageUrls(tempUrls);

          const tempFiles = [...files];
          tempFiles[index] = file;
          setFiles(tempFiles);
        }
      };
    };

  return (
    <>
      <input type="file" onChange={wrapAsync(onChangeFile(0))} />
      <input type="file" onChange={wrapAsync(onChangeFile(1))} />
      <input type="file" onChange={wrapAsync(onChangeFile(2))} />
      {/* <img src={`http://storage.googleapis.com/${imageUrl}`} /> */}
      <img src={imageUrls[0]} />
      <img src={imageUrls[1]} />
      <img src={imageUrls[2]} />
      <button onClick={wrapAsync(onClickSubmit)}>게시글 등록하기</button>
    </>
  );
}

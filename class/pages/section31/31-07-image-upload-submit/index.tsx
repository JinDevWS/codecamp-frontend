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
  const [imageUrl, setImageUrl] = useState("");
  const [file, setFile] = useState<File>();
  const [나의함수] = useMutation(나의그래프큐엘셋팅);
  const [uploadFile] = useMutation<Pick<IMutation, "uploadFile">>(UPLOAD_FILE);

  const onClickSubmit = async () => {
    // 1. uploadFile
    const resultFile = await uploadFile({ variables: { file } });
    const url = resultFile.data?.uploadFile.url;

    // 2. createBoard
    const result = await 나의함수({
      variables: {
        createBoardInput: {
          writer: "철수",
          password: "1234",
          title: "제목입니다~~~",
          contents: "내용입니다~~~",
          images: [url],
        },
      },
    });
    console.log(result);
  };

  const onChangeFile = async (
    event: ChangeEvent<HTMLInputElement>,
  ): Promise<void> => {
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
        setImageUrl(event.target?.result);
        setFile(file);
      }
    };
  };

  return (
    <>
      <input type="file" onChange={wrapAsync(onChangeFile)} />
      {/* <img src={`http://storage.googleapis.com/${imageUrl}`} /> */}
      <img src={imageUrl} />
      <button onClick={wrapAsync(onClickSubmit)}>게시글 등록하기</button>
    </>
  );
}

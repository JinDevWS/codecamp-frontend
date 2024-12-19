// import { gql, useMutation } from "@apollo/client";
import { ChangeEvent, useState } from "react";
import { wrapAsync } from "../../../src/commons/libraries/asyncFunc";
// import { IMutation } from "../../../src/commons/types/generated/types.js";

// const UPLOAD_FILE = gql`
//   mutation uploadFile($file: Upload!) {
//     uploadFile(file: $file) {
//       url
//     }
//   }
// `;

export default function ImageUploadPage(): JSX.Element {
  const [imageUrl, setImageUrl] = useState("");

  // const [uploadFile] = useMutation<Pick<IMutation, "uploadFile">>(UPLOAD_FILE);

  const onChangeFile = async (
    event: ChangeEvent<HTMLInputElement>,
  ): Promise<void> => {
    // 배열로 들어오는 이유: multiple 일 때, 여러개 드래그 가능
    // 옵셔녈 체이닝 활용
    const file = event.target.files?.[0];
    if (file === undefined) return;
    console.log(file);
    console.log("파일까지 나옴");

    // const result = await uploadFile({
    //   variables: { file },
    // });
    // console.log(result.data?.uploadFile.url);
    // setImageUrl(result.data?.uploadFile.url ?? "");

    //
    // 1. 임시 URL 생성 - 가짜: 내 브라우저에서만 접근 가능
    // db에는 저장하지 않고, 브라우저에서 바로 사용함!
    // 최근에 나온 기능이라서 적용 안 되는 브라우저들이 좀 있다.
    // 브라우저 호환성을 위해, 밑의 진짜 URL 을 사용하기로 함.
    const result = URL.createObjectURL(file);
    console.log(result);

    // 2. 임시 URL 생성 - 진짜: 다른 브라우저에서도 접근 가능
    // [참고]
    // 사진은 다 픽셀 단위로 이루어져 있고 0과 1로 다 바꿀 수 있다.
    // 다시 말하면 그걸 문자로 다시 변환할 수가 있다.
    // 사진이 하나하나 다 문자열로 변환 완료된 URL 이므로,
    // db에 이걸 직접 저장하면 사진 용량 통쨰로 저장하는 것과 똑같다. db 저장 하지 말기!
    //
    // 브라우저 호환성을 위해, 이 진짜 URL 을 사용하기로 함.
    const fileReader = new FileReader();
    fileReader.readAsDataURL(file);
    fileReader.onload = (event) => {
      // 게시판에서 event.target.id를 쓰면 eslint가 잡았던 이유: event.target은 태그만을 가리키지 않음.
      console.log(event.target?.result);
      if (typeof event.target?.result === "string") {
        console.log("사진이 문자열(string)로 변환됨");
        setImageUrl(event.target?.result);
      }
    };
  };

  return (
    <>
      <input type="file" onChange={wrapAsync(onChangeFile)} />
      {/* <img src={`http://storage.googleapis.com/${imageUrl}`} /> */}
      <img src={imageUrl} />
    </>
  );
}

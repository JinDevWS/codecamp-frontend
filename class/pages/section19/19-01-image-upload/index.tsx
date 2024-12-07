import { gql, useMutation } from "@apollo/client";
import { ChangeEvent, useState } from "react";
import { IMutation } from "../../../src/commons/types/generated/types.js";

const UPLOAD_FILE = gql`
  mutation uploadFile($file: Upload!) {
    uploadFile(file: $file) {
      url
    }
  }
`;

export default function ImageUploadPage(): JSX.Element {
  const [imageUrl, setImageUrl] = useState("");

  const [uploadFile] = useMutation<Pick<IMutation, "uploadFile">>(UPLOAD_FILE);

  const onChangeFile = async (
    event: ChangeEvent<HTMLInputElement>,
  ): Promise<void> => {
    // 배열로 들어오는 이유: multiple 일 때, 여러개 드래그 가능
    // 옵셔녈 체이닝 활용
    const file = event.target.files?.[0];
    console.log(file);

    const result = await uploadFile({
      variables: { file },
    });
    console.log(result.data?.uploadFile.url);
    setImageUrl(result.data?.uploadFile.url ?? "");
  };

  return (
    <>
      <input type="file" onChange={onChangeFile} />
      <img src={`http://storage.googleapis.com/${imageUrl}`} />
    </>
  );
}

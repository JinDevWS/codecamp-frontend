// state 드릴링 없이 한방에 접근하기!!!

import { atom, selector } from "recoil";
import { getAccessToken } from "../libraries/getAccessToken";

// 아톰이 뭐지?
// 변수 뭐 만들래? 하는 게 아톰이라고 보면 됨
export const isEditState = atom({
  key: "isEditState", // 변수명
  default: true,
});

export const accessTokenState = atom({
  key: "accessTokenState",
  default: "",
});

export const visitedPageState = atom({
  key: "visitedPageState",
  default: "",
});

// 글로벌 함수
export const restoreAccessTokenLoadable = selector({
  key: "restoreAccessTokenLoadable",
  get: async () => {
    const newAccessToken = await getAccessToken();
    return newAccessToken;
  },
});

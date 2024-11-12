export interface IProfile {
  name: string;
  age: number;
  school: string;
  hobby?: string;
}

// 1. Partial 타입
// aaa 에 마우스를 가져다 대면 속성에 전부 ? 가 붙은 걸 알수있다.
// 전부 선택요건으로 바뀜.
type aaa = Partial<IProfile>;

// 2. Required 타입
// bbb 에 마우스를 가져다 대면 속성에 전부 ? 가 빠진 걸 알수있다.
// 전부 필수요건으로 바뀜.
type bbb = Required<IProfile>;

// 3. Pick 타입
// 원하는것만 골라담기.
type ccc = Pick<IProfile, "name" | "age">;

// 4. Omit 타입
// 원하는것만 제외하고 담기.
type ddd = Omit<IProfile, "school">;

// 5. Record 타입
type eee = "철수" | "영희" | "훈이"; // Union(합집합) 타입
let child: eee = "바나나"; // 철수, 영희, 훈이 만 됨.
let child1: string = "바나나"; // 얘는 다 됨.
let child2: eee = "훈이"; // 철수, 영희, 훈이 만 됨.

type fff = Record<eee, IProfile>; // 레코드 타입.
/* 
type fff = {
    철수: IProfile;
    영희: IProfile;
    훈이: IProfile;
}
*/

// 6. 객체의 key 들로 Union 타입 만들기
type ggg = keyof IProfile; // "name" | "age" | "school" | "hobby"
let myprofile: ggg = "hobby";
let myprofile2: ggg = "gender"; // IProfile 의 키 중에는 gender가 없어 에러.

// 7. 타입 vs interface 차이점
// ==> 선언병합! 인터페이스는 선언병합 가능.
export interface IProfile {
  candy: number; // 선언병합으로 추가됨. 근데 타입 은 그게 안되고 인터페이스만 가능한 것임.
}

// 8. 배운것 응용
let profile: Partial<IProfile> = {
  candy: 10,
};

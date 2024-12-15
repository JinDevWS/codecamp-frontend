import Link from "next/link";
import { useRouter } from "next/router";

export default function KakaoMapPage(): JSX.Element {
  const router = useRouter();

  const onClickMove = (): void => {
    void router.push("/section25/25-02-kakao-map-routing-moved");
  };

  return (
    <>
      <button onClick={onClickMove}>페이지 이동하기</button>

      {/* 매번 페이지를 새로 다운받으므로 spa 활용 못함 */}
      <a href="/section25/25-02-kakao-map-routing-moved">페이지 이동하기!!</a>

      {/* next 에서 제공하는 앵커(a) 태그이므로, sap 활용 가능 */}
      <Link href="/section25/25-02-kakao-map-routing-moved">
        {/* a 태그로 감싸주는 것의 장점: 검색엔진 점수 좋아짐 */}
        <a>페이지 이동하기~~</a>
      </Link>

      {/* 의미가 있는 시멘틱 태그의 장점 */}
      <h1>요리</h1>
      <div>요리</div>
      <section>요리</section>
      {/* 딱 봐도 제목 요리, 아무의미 없는 요리, 섹션 요리 라는 걸 구분할 수 있다, 검색 엔진 점수도 달라진다. */}
    </>
  );
}

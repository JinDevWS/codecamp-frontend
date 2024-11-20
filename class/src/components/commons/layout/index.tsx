import LayoutHeader from "../layout/header";
import LayoutBanner from "../layout/banner";
import LayoutFooter from "../layout/footer";
import LayoutNavigation from "../layout/navigation";
import { useRouter } from "next/router";

const HIDDEN_HEADERS = [
  "/section13/13-01-library-icon",
  "/section13/13-02-library-star",
];

interface ILayoutProps {
  children: JSX.Element;
}

export default function Layout(props: ILayoutProps): JSX.Element {
  const router = useRouter();
  console.log("================================");
  console.log(router.asPath);
  console.log("================================");

  const isHiddenHeader = HIDDEN_HEADERS.includes(router.asPath);
  console.log(isHiddenHeader);

  return (
    <>
      {/* <div>여기는 헤더입니다.</div>
      <div>여기는 배너입니다.</div>
      <div>여기는 내비게이션입니다.</div> */}
      {!isHiddenHeader && <LayoutHeader />}
      <LayoutBanner />
      <LayoutNavigation />
      <div style={{ height: "500px", display: "flex" }}>
        <div style={{ width: "30%", backgroundColor: "orange" }}>사이드바</div>
        <div style={{ width: "70%" }}>{props.children}</div>
      </div>
      {/* <div>여기는 푸터입니다.</div> */}
      <LayoutFooter />
    </>
  );
}

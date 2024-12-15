declare const window: typeof globalThis & {
  IMP: any;
};

export default function PaymentPage(): JSX.Element {
  const onClickPayment = (): void => {
    const IMP = window.IMP;
    IMP.init("imp14352633"); // 예: 'imp00000000'

    IMP.request_pay(
      {
        channelKey: "channel-key-963c168e-26a3-41cb-813f-c37a53508eb0",
        pay_method: "card",
        // merchant_uid: `payment-${crypto.randomUUID()}`, // 주문 고유 번호
        name: "노르웨이 회전 의자",
        amount: 64900,
        buyer_email: "gildong@gmail.com",
        buyer_name: "홍길동",
        buyer_tel: "010-4242-4242",
        buyer_addr: "서울특별시 강남구 신사동",
        buyer_postcode: "01181",
        // 모바일에서는 결제 시 주소가 바뀜, 따라서 결제 끝나고 돌아갈 주소 입력해야 함.
        m_redirect_url: `http://localhost:3000/section28/28-01-payment`,
      },
      async (response: any) => {
        if (response.error_code != null) {
          return alert(
            `결제에 실패하였습니다. 에러 내용: ${response.error_msg}`,
          );
        } else {
          // 결제 성공
          console.log(response);

          // 백엔드에 결제 관련 데이터 넘겨주게 뮤테이션 실행하기
        }
      },
    );
  };

  return (
    <>
      <script src="https://cdn.iamport.kr/v1/iamport.js"></script>
      <button onClick={onClickPayment}>결제하기</button>
    </>
  );
}

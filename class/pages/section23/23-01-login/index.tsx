export default function LoginPage(): JSX.Element {
  const onChangeEmail = (): void => {};

  const onChangePassword = (): void => {};

  const onClickLogin = (): void => {};

  return (
    <>
      이메일: <input type="text" onChange={onChangeEmail} />
      비밀번호: <input type="password" onChange={onChangePassword} />
      <button onClick={onClickLogin}>로그인</button>
    </>
  );
}

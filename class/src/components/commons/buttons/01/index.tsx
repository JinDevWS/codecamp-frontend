interface IButtonProps {
  isActive: boolean;
  title: string;
}

export default function Button01(props: IButtonProps): JSX.Element {
  return (
    <button style={{ backgroundColor: props.isActive ? "yellow" : "" }}>
      {props.title}
    </button>
  );
}

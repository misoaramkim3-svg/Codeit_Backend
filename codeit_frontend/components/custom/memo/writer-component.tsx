import { penOf } from "@/lib/pen";

const WriterComponent = (props: {
  userId: number;
  username: string;
  onDark?: boolean;
}) => {
  const pen = penOf(props.userId);

  return (
    <span className="writer">
      <span className={`writer-avatar ${pen.bg}`} aria-hidden>
        {props.username.slice(0, 1).toUpperCase()}
      </span>
      <span className={props.onDark ? undefined : pen.text}>
        {props.username}
      </span>
    </span>
  );
};

export default WriterComponent;

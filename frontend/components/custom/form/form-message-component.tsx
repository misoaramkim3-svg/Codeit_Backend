import { CircleAlert } from "lucide-react";
import { ReactNode } from "react";

const FormMessageComponent = (props: {
  message: string;
  id?: string;
  action?: ReactNode;
  urgent?: boolean;
  className?: string;
}) => {
  return (
    <div
      id={props.id}
      role={props.urgent ? "alert" : undefined}
      aria-live={props.urgent ? undefined : "polite"}
      className={props.className}
    >
      {props.message && (
        <p className="form-message">
          <CircleAlert className="mt-0.5 size-4 shrink-0" aria-hidden />
          <span>
            {props.message}
            {props.action && <> {props.action}</>}
          </span>
        </p>
      )}
    </div>
  );
};

export default FormMessageComponent;

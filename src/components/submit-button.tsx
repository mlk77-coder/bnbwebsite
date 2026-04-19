import { FC, Fragment, ReactNode } from "react";
import Loader from "./ui/loader";

type PropsType = {
  isPending: boolean;
  text: ReactNode;
};

const SubmitButton: FC<PropsType> = ({ isPending, text }) => {
  return (
    <Fragment>
      {isPending ? <Loader size="sm" className="me-2" /> : null} {text}
    </Fragment>
  );
};

export default SubmitButton;

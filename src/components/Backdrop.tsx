import { forwardRef, ReactNode, Ref } from "react";
import styled from "@emotion/styled";

type Props = {
  className?: string;
  children: ReactNode;
};

const BaseBackdrop = (
  { className, children }: Props,
  ref: Ref<HTMLDivElement>
) => (
  <div className={className} ref={ref}>
    {/* {console.log("[Backdrop] render")} */}
    {children}
  </div>
);

const Backdrop = styled(forwardRef(BaseBackdrop))`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;

  width: 100vw;
  height: 100vh;

  background-color: rgba(0, 0, 0, 0.3);
`;

export default Backdrop;

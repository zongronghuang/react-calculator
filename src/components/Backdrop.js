import { forwardRef } from "react";
import styled from "@emotion/styled";

const BackdropJSX = ({ className, children }, ref) => (
  <div className={className} ref={ref}>
    {console.log("[Backdrop] render")}
    {children}
  </div>
);

const Backdrop = styled(forwardRef(BackdropJSX))`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;

  width: 100vw;
  height: 100vh;

  background-color: rgba(0, 0, 0, 0.3);
`;

export default Backdrop;

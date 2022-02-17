import styled from "@emotion/styled";

const BackdropJSX = ({ className, children }) => (
  <div className={className}>
    {console.log("[Backdrop] render")}
    {children}
  </div>
);

const Backdrop = styled(BackdropJSX)`
  display: flex;
  justify-content: center;
  align-items: center;

  width: 100vw;
  height: 100vh;

  background-color: rgba(0, 0, 0, 0.3);
`;

export default Backdrop;

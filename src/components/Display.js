import styled from "@emotion/styled";

const DisplayJSX = ({ className }) => {
  return <input className={className} type="text" readonly="readonly"></input>;
};

const Display = styled(DisplayJSX)`
  width: 100%;
  height: 6.4rem;
  border: none;
  background-color: aquamarine;
`;

export default Display;

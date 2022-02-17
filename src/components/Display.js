import styled from "@emotion/styled";

const DisplayJSX = ({ className, content, type }) => {
  return (
    <input
      className={`${className} ${type}`}
      type="text"
      value={content}
      readOnly={true}
    ></input>
  );
};

const Display = styled(DisplayJSX)`
  width: 100%;
  height: 6.4rem;
  border: none;

  padding: 0 1.2rem;

  font-size: 4.4rem;
  text-align: right;
  /* direction: rtl; */
  background-color: aquamarine;

  &.formula {
    font-weight: 200;
  }
`;

export default Display;

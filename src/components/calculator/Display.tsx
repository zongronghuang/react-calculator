import styled from "@emotion/styled";

type Props = {
  className?: string;
  content: string;
  type: string;
};

const DisplayJSX = ({ className, content, type }: Props) => {
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
  background-color: aquamarine;

  &.formula {
    height: 4.8rem;
    font-size: 3.6rem;
    font-weight: 100;
  }
`;

export default Display;

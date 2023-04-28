import styled from "@emotion/styled";

type Props = {
  className?: string;
  content: string | number;
  type: string;
};

const DisplayJSX = ({ className, content, type }: Props) => {
  return <output className={`${className} ${type}`}>{content}</output>;
};

const Display = styled(DisplayJSX)`
  width: 100%;
  height: 6.4rem;
  border: none;
  padding: 0 1.2rem;
  font-family: "Space Grotesk", sans-serif;
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

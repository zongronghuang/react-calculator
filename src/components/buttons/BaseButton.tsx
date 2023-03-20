import styled from "@emotion/styled";

type Props = {
  className?: string;
  value: string | number;
};

const BaseButtonJSX = ({ className, value }: Props) => {
  return (
    <button className={className} value={value}>
      {value}
    </button>
  );
};

const BaseButton = styled(BaseButtonJSX)`
  width: 25%;
  height: 25%;
  border: none;

  color: #f4f6f7;
  font-size: 3.6rem;

  outline: 1px solid black;
`;

export default BaseButton;

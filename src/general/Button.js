import styled from "@emotion/styled";

const ButtonJSX = ({ className, value }) => {
  return (
    <button className={className} value={value}>
      {value}
    </button>
  );
};

const Button = styled(ButtonJSX)`
  width: 25%;
  height: 25%;
  border: none;

  font-size: 3.6rem;

  outline: 1px solid black;
`;

export default Button;

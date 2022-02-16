import styled from "@emotion/styled";

const ButtonJSX = ({ className, btnName }) => {
  return <button className={className}>{btnName}</button>;
};

const Button = styled(ButtonJSX)`
  background-color: red;
`;

export default Button;

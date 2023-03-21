import styled from "@emotion/styled";
import NumberButton from "../buttons/NumberButton";

const digits = [7, 8, 9, 4, 5, 6, 1, 2, 3, 0, "."];

type Props = {
  className?: string;
  keyinHandler: (btnText: string) => void;
};

const NumberKeysJSX = ({ className, keyinHandler }: Props) => {
  return (
    <div
      className={className}
      onClick={(e) => {
        const button = e.target as HTMLButtonElement;
        keyinHandler(button.value);
      }}
    >
      {digits.map((digit, id) => (
        <NumberButton key={`digit-${id}`} value={digit} />
      ))}
      {/* {console.log("[Keypad Numbers] render")} */}
    </div>
  );
};

const NumberKeys = styled(NumberKeysJSX)`
  grid-column: 1 / 4;
  grid-row: 2 / 6;

  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: repeat(4, 1fr);
  justify-items: stretch;
  align-items: stretch;
`;

export default NumberKeys;

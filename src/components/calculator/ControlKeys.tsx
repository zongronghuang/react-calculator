import styled from "@emotion/styled";
import ControlButton from "../buttons/ControlButton";

const controls = ["C", "AC", "+/-"];

type Props = {
  className?: string;
  clearAll: () => void;
  clearCurrentInput: () => void;
  negateLastNumber: () => void;
};

const ControlKeysJSX = ({
  className,
  clearAll,
  clearCurrentInput,
  negateLastNumber,
}: Props) => {
  return (
    <div
      className={className}
      onClick={(e) => {
        const button = e.target as HTMLButtonElement;
        if (button.value === "AC") clearAll();
        if (button.value === "C") clearCurrentInput();
        if (button.value === "+/-") negateLastNumber();
      }}
    >
      {controls.map((control, id) => (
        <ControlButton key={`control-${id}`} value={`${control}`} />
      ))}
      {/* {console.log("[Keypad Controls] render")} */}
    </div>
  );
};

const ControlKeys = styled(ControlKeysJSX)`
  grid-column: 1 / 4;
`;

export default ControlKeys;

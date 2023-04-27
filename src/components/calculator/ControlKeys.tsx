import styled from "@emotion/styled";
import ControlButton from "../buttons/ControlButton";

const controls = ["C", "AC", "+/-"];

type Props = {
  className?: string;
  // clearAll: () => void;
  // clearCurrentInput: () => void;
};

const ControlKeysJSX = ({
  className,
}: // clearAll,
// clearCurrentInput,
// negateLastNumber,
Props) => {
  return (
    <div className={className}>
      {controls.map((control, id) => (
        <ControlButton key={id} value={control} />
      ))}
      {/* {console.log("[Keypad Controls] render")} */}
    </div>
  );
};

const ControlKeys = styled(ControlKeysJSX)`
  grid-column: 1 / 4;
`;

export default ControlKeys;

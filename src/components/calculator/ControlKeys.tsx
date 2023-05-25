import styled from "@emotion/styled";
import ControlButton from "../buttons/ControlButton";

const controls = ["C", "AC", "+/-"];

type Props = {
  className?: string;
};

const BaseControlKeys = ({ className }: Props) => {
  return (
    <div className={className}>
      {controls.map((control, id) => (
        <ControlButton key={id} value={control} />
      ))}
      {/* {console.log("[Keypad Controls] render")} */}
    </div>
  );
};

const ControlKeys = styled(BaseControlKeys)`
  grid-column: 1 / 4;
`;

export default ControlKeys;

import { useRef, useState, useEffect, RefObject } from "react";
import styled from "@emotion/styled";

type Props = {
  className?: string;
  content: string | number;
  type: string;
};

const BaseDisplay = ({ className, content, type }: Props) => {
  const outputRef = useRef(null) as RefObject<HTMLOutputElement>;
  const [isTextCopied, setIsTextCopied] = useState(false);

  useEffect(() => {
    async function copyText() {
      try {
        await navigator.clipboard?.writeText(
          outputRef.current!.value.replace("Copied", "")
        );

        setTimeout(() => setIsTextCopied(false), 2000);
      } catch (error) {
        console.error("[Copy text] ", error);
      }
    }

    copyText();
  }, [isTextCopied]);

  return (
    <output
      ref={outputRef}
      className={`${className} ${type}`}
      onDoubleClick={() => setIsTextCopied(true)}
    >
      {isTextCopied && <span className="copy-alert">Copied</span>}
      {content}
    </output>
  );
};

const Display = styled(BaseDisplay)`
  position: relative;
  width: 100%;
  height: 6.4rem;
  border: none;
  margin-top: -0.1rem;
  padding: 0 1.2rem;
  font-family: "Space Grotesk", sans-serif;
  font-size: 4.4rem;
  text-align: right;
  background-color: aquamarine;

  &.mathExp {
    height: 6.8rem;
    font-size: 2.4rem;
    font-weight: 100;
  }

  & .copy-alert {
    position: absolute;
    left: 0;
    top: 0;
    padding: 0.5rem;
    color: white;
    font-size: 2rem;
    background-color: rgba(0, 0, 0, 0.7);

    animation-name: alert-fade-out;
    animation-duration: 2s;
  }

  @keyframes alert-fade-out {
    from {
      opacity: 1;
    }

    to {
      opacity: 0;
    }
  }
`;

export default Display;

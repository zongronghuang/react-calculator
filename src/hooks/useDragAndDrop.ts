import { useEffect, useRef, RefObject, DragEvent } from "react";

type Params = {
  dragItemRef: RefObject<HTMLDivElement>;
  dropZoneRef: RefObject<HTMLDivElement>;
};

type DragEventObj = {
  type: "dragstart" | "drag" | "dragover" | "drop";
  listener: (e: DragEvent | any) => void;
};

// useDragAndDrop 可以在同一個 drop zone 上面，設定一個以上的 drag item
// drop zone 和 drag item 都要以 ref 的形態傳入
const useDragAndDrop = ({ dragItemRef, dropZoneRef }: Params) => {
  // 紀錄滑鼠游標和 drag item 原點之間的距離
  // 不用 useState，因為 event listener 只會取得 initial state (closure)，不會更新 => 改用 useRef
  // useState 要和 React 提供的 onClick, onDoubleClick... 併用，才會取得更新的 state
  const dragDistanceRef = useRef({
    left: 0,
    top: 0,
  });
  const isDraggedRef = useRef(false);
  const dragItemEvents: DragEventObj[] = [
    {
      type: "dragstart",
      listener(e: DragEvent) {
        const target = e.target as HTMLDivElement;
        // 取得游標和 drag item 原點的距離
        dragDistanceRef.current = {
          left: e.clientX - target.offsetLeft,
          top: e.clientY - target.offsetTop,
        };
        isDraggedRef.current = true;
      },
    },
    {
      type: "drag",
      listener(e: DragEvent) {
        e.preventDefault();
      },
    },
  ];

  const dropZoneEvents: DragEventObj[] = [
    {
      type: "dragover",
      listener(e: DragEvent) {
        e.preventDefault();
      },
    },
    {
      type: "drop",
      listener(e: DragEvent) {
        // 計算 drag item 原點降落位置 (新的 left 和 top)
        // 用 isDraggedRef 判斷元件是否被拖曳，被拖曳的元件才會重新計算位置
        e.preventDefault();
        const { left, top } = dragDistanceRef.current;
        if (!isDraggedRef.current) {
          return;
        }
        const dragItemLeft = e.clientX - left;
        const dragItemTop = e.clientY - top;
        dragItemRef.current!.style.left = `${dragItemLeft}px`;
        dragItemRef.current!.style.top = `${dragItemTop}px`;
        isDraggedRef.current = false;
      },
    },
  ];

  useEffect(() => {
    // 讓 drag item 能夠被拖曳
    dragItemRef.current!.setAttribute("draggable", "true");
    const originalPosition = getComputedStyle(
      dragItemRef.current!
    ).getPropertyValue("position");
    dragItemRef.current!.style.position = "absolute";

    dragItemEvents.forEach((obj) => {
      dragItemRef.current!.addEventListener(obj.type, obj.listener, false);
    });

    dropZoneEvents.forEach((obj) =>
      dropZoneRef.current!.addEventListener(obj.type, obj.listener, false)
    );

    return () => {
      if (!dragItemRef.current) {
        return;
      }
      // 回復 drag item 先前狀態
      dragItemRef.current.removeAttribute("draggable");
      dragItemRef.current.style.position = originalPosition;

      dragItemEvents.forEach((obj) =>
        dragItemRef.current!.removeEventListener(obj.type, obj.listener)
      );
      dropZoneEvents.forEach((obj) =>
        dropZoneRef.current!.removeEventListener(obj.type, obj.listener)
      );
    };
  }, []);
};

export default useDragAndDrop;

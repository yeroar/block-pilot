import { useRef } from "react";
import type { LayoutChangeEvent, NativeSyntheticEvent, NativeTouchEvent } from "react-native";

export function useDigitCell(value: string, cellCount: number = 6) {
  const cellParamsRef = useRef({
    value,
    setValue: (value: string) => {
      cellParamsRef.current.value = value;
    },
    cellCount,
  });
  const cellLayoutRef = useRef<
    Record<string, { x: number; xEnd: number; y: number; yEnd: number }>
  >({});
  const layoutCallbackRef = useRef<Record<string, (event: LayoutChangeEvent) => void>>({});

  const findCellIndex = ({ x, y }: { x: number; y: number }) => {
    for (const index in cellLayoutRef.current) {
      const layout = cellLayoutRef.current[index];
      if (!layout) continue;
      if (layout.x < x && x < layout.xEnd && layout.y < y && y < layout.yEnd) {
        return parseInt(index, 10);
      }
    }
    return -1;
  };

  const clearCodeByCoords = (event: NativeSyntheticEvent<NativeTouchEvent>) => {
    const { locationX, locationY } = event.nativeEvent;
    const index = findCellIndex({ x: locationX, y: locationY });
    if (index !== -1) {
      const { value, setValue } = cellParamsRef.current;
      const text = (value ?? "").slice(0, index);
      setValue(text);
    }
  };

  const onCellLayout = (index: number) => {
    if (!layoutCallbackRef.current?.[index]) {
      layoutCallbackRef.current[index] = (event: LayoutChangeEvent) => {
        const { width, height, x, y } = event.nativeEvent.layout;
        cellLayoutRef.current[`${index}`] = {
          x,
          xEnd: x + width,
          y,
          yEnd: y + height,
        };
      };
    }
    return layoutCallbackRef.current[index];
  };

  return {
    onCellLayout,
    clearCodeByCoords,
  };
}

import { Fragment, type ReactNode, useEffect, useState } from "react";

export function MaskSymbol({
  isLast,
  symbol = "•",
  delay = 500,
  children,
}: {
  isLast: boolean;
  symbol?: string;
  delay?: number;
  children: ReactNode;
}) {
  const [isVisible, setIsVisible] = useState<boolean>(false);

  const toggleVisibility = () => setIsVisible((prev) => !prev);

  useEffect(() => {
    const timeout = setTimeout(toggleVisibility, delay);
    return () => clearTimeout(timeout);
  }, []);

  useEffect(() => {
    if (isLast) {
      setIsVisible(false);
    }
  }, [isLast]);

  return <Fragment>{isVisible ? children : symbol}</Fragment>;
}

import React, {
  useRef,
  useCallback,
  forwardRef,
  useImperativeHandle,
  useMemo,
} from "react";

const DescramblerText = forwardRef(
  ({ className, textClassName, children }, ref) => {
    const textRef = useRef(null);

    const originalText = useMemo(
      () => React.Children.toArray(children).join(""),
      [children]
    );

    const scrambleText = useCallback(
      (text, index) => {
        return text
          .split("")
          .map((char, i) =>
            i < index
              ? char
              : originalText.charAt(
                  Math.floor(Math.random() * originalText.length)
                )
          )
          .join("");
      },
      [originalText]
    );

    const descrambleText = useCallback(() => {
      let i = 0;
      const interval = setInterval(() => {
        if (textRef.current) {
          textRef.current.innerText = scrambleText(originalText, i);
        }
        i++;
        if (i > originalText.length) {
          clearInterval(interval);
          if (textRef.current) {
            textRef.current.innerText = originalText;
          }
        }
      }, 40);
    }, [originalText, scrambleText]);

    useImperativeHandle(ref, () => ({
      triggerDescramble: descrambleText,
    }));

    return (
      <div
        className={`inline-block h-fit w-fit ${className}`}
        onMouseEnter={descrambleText}
      >
        <div
          ref={textRef}
          className={`descrambler-text font-['Primary'] uppercase text-center ${textClassName}`}
        >
          {children}
        </div>
      </div>
    );
  }
);

export default DescramblerText;

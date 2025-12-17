import * as React from "react";
import { cn } from "@/lib/utils";

interface TextInputProps
  extends Omit<React.ComponentProps<"input">, "placeholder"> {
  label?: string;
  helperText?: string;
  error?: string;
  placeholder?: string;
  showFloatingLabel: boolean;
}

const TextInput = React.forwardRef<HTMLInputElement, TextInputProps>(
  (
    {
      label,
      helperText,
      error,
      className,
      placeholder,
      showFloatingLabel = true,
      ...props
    },
    ref
  ) => {
    const [isFocused, setIsFocused] = React.useState(false);
    const [hasValue, setHasValue] = React.useState(false);

    // 플로팅 라벨 표시 조건: showFloatingLabel이 true이고 (포커스되었거나 값이 있을 때)
    const isFloating = showFloatingLabel && (isFocused || hasValue);

    const handleFocus = (e: React.FocusEvent<HTMLInputElement>) => {
      setIsFocused(true);
      props.onFocus?.(e);
    };

    const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
      setIsFocused(false);
      props.onBlur?.(e);
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setHasValue(e.target.value !== "");
      props.onChange?.(e);
    };

    // 초기값이나 value prop이 변경될 때 hasValue 상태 업데이트
    React.useEffect(() => {
      const currentValue = props.value || props.defaultValue || "";
      setHasValue(String(currentValue) !== "");
    }, [props.value, props.defaultValue]);

    return (
      <div className="flex flex-col gap-2 w-full">
        {/* 메인 입력 필드 */}
        <div className="relative">
          {/* Input */}
          <input
            ref={ref}
            type="text"
            placeholder={showFloatingLabel ? undefined : placeholder || label} // floatingLabel이 false일 때만 실제 placeholder 사용
            className={cn(
              // 기본 스타일
              "w-full h-14 px-0 py-4 bg-transparent",
              "text-lg font-medium text-gray-900 dark:text-gray-100",
              "border-0 border-b-2 border-gray-200 dark:border-gray-700",
              "transition-all duration-200 ease-out",
              "outline-none focus:ring-0",

              // placeholder 스타일
              "placeholder:text-gray-400 dark:placeholder:text-gray-500",

              // 포커스 상태
              "focus:border-[#3182F6]",

              // 에러 상태
              error && "border-red-500 focus:border-red-500",

              // 플로팅 라벨이 활성화되고 라벨이 있을 때만 상단 패딩 조정
              showFloatingLabel && (label || placeholder) && "pt-6 pb-2",

              className
            )}
            aria-invalid={!!error}
            onFocus={handleFocus}
            onBlur={handleBlur}
            onChange={handleChange}
            {...props}
          />

          {/* 플로팅 라벨 (floatingLabel이 true일 때만 표시) */}
          {showFloatingLabel && (label || placeholder) && (
            <label
              className={cn(
                "absolute left-0 pointer-events-none transition-all duration-200 ease-out",
                "text-gray-500 dark:text-gray-400",

                // 플로팅 상태
                isFloating
                  ? "top-1 text-xs font-medium transform scale-95"
                  : "top-4 text-lg",

                // 포커스시 토스 블루
                isFocused && !error && "text-[#3182F6]",

                // 에러시 빨간색
                error && "text-red-500"
              )}
            >
              {label || placeholder}
            </label>
          )}

          {/* 포커스 하이라이트 언더라인 */}
          <div
            className={cn(
              "absolute bottom-0 left-0 h-0.5 bg-[#3182F6] transition-all duration-200 ease-out",
              isFocused && !error ? "w-full" : "w-0",
              error && "bg-red-500"
            )}
          />
        </div>

        {/* Helper/Error Text */}
        {(helperText || error) && (
          <p
            className={cn(
              "text-sm transition-colors duration-200",
              error ? "text-red-500" : "text-gray-500 dark:text-gray-400"
            )}
          >
            {error || helperText}
          </p>
        )}
      </div>
    );
  }
);

TextInput.displayName = "TextInput";

export default TextInput;

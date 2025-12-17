import * as React from "react";
import { cn } from "@/lib/utils";
import { Input } from "./input"; // 기존 Input 컴포넌트

interface NumberInputProps
  extends Omit<React.ComponentProps<typeof Input>, "value" | "onChange"> {
  value: number | undefined;
  onChange: (value: number | undefined) => void;
  onKeyDown?: (event: React.KeyboardEvent<HTMLInputElement>) => void; // onKeyDown 추가
  rightAdornment?: React.ReactNode;
  error?: boolean;
}

const NumberInput = React.forwardRef<HTMLInputElement, NumberInputProps>(
  (
    { value, onChange, onKeyDown, className, rightAdornment, error, ...props },
    ref
  ) => {
    // 숫자 값을 콤마가 포함된 문자열로 포맷팅
    const formattedValue = React.useMemo(() => {
      if (value === undefined || isNaN(value)) return "";
      return new Intl.NumberFormat("ko-KR").format(value);
    }, [value]);

    // 사용자 입력을 순수한 숫자로 변환
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const sanitizedValue = e.target.value.replace(/[^0-9]/g, "");
      onChange(
        sanitizedValue === "" ? undefined : parseInt(sanitizedValue, 10)
      );
    };

    return (
      <div className={cn("relative w-full", className)}>
        <Input
          ref={ref}
          value={formattedValue}
          onChange={handleChange}
          onFocus={(e) => e.target.select()}
          onKeyDown={onKeyDown}
          type="text"
          inputMode="numeric" // 모바일에서 숫자 키패드 표시
          aria-invalid={!!error}
          className={cn(
            // 토스 스타일처럼 큰 폰트와 밑줄만 강조하는 스타일 추가
            "h-auto border-0 border-b-2 rounded-none px-1 py-2 text-xl font-bold shadow-none focus-visible:ring-0",
            // 오른쪽 장식이 있으면 패딩 추가
            rightAdornment ? "pr-12" : "",
            "text-right",
            className
          )}
          {...props}
        />
        {rightAdornment && (
          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
            <span className="text-gray-500">{rightAdornment}</span>
          </div>
        )}
      </div>
    );
  }
);

NumberInput.displayName = "NumberInput";

export default NumberInput;

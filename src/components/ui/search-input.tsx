// src/components/ui/search-input.tsx
import * as React from "react";
import { cn } from "@/lib/utils";
import { Search, XCircle } from "lucide-react"; // 아이콘 라이브러리 (lucide-react 가정)

interface SearchInputProps extends React.ComponentProps<"input"> {
  placeholder?: string;
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  icon?: React.ReactNode;
  showClearButton?: boolean;
}

const SearchInput = React.forwardRef<HTMLInputElement, SearchInputProps>(
  (
    {
      className,
      placeholder = "검색어를 입력해주세요",
      value,
      onChange,
      icon,
      showClearButton = true,
      type = "text",
      // 고민지점
      // type=search로 주고 디폴트 clearbutton css로 없애는것 vs 그냥 text로 주기
      ...props
    },
    ref
  ) => {
    const internalRef = React.useRef<HTMLInputElement>(null);
    React.useImperativeHandle(ref, () => internalRef.current!);

    const [isFocused, setIsFocused] = React.useState(false);

    const handleFocus = (e: React.FocusEvent<HTMLInputElement>) => {
      setIsFocused(true);
      props.onFocus?.(e);
    };

    const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
      setIsFocused(false);
      props.onBlur?.(e);
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      onChange?.(e);
    };

    const handleClear = () => {
      if (internalRef.current) {
        // 입력 필드의 값을 강제로 비우고, change 이벤트를 발생시켜 부모 컴포넌트에 알림
        const nativeInputValueSetter = Object.getOwnPropertyDescriptor(
          window.HTMLInputElement.prototype,
          "value"
        )?.set;
        nativeInputValueSetter?.call(internalRef.current, "");

        const event = new Event("change", { bubbles: true });
        internalRef.current.dispatchEvent(event);

        // Clear 후에도 포커스를 유지하려면 (선택 사항)
        internalRef.current.focus();
      }
    };

    const hasValue = !!value;

    return (
      <div
        className={cn(
          "relative flex items-center h-12 w-full",
          "rounded-lg border-2",
          "transition-all duration-200 ease-out",
          "border-gray-200 dark:border-gray-700",
          isFocused && "border-[#3182F6] dark:border-[#3182F6]",
          className
        )}
      >
        {/* Left Icon */}
        <div
          className={cn(
            "flex items-center justify-center pl-4 text-gray-400 dark:text-gray-500",
            isFocused && "text-[#3182F6] dark:text-[#3182F6]"
          )}
        >
          {icon || <Search className="size-5" />}
        </div>

        {/* Input Field */}
        <input
          ref={internalRef}
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={handleChange}
          onFocus={handleFocus}
          onBlur={handleBlur}
          className={cn(
            "flex-1 h-full bg-transparent min-w-0",
            "text-lg font-medium text-gray-900 dark:text-gray-100",
            "outline-none focus:ring-0",
            "placeholder:text-gray-400 dark:placeholder:text-gray-500",
            "px-2"
          )}
          {...props}
        />

        {showClearButton && hasValue && (
          <button
            type="button"
            onClick={handleClear}
            className="flex items-center justify-center pr-4 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
            aria-label="Clear search input"
          >
            <XCircle className="size-5" />
          </button>
        )}
      </div>
    );
  }
);

SearchInput.displayName = "SearchInput";

export default SearchInput;

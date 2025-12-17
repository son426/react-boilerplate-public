import {
  Drawer,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerDescription,
} from "@/components/ui/drawer";
import Button from "./ui/button";

interface BlockerDrawerProps {
  isOpen: boolean;
  title?: string;
  title2?: string;
  subTitle?: string;
  exitText?: string;
  stayText?: string;
  onExit: () => void;
  onStay: () => void;
}

export default function BlockerDrawer({
  isOpen,
  title = "정말 나가시겠어요?",
  title2,
  subTitle,
  exitText = "그래도 나갈게요",
  stayText = "남아있을게요",
  onExit,
  onStay,
}: BlockerDrawerProps) {
  return (
    <Drawer
      open={isOpen}
      onOpenChange={(open) => {
        if (!open) onStay();
      }}
    >
      <DrawerContent className="min-h-[300px] justify-between">
        <DrawerHeader className="gap-2">
          <DrawerTitle className="flex flex-col gap-1 text-xl font-semibold text-text-secondary">
            <p>{title}</p>
            {title2 && <p>{title2}</p>}
          </DrawerTitle>

          {/* subTitle이 있으면 보여주고, 없으면 접근성 전용 텍스트 렌더링 */}
          {subTitle ? (
            <DrawerDescription className="text-center text-gray-500">
              {subTitle}
            </DrawerDescription>
          ) : (
            <DrawerDescription className="sr-only">
              {title} {title2} - 경고 창입니다.
            </DrawerDescription>
          )}
        </DrawerHeader>

        <DrawerFooter className="gap-3 pb-6">
          <Button
            variant="secondary"
            className="w-full bg-gray-400 text-white px-6 py-6 rounded-lg font-medium border-none hover:bg-gray-500 transition-colors"
            size="default"
            onClick={onExit}
          >
            {exitText}
          </Button>

          <Button
            variant="default"
            className="w-full bg-blue-500 text-white px-6 py-6 rounded-lg font-medium border-none hover:bg-blue-600 transition-colors"
            size="default"
            onClick={onStay}
          >
            {stayText}
          </Button>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}

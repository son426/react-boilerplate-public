// src/pages/menu.tsx
import { useState } from "react";
import Tab from "@/components/layout/tab"; // 만드신 Tab 컴포넌트 경로
import Container from "@/components/layout/container";
import { useBackBlocker } from "@/hooks/use-back-blocker";
import BlockerDrawer from "@/components/blocker-drawer";

export default function MenuPage() {
  const [activeTab, setActiveTab] = useState("mcdonalds");

  useBackBlocker({
    when: true,
    overlayElement: ({ isOpen, confirm, cancel }) => (
      <BlockerDrawer
        isOpen={isOpen}
        onExit={confirm}
        onStay={cancel}
        title={"나가지마 ㅠㅠㅠㅠ"}
        title2={
          "주저리주저리주저리주저리주저리주저리주저리주저리주저리주저리주저리주저리주저리주저리주저리주저리주저리주저리주저리주저리주저리"
        }
      />
    ),
  });

  return (
    <Container className="px-0 md:px-0">
      <div className="sticky top-0 z-10 bg-white shadow-sm">
        <Tab onChange={(val) => setActiveTab(val)}>
          <Tab.Item value="mcdonalds" selected={activeTab === "mcdonalds"}>
            맥도날드
          </Tab.Item>
          <Tab.Item value="burgerking" selected={activeTab === "burgerking"}>
            버거킹
          </Tab.Item>
          <Tab.Item value="kfc" selected={activeTab === "kfc"}>
            KFC
          </Tab.Item>
        </Tab>
      </div>

      {/* 컨텐츠 영역: activeTab에 따라 조건부 렌더링 */}
      <div className="p-4 flex-1 overflow-y-auto">
        {activeTab === "mcdonalds" && <McdonaldsContent />}
        {activeTab === "burgerking" && <BurgerkingContent />}
        {activeTab === "kfc" && <KfcContent />}
      </div>
    </Container>
  );
}

function McdonaldsContent() {
  return (
    <div className="space-y-4">
      <h2 className="text-xl font-bold">맥도날드 메뉴</h2>
      <div className="bg-white p-4 rounded-lg shadow">빅맥 세트</div>
      <div className="bg-white p-4 rounded-lg shadow">상하이 스파이스 치킨</div>
    </div>
  );
}

function BurgerkingContent() {
  return (
    <div className="space-y-4">
      <h2 className="text-xl font-bold">버거킹 메뉴</h2>
      <div className="bg-white p-4 rounded-lg shadow">와퍼</div>
      <div className="bg-white p-4 rounded-lg shadow">콰트로 치즈 와퍼</div>
    </div>
  );
}

function KfcContent() {
  return (
    <div className="space-y-4">
      <h2 className="text-xl font-bold">KFC 메뉴</h2>
      <div className="bg-white p-4 rounded-lg shadow">징거버거</div>
      <div className="bg-white p-4 rounded-lg shadow">핫크리스피 치킨</div>
    </div>
  );
}

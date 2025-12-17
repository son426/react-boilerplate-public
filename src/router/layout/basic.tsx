// src/layouts/basic-layout.tsx
import { Outlet, useNavigate } from "react-router";
import { ArrowLeft } from "lucide-react";
import AppContainer from "@/components/layout/app-container";
import Top from "@/components/layout/top";

export default function BasicLayout({ title }: { title?: string }) {
  const navigate = useNavigate();

  return (
    <AppContainer hasHeader>
      <Top
        className="fixed top-0 left-0 right-0 z-50"
        title={<Top.TitleText>{title || "상세 페이지"}</Top.TitleText>}
        left={
          <button onClick={() => navigate(-1)} className="p-2">
            <ArrowLeft className="w-6 h-6" />
          </button>
        }
      />

      <Outlet />
    </AppContainer>
  );
}

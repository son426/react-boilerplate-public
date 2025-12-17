// src/layouts/bottom-tabs-layout.tsx
import { Outlet, useLocation, useNavigate } from "react-router";
import AppContainer from "@/components/layout/app-container";
import Top from "@/components/layout/top";
import BottomTab from "@/components/layout/bottom-tab";
import { Home, InfoIcon, User } from "lucide-react";

export default function BottomTabsLayout() {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <AppContainer hasHeader hasBottomTab>
      <Top
        className="fixed top-0 left-0 right-0 z-50"
        title={<Top.TitleText>내 앱</Top.TitleText>}
      />

      <Outlet />

      <BottomTab>
        <BottomTab.Item
          label="홈"
          icon={<Home />}
          selected={location.pathname === "/"}
          onClick={() => navigate("/")}
        />
        <BottomTab.Item
          label="About"
          icon={<InfoIcon />}
          selected={location.pathname === "/about"}
          onClick={() => navigate("/about")}
        />
        <BottomTab.Item
          label="마이"
          icon={<User />}
          selected={location.pathname === "/my"}
          onClick={() => navigate("/my")}
        />
      </BottomTab>
    </AppContainer>
  );
}

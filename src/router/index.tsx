import { createBrowserRouter, Navigate, RouterProvider } from "react-router";
import BottomTabsLayout from "./layout/bottom";
import BasicLayout from "./layout/basic";
import { LoginPage, MenuPage, AboutPage, HomePage, MyPage } from "@/pages";
import RootWrapper from "./wrapper";
import { AuthGuard } from "./auth-guard";
import RouterErrorFallback from "@/router/error-fallback";
// import { authLoader } from "./auth-loader";

const pageRouter = createBrowserRouter([
  {
    element: <RootWrapper />,
    ErrorBoundary: RouterErrorFallback,
    children: [
      {
        element: <BasicLayout />,
        children: [{ path: "/login", element: <LoginPage /> }],
      },

      {
        element: <BottomTabsLayout />,
        children: [
          {
            path: "/",
            element: <HomePage />,
            handle: {
              seo: {
                title: "홈",
                description:
                  "우리 서비스의 메인 페이지입니다. 주요 기능을 한눈에 확인하세요.",
                jsonLd: {
                  "@context": "https://schema.org",
                  "@type": "Organization",
                  name: "내 프로젝트 이름",
                  url: "https://mysite.com",
                  logo: "https://mysite.com/logo.png",
                },
              },
            },
          },
          {
            path: "/about",
            element: <AboutPage />,
            handle: {
              seo: {
                title: "소개 및 상세정보",
                description:
                  "이 프로젝트의 상세 소개 페이지입니다. 검색 엔진 최적화(SEO)를 위해 텍스트 밀도를 높이고 키워드를 배치하는 전략을 설명합니다.",
                keywords: "React SEO, 검색엔진최적화, 소개페이지, 긴 텍스트",
                type: "article",
                url: "https://mysite.com/about",
              },
            },
          },
          {
            element: <AuthGuard />,
            // loader : authLoader
            children: [
              { path: "/menu", element: <MenuPage /> },
              { path: "/my", element: <MyPage /> },
            ],
          },
        ],
      },

      { path: "*", element: <Navigate to="/" replace /> },
    ],
  },
]);

const AppRouter = () => <RouterProvider router={pageRouter} />;
export default AppRouter;

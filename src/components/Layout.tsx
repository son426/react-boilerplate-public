import { type ReactNode } from "react";
import Header from "./header";

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />

      {/* 메인 콘텐츠 - 반응형 패딩 */}
      <main className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        {children}
      </main>

      {/* 푸터 - 반응형 패딩 */}
      <footer className="bg-white border-t border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
          <p className="text-center text-gray-600 text-sm">
            &copy; 커스텀 보일러 플레이트 만들어봄
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Layout;

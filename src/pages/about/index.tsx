// src/pages/AboutPage.tsx
import Container from "@/components/layout/container";

const AboutPage = () => {
  return (
    <Container className="py-4">
      <h1 className="text-2xl font-bold mb-4">📄 상세 페이지</h1>

      <div className="h-[800px] bg-gray-200 mt-4 flex items-center justify-center text-center p-10">
        <p className="max-w-2xl text-gray-700">
          긴 스크롤 영역이 있어야 해요.
          <br />
          <br />
          왜냐하면, <strong>About 페이지</strong>는 검색 엔진 봇이 크롤링할 때
          "이 사이트가 정보가 풍부하구나"라고 판단하게 만들기 유리하기
          때문입니다.
          <br />
          <br />
          실제 구현 시에는 단순 div 높이보다는, 관련 키워드가 포함된 유의미한
          텍스트(h2, h3, p 태그)를 이 안에 가득 채워넣는 것이 SEO 점수에 도움이
          됩니다.
        </p>
      </div>
    </Container>
  );
};

export default AboutPage;

import Container from "@/components/layout/container";
import { Link } from "react-router";

const HomePage = () => {
  return (
    <Container className="py-4 space-y-4">
      <div className="bg-blue-100 p-6 rounded-lg">
        <h2 className="font-bold text-xl"> 홈 화면</h2>
      </div>

      {Array.from({ length: 5 }).map((_, i) => (
        <Link key={i} className="h-32 bg-white border rounded p-4" to="/menu">
          콘텐츠 {i}
        </Link>
      ))}
    </Container>
  );
};

export default HomePage;

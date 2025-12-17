import Container from "@/components/layout/container";
import { Link } from "react-router";

const NotFoundPage = () => {
  return (
    <Container>
      <h1>404 - Page Not Found</h1>
      <p>The page you are looking for does not exist.</p>
      <nav>
        <Link to="/">Go Home</Link>
      </nav>
    </Container>
  );
};

export default NotFoundPage;

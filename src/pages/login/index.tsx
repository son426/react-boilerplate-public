import Container from "@/components/layout/container";
import Flex from "@/components/layout/flex";
import Button from "@/components/ui/button";
import { useNavigate } from "react-router";

const LoginPage = () => {
  const navigate = useNavigate();

  return (
    <Container className="py-4">
      <Flex direction="column" justify="center" align="center">
        <Button variant="default" onClick={() => navigate("/login")}>
          로그인1
        </Button>
        <Button variant="default" onClick={() => navigate("/login")}>
          로그인2
        </Button>
      </Flex>
    </Container>
  );
};

export default LoginPage;

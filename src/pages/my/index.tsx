import Container from "@/components/layout/container";
import Flex from "@/components/layout/flex";
import Button from "@/components/ui/button";
import { useNavigate } from "react-router";

const MyPage = () => {
  const navigate = useNavigate();
  return (
    <Container className="py-4">
      <Flex direction="column" justify="center" align="center">
        <Button variant="default" onClick={() => navigate("/login")}>
          뭐 로그인
        </Button>
        <Button variant="secondary">이것저것</Button>
      </Flex>
    </Container>
  );
};

export default MyPage;

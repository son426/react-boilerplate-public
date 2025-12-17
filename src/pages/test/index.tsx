import { Link } from "react-router";

const TestPage = () => {
  return (
    <div className="bg-red-200 w-full h-500">
      <h1>Test Page</h1>
      <p>This is the about page of your application.</p>
      <nav>
        <Link to="/">Home</Link>
      </nav>
    </div>
  );
};

export default TestPage;

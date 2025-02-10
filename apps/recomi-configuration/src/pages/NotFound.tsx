import { useNavigate } from "react-router-dom";

import { Button } from "../components/ui/Button";

function NotFound() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center">
      <h1 className="text-6xl font-bold text-gray-800 dark:text-gray-200">
        404
      </h1>
      <p className="mt-4 text-gray-600 dark:text-gray-400">
        Sorry, the page you visited does not exist.
      </p>
      <Button variant="primary" className="mt-8" onClick={() => navigate("/")}>
        Back Home
      </Button>
    </div>
  );
}

export default NotFound;

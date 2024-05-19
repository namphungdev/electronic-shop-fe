import { useRoutes } from "react-router-dom";
import { routers } from "./routers";
import { Suspense } from "react";
import Loading from "./components/Loading";
import { message } from "antd";

function App() {
  const element = useRoutes(routers);
  message.config({
    maxCount: 2,
  });
  return (
    <Suspense
      fallback={
        <div className="loading-spin">
          <Loading />
        </div>
      }
    >
      {element}
    </Suspense>
  );
}

export default App;

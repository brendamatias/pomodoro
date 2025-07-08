import { Toaster } from "react-hot-toast";

import { RouterProvider } from "./routes";

function App() {
  return (
    <>
      <Toaster position="bottom-right" />
      <RouterProvider />
    </>
  );
}

export default App;

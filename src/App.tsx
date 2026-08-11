import { BrowserRouter } from "react-router-dom";
import AppRouters from "./router/AppRouters";

import "@/styles/Base.scss";
import "@/styles/Reset.scss";
import "@/styles/Layout.scss";

function App() {
  return (
    <BrowserRouter>
      <AppRouters />
    </BrowserRouter>
  );
}

export default App;

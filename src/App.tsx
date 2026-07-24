import TodoPage from "@/pages/TodoPage";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import "@/styles/Base.scss";
import "@/styles/Reset.scss";
import "@/styles/Layout.scss";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<TodoPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

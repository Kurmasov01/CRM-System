import TodoPage from "@/pages/TodoPage";
import { Routes, Route, BrowserRouter } from "react-router-dom";

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

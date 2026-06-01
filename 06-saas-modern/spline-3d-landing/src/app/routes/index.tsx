import { BrowserRouter, Route, Routes } from "react-router-dom";
import LowPolyPage from "../pages/low-poly-page";
import FuturisticPage from "../pages/futuristic-page";
import { ErrorPage } from "../pages/error-page";

export default function RoutingSystem() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<FuturisticPage />} />
        <Route path="/low-poly" element={<LowPolyPage />} />
        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </BrowserRouter>
  );
}

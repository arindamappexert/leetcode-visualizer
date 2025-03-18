import { Suspense } from "react";
import { useRoutes, Routes, Route } from "react-router-dom";
import Home from "./components/home";
import PatternDetailPage from "./pages/pattern/[id]";
import PatternsPage from "./pages/patterns";
import AboutPage from "./pages/about";
import Layout from "./components/layout/Layout";
import routes from "tempo-routes";

function App() {
  return (
    <Suspense fallback={<p>Loading...</p>}>
      <>
        <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<Home />} />
            <Route path="/patterns" element={<PatternsPage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/pattern/:id" element={<PatternDetailPage />} />
          </Route>
        </Routes>
        {import.meta.env.VITE_TEMPO === "true" && useRoutes(routes)}
      </>
    </Suspense>
  );
}

export default App;

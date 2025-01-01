"use client"

import { Route, Routes, BrowserRouter } from "react-router-dom";
import HomePage from "./pages/Home";
import Jobs from "./pages/Jobs";
import PostJobs from "./pages/PostJobs";
import Blogs from "./pages/Blogs";
import Projects from "./pages/Projects";
function App() {
  return (
    <>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/jobs" element={<Jobs />} />
        <Route path="/postjobs" element={<PostJobs />} />
        <Route path="/blogs" element={<Blogs />} />
        <Route path="/projects" element={<Projects />} />
      </Routes>
    </BrowserRouter>
    </>
  );
}

export default App;
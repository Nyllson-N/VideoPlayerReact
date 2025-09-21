import { Routes, Route, Link } from 'react-router-dom';
import VideoPlayer from './pages/video';
import { Home } from './pages/App';

function AppRoutes() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/video" element={<VideoPlayer />} />
      </Routes>
    </>
  );
}

export default AppRoutes;

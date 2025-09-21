import { Routes, Route, Link } from 'react-router-dom';
import VideoPlayer from './pages/video';
import { Home } from './pages/App';

function AppRoutes() {
  return (
    <>
      <nav style={{ padding: '16px', background: '#eee', marginBottom: '24px' }}>
        <Link to="/" style={{ marginRight: '16px' }}>Home</Link>
        <Link to="/video">Video Player</Link>
      </nav>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/video" element={<VideoPlayer />} />
      </Routes>
    </>
  );
}

export default AppRoutes;

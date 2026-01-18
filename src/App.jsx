import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from "react";
import Loader from "./components/Loader";
import Navbar from "./components/Navbar";
import HomePage from "./pages/HomePage";
import EventPage from "./pages/EventPage";
import EventDetails from "./pages/EventDetails";
import GalleryPage from "./pages/GalleryPage";
import ClusterMembers from "./pages/ClusterMembers";

function App() {
  const [loading, setLoading] = useState(true);

  const handleLoadComplete = () => {
    setLoading(false);
  };

  if (loading) {
    return <Loader onLoadComplete={handleLoadComplete} />;
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <>
              <Navbar />
              <HomePage />
            </>
          }
        />

        <Route path="/events" element={<EventPage />} />
        
        <Route path="/events/:eventId" element={<EventDetails />} />

        <Route path="/gallery" element={<GalleryPage />} />

        <Route path="/cluster-members" element={<ClusterMembers />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
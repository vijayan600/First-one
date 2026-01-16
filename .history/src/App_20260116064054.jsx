import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import HomePage from "./pages/HomePage";
import EventPage from "./pages/EventPage";
import EventDetails from "./pages/EventDetails";
import GalleryPage from "./pages/GalleryPage";

function App() {
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
        
        {/* EVENT DETAILS ROUTE */}
        <Route path="/events/:eventId" element={<EventDetails />} />

        {/* GALLERY ROUTE */}
        <Route path="/gallery" element={<GalleryPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
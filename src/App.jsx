import { Routes, Route } from "react-router-dom";
import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";
import Home from "./pages/Home";
import PostItem from "./pages/PostItem";
import ItemDetails from "./pages/ItemDetails";

function App() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/post" element={<PostItem />} />
          <Route path="/items/:id" element={<ItemDetails />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;

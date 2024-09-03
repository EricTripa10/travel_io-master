import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Header } from "./components/Nav";
import { Footer } from "./components/Footer";
import { Login } from "./pages/Login";
import { Container } from "react-bootstrap";
import { Register } from "./pages/Register";
import { Home } from "./pages/Home";
import { ExplorePage } from "./pages/ExplorePage";
import { FavoritePage } from "./pages/FavoritePage";
const App = () => {
  return (
    <BrowserRouter>
      <Header />
      <main className="py-3">
        <Container>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/explore" element={<ExplorePage />} />
            <Route path="/favorites" element={<FavoritePage />} />
          </Routes>
        </Container>
      </main>
      <Footer />
    </BrowserRouter>
  );
};

export default App;

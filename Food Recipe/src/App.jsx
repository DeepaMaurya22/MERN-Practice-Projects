import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/home";
import Favourite from "./pages/favourite";
import Details from "./pages/details";
import Navbar from "./components/navbar";
function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/favourite" element={<Favourite />}></Route>
        <Route path="/recipe-item/:id" element={<Details />}></Route>
      </Routes>
    </Router>
  );
}

export default App;

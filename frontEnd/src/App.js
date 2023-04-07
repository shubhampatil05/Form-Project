import "./App.css";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Personal from "./Personal";
import Commercial from "./Commercial";
import Home from "./Home";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  return (
    <>
      <div className="App">
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/Personal" element={<Personal />} />
            <Route path="/Commercial" element={<Commercial />} />
          </Routes>
        </BrowserRouter>
      </div>
    </>
  );
}

export default App;

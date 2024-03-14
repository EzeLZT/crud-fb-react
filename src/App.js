import "./App.css";

// Importamos nuestros componentes
import Create from "./components/Create";
import Edit from "./components/Edit";
import Show from "./components/Show";

// Importamos el router
import { BrowserRouter, Route, Routes } from "react-router-dom";

// EL NOMBRE DE ESTE PROYECTO PODRIA SER:StockControlHub
function App() {
  return (
    <div className="App" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh' }}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Show />} />
          <Route path="/create" element={<Create />} />
          <Route path="/edit/:id" element={<Edit />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;

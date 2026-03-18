import { BrowserRouter, Routes, Route } from "react-router-dom"
import Index from "./pages/Index/Index"
import PorscheN from "./pages/PorscheN/PorscheN"

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/models/carrera-911" element={<PorscheN />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
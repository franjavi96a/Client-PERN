import { BrowserRouter, Routes, Route } from "react-router-dom"
import TaskList from "./components/TaskList"
import TaskForm from "./components/TaskForm"
import Navbar from "./components/Navbar"
import Contariner from "@mui/material/Container"

function App() {
  return (
    <BrowserRouter>
    <Navbar />
      <Contariner>
        <Routes>
          <Route path="/" element={<TaskList />} />
          <Route path="/task/new" element={<TaskForm />} />
          <Route path="/task/edit/:id" element={<TaskForm />} />
        </Routes>
      </Contariner>
    </BrowserRouter>
  )
}

export default App

import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import ProjectList from "./components/ProjectList";
import "./App.css";
import AddProject from "./components/AddProject";
import ProjectDetails from "./components/ProjectDetails";
import AddTask from "./components/task/AddTask";
function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<ProjectList />} />
          <Route path="/projects/add" element={<AddProject />} />
          <Route path="/projects/:projectId/tasks/add" element={<AddTask />} />
          <Route
            path="/projects/:projectId/edit-task/:taskId"
            element={<AddTask />}
          />
          <Route path="/projects/:projectId" element={<ProjectDetails />} />
        </Routes>
      </div>
    </Router>
  );
}
let date = new Date();
console.log(
  `${date.getDate()}${date.getMonth() + 1}+ "" + ${date.getFullYear()}`
);
export default App;

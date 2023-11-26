import { Route, Routes } from "react-router-dom";
import FormAgregarTarea from "../FormAgregarTarea/FormAgregarTarea.js";
import { TaskDetails } from "../TaskDetails/Taskdetails.js";
import TaskListSection from "../TaskListSection/TaskListSection.js";
import "./Main.css";

export default function Main() {
  return (
    <>
      <main className="main pb-5 flex-grow-1">
        <Routes>
          <Route
            path="/"
            element={<TaskListSection />}
          />
          <Route
            path="/agregar-tarea"
            element={<FormAgregarTarea />}
          />
          <Route
            path="/task-details"
            element={<TaskDetails />}
          />
        </Routes>
      </main>
    </>
  );
}

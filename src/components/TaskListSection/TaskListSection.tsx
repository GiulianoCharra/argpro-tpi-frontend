import { useEffect, useState } from "react";
import { Tabs, Tab, Container } from "react-bootstrap";
import { Task, TaskEstado } from "../../models/Task.js";
import TaskService from "../../service/TaskService.js";
import TaskList from "../TaskList/TaskList.js";

function TaskListSection() {
  const [key, setKey] = useState("todas");
  const [tasks, setTasks] = useState<Task[]>([]);
  const [tasksPorHacer, setTasksPorHacer] = useState<Task[]>([]);
  const [tasksEnProduccion, setTasksEnProduccion] = useState<Task[]>([]);
  const [tasksTesting, setTasksTesting] = useState<Task[]>([]);
  const [tasksCompletadas, setTasksCompletadas] = useState<Task[]>([]);

  useEffect(() => {
    TaskService.getAll().then((response) => {
      setTasks(response);
      setTasksPorHacer(response.filter((task) => task.estado === TaskEstado.POR_HACER));
      setTasksEnProduccion(response.filter((task) => task.estado === TaskEstado.EN_PRODUCCION));
      setTasksTesting(response.filter((task) => task.estado === TaskEstado.POR_TESTEAR));
      setTasksCompletadas(response.filter((task) => task.estado === TaskEstado.COMPLETADA));
    });
  }, []);

  return (
    <>
      <h1 className="text-center title">Lista de tareas</h1>

      <Container fluid="sm">
        <Tabs
          id="controlled-tab-example"
          activeKey={key}
          onSelect={(k) => setKey(k?.toString() || "todas")}
          className="mb-3"
        >
          <Tab
            eventKey="todas"
            title="Todas"
          >
            <TaskList tasks={tasks} />
          </Tab>
          <Tab
            eventKey="porHacer"
            title="Por Hacer"
          >
            <TaskList tasks={tasksPorHacer} />
          </Tab>
          <Tab
            eventKey="enProceso"
            title="En proceso"
          >
            <TaskList tasks={tasksEnProduccion} />
          </Tab>
          <Tab
            eventKey="testing"
            title="Testing"
          >
            <TaskList tasks={tasksTesting} />
          </Tab>
          <Tab
            eventKey="completadas"
            title="Completadas"
          >
            <TaskList tasks={tasksCompletadas} />
          </Tab>
        </Tabs>
      </Container>
    </>
  );
}

export default TaskListSection;

import { Button, Card } from "react-bootstrap";
import { useTaskContext } from "../../contexts/TaskProvider.js";
import { Task } from "../../models/Task.js";
import { Link } from "react-router-dom";
import "./TaskCard.css";

function TaskCard({ task }: { task: Task }) {
  const { setTask } = useTaskContext();

  const handleTaskClick = () => {
    setTask(task);
  };

  return (
    <Card>
      <Card.Img
        variant="top"
        src={task.imagen}
        style={{ width: "100%", objectFit: "cover" }}
      />
      <Card.Body>
        <Card.Title>{task.titulo}</Card.Title>
        <Card.Text>Tiempo: {task.tiempo}</Card.Text>
        <Card.Text>Responsable: {task.responsable}</Card.Text>
        <Button
          as={Link}
          to="/task-details"
          variant="primary"
          onClick={handleTaskClick}
        >
          Ver mas
        </Button>
      </Card.Body>
    </Card>
  );
}

export default TaskCard;

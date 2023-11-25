import { Row, Col, Container } from "react-bootstrap";
import { Task } from "../../models/Task.js";
import TaskCard from "../TaskCard/TaskCard.js";

function TaskList({ tasks }: { tasks: Task[] }) {
  return (
    <Container fluid="sm">
      <Row
        xs={1}
        md={2}
        lg={3}
        xl={4}
        xxl={5}
        className="g-4"
      >
        {tasks.map((task: Task) => (
          <Col key={task.id}>
            <TaskCard task={task} />
          </Col>
        ))}
      </Row>
    </Container>
  );
}

export default TaskList;

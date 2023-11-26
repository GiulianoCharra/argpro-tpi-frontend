import { useState } from "react";
import { Button, Col, Container, Form, Row, Image } from "react-bootstrap";
import { Trash } from "react-bootstrap-icons";
import { useTaskContext } from "../../contexts/TaskProvider.js";
import { TaskEstado } from "../../models/Task.js";
import TaskService from "../../service/TaskService.js";
import { useNavigate } from "react-router-dom";
import { useToast } from "../../contexts/ToastProvider.js";
import ModalConfirmDeleteTask from "../ModalConfirDeleteTask/ModalConfirmDeleteTask.js";

export function TaskDetails({task, taskremove, tastupdate}) {
  const { selectedTask: task } = useTaskContext();
  const [estado, setEstado] = useState<TaskEstado>(task?.estado || TaskEstado.POR_HACER);

  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const { showToastMessage } = useToast();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    if (!task) {
      return;
    }
    e.preventDefault();
    await TaskService.update(task, { estado });
    setEstado(task?.estado);
    showToastMessage("La tarea se actualizó correctamente", "success");
    navigate("/");
  };

  const handleDelete = () => {
    setShowDeleteModal(true);
  };

  const handleConfirmDelete = async (deleteTask: boolean) => {
    setShowDeleteModal(false);
    if (deleteTask) {
      if (!task || !task.id) {
        return;
      }
      await TaskService.delete(task.id);
      showToastMessage("La tarea se eliminó correctamente", "danger");
      navigate("/");
    }
  };

  return (
    <>
      {task && (
        <Container fluid="sm">
          <h1 className="title text-center">Detalle de Tarea</h1>

          <Container className="bg-body-tertiary p-5 rounded-3">
            <Row
              xs={1}
              md={2}
              className="g-4"
            >
              <Col className="d-flex justify-content-center align-items-center">
                <Image
                  src={task.imagen}
                  fluid
                  rounded
                />
              </Col>
              <Col>
                <p>Tarea: {task.titulo}</p>
                <p>Tiempo: {task.tiempo} dias</p>
                <p>Responsable: {task.responsable}</p>
                <p>Descripción: {task.descripcion}</p>

                <Row>
                  <Col>
                    <Form
                      onSubmit={handleSubmit}
                      className=""
                    >
                      <Form.Group
                        className="mb-3"
                        controlId="formBasicPassword"
                      >
                        <Form.Label>Estado</Form.Label>
                        <Form.Select
                          as="select"
                          value={estado}
                          onChange={(e) => setEstado(e.target.value as TaskEstado)}
                        >
                          <option
                            disabled
                            value="default"
                          >
                            Seleccionar
                          </option>
                          <option value={TaskEstado.POR_HACER}>Por hacer</option>
                          <option value={TaskEstado.EN_PRODUCCION}>En Producción</option>
                          <option value={TaskEstado.POR_TESTEAR}>Por Testear</option>
                          <option value={TaskEstado.COMPLETADA}>Completada</option>
                        </Form.Select>
                      </Form.Group>

                      <button
                        className="btn btn-primary"
                        type="submit"
                      >
                        Guardar
                      </button>
                    </Form>
                  </Col>
                  <Col className="d-flex justify-content-center align-items-center">
                    <Button
                      variant="danger"
                      title="Eliminar tarea"
                      onClick={handleDelete}
                    >
                      <Trash />
                    </Button>{" "}
                  </Col>
                </Row>
              </Col>
            </Row>
          </Container>
        </Container>
      )}

      <ModalConfirmDeleteTask
        show={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        onConfirm={() => handleConfirmDelete(true)}
      />
    </>
  );
}

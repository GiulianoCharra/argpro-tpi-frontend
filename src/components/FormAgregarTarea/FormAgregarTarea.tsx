import { useState } from "react";
import { Button, Container, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useToast } from "../../contexts/ToastProvider.js";
import { TaskEstado, Task } from "../../models/Task.js";
import TaskService from "../../service/TaskService.js";
import "./FormAgregarTarea.css";

function FormAgregarTarea() {
  const [titulo, setTitulo] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [tiempo, setTiempo] = useState(0);
  const [imagen, setImagen] = useState("");
  const [responsable, setResponsable] = useState("");
  const [estado, setEstado] = useState<TaskEstado>(TaskEstado.POR_HACER);
  const { showToastMessage } = useToast();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const task: Task = {
      titulo,
      descripcion,
      tiempo,
      imagen,
      responsable,
      estado,
    };
    await TaskService.create(task);

    setTitulo("");
    setDescripcion("");
    setTiempo(0);
    setImagen("");
    setResponsable("");
    setEstado(TaskEstado.POR_HACER);

    showToastMessage("La tarea se agregó correctamente", "success");

    navigate("/");
  };

  return (
    <>
      <h1 className="text-center">Agregar Tarea</h1>

      <Container fluid="sm">
        <Form onSubmit={handleSubmit}>
          <Form.Group
            className="mb-3"
            controlId="taskTitulo"
          >
            <Form.Label>Titulo</Form.Label>
            <Form.Control
              type="text"
              placeholder="Titulo"
              value={titulo}
              onChange={(e) => setTitulo(e.target.value)}
              required
            />
          </Form.Group>

          <Form.Group
            className="mb-3"
            controlId="taskDescripcion"
          >
            <Form.Label>Descripción</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              placeholder="Descripcion"
              value={descripcion}
              onChange={(e) => setDescripcion(e.target.value)}
              required
            />
          </Form.Group>

          <Form.Group
            className="mb-3"
            controlId="taskTiempo"
          >
            <Form.Label>Tiempo (en dias)</Form.Label>
            <Form.Control
              type="text"
              pattern="[0-9]*"
              placeholder="Ej: 10"
              onChange={(e) => setTiempo(parseInt(e.target.value))}
              required
            />
          </Form.Group>

          <Form.Group
            className="mb-3"
            controlId="taskImagen"
          >
            <Form.Label>Imagen</Form.Label>
            <Form.Control
              type="url"
              placeholder="Ingrese la url de la imagen"
              value={imagen}
              onChange={(e) => setImagen(e.target.value)}
              required
            />
          </Form.Group>

          <Form.Group
            className="mb-3"
            controlId="taskResponsable"
          >
            <Form.Label>Responsable</Form.Label>
            <Form.Control
              type="text"
              placeholder="Responsable"
              value={responsable}
              onChange={(e) => setResponsable(e.target.value)}
              required
            />
          </Form.Group>

          <Form.Group
            className="mb-3"
            controlId="taskEstado"
          >
            <Form.Label>Estado</Form.Label>
            <Form.Control
              as="select"
              value={estado}
              onChange={(e) => setEstado(e.target.value as TaskEstado)}
              required
            >
              <option value={TaskEstado.POR_HACER}>Por hacer</option>
              <option value={TaskEstado.EN_PRODUCCION}>En Produccion</option>
              <option value={TaskEstado.POR_TESTEAR}>Por Testear</option>
              <option value={TaskEstado.COMPLETADA}>Completada</option>
            </Form.Control>
          </Form.Group>

          <div className="d-flex gap-4 mt-5 justify-content-center justify-content-md-start">
            <Button
              variant="outline-primary"
              size="lg"
              type="submit"
            >
              Agregar
            </Button>

            <Button
              variant="danger"
              size="lg"
              onClick={() => navigate("/")}
            >
              Cancelar
            </Button>
          </div>
        </Form>
      </Container>
    </>
  );
}

export default FormAgregarTarea;

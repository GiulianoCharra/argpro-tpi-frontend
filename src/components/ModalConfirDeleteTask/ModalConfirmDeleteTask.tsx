import { Button, Modal } from "react-bootstrap";

interface ModalConfirmDeleteTaskProps {
  show: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

function ModalConfirmDeleteTask({ show, onClose, onConfirm }: ModalConfirmDeleteTaskProps) {
  return (
    <Modal
      show={show}
      onHide={onClose}
      backdrop="static"
      keyboard={false}
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title>Confirmación eliminación</Modal.Title>
      </Modal.Header>
      <Modal.Body>¿Está seguro de que desea eliminar la tarea?</Modal.Body>
      <Modal.Footer>
        <Button
          variant="secondary"
          onClick={onClose}
        >
          Cancelar
        </Button>
        <Button
          variant="danger"
          onClick={onConfirm}
        >
          Eliminar
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default ModalConfirmDeleteTask;

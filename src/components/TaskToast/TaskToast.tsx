import { useState } from "react";
import { ToastContainer, Toast, Button } from "react-bootstrap";
import PropTypes from "prop-types";
import { useToast } from "../../contexts/ToastProvider.js";

function TaskToast({ config }: { config: { message: string; type: string } }) {
  const { message, type } = config;
  const [show, setShow] = useState(true);

  const context = useToast();

  const handleClose = () => {
    setShow(false);
    context.hideToastMessage();
  };

  return (
    <>
      <ToastContainer
        className="p-3 text-light position-fixed"
        style={{ zIndex: 1 }}
        position="bottom-end"
      >
        <Toast
          onClose={handleClose}
          show={show}
          delay={5000}
          autohide
          bg={type}
        >
          <Toast.Header closeButton={false}>
            <img
              src="holder.js/20x20?text=%20"
              className="rounded me-2"
              alt=""
            />
            <strong className="me-auto text-light">Notificación</strong>
            <Button
              type="button"
              className="btn-close btn-outline-light"
              data-bs-dismiss="toast"
              aria-label="Close"
              onClick={handleClose}
            ></Button>
          </Toast.Header>
          <Toast.Body>{message}</Toast.Body>
        </Toast>
      </ToastContainer>
    </>
  );
}

TaskToast.propTypes = {
  config: PropTypes.shape({
    message: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
  }).isRequired,
};

export default TaskToast;

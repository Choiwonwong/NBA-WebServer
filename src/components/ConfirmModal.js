import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Spinner from "react-bootstrap/Spinner";

function ConfirmModal(props) {
  return (
    <Modal show={props.show} onHide={props.onHide} centered>
      <Modal.Header closeButton>
        <Modal.Title className="display-6 fw-bold">{props.title}</Modal.Title>
      </Modal.Header>
      <Modal.Body style={{ fontSize: 20, textAlign: "center" }}>
        {props.body}
      </Modal.Body>
      <Modal.Footer>
        {props.isLoading ? (
          <Button
            variant="primary"
            style={{ width: "30%", fontSize: 20, marginLeft: "7" }}
            disabled
          >
            <Spinner
              as="span"
              animation="grow"
              size="sm"
              role="status"
              aria-hidden="true"
              style={{ marginRight: 10 }}
            />
            Loading...
          </Button>
        ) : (
          <Button
            variant="primary"
            onClick={props.onClick}
            style={{ width: "14%", fontSize: 20, marginLeft: "7" }}
          >
            확인
          </Button>
        )}
        <Button
          variant="secondary"
          onClick={props.onHide}
          style={{ width: "14%", fontSize: 20, marginLeft: "7" }}
        >
          닫기
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default ConfirmModal;

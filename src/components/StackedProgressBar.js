import ProgressBar from "react-bootstrap/ProgressBar";

function StackedProgressBar(props) {
  return (
    <ProgressBar>
      <ProgressBar
        striped
        variant="primary"
        animated
        now={props.processProgress}
        key={1}
      />
      <ProgressBar
        variant="info"
        animated
        now={props.provisionProgress}
        key={2}
      />
      <ProgressBar
        striped
        variant="warning"
        animated
        now={props.deployProgress}
        key={3}
      />
    </ProgressBar>
  );
}

export default StackedProgressBar;

import Button from "./Button";
import { useNavigate } from "react-router-dom";

function BackButton() {
  const navigateBack = useNavigate();
  return (
    <Button
      type="back"
      onClick={(e) => {
        e.preventDefault();
        navigateBack(-1);
      }}
    >
      &larr; Back
    </Button>
  );
}

export default BackButton;

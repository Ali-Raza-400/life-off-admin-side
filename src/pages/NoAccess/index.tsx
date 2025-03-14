import { Button, Result } from "antd";
import { useNavigate } from "react-router-dom";

function NoAccess() {
  const navigate = useNavigate();
  return (
    <Result
      status="403"
      title="403"
      subTitle="Sorry, you are not authorized to access this page."
      extra={
        <Button onClick={() => navigate(-1)} type="primary">
          Go Back
        </Button>
      }
    />
  );
}

export default NoAccess;

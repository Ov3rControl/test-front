import React, { FunctionComponent } from "react";
import { Result, Button } from "antd";
import { Link } from "react-router-dom";

const ErrorInternal: FunctionComponent = (): JSX.Element => {
  return (
    <Result
      status="500"
      title="500"
      subTitle="Sorry, something went wrong."
      extra={
        <Link to="/home">
          <Button
            onClick={() => window.location.replace("/home")}
            type="primary"
          >
            Back Home
          </Button>
        </Link>
      }
    />
  );
};
export default ErrorInternal;

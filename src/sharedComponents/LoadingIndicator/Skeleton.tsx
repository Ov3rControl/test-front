import React, { FunctionComponent } from "react";
import { Skeleton as AntDSkelecton } from "antd";

const Skeleton: FunctionComponent = (): JSX.Element => {
  return <AntDSkelecton active paragraph={{ rows: 6 }} />;
};
export default Skeleton;

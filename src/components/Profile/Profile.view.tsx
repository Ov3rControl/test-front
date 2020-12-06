import { Table } from "antd";
import React, { FunctionComponent } from "react";
import { MyProfileItems } from "../../types";
type Props = {
  data: MyProfileItems | undefined;
};
export const ProfileView: FunctionComponent<Props> = ({
  data,
}: Props): JSX.Element => {
  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      sorter: (a: any, b: any) => a.name.length - b.name.length,
    },
    {
      title: "Description",
      dataIndex: "description",
    },
    {
      title: "Bid",
      dataIndex: "bid",
      sorter: (a: any, b: any) => a.bid - b.bid,
    },
    {
      title: "Status",
      dataIndex: "status",
    },
    {
      title: "Bill",
      dataIndex: "bill",
    },
  ];
  return (
    <>
      <h2>{data?.username}</h2>
      <Table
        columns={columns}
        rowKey={(record: any) => record.id}
        dataSource={data?.items}
        pagination={false}
      />
    </>
  );
};

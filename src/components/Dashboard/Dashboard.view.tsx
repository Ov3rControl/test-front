import React, { FunctionComponent } from "react";
import { Button, Space, Table } from "antd";
import styles from "./Dashboard.view.module.css";
import { ItemTypeRes } from "../../types";
import { Drawer } from "../../sharedComponents/Drawer";

type Props = {
  state: any;
  deleteRecord: (record: string | undefined) => void;
  handleTableChange: (pagination: any) => void;
  goToFormPage: (mode: string, id?: string) => void;
};

export const DashboardView: FunctionComponent<Props> = ({
  state,
  deleteRecord,
  handleTableChange,
  goToFormPage,
}: Props): JSX.Element => {
  const [openDrawer, setOpenDrawer] = React.useState(false);
  const [record, setRecord] = React.useState<ItemTypeRes>();
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
      title: "Current Bid",
      dataIndex: "bid",
      sorter: (a: any, b: any) => a.bid - b.bid,
    },
    {
      title: "Close Date",
      dataIndex: "closeDate",
    },
    {
      title: "Created At",
      dataIndex: "createdAt",
    },
    {
      title: "Action",
      key: "action",
      render: (record: ItemTypeRes) => (
        <Space size="middle">
          <Button
            onClick={() => {
              console.log(record);
              setOpenDrawer(true);
              setRecord(record);
            }}
          >
            View
          </Button>
          <Button onClick={() => goToFormPage("edit", record.id)}>Edit</Button>
          <Button danger onClick={() => deleteRecord(record.id)}>
            Delete
          </Button>
        </Space>
      ),
    },
  ];
  const { data, pagination, loading } = state;
  return (
    <div>
      <Button
        onClick={() => goToFormPage("create")}
        className={styles.createBtn}
      >
        Create Item
      </Button>
      <Table
        columns={columns}
        rowKey={(record: any) => record.id}
        dataSource={data}
        pagination={pagination}
        loading={loading}
        onChange={handleTableChange}
      />
      <Drawer item={record} open={openDrawer} setOpen={setOpenDrawer} />
    </div>
  );
};

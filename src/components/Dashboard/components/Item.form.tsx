import React, { FunctionComponent } from "react";
import { Form, Input, Button } from "antd";

import api from "../../../utils/api";
import { AxiosResponse } from "axios";
import { useHistory, useParams } from "react-router-dom";
import { ItemType, ItemTypeRes } from "../../../types";
import { getUnixTimestamp } from "../../../helpers/getUnixTimestamp";
import DatePicker from "../../../sharedComponents/DatePicker";
import { reverseUnixTime } from "../../../helpers/reverseUnixTime";

const { useEffect } = React;

export const ItemForm: FunctionComponent = (): JSX.Element => {
  const [form] = Form.useForm();
  const { id } = useParams<{ id: string | undefined }>();
  const history = useHistory();
  const editMode = id ? true : false;

  useEffect(() => {
    if (editMode)
      api.getData(`items/${id}`).then((res: AxiosResponse<ItemTypeRes>) => {
        const { name, description, imageUrl, closeDate } = res.data;
        form.setFieldsValue({
          name,
          description,
          imageUrl,
          closeDate: reverseUnixTime(closeDate),
        });
      });
  }, [editMode, form, id]);

  const onFinish = (values: ItemType) => {
    const requestType = editMode ? "PATCH" : "POST";
    const requestUrl = editMode ? `/items/${id}` : "/items";
    const closeDate = getUnixTimestamp(values.closeDate.$d.toISOString());

    api
      .postData(requestUrl, { ...values, closeDate }, requestType)
      .then(() => history.push("/dashboard"));
  };
  return (
    <div>
      <h1>{!editMode ? "Create" : "Edit"}</h1>
      <Form
        labelCol={{ span: 4 }}
        wrapperCol={{ span: 14 }}
        layout="horizontal"
        name="basic"
        onFinish={onFinish}
        form={form}
      >
        <Form.Item name="name" rules={[{ required: true }]} label="Name">
          <Input />
        </Form.Item>
        <Form.Item
          name="description"
          rules={[{ required: true }]}
          label="Description"
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="imageUrl"
          rules={[{ required: true, type: "url" }]}
          label="Image Url"
        >
          <Input />
        </Form.Item>

        <Form.Item
          name="closeDate"
          rules={[{ required: true }]}
          label="Close Date"
        >
          <DatePicker />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

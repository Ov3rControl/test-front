import React, { FunctionComponent } from "react";
import { Card } from "antd";
import { useHistory } from "react-router-dom";

const { Meta } = Card;

type Props = {
  id: string;
  name: string;
  description: string;
  imageUrl: string;
};

export const ItemCard: FunctionComponent<Props> = ({
  id,
  name,
  description,
  imageUrl,
}: Props): JSX.Element => {
  const history = useHistory();
  return (
    <Card
      hoverable
      onClick={() => history.push(`/home/${id}`)}
      style={{ width: 240 }}
      cover={<img alt={name} height="240" src={imageUrl} />}
    >
      <Meta title={name} description={description} />
    </Card>
  );
};

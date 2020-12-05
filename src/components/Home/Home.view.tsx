import React, { FunctionComponent } from "react";
import { Row, Col } from "antd";
import { ItemCard } from "../../sharedComponents/ItemCard";

type Props = {
  data: {
    id: string;
    name: string;
    description: string;
    imageUrl: string;
  }[];
};

export const HomeView: FunctionComponent<Props> = ({
  data,
}: Props): JSX.Element => {
  return (
    <div>
      <h1>Auction Items</h1>
      <Row
        gutter={[
          { xs: 8, sm: 16, md: 24, lg: 32 },
          { xs: 8, sm: 16, md: 24, lg: 32 },
        ]}
      >
        {data?.map((item) => (
          <Col key={item.id} span={6}>
            <ItemCard
              id={item.id}
              name={item.name}
              description={item.description}
              imageUrl={item.imageUrl}
            />
          </Col>
        ))}
      </Row>
    </div>
  );
};

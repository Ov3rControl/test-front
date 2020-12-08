import React, { FunctionComponent } from "react";
import { ItemCard } from "../../sharedComponents/ItemCard";
import styles from "./Home.view.module.css";
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
      <div className={styles.row}>
        {data?.map((item) => (
          <div key={item.id} className={styles.column}>
            <ItemCard
              id={item.id}
              name={item.name}
              description={item.description}
              imageUrl={item.imageUrl}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

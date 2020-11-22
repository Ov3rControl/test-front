import React from "react";
import { Drawer as AntDDrawer } from "antd";
import { ItemTypeRes } from "../../types";
import { reverseUnixTime } from "../../helpers/reverseUnixTime";

type Props = {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  item: ItemTypeRes | undefined;
};

export const Drawer: React.FunctionComponent<Props> = ({
  open,
  setOpen,
  item,
}: Props): JSX.Element => {
  const onClose = () => {
    setOpen(false);
  };
  return (
    <>
      <AntDDrawer
        title="Basic Drawer"
        placement="right"
        closable={false}
        onClose={onClose}
        visible={open}
      >
        <p>ID : {item?.id}</p>
        <p>Name : {item?.name}</p>
        <p>Description : {item?.description}</p>
        <img width="120" src={item?.imageUrl} alt={item?.name} />
        <p>Current Bid : {item?.bid}</p>
        <div>
          <p>Bid History</p>
          <ul>
            {item?.bidHistory?.map((item) => (
              <li>{item}</li>
            ))}
          </ul>
        </div>
        <p>Close Date : {reverseUnixTime(item?.closeDate || "").format()}</p>
        <p>{item?.createdAt}</p>
      </AntDDrawer>
    </>
  );
};

Drawer.defaultProps = {
  open: false,
};

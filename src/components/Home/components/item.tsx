import { Button, InputNumber } from "antd";
import Countdown from "antd/lib/statistic/Countdown";
import { AxiosResponse } from "axios";
import React, { FunctionComponent, useState } from "react";
import { useParams } from "react-router-dom";
import { reverseUnixTime } from "../../../helpers/reverseUnixTime";
import {
  NotificationStatus,
  showNotification,
} from "../../../helpers/showNotication";
import { ItemTypeRes, SSEItemData } from "../../../types";
import api from "../../../utils/api";

//Sorry for duplicating the enum but CRA doesn't work well with exporting enums unless you eject from it or do monorepo
export enum ItemStatus {
  OPEN = "OPEN",
  IN_PROGRESS = "IN_PROGRESS",
  CLOSED = "CLOSED",
}

export const Item: FunctionComponent = (): JSX.Element => {
  const { id } = useParams<{ id: string | undefined }>();
  const [bid, setSid] = useState<string | number | undefined>();
  const [item, setItem] = useState<ItemTypeRes | any>();
  React.useEffect(() => {
    api.getData(`items/${id}`).then((res: AxiosResponse<ItemTypeRes>) => {
      console.log(res.data);
      setItem(res.data);
    });
    const events = new EventSource(
      process.env.REACT_APP_API_DOMAIN + "/items/sse/item"
    );
    events.onmessage = (event) => {
      const parsedData: SSEItemData = JSON.parse(event.data);
      const { bid, bidHistory, highestBidder } = parsedData;
      const updatedItemId = parsedData ? parsedData.id : null;
      console.log(updatedItemId === item?.id);
      if (parsedData?.action === false) {
      } else if (updatedItemId === item?.id) {
        setItem((prevState: ItemTypeRes) => ({
          ...prevState,
          bid,
          bidHistory,
          highestBidder,
        }));
      }
    };
  }, [id]);

  const bidNow = () => {
    api.postData(`/items/${id}/bid`, { bid: bid }, "PATCH").then((res) => {
      if (res.data.action === false) {
        showNotification(
          NotificationStatus.warning,
          "Action Denied",
          res.data.message
        );
      } else {
        showNotification(
          NotificationStatus.success,
          "Action Success",
          "You are now the highest bidder :)"
        );
      }
    });
  };

  return (
    <div key={item?.id}>
      {item?.status === ItemStatus.CLOSED && (
        <h1>Bid Closed ! Winner: {item.highestBidder} </h1>
      )}
      <Countdown value={reverseUnixTime(item?.closeDate || "").format()} />
      <p>ID : {item?.id}</p>
      <p>Name : {item?.name}</p>
      <p>Description : {item?.description}</p>
      <img width="120" src={item?.imageUrl} alt={item?.name || "item"} />
      <p>Current Bid : {item?.bid}</p>
      <div>
        <p>Bid History</p>
        <ul key={item?.id}>
          {item?.bidHistory?.map((item: React.ReactNode) => (
            <li>{item}</li>
          ))}
        </ul>
      </div>
      <p>Close Date : {reverseUnixTime(item?.closeDate || "").format()}</p>
      <p>Created At: {item?.createdAt}</p>
      <div>
        <h4>Bid with a higher quantity than the current bid</h4>
        <InputNumber onChange={(e) => setSid(e)} />
        <Button disabled={item?.status === ItemStatus.CLOSED} onClick={bidNow}>
          Bid Now
        </Button>
      </div>
    </div>
  );
};

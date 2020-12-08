import { Badge, Button, Checkbox, Descriptions, InputNumber } from "antd";
import Countdown from "antd/lib/statistic/Countdown";
import { AxiosResponse } from "axios";
import React, { FunctionComponent, useState } from "react";
import { useParams } from "react-router-dom";
import jwt_decode from "jwt-decode";
import { reverseUnixTime } from "../../../helpers/reverseUnixTime";
import {
  NotificationStatus,
  showNotification,
} from "../../../helpers/showNotication";
import { ItemTypeRes, SSEItemData } from "../../../types";
import { axiosApiInstance } from "../../../utils/api";
import { useRecoilState, useRecoilValue } from "recoil";
import { AutoBidSettings, User } from "../../../store/atoms/atom";

//Sorry for duplicating the enum but CRA doesn't work well with exporting enums unless you eject from it or do monorepo
export enum ItemStatus {
  OPEN = "OPEN",
  IN_PROGRESS = "IN_PROGRESS",
  CLOSED = "CLOSED",
}

export const Item: FunctionComponent = (): JSX.Element => {
  const { id } = useParams<{ id: string | undefined }>();
  const [bid, setBid] = useState<string | number | undefined>();
  const [item, setItem] = useState<ItemTypeRes | any>();
  const [autoBid, setAutoBid] = useState<boolean>(false);
  const user = useRecoilValue(User);
  const [autoBidSettings, setAutoBidSettings] = useRecoilState(AutoBidSettings);

  React.useEffect(() => {
    axiosApiInstance
      .get(`items/${id}`)
      .then((res: AxiosResponse<ItemTypeRes>) => {
        setItem(res.data);
      });
  }, [id]);

  React.useEffect(() => {
    const events = new EventSource(
      process.env.REACT_APP_API_DOMAIN + "/items/sse/item"
    );
    events.onmessage = (event) => {
      const parsedData: SSEItemData = JSON.parse(event.data);
      const { bid, bidHistory, highestBidder } = parsedData;
      const updatedItemId = parsedData ? parsedData.id : null;
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
    return () => {
      events.close();
    };
  }, [item?.id]);

  React.useEffect(() => {
    const token: { username: string } = jwt_decode(user.token || "");
    const canBid = item?.status !== ItemStatus.CLOSED;
    if (autoBid) {
      const currentBid: number = item?.bid;
      const notTheHighestBidder = item?.highestBidder !== token.username;
      if (canBid && notTheHighestBidder) {
        const biddingAmount = currentBid + 1;
        if (biddingAmount > autoBidSettings.maxBidAmount) {
          showNotification(
            NotificationStatus.warning,
            "Action Denied",
            "Insufficent of funds"
          );
        } else {
          setAutoBidSettings((currVal) => ({
            maxBidAmount: currVal.maxBidAmount - biddingAmount,
          }));
          bidNow(biddingAmount);
        }
      } else {
        showNotification(
          NotificationStatus.warning,
          "Action Denied",
          "You are the highest bidder"
        );
      }
    }
  }, [autoBid, item]);

  const bidNow = (autobid?: number) => {
    axiosApiInstance
      .patch(`/items/${id}/bid`, { bid: autobid || bid })
      .then((res) => {
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
    <Descriptions
      key={item?.id}
      title="Item Information"
      layout="vertical"
      bordered
    >
      {item?.status === ItemStatus.CLOSED && (
        <Descriptions.Item label="Bid Winner">
          {item.highestBidder}
        </Descriptions.Item>
      )}
      <Descriptions.Item label="Product Name">{item?.name}</Descriptions.Item>
      <Descriptions.Item label="Description">
        {item?.description}
      </Descriptions.Item>
      <Descriptions.Item label="Image">
        <img width="120" src={item?.imageUrl} alt={item?.name || "item"} />
      </Descriptions.Item>
      <Descriptions.Item label="Last Bid">{item?.bid}</Descriptions.Item>
      <Descriptions.Item label="Status" span={3}>
        <Badge
          status={item?.status === ItemStatus.OPEN ? "processing" : "error"}
          text={item?.status === ItemStatus.OPEN ? "IN_PROGRESS" : "CLOSED"}
        />
      </Descriptions.Item>
      <Descriptions.Item label="Bidding ends in">
        <Countdown value={reverseUnixTime(item?.closeDate || "").format()} />
      </Descriptions.Item>
      <Descriptions.Item label="Bid Actions">
        {item?.status !== ItemStatus.CLOSED && (
          <div>
            <h4>Bid with a higher quantity than the current bid</h4>
            <Checkbox
              name="AutoBid"
              value={autoBid}
              onChange={() => setAutoBid((prevValue) => !prevValue)}
            >
              AutoBid
            </Checkbox>
            <InputNumber onChange={(e) => setBid(e)} />
            <Button onClick={() => bidNow()}>Bid Now</Button>
          </div>
        )}
      </Descriptions.Item>
      <Descriptions.Item label="Bids History" span={2}>
        <ul key={item?.id}>
          {item?.bidHistory?.map((item: React.ReactNode) => (
            <li>{item}</li>
          ))}
        </ul>
      </Descriptions.Item>
    </Descriptions>
  );
};

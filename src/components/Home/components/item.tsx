import { Button, InputNumber } from "antd";
import { AxiosResponse } from "axios";
import React, { FunctionComponent, useState } from "react";
import { useParams } from "react-router-dom";
import { reverseUnixTime } from "../../../helpers/reverseUnixTime";
import { ItemTypeRes } from "../../../types";
import api from "../../../utils/api";

export const Item: FunctionComponent = (): JSX.Element => {
  const { id } = useParams<{ id: string | undefined }>();
  const [bid, setSid] = useState<string | number | undefined>();
  const [item, setItem] = useState<ItemTypeRes>();

  React.useEffect(() => {
    api.getData(`items/${id}`).then((res: AxiosResponse<ItemTypeRes>) => {
      console.log(res.data);
      setItem(res.data);
    });
  }, [id]);

  const bidNow = () => {
    api
      .postData(`/items/${id}/bid`, { bid: bid }, "PATCH")
      .then(() => alert("Done"));
  };

  return (
    <div>
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
      <div>
        <h4>Bid with a higher quantity than the current bid</h4>
        <InputNumber onChange={(e) => setSid(e)} />
        <Button onClick={bidNow}>Bid Now</Button>
      </div>
    </div>
  );
};

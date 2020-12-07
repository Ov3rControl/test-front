import Axios from "axios";
import React, { FunctionComponent } from "react";
import { currentUnixTime } from "../../helpers/currentUnixTime";
import { MyProfileItems } from "../../types";
import { axiosApiInstance } from "../../utils/api";
import { ProfileView } from "./Profile.view";

type profileItems = {
  name: string;
  bid: number;
  closeDate: number;
  status: string;
  highestBidder: string;
  bill: number;
};

export const Profile: FunctionComponent = (): JSX.Element => {
  const [state, setState] = React.useState<MyProfileItems>();
  React.useEffect(() => {
    const ourRequest = Axios.CancelToken.source();

    axiosApiInstance
      .get("items/user/myitems", {
        cancelToken: ourRequest.token,
      })
      .then((res) => {
        res.data.items.forEach((item: profileItems) => {
          if (item.closeDate < currentUnixTime) {
            if (item.highestBidder === res.data.username) {
              item.status = "WON";
              item.bill = item.bid;
            } else {
              item.status = "LOST";
            }
          } else {
            item.status = "IN_PROGRESS";
          }
        });
        setState(res.data);
      });
    return () => {
      ourRequest.cancel();
    };
  }, []);

  return <ProfileView data={state} />;
};

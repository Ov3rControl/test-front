import React, { FunctionComponent } from "react";
import { currentUnixTime } from "../../helpers/currentUnixTime";
import { MyProfileItems } from "../../types";
import api from "../../utils/api";
import { ProfileView } from "./Profile.view";

export const Profile: FunctionComponent = (): JSX.Element => {
  const [state, setState] = React.useState<MyProfileItems>();
  React.useEffect(() => {
    api.getData("items/user/myitems").then((res) => {
      res.data.items.forEach(
        (item: {
          name: string;
          bid: number;
          closeDate: number;
          status: string;
          highestBidder: string;
          bill: number;
        }) => {
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
        }
      );
      setState(res.data);
    });
  }, []);

  return <ProfileView data={state} />;
};

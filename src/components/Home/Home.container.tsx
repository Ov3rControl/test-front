import React, { FunctionComponent } from "react";
import { axiosApiInstance } from "../../utils/api";
import { HomeView } from "./Home.view";

export const Home: FunctionComponent = (): JSX.Element => {
  const [state, setState] = React.useState<any>({
    data: [],
    pagination: {
      current: 1,
      pageSize: 10,
      total: undefined,
    },
    loading: false,
  });

  React.useEffect(() => {
    Fetch();
  }, []);

  const Fetch = (page?: string) => {
    setState((prevState: any) => ({ ...prevState, loading: true }));

    axiosApiInstance.get("items?page=" + (page ? page : "1")).then((data) => {
      setState({
        loading: false,
        data: data.data.items,
        pagination: {
          current: data.data.meta.currentPage,
          pageSize: data.data.meta.itemsPerPage,
          total: data.data.meta.totalItems,
        },
      });
    });
  };
  return (
    <div>
      <HomeView data={state.data} />
    </div>
  );
};

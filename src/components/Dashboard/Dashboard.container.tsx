import React, { FunctionComponent } from "react";
import { useHistory } from "react-router-dom";
import api from "../../utils/api";
import { DashboardView } from "./Dashboard.view";

export const Dashboard: FunctionComponent = (): JSX.Element => {
  // *TODO* Add Immer for Immutability
  const [state, setState] = React.useState<any>({
    data: [],
    pagination: {
      current: 1,
      pageSize: 10,
      total: undefined,
    },
    loading: false,
  });
  const history = useHistory();
  const goToFormPage = (mode: string, id?: string) =>
    mode === "create"
      ? history.push("/dashboard/create")
      : history.push(`/dashboard/${id}/edit`);

  const deleteRecord = (record: string | undefined) => {
    api.deleteData(`items/${record}`);
    const data = state.data.filter(
      (item: { id: string }) => item.id !== record
    );
    setState((prevState: any) => ({ ...prevState, data }));
  };

  // Refactor this section to external function or custom Hook
  React.useEffect(() => {
    Fetch();
  }, []);
  const handleTableChange = (pagination: any) => {
    Fetch(pagination.current);
  };

  const Fetch = (page?: string) => {
    setState((prevState: any) => ({ ...prevState, loading: true }));

    api.getData("items?page=" + (page ? page : "1")).then((data) => {
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
      <DashboardView
        state={state}
        deleteRecord={deleteRecord}
        handleTableChange={handleTableChange}
        goToFormPage={goToFormPage}
      />
    </div>
  );
};

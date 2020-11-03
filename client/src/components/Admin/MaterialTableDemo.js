import React, { useState, useEffect } from "react";
import MaterialTable from "material-table";
import { profileGetFunction } from "../../services/profile";
import { deleteProfile } from "../../services/profile";

export default function MaterialTableDemo() {
  const [state, setState] = useState({
    columns: [
      { title: "Name", field: "firstName" },
      { title: "Surname", field: "lastName" },
      { title: "Email", field: "email" },

      { title: "Gender", field: "gender" },
    ],
    data: [],
  });

  let { columns, data } = state;

  useEffect(() => {
    fetchUserData();
  }, []);

  let deleteData = async (oldData) => {
    let userId = {
      id: oldData._id,
    };
    await deleteProfile(userId);
  };

  let fetchUserData = async () => {
    let { data } = await profileGetFunction();

    await setState({ ...state, data: data });
  };
  return (
    <MaterialTable
      title="User Table"
      options={{ actionsColumnIndex: -1 }}
      editable={{
        onRowDelete: (oldData) =>
          new Promise((resolve) => {
            setTimeout(() => {
              resolve();
              deleteData(oldData);

              setState((prevState) => {
                const data = [...prevState.data];
                data.splice(data.indexOf(oldData), 1);
                return { ...prevState, data };
              });
            }, 600);
          }),
      }}
      columns={state.columns}
      data={state.data}
    />
  );
}

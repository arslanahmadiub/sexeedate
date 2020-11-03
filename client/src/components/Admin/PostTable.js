import React, { useEffect, useState } from "react";
import MaterialTable from "material-table";
import { allPost } from "../../services/post";
import { postDelete } from "../../services/post";

export default function PostTable() {
  const [state, setState] = useState({
    columns: [
      { title: "Creator", field: "Name.fullName" },
      { title: "Post Description", field: "message" },
      { title: "Date and Time", field: "dateTime" },
    ],
    data: [],
  });

  useEffect(() => {
    fetchPostData();
  }, []);

  let fetchPostData = async () => {
    let { data } = await allPost();

    await setState({ ...state, data: data });
  };

  let handelPost = async (oldData) => {
    let postId = {
      _id: oldData._id,
    };
    await postDelete(postId);
  };
  return (
    <MaterialTable
      title="Post Table"
      options={{ actionsColumnIndex: -1 }}
      editable={{
        onRowDelete: (oldData) =>
          new Promise((resolve) => {
            setTimeout(() => {
              resolve();
              handelPost(oldData);
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

import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import { Button } from "@material-ui/core";
import Box from "@material-ui/core/Box";
import Collapse from "@material-ui/core/Collapse";
import IconButton from "@material-ui/core/IconButton";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import KeyboardArrowDownIcon from "@material-ui/icons/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@material-ui/icons/KeyboardArrowUp";
import OutlinedCard from "./OutlinedCard";
import UserCard from "./UserCard";
import UserSlider from "./UserSlider";
import { fullUserDetailGet } from "../../services/profile";
import { updateProfileStatus } from "../../services/profile";

const useRowStyles = makeStyles({
  root: {
    "& > *": {
      borderBottom: "unset",
    },
  },
});

function createData(name, email, gender, status, pasport, image, id) {
  return {
    name,
    email,
    gender,
    status,
    pasport,
    image,
    id,
  };
}

function Row(props) {
  const { row } = props;
  const [open, setOpen] = React.useState(false);
  const classes = useRowStyles();

  let handelClick = async (data) => {
    let userData = {
      userId: data.id,
      status: "Active",
    };
    let result = await updateProfileStatus(userData);
    props.data();

    setOpen(false);
  };

  let handeDisablelClick = async (data) => {
    let userData = {
      userId: data.id,
      status: "Disable",
    };
    let result = await updateProfileStatus(userData);
    props.data();
    setOpen(false);
  };
  return (
    <React.Fragment>
      <TableRow className={classes.root}>
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell component="th" scope="row">
          {row.name}
        </TableCell>
        <TableCell align="left">{row.email}</TableCell>
        <TableCell align="left">{row.gender}</TableCell>
        <TableCell align="left">{row.status}</TableCell>
      </TableRow>

      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box margin={1}>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  width: "100%",
                  height: "100%",
                }}
              >
                <div style={{ width: "300px", height: "200px" }}>
                  <OutlinedCard pasport={row.pasport} />
                </div>
                <div style={{ width: "300px", height: "350px" }}>
                  <UserCard userImages={row.image} />
                </div>
                <div style={{ display: "flex", flexDirection: "column" }}>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() => {
                      handelClick(row);
                    }}
                  >
                    Active
                  </Button>
                  <br />
                  <Button
                    variant="contained"
                    color="secondary"
                    onClick={() => {
                      handeDisablelClick(row);
                    }}
                  >
                    Disable
                  </Button>
                </div>
              </div>
              <br />
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}

export default function CollapsibleTable() {
  let [rows, setRows] = useState([]);

  useEffect(() => {
    getFullUser();
  }, []);

  let getFullUser = async () => {
    let { data } = await fullUserDetailGet();

    let newData = [];
    for (let i = 0; i < data.length; i++) {
      let j = createData(
        data[i].fullName,
        data[i].email,
        data[i].gender,
        data[i].status,
        data[i].Detail.pasport.image_url,
        data[i].Detail.userImages,
        data[i]._id
      );
      newData.push(j);
    }
    await setRows(newData);
  };

  return (
    <TableContainer component={Paper}>
      <Table aria-label="collapsible table">
        <TableHead>
          <TableRow>
            <TableCell />
            <TableCell>Name</TableCell>
            <TableCell align="left">Email</TableCell>
            <TableCell align="left">Gender</TableCell>
            <TableCell align="left">Status</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <Row key={row.name} row={row} data={() => getFullUser()} />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

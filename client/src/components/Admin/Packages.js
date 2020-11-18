import React, { useState, useEffect } from "react";
import { useHistory } from "react-router";
import clsx from "clsx";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import CssBaseline from "@material-ui/core/CssBaseline";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import List from "@material-ui/core/List";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import InboxIcon from "@material-ui/icons/MoveToInbox";
import MailIcon from "@material-ui/icons/Mail";
import "./admin.css";

import Form from "react-bootstrap/Form";
import ListAltIcon from "@material-ui/icons/ListAlt";
import Table from "react-bootstrap/Table";
import DeleteIcon from "@material-ui/icons/Delete";
import { packagePost } from "../../services/packages";
import { packageGet } from "../../services/packages";
import { packageDelete } from "../../services/packages";
import Alert from "react-bootstrap/Alert";

const drawerWidth = 240;
const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  appBar: {
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  hide: {
    display: "none",
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  drawerHeader: {
    display: "flex",
    alignItems: "center",
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: "flex-end",
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: -drawerWidth,
    overflow: "auto",
  },
  contentShift: {
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  },
}));

export default function Packages() {
  const classes = useStyles();
  const theme = useTheme();
  const history = useHistory();
  const [open, setOpen] = React.useState(false);
  const [show, setShow] = useState(false);

  let [formData, setformData] = useState({
    packageName: "",
    packageDuration: "",
    packagePrice: "",
  });

  const [packageData, setpackageData] = useState([]);

  useEffect(() => {
    getPackages();
  }, []);
  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };
  const handleUser = () => {
    history.push("/admin/user");
  };
  const handlePost = () => {
    history.push("/admin/post");
  };
  const handleVerification = () => {
    history.push("/admin/verify");
  };
  const handlePackages = () => {
    history.push("/admin/package");
  };
  let handelDelete = async (id) => {
    let result = packageData.filter((item) => item._id !== id);
    setpackageData(result);

    let packageId = {
      packageId: id,
    };
    let { data } = await packageDelete(packageId);
 
  };
  let getPackages = async () => {
    let { data } = await packageGet();
    setpackageData(data);
  };
  let { packageName, packageDuration, packagePrice } = formData;

  let handelPackageName = (e) => {
    setformData({ ...formData, [e.target.name]: e.target.value });
  };
  let savePackage = async () => {
    if (
      packageName.length < 1 ||
      packageDuration.length < 1 ||
      packagePrice.length < 1
    ) {
      setShow(true);
    } else {
      setShow(false);
      let newData = [...packageData];
      newData.push(formData);
      setpackageData(newData);
      let { data } = await packagePost(formData);
      setformData({
        packageName: "",
        packageDuration: "",
        packagePrice: "",
      });
    }
  };

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar
        className={clsx(classes.appBar, {
          [classes.appBarShift]: open,
        })}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            className={clsx(classes.menuButton, open && classes.hide)}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap>
            Sexee Dating Admin Panel
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer
        className={classes.drawer}
        variant="persistent"
        anchor="left"
        open={open}
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        <div className={classes.drawerHeader}>
          <Typography variant="h6" noWrap>
            Sexee Dating
          </Typography>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === "ltr" ? (
              <ChevronLeftIcon />
            ) : (
              <ChevronRightIcon />
            )}
          </IconButton>
        </div>

        <Divider />
        <List>
          <ListItem button onClick={handleUser}>
            <ListItemIcon>
              <InboxIcon />
            </ListItemIcon>
            <ListItemText primary="Users" />
          </ListItem>
          <ListItem button onClick={handlePost}>
            <ListItemIcon>
              <MailIcon />
            </ListItemIcon>
            <ListItemText primary="Post" />
          </ListItem>
          <ListItem button onClick={handleVerification}>
            <ListItemIcon>
              <MailIcon />
            </ListItemIcon>
            <ListItemText primary="Verification" />
          </ListItem>
          <ListItem button onClick={handlePackages}>
            <ListItemIcon>
              <ListAltIcon />
            </ListItemIcon>
            <ListItemText primary="Packages" />
          </ListItem>
        </List>
      </Drawer>
      <main
        className={clsx(classes.content, {
          [classes.contentShift]: open,
        })}
      >
        <div className={classes.drawerHeader} />

        <Card>
          <Card.Header>Packages</Card.Header>
          <div
            style={{
              display: "flex",
              width: "100%",
              height: "80vh",
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            <div style={{ display: "flex", width: "40%", height: "80vh" }}>
              <Card.Body>
                <Card.Title>Add Or Remove Packages</Card.Title>
                <Alert show={show} variant="danger">
                  <p>Fill All Fields</p>
                </Alert>

                <Form>
                  <Form.Group controlId="exampleForm.ControlInput1">
                    <Form.Label>Package Duration In English</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Package Duration In English"
                      name="packageName"
                      value={packageName}
                      onChange={handelPackageName}
                    />
                  </Form.Group>
                  <br />
                  <Form.Group controlId="exampleForm.ControlInput1">
                    <Form.Label>Package Duration In Months</Form.Label>
                    <Form.Control
                      type="number"
                      name="packageDuration"
                      value={packageDuration}
                      placeholder="Package Duration In Months"
                      onChange={handelPackageName}
                    />
                  </Form.Group>
                  <br />
                  <Form.Group controlId="exampleForm.ControlInput1">
                    <Form.Label>Package Price In USD</Form.Label>
                    <Form.Control
                      type="text"
                      name="packagePrice"
                      value={packagePrice}
                      placeholder="Package Price In USD"
                      onChange={handelPackageName}
                    />
                  </Form.Group>
                </Form>
                <br />

                <Button variant="primary" onClick={savePackage}>
                  Save Package
                </Button>
              </Card.Body>
            </div>

            <div style={{ display: "flex", width: "60%", height: "80vh" }}>
              <Card.Body>
                <Card.Title>See Or Remove Package</Card.Title>

                <Table striped bordered hover>
                  <thead>
                    <tr>
                      <th>#</th>
                      <th>Package Name</th>
                      <th>Package Durition</th>
                      <th>Package Price</th>
                      <th>Delete Package</th>
                    </tr>
                  </thead>
                  <tbody>
                    {packageData.map((item, index) => {
                      return (
                        <tr key={index}>
                          <td>{index + 1}</td>
                          <td>{item.packageName}</td>
                          <td>{`${item.packageDuration} Month `} </td>
                          <td>{`${item.packagePrice} USD `} </td>

                          <td>
                            <DeleteIcon
                              style={{ color: "#BE1E1E", cursor: "pointer" }}
                              onClick={() => handelDelete(item._id)}
                            />{" "}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </Table>
              </Card.Body>
            </div>
          </div>
        </Card>
      </main>
    </div>
  );
}

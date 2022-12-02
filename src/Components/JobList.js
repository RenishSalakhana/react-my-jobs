import {
  Box,
  Button,
  Chip,
  Divider,
  Grid,
  Paper,
  Typography,
} from "@mui/material";
import axios from "axios";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import React, { useState } from "react";
import GroupIcon from "@mui/icons-material/Group";
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";
import { Add, Delete, Edit } from "@mui/icons-material";
import AddJobModal from "./AddJobModal";

export default function JobList() {
  const [anchorEl, setAnchorEl] = React.useState(null);

  const [dataArray, setdataArray] = useState([
    // {
    //   JobTitle: "",
    //   JobLocation: [],
    //   jobDescription: "",
    //   positiontype: "",
    //   Seniority: "",
    //   ClosestJobFunction: "",
    //   relevantHardSkill: [],
    // },
  ]);

  const [data, setdata] = useState({
    JobTitle: "",
    JobLocation: [],
    jobDescription: "",
    positiontype: "",
    Seniority: "",
    ClosestJobFunction: "",
    relevantHardSkill: [],
  });

  const open = Boolean(anchorEl);
  
  const handlechange = (e) => {
    setdata({ ...data, [e.target.name]: e.target.value });
  };
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const [openModal, setOpenModal] = useState(false);
  const handleModalClose = () => {
    setOpenModal(false);
  };
  const handleModalOpen = () => {
    setOpenModal(!open);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post("https://reqres.in/api/users", data);
      console.log({ res:res.data });
      if (Object.keys(res.data).length > 0) {
        setdataArray([...dataArray, res.data]);
      }
    } catch (error) {
      console.log(error);
    }

    console.log({ data });
  };

  return (
    <Paper elevation={4} sx={{ width: "80vw", height: "80vh", p: 5, m: 5 }}>
      <AddJobModal
        open={openModal}
        handleModalClose={handleModalClose}
        handleSubmit={handleSubmit}
        handlechange={handlechange}
        data={data}
      />
      <Grid container spacing={2}>
        <Grid item xs={12} md={12}>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",

              p: 2,
            }}
          >
            <Typography sx={{ fontWeight: "bold" }}>Active Jobs</Typography>
            <Button
              variant="contained"
              startIcon={<Add />}
              onClick={handleModalOpen}
            >
              Add Jobs
            </Button>
          </Box>
          <Divider variant="middle" />
        </Grid>
        {dataArray.map((ind) => {
          return (
            <Grid item xs={12} md={6}>
              <Paper elevation={2} sx={{ borderRadius: 5, height: 70 }}>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    p: 2,
                  }}
                >
                  <FiberManualRecordIcon size={5} color="success" />
                  <Typography sx={{ fontWeight: "bold" }}>
                    {ind.JobTitle}
                    <Typography sx={{ fontSize: 10, fontStyle: "italic" }}>
                      {ind.JobLocation}
                    </Typography>
                  </Typography>{" "}
                  <Box>
                    <Chip icon={<GroupIcon />} label="5" />
                  </Box>{" "}
                  <Box>
                    <IconButton
                      aria-label="more"
                      id="long-button"
                      aria-controls={open ? "long-menu" : undefined}
                      aria-expanded={open ? "true" : undefined}
                      aria-haspopup="true"
                      onClick={handleClick}
                    >
                      <MoreVertIcon />
                    </IconButton>
                    <Menu
                      anchorEl={anchorEl}
                      id="account-menu"
                      open={open}
                      onClose={handleClose}
                      onClick={handleClose}
                      PaperProps={{
                        elevation: 0,
                        sx: {
                          overflow: "visible",
                          filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.1))",
                          mt: 1.5,
                          "& .MuiAvatar-root": {
                            width: 32,
                            height: 32,
                            ml: -0.5,
                            mr: 1,
                          },
                          "&:before": {
                            content: '""',
                            display: "block",
                            position: "absolute",
                            top: 0,
                            right: 14,
                            width: 10,
                            height: 10,
                            bgcolor: "background.paper",
                            transform: "translateY(-50%) rotate(45deg)",
                            zIndex: 0,
                          },
                        },
                      }}
                      transformOrigin={{ horizontal: "right", vertical: "top" }}
                      anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
                    >
                      <MenuItem>
                        <Edit /> Edit
                      </MenuItem>
                      <MenuItem>
                        <Delete /> Delete
                      </MenuItem>
                    </Menu>
                  </Box>
                </Box>
              </Paper>
            </Grid>
          );
        })}
      </Grid>
    </Paper>
  );
}

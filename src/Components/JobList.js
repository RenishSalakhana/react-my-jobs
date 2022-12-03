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
import { Add, Delete, Edit, TenMp } from "@mui/icons-material";
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
const [IsEdit,setEdit]=useState(false);
const [updateIndex,setUpdateIndex]=useState(0)
const updateModal=(IsEdit,UpdateIndex)=>{
setEdit(IsEdit);
setUpdateIndex(UpdateIndex)
}
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

  const [render, setRender] = React.useState("render");
  const reRender = () => {
    setRender((render === "render" ? "rerender" : "render"));
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
   
    try {
     const res = await axios.post("https://reqres.in/api/users", data);
      console.log({ res:res.data });
      if (Object.keys(res.data).length > 0) {
        if(IsEdit===true){
          var tempdata=dataArray
          tempdata[updateIndex]=res.data
          setdataArray(tempdata)
        }else{
          setdataArray([...dataArray, res.data]);
         
        }
        setdata({
          JobTitle: "",
          JobLocation: [],
          jobDescription: "",
          positiontype: "",
          Seniority: "",
          ClosestJobFunction: "",
          relevantHardSkill: [],
        })
      
      }
      
    } catch (error) {
      console.log(error);
    }

    console.log({ data });
  
  
  
  };
        
  const updateData = (index) => {
    console.log({index})
    console.log({dataArray})
    console.log({ind:dataArray[index]})
    setdata(dataArray[index]);
    setOpenModal(true);
  }

  const deleteData = (index)=>{
   var temp = dataArray;
   temp.splice(index, 1);
      setdataArray(temp);
      reRender();
  }
  
  return (
    <Paper elevation={4} sx={{ width: "80vw", height: "80vh", p: 5, m: 5 }}>
      <AddJobModal
        open={openModal}
        handleModalClose={handleModalClose}
        handleSubmit={handleSubmit}
        handlechange={handlechange}
        
        data={data}
        key={render}
        IsEdit={IsEdit}
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
              onClick={()=>{updateModal(false,0);handleModalOpen();}}
            >
              Add Jobs
            </Button>
          </Box>
          <Divider variant="middle" />
        </Grid>
        {dataArray.map((ind,dataindex) => {
          return (
            <Grid item xs={12} md={6} key={dataindex}>
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
                      id="long-button"
                   
                      onClick={()=>{updateModal(true,dataindex);updateData(dataindex);}}
                    >
                      <Edit />
                    </IconButton>
                    <IconButton
                      id="long-button"
                    
                      onClick={()=>deleteData(dataindex)}
                    >
                      <Delete />
                    </IconButton>
                   
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

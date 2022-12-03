import * as React from "react";
import {
  Grid,
  Typography,
  Button,
  Fade,
  Modal,
  Box,
  Backdrop,
  TextField,
  MenuItem,
  Container,
  FormControlLabel,
  Checkbox,
  Divider,
  Switch,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Chip from "@mui/material/Chip";
const styles = {
  position: "absolute",
  top: "50%",
  left: "50%",
  paddingTop: 1,
  transform: "translate(-50%, -50%)",
  width: { xs: "80%", md: "60%", lg: "70%" },
  height: { xs: 700, sm: 500 },
  bgcolor: "white",
  boxShadow: 24,
  borderRadius: 5,
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  pb: 0,
  p: 0,
  m: 0,
};

export default function AddJobModal({
  open,
  handleModalClose,
  handleSubmit,
  handlechange,
  data,
  IsEdit,
}) {
  const ITEM_HEIGHT = 48;
  const ITEM_PADDING_TOP = 8;
  const MenuProps = {
    PaperProps: {
      style: {
        maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
        width: 250,
      },
    },
  };

  const [render, setRender] = React.useState("render");
  const reRender = () => {
    setRender(render === "render" ? "rerender" : "render");
  };
  React.useEffect(() => {
    reRender();

    return () => {
      "second";
    };
  }, [open]);

  const LocationOptions = [
    "Ahmedabad",
    "Surat",
    "Vadodara",
    "Waghodia",
    "Lucknow",
    "Udaipur",
    "Indore",
  ];

  const RelevantHardSkillsOptions = [
    "Machine Learning",
    "Database and SQL",
    "Cloud computing",
    "Data Structures and Algorithms",
    "Software Development",
    "Software Testing",
    "JAVA",
    "ReactJS ",
    "NodeJS",
    "React Native",
    "MongoDB",
    "WebSocket.io",
    "Teamwork and Debugging",
  ];

  function getStyles(name, Location, theme) {
    return {
      fontWeight:
        data.JobLocation.indexOf(name) === -1
          ? theme.typography.fontWeightRegular
          : theme.typography.fontWeightMedium,
    };
  }

  const theme = useTheme();

  return (
    <>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={() => handleModalClose()}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
        key={render}
      >
        <Fade in={open}>
          <Container component="main" maxWidth="lg" sx={styles}>
            <Box
              component="form"
              validate
              onSubmit={handleSubmit}
              sx={{
                width: "100%",
                height: { xs: 700, sm: 500 },
                paddingLeft: 2,
                paddingRight: 2,
              }}
            >
              <Box
                sx={{
                  overflow: "auto",
                  height: { xs: 500, sm: 400 },
                  paddingTop: 2,
                }}
              >
                <Typography sx={{ pl: 10, p: 2, fontWeight: "bold" }}>
                  Add a Job
                </Typography>

                <Divider variant="middle" />
                <Grid container spacing={3} sx={{ padding: 2 }}>
                  <Grid item xs={12} sm={12} lg={12}>
                    <FormControlLabel
                      control={<Checkbox defaultChecked />}
                      label="Basic Details"
                    />
                  </Grid>
                  <Grid item xs={6} sm={6} lg={6}>
                    <TextField
                      autoComplete="given-name"
                      type="text"
                      name="JobTitle"
                      value={data.JobTitle}
                      required
                      fullWidth
                      id="Job Title"
                      label="Job Title"
                      onChange={handlechange}
                    ></TextField>
                  </Grid>
                  <Grid item xs={6} sm={6} lg={6}>
                    <TextField
                      autoComplete="given-name"
                      type="text"
                      name="positiontype"
                      value={data.positiontype}
                      select={true}
                      required
                      fullWidth
                      id="Position Type"
                      label="Position Type"
                      onChange={handlechange}
                    >
                      <MenuItem value={"fulltime"}>
                        Full-Time Employment
                      </MenuItem>
                      <MenuItem value={"partTime"}>
                        Part-Time Employment
                      </MenuItem>
                      <MenuItem value={"contractbase"}>Contract based</MenuItem>
                      <MenuItem value={"other"}>Others</MenuItem>
                    </TextField>
                  </Grid>
                  <Grid item xs={12} sm={12} lg={12}>
                    <FormControl fullWidth>
                      <InputLabel id="demo-multiple-chip-label">
                        Location
                      </InputLabel>
                      <Select
                        labelId="demo-multiple-chip-label"
                        id="demo-multiple-chip"
                        multiple
                        name="JobLocation"
                        value={data.JobLocation}
                        onChange={handlechange}
                        fullWidth
                        input={
                          <OutlinedInput
                            id="select-multiple-chip"
                            label="Location"
                          />
                        }
                        renderValue={(selected) => (
                          <Box
                            sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}
                          >
                            {selected.map((value) => (
                              <Chip key={value} label={value} />
                            ))}
                          </Box>
                        )}
                        MenuProps={MenuProps}
                      >
                        {LocationOptions.map((name) => (
                          <MenuItem
                            key={name}
                            value={name}
                            style={getStyles(name, Location, theme)}
                          >
                            {name}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </Grid>
                  <Grid item xs={12} sm={12} lg={12}>
                    <FormControlLabel
                      control={
                        <Switch
                          checked={true}
                          onChange={handlechange}
                          name="Remote Opportunity ?"
                        />
                      }
                      label="Remote Opportunity ?"
                    />
                  </Grid>
                  <Grid item xs={12} sm={12} lg={12}>
                    <TextField
                      id="outlined-multiline-static"
                      label="Job Description"
                      name="jobDescription"
                      value={data.jobDescription}
                      multiline
                      rows={4}
                      fullWidth
                      placeholder="Enter Job Description"
                      onChange={handlechange}
                    />
                  </Grid>
                </Grid>
                <Grid container spacing={3} sx={{ padding: 2 }}>
                  <Grid item xs={12} sm={12} lg={12}>
                    <FormControlLabel
                      control={<Checkbox defaultChecked />}
                      label="Matching Criteria"
                    />
                  </Grid>
                  <Grid item xs={6} sm={6} lg={6}>
                    <TextField
                      autoComplete="given-name"
                      type="text"
                      name="Seniority"
                      value={data.Seniority}
                      select={true}
                      required
                      fullWidth
                      id="Seniority"
                      label="Seniority"
                      onChange={handlechange}
                    >
                      <MenuItem value={"fulltime"}>Senior Developer</MenuItem>
                      <MenuItem value={"partTime"}>Junior Developer</MenuItem>
                      <MenuItem value={"partTime"}>Internship</MenuItem>

                      <MenuItem value={"partTime"}>Trainee</MenuItem>
                    </TextField>
                  </Grid>
                  <Grid item xs={6} sm={6} lg={6}>
                    <TextField
                      autoComplete="given-name"
                      type="text"
                      name="ClosestJobFunction"
                      value={data.ClosestJobFunction}
                      select={true}
                      required
                      fullWidth
                      id="Closest Job Function"
                      label="Closest Job Function"
                      autoFocus
                      onChange={handlechange}
                    >
                      <MenuItem value={"fulltime"}>
                        MERN Stack Developer
                      </MenuItem>
                      <MenuItem value={"partTime"}>iOS Developer</MenuItem>
                      <MenuItem value={"partTime"}>Data Analytics</MenuItem>
                      <MenuItem value={"partTime"}>QA Engineer</MenuItem>
                      <MenuItem value={"partTime"}>Business Analytics</MenuItem>
                      <MenuItem value={"partTime"}>HR Manager</MenuItem>
                      <MenuItem value={"partTime"}>
                        Project Coordinator
                      </MenuItem>
                      <MenuItem value={"partTime"}>
                        Front-End Developer(UI/UX)
                      </MenuItem>
                      <MenuItem value={"partTime"}>Back-End Developer</MenuItem>
                      <MenuItem value={"partTime"}>
                        Full-Stack Developer
                      </MenuItem>
                    </TextField>
                  </Grid>
                  <Grid item xs={12} sm={12} lg={12}>
                    <FormControl fullWidth>
                      <InputLabel id="demo-multiple-chip-label">
                        Relevant Hard Skill
                      </InputLabel>
                      <Select
                        labelId="demo-multiple-chip-label"
                        id="demo-multiple-chip"
                        name="relevantHardSkill"
                        multiple
                        value={data.relevantHardSkill}
                        onChange={handlechange}
                        fullWidth
                        input={
                          <OutlinedInput
                            id="select-multiple-chip"
                            name="relevantHardSkill"
                            label="Relevant Hard Skill"
                          />
                        }
                        renderValue={(selected) => (
                          <Box
                            sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}
                          >
                            {selected.map((value) => (
                              <Chip key={value} label={value} />
                            ))}
                          </Box>
                        )}
                        MenuProps={MenuProps}
                      >
                        {RelevantHardSkillsOptions.map((name) => (
                          <MenuItem
                            key={name}
                            value={name}
                            style={getStyles(name, Location, theme)}
                          >
                            {name}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </Grid>
                  <Grid item xs={12} sm={12} lg={12}>
                    <FormControlLabel
                      control={
                        <Switch
                          checked={true}
                          onChange={handlechange}
                          name="Is Visa Sponsorship Available ?"
                        />
                      }
                      label="Is Visa Sponsorship Available ?"
                    />
                  </Grid>
                </Grid>
              </Box>
              <Grid container spacing={1} sx={{ padding: 2 }}>
                <Grid item xs={6} sm={6} lg={6}>
                  <Button
                    fullWidth
                    color="error"
                    variant="contained"
                    sx={{ mt: 1, mb: 1 }}
                    onClick={() => {
                      handleModalClose();
                    }}
                  >
                    Cancel
                  </Button>
                </Grid>
                <Grid item xs={6} sm={6} lg={6}>
                  <Button
                    type="submit"
                    fullWidth
                    color="primary"
                    variant="contained"
                    sx={{ mt: 1, mb: 1 }}
                    onClick={(e) => {
                      handleSubmit(e);
                      handleModalClose();
                    }}
                  >
                    {IsEdit ? "Edit" : "Save"}
                  </Button>
                </Grid>
              </Grid>
            </Box>
          </Container>
        </Fade>
      </Modal>
    </>
  );
}

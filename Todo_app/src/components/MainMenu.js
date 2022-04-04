import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import AssignmentIcon from "@mui/icons-material/Assignment";
import Button from "@mui/material/Button";
import MenuItem from "@mui/material/MenuItem";
import {
  showAll,
  hideAllDoneTasksAction,
  toggleSortAZ,
} from "../redux/actions/Action.js";
import { deleteAllDoneTasks } from "../redux/actions/Action.js";
import { useDispatch, useSelector } from "react-redux";

const MainMenu = ({ tasksToShow, mutate }) => {
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const dispatch = useDispatch();
  const doShowALL = useSelector((state) => state.doShowALL);
  const doSortAZ = useSelector((state) => state.doSortAZ);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              color="inherit"
              onClick={handleOpenNavMenu}
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: "block", md: "none" },
              }}
            >
              <MenuItem>
                {doShowALL ? (
                  <Typography
                    textAlign="center"
                    onClick={() => dispatch(hideAllDoneTasksAction())}
                  >
                    Hide All Done Tasks
                  </Typography>
                ) : (
                  <Typography
                    textAlign="center"
                    onClick={() => dispatch(showAll())}
                  >
                    Show All
                  </Typography>
                )}
              </MenuItem>
              <MenuItem>
                <Typography
                  textAlign="center"
                  onClick={() =>
                    dispatch(deleteAllDoneTasks(tasksToShow, mutate))
                  }
                >
                  Delete All Done Tasks
                </Typography>
              </MenuItem>
              <MenuItem>
                <Typography
                  textAlign="center"
                  onClick={() => dispatch(toggleSortAZ(doSortAZ))}
                >
                  {doSortAZ ? "stop sort" : "sort AZ"}
                </Typography>
              </MenuItem>
            </Menu>
          </Box>
          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            {doShowALL ? (
              <Button
                sx={{ my: 2, color: "white", display: "block" }}
                onClick={() => dispatch(hideAllDoneTasksAction())}
              >
                Hide All Done Tasks
              </Button>
            ) : (
              <Button
                sx={{ my: 2, color: "white", display: "block" }}
                onClick={() => dispatch(showAll())}
              >
                Show All
              </Button>
            )}
            <Button
              sx={{ my: 2, color: "white", display: "block" }}
              onClick={() => dispatch(deleteAllDoneTasks(tasksToShow, mutate))}
            >
              Delete All Done Tasks
            </Button>
            <Button
              sx={{ my: 2, color: "white", display: "block" }}
              onClick={() => dispatch(toggleSortAZ(doSortAZ))}
            >
              {doSortAZ ? "stop sort" : "sort AZ"}
            </Button>
          </Box>

          <Box sx={{ flexGrow: 0 }}>
            <IconButton disabled sx={{ p: 0 }}>
              <AssignmentIcon fontSize="medium" sx={{ color: "white" }} />
            </IconButton>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default MainMenu;

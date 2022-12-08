import * as React from "react";
import { styled, alpha } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import InputBase from "@mui/material/InputBase";
import { Avatar } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import logo from "../assets/logo.png";
import title from "../assets/title.png";
import { useNavigate, Link } from "react-router-dom";

const Search = styled("div")(({ theme }) => ({
  position: "sticky",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  width: "60%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(1),
    width: "auto",
  },
  [theme.breakpoints.down(480)]: {
    marginLeft: theme.spacing(5),
    width: "auto",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      width: "30ch",
      "&:focus": {
        width: "40ch",
      },
    },
    [theme.breakpoints.down("sm")]: {
      width: "15ch",
      "&:focus": {
        width: "20ch",
      },
    },
  },
}));

const Header = () => {
  const navigate = useNavigate();

  const keyPressed = (e) => {
    if (e.keyCode === 13) {
      const query = e.target.value;
      navigate(`/search?q=${query}`);
    }
  };
  return (
    <>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar sx={{ bgcolor: "#023e8a" }} position="sticky">
          <Toolbar>
            <Link to="/">
              <Avatar
                src={logo}
                sx={{
                  width: 56,
                  height: 56,
                  outline: "1px solid transparent",
                  padding: "5px",
                  mr: "0.5rem",
                }}
                alt="Cinematic logo"
              />
            </Link>
            <Box
              component="image"
              sx={{
                flexGrow: 1,
                display: { xs: "none", sm: "block" },
              }}
            >
              <img src={title} style={{ maxHeight: "2.5rem" }} alt="title" />
            </Box>

            <Search>
              <SearchIconWrapper>
                <SearchIcon />
              </SearchIconWrapper>
              <StyledInputBase
                placeholder="Search…"
                inputProps={{ "aria-label": "search" }}
                onKeyUp={keyPressed}
              />
            </Search>
          </Toolbar>
        </AppBar>
      </Box>
    </>
  );
};
export default Header;

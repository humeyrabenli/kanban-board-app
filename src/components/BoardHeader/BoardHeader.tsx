import TextField from "@mui/material/TextField";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import {
  AppBar,
  Box,
  IconButton,
  Toolbar,
  Typography,
  Menu,
  MenuItem,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import SettingsIcon from "@mui/icons-material/Settings";
import SaveIcon from "@mui/icons-material/Save";
import { BoardHeaderProps } from "./BoardHeader.types";
import { boardHeaderStyles } from "./BoardHeader.styles";
import { useToggle } from "../../hooks/useToggle";
import { board } from "../../services/http/patika/endpoints/board";

const BoardHeader = (props: BoardHeaderProps) => {
  const { boardItem, handleBoardTitleChange, handleSaveBoardTitle } = props;
  const settingsMenu = useToggle();
  const navigate = useNavigate();

  const navigateToBoards = () => {
    navigate("/");
  };

  const deleteBoard = () => {
    board.deleteBoard(boardItem.id).then((res) => res.data);
    navigate("/");
  };

  return (
    <Box sx={boardHeaderStyles.appBarbox}>
      <AppBar position="fixed">
        <Toolbar>
          <Box onClick={navigateToBoards} sx={boardHeaderStyles.arrowIconBox}>
            <ArrowBackIcon />
            <Typography variant="body1" component="div">
              Boards
            </Typography>
          </Box>

          <Box sx={boardHeaderStyles.editBox}>
            <TextField
              id="outlined-name"
              sx={{ input: boardHeaderStyles.textfieldInput }}
              color="info"
              name="title"
              value={boardItem?.title}
              onChange={handleBoardTitleChange}
            />
            <IconButton onClick={handleSaveBoardTitle} color="inherit">
              <SaveIcon />
            </IconButton>
          </Box>
          <Box sx={boardHeaderStyles.settingsIconBox}>
            <IconButton color="inherit" onClick={settingsMenu.handleToggle}>
              <SettingsIcon />
            </IconButton>
            <Menu
              anchorEl={settingsMenu.anchorEl}
              open={settingsMenu.open}
              onClose={settingsMenu.handleClose}
            >
              <MenuItem onClick={deleteBoard}>Delete Board</MenuItem>
            </Menu>
          </Box>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default BoardHeader;

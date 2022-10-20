import { Box, Button, Popover, TextField, Paper } from "@mui/material";
import React, { useState, useRef } from "react";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import Menu from "@mui/material/Menu";
import { list } from "../../services/http/patika/endpoints/list";
import { useScrumboardAppContext } from "../../contexts/ScrumboardAppContext/ScrumboardAppContext";
import { ListType } from "../../contexts/ScrumboardAppContext/types";
import { useToggle } from "../../hooks/useToggle";
import { CreateBoardListProps } from "./CreateBoardList.types";
import { createBoardListStyles } from "./CreateBoardList.styles";

const CreateBoardList = (props: CreateBoardListProps) => {
  const { boardId } = props;
  const [name, setName] = React.useState("");
  const addListMenu = useToggle();
  const scrumboardContext = useScrumboardAppContext();

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
  };

  const handleAddList = (list: ListType) => {
    scrumboardContext.dispatches.getListByBoard(boardId);
    scrumboardContext.dispatches.addList(list);
  };

  const listCreate = () => {
    list.createList({ title: name, boardId: boardId }).then(({ data }) => {
      handleAddList(data);
    });
  };

  const handleAddClick = () => {
    listCreate();
    addListMenu.handleClose();
    setName("");
  };

  return (
    <div>
      <Paper sx={createBoardListStyles.paper}>
        <Button
          onClick={addListMenu.handleToggle}
          startIcon={<AddCircleOutlineIcon />}
          sx={createBoardListStyles.addListButton}
        >
          Add a list
        </Button>
        <Menu
          anchorEl={addListMenu.anchorEl}
          disableEnforceFocus
          disableRestoreFocus
          open={addListMenu.open}
          PaperProps={{ sx: createBoardListStyles.paperProps }}
          onClose={addListMenu.handleClose}
          anchorOrigin={{
            vertical: "top",
            horizontal: "left",
          }}
          transformOrigin={{
            vertical: "top",
            horizontal: "left",
          }}
        >
          <Box
            component="form"
            sx={createBoardListStyles.textfieldBox}
            noValidate
            autoComplete="off"
          >
            <TextField
              id="outlined-name"
              label="List title*"
              value={name}
              onChange={handleChange}
              autoFocus
              size="small"
            />
          </Box>
          <Button
            variant="contained"
            size="small"
            sx={createBoardListStyles.addButton}
            onClick={handleAddClick}
          >
            Add
          </Button>
        </Menu>
      </Paper>
    </div>
  );
};

export default CreateBoardList;

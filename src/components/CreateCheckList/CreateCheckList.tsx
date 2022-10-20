import React from "react";
import Menu from "@mui/material/Menu";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { CreateCheckListProps } from "./CreateCheckList.types";
import { createCheckListStyles } from "./CreateCheckList.styles";

const CreateCheckList = (props: CreateCheckListProps) => {
  const { open, handleClose, anchorEl, name, handleChange, handleAddClick } =
    props;

  return (
    <div>
      <Menu
        anchorEl={anchorEl}
        disableEnforceFocus
        disableRestoreFocus
        open={open}
        PaperProps={{ sx: createCheckListStyles.paperPropsMenu }}
        onClose={handleClose}
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
          sx={{
            "& > :not(style)": { m: 1, width: 300 },
          }}
          noValidate
          autoComplete="off"
        >
          <TextField
            id="outlined-name"
            label="Checklist Title*"
            value={name}
            onChange={handleChange}
            autoFocus
            size="small"
          />
        </Box>
        <Button
          variant="contained"
          size="small"
          sx={{ ml: 1 }}
          onClick={handleAddClick}
        >
          Add
        </Button>
      </Menu>
    </div>
  );
};

export default CreateCheckList;

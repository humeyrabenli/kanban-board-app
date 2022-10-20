import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import CloseIcon from "@mui/icons-material/Close";
import IconButton from "@mui/material/IconButton";
import DialogContent from "@mui/material/DialogContent";
import EventIcon from "@mui/icons-material/Event";
import CheckBoxOutlinedIcon from "@mui/icons-material/CheckBoxOutlined";
import DialogTitle from "@mui/material/DialogTitle";
import { CheckListType } from "../../contexts/ScrumboardAppContext/types";
import CreateCheckList from "../CreateCheckList/CreateCheckList";
import CheckList from "../CheckList/CheckList";
import { checklist } from "../../services/http/patika/endpoints/checklist";
import { useScrumboardAppContext } from "../../contexts/ScrumboardAppContext/ScrumboardAppContext";
import { useToggle } from "../../hooks/useToggle";
import { EditCardModalProps } from "./EditCardModal.types";
import { editCardModalStyles } from "./EditCardModal.styles";

const EditCardModal = (props: EditCardModalProps) => {
  const { open, handleClose, cardItem, handleCardInputChange, handleSave } =
    props;
  const [name, setName] = React.useState("");

  const checkListMenu = useToggle();
  const scrumboardContext = useScrumboardAppContext();

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
  };

  const handleAddCheckList = (checklist: CheckListType, id: number) => {
    scrumboardContext.dispatches.addCheckList(checklist, id);
  };

  const handleAddClick = () => {
    checklist
      .createCheckList({ title: name, cardId: cardItem.id, items: [] })
      .then(({ data }) => {
        handleAddCheckList(data, cardItem.id);
      });
    checkListMenu.handleClose();
    setName("");
  };

  return (
    <div>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle sx={editCardModalStyles.dialogTitle}>
          <IconButton>
            <EventIcon />
          </IconButton>
          <IconButton onClick={checkListMenu.handleToggle}>
            <CheckBoxOutlinedIcon />
          </IconButton>
          <IconButton onClick={handleClose} sx={editCardModalStyles.closeIcon}>
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent>
          <Box>
            <TextField
              label="Card title*"
              name="title"
              value={cardItem.title}
              onChange={handleCardInputChange}
              autoFocus
              size="small"
              sx={editCardModalStyles.textField}
            />
            <TextField
              label="Description"
              multiline
              name="description"
              rows={4}
              onChange={handleCardInputChange}
              value={cardItem.description}
              sx={editCardModalStyles.textField}
            />
            <Button
              variant="outlined"
              sx={editCardModalStyles.saveButton}
              onClick={handleSave}
            >
              Save
            </Button>
          </Box>
          {cardItem.checklists.map((item: any) => (
            <CheckList checklist={item} />
          ))}
        </DialogContent>

        <CreateCheckList
          anchorEl={checkListMenu.anchorEl}
          open={checkListMenu.open}
          handleClose={checkListMenu.handleClose}
          name={name}
          handleChange={handleChange}
          handleAddClick={handleAddClick}
        />
      </Dialog>
    </div>
  );
};

export default EditCardModal;

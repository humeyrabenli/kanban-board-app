import {
  Box,
  Button,
  Card,
  CardContent,
  Paper,
  Typography,
  Divider,
  Menu,
  TextField,
} from "@mui/material";
import React, { useState, useEffect } from "react";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import { card } from "../../services/http/patika/endpoints/card";
import { useScrumboardAppContext } from "../../contexts/ScrumboardAppContext/ScrumboardAppContext";
import CardItem from "../CardItem/CardItem";
import { Draggable, Droppable } from "react-beautiful-dnd";
import { ListProps } from "./List.types";
import { useToggle } from "../../hooks/useToggle";
import { listStyles } from "./List.styles";
import { getListById } from "../../services/http/patika/endpoints/list/methods";

const List = (props: ListProps) => {
  const { listItem, index, boardId } = props;
  const [listState, setListState] = useState<any>();
  const [name, setName] = React.useState("");
  const scrumboardContext = useScrumboardAppContext();
  const cardTitleMenu = useToggle();

  const getList = () => {
    try {
      getListById(listItem.id).then((res) => {
        setListState(res.data);
      });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getList();
  }, []);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
  };

  const handleAddCard = async (card: any) => {
    await scrumboardContext.dispatches.addCard(card);
    await getList();
  };

  const handleAddClick = () => {
    card.createCard({ title: name, listId: listItem.id }).then(({ data }) => {
      handleAddCard(data);
    });
    cardTitleMenu.handleClose();
    setName("");
    scrumboardContext.dispatches.getListByBoard(boardId);
  };

  return (
    <div>
      <Draggable draggableId={`list-${listItem.id}`} index={index}>
        {(provided) => (
          <Card
            sx={listStyles.card}
            {...provided.draggableProps}
            ref={provided.innerRef}
          >
            <CardContent>
              <Typography
                variant="subtitle2"
                sx={{ fontWeight: 600 }}
                gutterBottom
                {...provided.dragHandleProps}
              >
                {listItem.title}
              </Typography>

              <Droppable droppableId={String(listItem.id)}>
                {(provided) => (
                  <Box ref={provided.innerRef} {...provided.droppableProps}>
                    {listState !== undefined &&
                      listState.cards.map((item: any, index: any) => (
                        <>
                          <CardItem
                            cardItem={item}
                            index={index}
                            getList={getList}
                          />
                        </>
                      ))}
                    {provided.placeholder}
                  </Box>
                )}
              </Droppable>
            </CardContent>
            <Divider />

            <Paper sx={listStyles.paper}>
              <Button
                onClick={cardTitleMenu.handleToggle}
                startIcon={<AddCircleOutlineIcon />}
                sx={listStyles.addButton}
              >
                Add a card
              </Button>
              <Menu
                anchorEl={cardTitleMenu.anchorEl}
                disableEnforceFocus
                disableRestoreFocus
                open={cardTitleMenu.open}
                PaperProps={{ sx: listStyles.menuPaperProps }}
                onClose={cardTitleMenu.handleClose}
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
                    "& > :not(style)": { ml: 1, mt: 1 },
                  }}
                  noValidate
                  autoComplete="off"
                >
                  <TextField
                    id="outlined-name"
                    label="Card title*"
                    value={name}
                    onChange={handleChange}
                    autoFocus
                    size="small"
                    sx={{ width: 280 }}
                  />
                </Box>
                <Button
                  variant="contained"
                  size="small"
                  sx={{ ml: 1, mt: 1 }}
                  onClick={handleAddClick}
                >
                  Add
                </Button>
              </Menu>
            </Paper>
          </Card>
        )}
      </Draggable>
    </div>
  );
};

export default List;

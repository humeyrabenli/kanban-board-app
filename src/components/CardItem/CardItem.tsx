import React, { useState } from "react";
import { Card, CardContent, Typography, Divider } from "@mui/material";
import EditCardModal from "../EditCardModal/EditCardModal";
import { CardType } from "../../contexts/ScrumboardAppContext/types";
import { card } from "../../services/http/patika/endpoints/card";
import { useScrumboardAppContext } from "../../contexts/ScrumboardAppContext/ScrumboardAppContext";
import { Draggable } from "react-beautiful-dnd";
import { CardItemProps } from "./CardItem.types";
import { cardItemStyles } from "./CardItem.styles";
import { getCardById } from "../../services/http/patika/endpoints/card/methods";

const CardItem = (props: CardItemProps) => {
  const { cardItem, index, getList } = props;
  const [openModal, setOpenModal] = useState(false);
  const [cardItemState, setCardItemState] = useState<CardType>();
  const scrumboardContext = useScrumboardAppContext();

  const getCard = () => {
    try {
      getCardById(cardItem.id).then((res) => {
        setCardItemState(res.data);
      });
    } catch (error) {
      console.log(error);
    }
  };

  const handleClickOpen = () => {
    setOpenModal(true);
    getCard();
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  const handleCardInputChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const name = event.target.name;
    cardItemState !== undefined &&
      setCardItemState({ ...cardItemState, [name]: event.target.value });
  };

  const handleSave = () => {
    cardItemState !== undefined &&
      card
        .updateCard(cardItemState.id, {
          title: cardItemState.title,
          description:
            cardItemState.description == null ? "" : cardItemState.description,
        })
        .then(() =>
          scrumboardContext.dispatches.updateCard(cardItemState.id, {
            title: cardItemState.title,
            description: cardItemState.description,
          })
        );
    getList();
  };

  return (
    <div>
      <Draggable draggableId={String(cardItem.id)} index={index}>
        {(provided) => (
          <Card
            sx={cardItemStyles.card}
            onClick={handleClickOpen}
            {...provided.draggableProps}
            ref={provided.innerRef}
          >
            <CardContent {...provided.dragHandleProps}>
              <Typography
                variant="subtitle2"
                sx={cardItemStyles.title}
                gutterBottom
              >
                {cardItem.title}
              </Typography>
            </CardContent>
            <Divider />
          </Card>
        )}
      </Draggable>
      {cardItemState !== undefined && (
        <EditCardModal
          open={openModal}
          handleClose={handleCloseModal}
          cardItem={cardItemState}
          handleCardInputChange={handleCardInputChange}
          handleSave={handleSave}
        />
      )}
    </div>
  );
};

export default CardItem;

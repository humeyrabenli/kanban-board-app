import { Box } from "@mui/material";
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { DragDropContext, Droppable, DropResult } from "react-beautiful-dnd";

import BoardHeader from "../../components/BoardHeader/BoardHeader";
import CreateBoardList from "../../components/CreateBoardList/CreateBoardList";
import { useScrumboardAppContext } from "../../contexts/ScrumboardAppContext/ScrumboardAppContext";
import { BoardType } from "../../contexts/ScrumboardAppContext/types";
import { getBoardById } from "../../services/http/patika/endpoints/board/methods";
import List from "../../components/List/List";
import { list } from "../../services/http/patika/endpoints/list";
import { card } from "../../services/http/patika/endpoints/card";
import { board } from "../../services/http/patika/endpoints/board";

const BoardPage = () => {
  const [boardState, setBoardState] = useState<BoardType>();
  const { boardId } = useParams();
  const newvalue = boardId !== undefined ? parseInt(boardId) : 0;

  const scrumboardContext = useScrumboardAppContext();

  useEffect(() => {
    scrumboardContext.dispatches.getListByBoard(newvalue);
  }, [newvalue]);

  const getBoard = () => {
    try {
      getBoardById(newvalue).then((res) => {
        setBoardState(res.data);
      });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getBoard();
  }, [newvalue]);

  const handleBoardTitleChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const name = event.target.name;
    boardState !== undefined &&
      setBoardState({ ...boardState, [name]: event.target.value });
  };

  const handleSaveBoardTitle = () => {
    boardState !== undefined &&
      board
        .update(boardState.id, {
          title: boardState.title,
        })
        .then(() =>
          scrumboardContext.dispatches.updateBoard(boardState.id, {
            title: boardState.title,
          })
        );
  };

  const handleChangeListOrder = (
    data: any,
    listId: number,
    boardId: number
  ) => {
    scrumboardContext.dispatches.updateListOrder(data, listId);
    scrumboardContext.dispatches.getListByBoard(boardId);
  };
  const handleChangeCardOrder = (data: any, cardId: number, listId: number) => {
    scrumboardContext.dispatches.updateCardOrder(data, cardId, listId);
    scrumboardContext.dispatches.getListByBoard(boardId);
  };

  const changeListOrder = (boardId: number, newListIDs: number[]) => {
    newListIDs.forEach((listId, index) => {
      list.update(listId, { order: index + 1 }).then(({ data }) => {
        handleChangeListOrder(data, listId, boardId);
      });
    });
  };

  const changeCardOrder = (sourceListID: number, newCardIDs: number[]) => {
    newCardIDs.forEach((cardId, index) => {
      card.update(cardId, { order: index + 1 }).then(({ data }) => {
        handleChangeCardOrder(data, cardId, sourceListID);
      });
    });
  };

  const onDragEnd = (result: DropResult) => {
    const { destination, source, draggableId, type } = result;

    if (!destination) {
      return;
    }

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    if (type === "list") {
      // Handle list drag-drop
      const newListIDs = Array.from(
        scrumboardContext.state.lists.map((item) => item.id)
      );

      newListIDs.splice(source.index, 1);
      newListIDs.splice(
        destination.index,
        0,
        Number(draggableId.match(/[0-9]+$/)![0])
      );
     
      changeListOrder(newvalue, newListIDs);
      return;
    } else {
      const sourceListID = Number(source.droppableId.match(/[0-9]+$/)![0]);
      const targetListID = Number(destination.droppableId.match(/[0-9]+$/)![0]);

      if (sourceListID === targetListID) {
        const newCards = scrumboardContext.state.lists.find(
          (item) => item.id === sourceListID
        );
        //@ts-ignore
        const newCardIDs = Array.from(newCards.cards.map((item) => item.id));

        newCardIDs.splice(source.index, 1);
        newCardIDs.splice(
          destination.index,
          0,
          Number(draggableId.match(/[0-9]+$/)![0])
        );

        //@ts-ignore
        changeCardOrder(sourceListID, newCardIDs);
      } else {
        const newSourceCards = scrumboardContext.state.lists.find(
          (item) => item.id === sourceListID
        );
        const newTargetCards = scrumboardContext.state.lists.find(
          (item) => item.id === targetListID
        );

        //@ts-ignore
        const newSourceCardIDs = Array.from(
          //@ts-ignore
          newSourceCards.cards.map((item) => item.id)
        );
        //@ts-ignore
        const newTargetCardIDs = Array.from(
          //@ts-ignore
          newTargetCards.cards.map((item) => item.id)
        );

        const cardID = newSourceCardIDs.splice(source.index, 1)[0];
        newTargetCardIDs.splice(destination.index, 0, cardID);
      }

      return;
    }
  };
  return (
    <>
      <BoardHeader
        boardItem={boardState}
        handleBoardTitleChange={handleBoardTitleChange}
        handleSaveBoardTitle={handleSaveBoardTitle}
      />
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="board" direction="horizontal" type="list">
          {(provided) => (
            <Box
              sx={{ display: "flex", mt: 10 }}
              {...provided.droppableProps}
              ref={provided.innerRef}
            >
              {scrumboardContext.state.lists.map((listItem, index) => (
                <List
                  listItem={listItem}
                  index={index}
                  key={listItem.id}
                  boardId={newvalue}
                />
              ))}
              {provided.placeholder}

              <CreateBoardList boardId={newvalue} />
            </Box>
          )}
        </Droppable>
      </DragDropContext>
    </>
  );
};

export default BoardPage;

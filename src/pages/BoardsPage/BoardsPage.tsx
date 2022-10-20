import React, { FC, useEffect, useState } from "react";
import { useLoginContext } from "../../contexts/LoginContext/LoginContext";
import LogoutIcon from "@mui/icons-material/Logout";
import { AppBar, Box, Button, Grid } from "@mui/material";

import Header from "../../components/Header/Header";
import BoardTitleCard from "../../components/BoardTitleCard/BoardTitleCard";
import { BoardListResponse } from "../../services/http/patika/endpoints/board/types";
import { useNavigate } from "react-router-dom";
import { board } from "../../services/http/patika/endpoints/board";
import { useScrumboardAppContext } from "../../contexts/ScrumboardAppContext/ScrumboardAppContext";
import { BoardType } from "../../contexts/ScrumboardAppContext/types";

export type BoardsPageProps = {};
const BoardsPage: FC<BoardsPageProps> = (props) => {
  const [boardTitle, setBoardTitle] = useState<string>("Untitled Board");
  const scrumboardContext = useScrumboardAppContext();


  useEffect(()=>{
    board.getBoardList().then(({ data }) => {
      scrumboardContext.setBoards(data);
    });
  },[])

  const navigate = useNavigate();

  const handleAddBoard = (board: BoardType) => {
    scrumboardContext.dispatches.addBoard(board);
  };

  const handleAddClick = () => {
    board.createBoard({ title: boardTitle }).then(({ data }) => {
      handleAddBoard(data);
    });
  };
  console.log("hello", scrumboardContext.state);

  return (
    <>
      <Header />
      <Box sx={{ padding: "20px 100px", display: "flex" }}>
        <Grid container spacing={2}>
          {scrumboardContext.state.boards.map((board) => (
            <BoardTitleCard
              key={board.id}
              title={board.title}
              handleBoardClick={() => navigate(`/board/${board.id}`)}
            />
          ))}
          <BoardTitleCard
            title="Add New Board"
            isNewBoard
            handleBoardClick={handleAddClick}
          />
        </Grid>
      </Box>
    </>
  );
};

export default BoardsPage;

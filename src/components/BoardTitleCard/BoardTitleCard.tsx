import * as React from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import AddIcon from "@mui/icons-material/Add";
import DashboardIcon from "@mui/icons-material/Dashboard";
import { BoardTitleCardProps } from "./BoardTitle.types";
import { boardTitleCardStyles } from "./BoardTitleCard.styles";

const BoardTitleCard = (props: BoardTitleCardProps) => {
  const { isNewBoard = false, title, handleBoardClick } = props;

  return (
    <Box sx={boardTitleCardStyles.cardBox}>
      <Card sx={boardTitleCardStyles.card} onClick={handleBoardClick}>
        <CardContent sx={boardTitleCardStyles.cardContent}>
          <Box sx={boardTitleCardStyles.iconBox}>
            <IconButton>
              {isNewBoard ? (
                <AddIcon sx={boardTitleCardStyles.addIcon} />
              ) : (
                <DashboardIcon sx={boardTitleCardStyles.dashboardIcon} />
              )}
            </IconButton>
            <Typography variant="h6" component="div">
              {title}
            </Typography>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
};

export default BoardTitleCard;

import { Box, Typography, LinearProgress } from "@mui/material";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import { CheckListItemProps } from "./CreateCheckList.types";
import { checkListStyles } from "./CheckList.styles";

const CheckList = (props: CheckListItemProps) => {
  const { checklist } = props;

  let completed = 0;
  const total = checklist.items !== undefined && checklist.items.length;
  let progress = 0;

  if (checklist.items !== undefined) {
    if (completed === 0) progress = 0;
    else progress = (completed / checklist?.items.length) * 100;
  }

  return (
    <Box sx={checkListStyles.checklistBox}>
      <Box sx={checkListStyles.titleBox}>
        <CheckCircleOutlineIcon />
        <Typography variant="subtitle2" sx={checkListStyles.title}>
          {checklist.title}
        </Typography>
      </Box>
      <Box sx={checkListStyles.progressBox}>
        <Typography>{`${completed}/${total}`}</Typography>
        <LinearProgress
          sx={checkListStyles.linearProgress}
          variant="determinate"
          value={progress}
        />
      </Box>
    </Box>
  );
};

export default CheckList;

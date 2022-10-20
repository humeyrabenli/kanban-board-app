export type BoardHeaderProps = {
    boardItem: BoardType | undefined;
    handleBoardTitleChange:(event: React.ChangeEvent<HTMLInputElement>) => void;
    handleSaveBoardTitle:() => void;
  };
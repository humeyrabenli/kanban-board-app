export type EditCardModalProps = {
  open: boolean;
  cardItem: CardType;
  handleClose: () => void;
  handleCardInputChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleSave: () => void;
};

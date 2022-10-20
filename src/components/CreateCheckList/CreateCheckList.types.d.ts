export type CreateCheckListProps = {
    open: boolean;
    handleClose: () => void;
    anchorEl: HTMLElement | null;
    name:string;
    handleChange:(event: React.ChangeEvent<HTMLInputElement>) => void;
    handleAddClick:() => void;
    
  };
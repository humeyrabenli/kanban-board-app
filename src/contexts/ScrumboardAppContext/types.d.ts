export type BoardType = {
  id: number;
  ownerId: number;
  title: string;
  updatedAt: string;
  createdAt: string;
};
export type ListType = {
  id: number;
  boardId: number;
  title: string;
  updatedAt: string;
  createdAt: string;
};

export type LabelType = {
  id: number;
  title: string;
  color: string;
  createdAt: string;
  updatedAt: string;
  CardLabel: {
    id: number;
    createdAt: string;
    updatedAt: string;
    cardId: number;
    labelId: number;
  };
};
export type CheckListType={
  id:number;
  title:string;
  createdAt:string;
  updatedAt:string;
  cardId:number;
  items?:[]
}
export type CardType = {
  id: number;
  title: string;
  listId: number;
  updatedAt: string;
  createdAt: string;
  order: number;
  description?: string;
  duedate?: string;
  labels: LabelType[];
  checklists: CheckListType[];
  comments: any[];
};

export type StateType = {
 
  boards: Array<BoardType>;
  lists: Array<ListType>;
  cards: Array<CardType>;
  checklist:Array<CheckListType>
};

export type ContextType = {
  state: StateType;
  dispatches: any;
  setBoards?:any;
};

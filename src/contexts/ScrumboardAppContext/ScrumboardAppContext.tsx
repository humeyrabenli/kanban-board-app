import {
  Children,
  createContext,
  FC,
  PropsWithChildren,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { board } from "../../services/http/patika/endpoints/board";
import { card } from "../../services/http/patika/endpoints/card";
import { list } from "../../services/http/patika/endpoints/list";
import {
  StateType,
  ContextType,
  BoardType,
  ListType,
  CardType,
  CheckListType,
} from "./types";

export const initialState: StateType = {
  boards: [],
  lists: [],
  cards: [],
  checklist: [],
};

export const ScrumboardAppContext = createContext<ContextType>({
  dispatches: {},
  state: initialState,
});

export const ScrumboardAppProvider: FC<PropsWithChildren> = ({ children }) => {
  const [state, setState] = useState<StateType>(initialState);

  const setBoards = useCallback(
    (boards: Array<BoardType>) => {
      setState((prev) => ({ ...prev, boards }));
    },
    [state]
  );
  const dispatches: ContextType["dispatches"] = {};
  useEffect(() => {
    card.getCards().then(({ data }) => {
      setState((prev) => ({ ...prev, cards: data }));
    });
  }, []);


  dispatches.getListByBoard = (boardId: number) => {
    list.getList(boardId).then(({ data }) => {
      setState((prev) => ({ ...prev, lists: data }));
    });
  };
  dispatches.getCards = () => {
    card.getCards().then(({ data }) => {
      setState((prev) => ({ ...prev, cards: data }));
    });
  };

  dispatches.addBoard = (board: BoardType) => {
    setState((prev) => ({
      ...prev,
      boards: [...prev.boards, board],
    }));
  };
  dispatches.addList = (list: ListType) => {
    setState((prev) => ({
      ...prev,
      lists: [...prev.lists, list],
    }));
  };
  dispatches.addCheckList = (checklist: CheckListType, id: number) => {
    console.log("addchecklist",checklist,id)
    console.log("cardstate",state.cards)

    setState((prev) => ({
      ...prev,
      cards: prev.cards.map((card) => ({
        ...card,
        checklists:
          id === card.id ? [...card.checklists, checklist] : card.checklists,
      })),
    }));
  };
  dispatches.addCard = (card: any) => {
    setState((prev) => ({
      ...prev,
      cards: [...prev.cards, card],
    }));
  };
  dispatches.updateCard = (id: number, card: any) => {
    setState((prev) => ({
      ...prev,
      cards: prev.cards.map((item) => ({
        ...item,
        title: id === item.id ? card.title : item.title,
        description: id === item.id ? card.description : item.description,
      })),
    }));
  };

  dispatches.updateBoard = (id: number, board: any) => {
    setState((prev) => ({
      ...prev,
      boards: prev.boards.map((item) => ({
        ...item,
        title: id === item.id ? board.title : item.title,
      })),
    }));
  };
  dispatches.updateListOrder = (data: any, listId: number) => {
    console.log("deneme", data);
    setState((prev) => ({
      ...prev,
      lists: prev.lists.map((item) => ({
        ...item,
        //@ts-ignore
        order: listId === item.id ? data.order : item.order,
      })),
    }));
  };
  dispatches.updateCardOrder = (data: any, cardId: number, listId: number) => {
    setState((prev) => ({
      ...prev,
      lists: prev.lists.map((item) => ({
        ...item,
        //@ts-ignore
        order: listId === item.id ? data.order : item.order,
      })),
    }));

    setState((prev) => ({
      ...prev,
      lists: prev.lists.map((list) => ({
        ...list,
        //@ts-ignore
        cards:
          listId === list.id
            ? //@ts-ignore
              list.cards.map((card) => ({
                ...card,
                order: cardId === card.id ? data.order : card.order,
              }))
            : //@ts-ignore
              list.cards,
      })),
    }));
  };

  return (
    <ScrumboardAppContext.Provider
      value={{
        state,
        dispatches,
        setBoards,
      }}
    >
      {children}
    </ScrumboardAppContext.Provider>
  );
};

export const useScrumboardAppContext = () => {
  return useContext(ScrumboardAppContext);
};

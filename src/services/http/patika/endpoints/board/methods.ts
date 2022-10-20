import service from "../../instance";
import {
  BoardListResponse,
  CreateBoardRequestPayload,
  CreateBoardResponseType,
} from "./types";

export type BoardRequest = {
  title: string
  member?: number[]
}

export type BoardResponse = {
  id: number
  ownerId: number
  title: string
  updatedAt: string
  createdAt: string
}

export const getBoardList = () => service.get("board");

export const getBoardById=(id:number | undefined)=>service.get(`board/${id}`)
export const deleteBoard=(id:number)=>service.delete(`board/${id}`)


export const createBoard = (
  payload: CreateBoardRequestPayload
): Promise<CreateBoardResponseType> => service.post("board", payload);


export const update = (boardID: number, data: BoardRequest) => {
  return service.put<BoardResponse>(`board/${boardID}`, data);
}
import service from "../../instance";
import {
  BoardListResponse,
  CreateListRequestPayload,
  CreateListResponseType,
} from "./types";

export type UpdateListRequest = {
  title?: string
  boardId?: number
  order?: number
}

export type ListResponse = {
  id: number
  order: number
  title: string
  createdAt: string
  updatedAt: string
  boardId: number
  board: any
}

export const getList = (boardId:number) => service.get(`list?boardId=${boardId}`);

export const getListById=(id:number | undefined)=>service.get(`list/${id}`)


export const update = (listID: number, data: UpdateListRequest) => {
  return service.put<ListResponse>(`list/${listID}`, data);
}
export const createList = (
  payload: CreateListRequestPayload
): Promise<CreateListResponseType> => service.post("list", payload);

import service from "../../instance";
import {
  BoardListResponse,
  CreateCardRequestPayload,
  CreateCardResponseType,
  UpdateCardRequestPayload,
} from "./types";

export const getCards = () => service.get("card");

export const getCardById=(id:number | undefined)=>service.get(`card/${id}`)

export const update = (cardId: number, data: any) => {
  return service.put<any>(`card/${cardId}`, data);
}

export const createCard = (
  payload: CreateCardRequestPayload
): Promise<CreateCardResponseType> => service.post("card", payload);

export const updateCard = (id: number | undefined, payload: UpdateCardRequestPayload) =>
  service.put(`card/${id}`, payload)

import service from "../../instance";
import {
  CreateCheckListRequestPayload,
  CreateCheckListResponseType,
} from "./types";

export const createCheckList = (
  payload: CreateCheckListRequestPayload
): Promise<CreateCheckListResponseType> => service.post("checklist", payload);

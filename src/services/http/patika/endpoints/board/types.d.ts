export type BoardListResponse = {
    id: number
    ownerId: number
    title: string
    updatedAt: string
    createdAt: string
  }
  
  export type CreateBoardRequestPayload = {
    title: string
  }
  
  export type CreateBoardResponseType = {
    data: {
      id: number
      title: string
      ownerId:number
      updatedAt:string
      createdAt:string
    }
  }
  
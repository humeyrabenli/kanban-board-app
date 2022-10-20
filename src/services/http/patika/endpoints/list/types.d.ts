export type BoardListResponse = {
    id: number
    ownerId: number
    title: string
    updatedAt: string
    createdAt: string
  }
  
  export type CreateListRequestPayload = {
    title: string
    boardId:number
  }
  
  export type CreateListResponseType = {
    data: {
      id: number
      title: string
      boardId:number
      updatedAt:string
      createdAt:string
    }
  }
  
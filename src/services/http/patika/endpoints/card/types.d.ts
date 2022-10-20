export type BoardListResponse = {
    id: number
    ownerId: number
    title: string
    updatedAt: string
    createdAt: string
  }
  
  export type CreateCardRequestPayload = {
    title: string
    listId:number
  }

  export type UpdateCardRequestPayload = {
    title: string
    description:string | undefined
  
  }
  
  export type CreateCardResponseType = {
    data: {
      id: number
      title: string
      listId:number
      updatedAt:string
      createdAt:string
    }
  }
  

  
  export type CreateCheckListRequestPayload = {
    title: string
    cardId:number
    items:[]
  }
  
  export type CreateCheckListResponseType = {
    data: {
      id: number,
      cardId:number,
      title: string,
      items:[],
      updatedAt:string
      createdAt:string
    }
  }
  
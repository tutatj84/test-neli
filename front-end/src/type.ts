export type TodoItem = {
  description: string,
  isFinished: boolean,
  id: number
}

export enum MUTATE_TYPE {
  ADD = 'ADD',
  UPDATE = 'UPDATE',
  DELETE = 'DELETE'
}

export type HandleItemChange = (updateItem: TodoItem, mutateType: MUTATE_TYPE) => void
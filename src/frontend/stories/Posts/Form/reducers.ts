export interface IState {title: string, body: string}

export const updateTitle = (newTitle: string) => (prevState: IState): IState => ({
  ...prevState,
  title: newTitle,
})

export const updateBody = (newBody: string) => (prevState: IState): IState => ({
  ...prevState,
  body: newBody,
})

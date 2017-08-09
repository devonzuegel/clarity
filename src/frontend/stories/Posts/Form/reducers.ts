export interface IFormState {title: string; body: string; slug?: string}

export const updateTitle = (newTitle: string) => (
  prevState: IFormState
): IFormState => ({
  ...prevState,
  title: newTitle,
})

export const updateBody = (newBody: string) => (
  prevState: IFormState
): IFormState => ({
  ...prevState,
  body: newBody,
})

export interface IFormState {
  title: string
  subtitle: string
  body: string
  slug?: string
}

export const updateTitle = (newTitle: string) => (
  prevState: IFormState
): IFormState => ({
  ...prevState,
  title: newTitle,
})

export const updateSubtitle = (newSubtitle: string) => (
  prevState: IFormState
): IFormState => ({
  ...prevState,
  subtitle: newSubtitle,
})

export const updateBody = (newBody: string) => (
  prevState: IFormState
): IFormState => ({
  ...prevState,
  body: newBody,
})

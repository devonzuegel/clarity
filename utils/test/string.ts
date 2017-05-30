export const randomStr = () => Math.random().toString(36).substr(2, 5)

export const dasherize = (str: string) => str.replace(/\s+/g, '-').toLowerCase()

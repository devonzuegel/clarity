export const innerText = () => (s: string) =>
  (<HTMLElement>document.querySelector(s)).innerText

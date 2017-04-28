import * as express from 'express'

interface IError {
  message: string
}

export const jsonError = (res: express.Response) => (error: IError) => {
  res.status(500).json(error)
}

export const jsonSuccess = (res: express.Response) => (json: any) => {
  res.status(200).json(json)
}

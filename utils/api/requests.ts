import * as express from 'express'

interface IError {
  message: string
}

export const jsonError = (res: express.Response) => (error: IError) => {
  console.log(`jsonError: ${error}`)
  res.status(500).json(error)
}

export const jsonSuccess = (res: express.Response) => (json: any) => {
  console.log(`jsonSuccess: ${json}`)
  res.status(200).json(json)
}

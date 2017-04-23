import * as fetch from 'isomorphic-fetch'

export const get = async (url: string) => {
  return fetch(url, {
    method: 'GET',
    credentials: 'same-origin',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
  })
}

export const post = async (url: string) => {
  return fetch(url, {
    method: 'POST',
    credentials: 'same-origin',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
  })
}

export const sendRequest = async (request: Promise<Response>) => {
  const response = await request
  switch (response.status) {
    case 200: {
      return await response.json()
    }
    default: { // TODO: define other cases
      const error = await response.json()
      throw error
    }
  }
}

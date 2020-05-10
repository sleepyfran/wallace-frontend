import axios, { AxiosError, AxiosResponse } from 'axios'

import { retrieveFromStorage } from '../storage/storage'

const apiInstance = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL,
})

/**
 * Interceptor that adds the token to the request's headers if it's available.
 */
apiInstance.interceptors.request.use(config =>
  retrieveFromStorage('token').caseOf({
    Nothing: () => config,
    Just: token => ({
      ...config,
      headers: {
        ...config.headers,
        Authorization: `Bearer ${token}`,
      },
    }),
  })
)

export type Response<T> = Promise<AxiosResponse<T>>
export type ErrorResponse<T> = AxiosError<T>

export default apiInstance

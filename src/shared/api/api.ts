import axios, { AxiosError, AxiosResponse } from 'axios'
import { pipe } from 'fp-ts/lib/function'
import { fold } from 'fp-ts/lib/Option'
import { Observable, from } from 'rxjs'

import { retrieveFromStorage } from '../storage/storage'
import FakeApi from './fake/fake.api'
import Api, { Result } from './interface'

const internalApi = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL,
})

/**
 * Interceptor that adds the token to the request's headers if it's available.
 */
internalApi.interceptors.request.use(config =>
  pipe(
    retrieveFromStorage('user'),
    fold(
      () => config,
      user => ({
        ...config,
        headers: {
          ...config.headers,
          Authorization: `Bearer ${user.token.accessToken.jwt}`,
        },
      })
    )
  )
)

/**
 * Wraps an Axios call to our internal representation of a result.
 * @param call Axios call to wrap.
 */
const wrapAxiosCall = <R>(
  call: Promise<AxiosResponse<R>>
): Observable<Result<R>> =>
  from(
    call
      .then(res => ({
        statusCode: res.status,
        data: res.data || (({} as unknown) as R),
      }))
      .catch((err: AxiosError<R>) => ({
        statusCode: err.response?.status || 400,
        data: err.response?.data || (({} as unknown) as R),
      }))
  )

const apiInstance: Api = {
  get: url => wrapAxiosCall(internalApi.get(url)),
  post: (url, data) => wrapAxiosCall(internalApi.post(url, data)),
  put: (url, data) => wrapAxiosCall(internalApi.put(url, data)),
  delete: url => wrapAxiosCall(internalApi.delete(url)),
}

export default process.env.REACT_APP_USE_FAKE_API ? FakeApi : apiInstance

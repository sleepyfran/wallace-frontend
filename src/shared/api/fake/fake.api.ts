import { of, throwError, Observable, MonoTypeOperatorFunction, iif } from 'rxjs'
import { delay, tap, mergeMap } from 'rxjs/operators'

import Api, { Result } from '../interface'
import FakeResults from './fake.results'
import { FakeApiConfig, FakeApiFunctions } from './types'

/**
 * General configuration stored on the window so it can be easily modified from
 * the devtools. Only store it if in dev mode since we don't want this in prod :)
 */
if (process.env.NODE_ENV === 'development') {
  const fakeApiConfig: FakeApiConfig = {
    delay: 500,
    nextError: undefined,
  }
  ;(window as any).fakeApiConfig = fakeApiConfig
  ;(window as any).fakeApi = {
    errorNext: error => {
      fakeApiConfig.nextError = error
    },
  } as FakeApiFunctions
}

const throwIfError = (
  config: FakeApiConfig
): MonoTypeOperatorFunction<any> => source => {
  const error = config.nextError

  return source.pipe(
    tap(() => {
      config.nextError = undefined
    }),
    mergeMap(() => iif(() => !!error, throwError(error), source))
  )
}

const execute = (result: any): Observable<Result<any>> => {
  const config = (window as any).fakeApiConfig as FakeApiConfig

  return of({
    statusCode: 200,
    data: result,
  }).pipe(delay(config.delay), throwIfError(config))
}

const fakeApi: Api = {
  get: endpoint => execute(FakeResults[endpoint].get),
  post: endpoint => execute(FakeResults[endpoint].post),
  put: endpoint => execute(FakeResults[endpoint].put),
  delete: endpoint => execute(FakeResults[endpoint].delete),
}

export default fakeApi

export type EndpointResult = {
  get?: any
  post?: any
  put?: any
  delete?: any
}

export type EndpointResults = {
  [endpoint: string]: EndpointResult
}

export type Error = {
  code: number
  data: any
}

export type FakeApiConfig = {
  delay: number
  nextError: Error | undefined
}

export type FakeApiFunctions = {
  errorNext: (error: Error) => void
}

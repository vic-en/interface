import { ApolloLink, Operation, FetchResult } from '@apollo/client'
import { Observable } from 'zen-observable-ts'

export const mockApolloLink = new ApolloLink((operation: Operation) => {
  return new Observable<FetchResult>((observer) => {
    // Return empty result for all queries
    observer.next({ data: {} })
    observer.complete()
    return () => {}
  })
})
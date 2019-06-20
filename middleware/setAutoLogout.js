import { nextTick } from "q";

export default function (context) {
  if (context.req.headers.cookie) {
  const token = context.app.$cookies.get('token', {path: '/'})
  const expirationDate = context.app.$cookies.get('expirationDate', {path: '/'})
    if (token) {
      const now = new Date()
      const endDate = new Date(expirationDate)
      const expiresIn = (endDate.getTime() - now.getTime())
      // Error with expiration date. Fix !!!!!!!!
      context.store.dispatch('setAutologout', expiresIn)
    }
  }
}
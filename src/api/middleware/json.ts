import { Middleware, Status } from '@deps'

export const json: Middleware = async (ctx, next) => {
  ctx.response.headers.set('Content-Type', 'application/json')

  const accept = ctx.request.accepts()
  if (!accept?.length) {
    ctx.throw(Status.BadRequest, 'Request is missing the accept header')
    return
  }

  if (accept.includes('*/*') || accept.includes('application/json')) await next()
  else ctx.throw(Status.BadRequest, 'Requestor does not accept json as a response')
}

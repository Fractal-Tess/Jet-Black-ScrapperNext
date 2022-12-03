import { isHttpError, Middleware, Status } from '@deps'

export const httpError: Middleware = async (ctx, next) => {
  try {
    await next()
  } catch (error) {
    const status = error.status || error.statusCode || Status.InternalServerError

    if (isHttpError(error)) {
      switch (status) {
        case Status.NotFound:
        case Status.Forbidden:
        case Status.BadRequest:
        case Status.Unauthorized:
        case Status.Conflict:
        default:
          ctx.response.status = status
          ctx.response.body = { message: error.message }
      }
    } else {
      ctx.response.status = Status.InternalServerError
      ctx.response.body = { message: 'Something went wrong with the server' }
      throw error
    }
  }
}

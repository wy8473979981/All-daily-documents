import { WorkflowHandler, WorkflowContext } from './type'
import * as handlers from './options'

function search (ctx: WorkflowContext, action: 'view' | 'audit'): false | string {
  let ret: string | false = false
  Object.values(handlers).some(handler => {
    ret = handler[action](ctx)
    if (ret) return true
  })
  return ret
}

export function view (ctx: WorkflowContext): false | string {
  return search(ctx, 'view')
}

export function audit (ctx: WorkflowContext): false | string {
  return search(ctx, 'audit')
}

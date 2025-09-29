import { setupWorker } from 'msw/browser'
import { authHandlers } from './handlers/auth'
import { messageHandlers } from './handlers/message'

export const worker = setupWorker(...authHandlers, ...messageHandlers)

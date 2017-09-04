import exceptionMonitoring from './analytics/ravenSentryMonitoring'
import heapAnalytics from './analytics/heapAnalytics'
import Routes from './routes'

exceptionMonitoring()
heapAnalytics()
Routes()

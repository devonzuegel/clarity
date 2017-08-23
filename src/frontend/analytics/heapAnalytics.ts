import * as R from 'ramda'

declare global {
  interface Window {
    heap: any
  }
}

/**
 * The definition for these IDs can be found under "Projects" at:
 *   https://heapanalytics.com/app/account
 */
const ids = {
  ci: '4261421827',
  'heroku-develop': '999551692',
  'heroku-live': '159510833',
  'heroku-stage': '886138346',
  'heroku-tests': '2272900020',
  'local-develop': '2995610943',
}

const getHeapAnaltyicsId = () => {
  const h = window.location.href
  if (R.contains('clarity-develop.herokuapp.com', h)) return ids['heroku-develop']
  if (R.contains('clarity-live.herokuapp.com', h)) return ids['heroku-live']
  if (R.contains('clarity-stage.herokuapp.com', h)) return ids['heroku-stage']
  if (R.contains('clarity-tests.herokuapp.com', h)) return ids['heroku-tests']
  if (R.contains('localhost', h)) return ids['local-develop'] // local-develop & Circle CI

  throw Error(`Heap Analytics config for hostname "${h}" is not defined.`)
}

const initializeHeap = (heapId: string) => {
  window.heap = window.heap || []
  window.heap.load = function(e: any, t: any) {
    window.heap.appid = e
    window.heap.config = t = t || {}
    var r = t.forceSSL || 'https:' === document.location.protocol,
      a = document.createElement('script')
    ;(a.type = 'text/javascript'), (a.async = !0), (a.src =
      (r ? 'https:' : 'http:') + '//cdn.heapanalytics.com/js/heap-' + e + '.js')
    var n = document.getElementsByTagName('script')[0]
    if (n.parentNode) {
      n.parentNode.insertBefore(a, n)
      for (
        var o = function(e: any) {
          return function() {
            window.heap.push([e].concat(Array.prototype.slice.call(arguments, 0)))
          }
        },
          p = [
            'addEventProperties',
            'addUserProperties',
            'clearEventProperties',
            'identify',
            'removeEventProperty',
            'setEventProperties',
            'track',
            'unsetEventProperty',
          ],
          c = 0;
        c < p.length;
        c++
      )
        window.heap[p[c]] = o(p[c])
    }
  }
  window.heap.load(heapId)
}

export default () => {
  const heapId = getHeapAnaltyicsId()
  initializeHeap(heapId)
}

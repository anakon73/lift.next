import type { Lift } from './types'

export function getLift(): Lift {
  const lift: Lift = {
    liftId: 1,
    currentFloor: 3,
    status: 'idle',
    dir: 'up',
    requestQueue: [],

    acceptRequest(liftRequest) {
      this.requestQueue.push(liftRequest)
    },

    sort() {
      if (this.dir === 'up') {
        return this.requestQueue.some(v => v > this.currentFloor)
          ? 'up'
          : 'down'
      }
      return this.requestQueue.some(v => v > this.currentFloor) ? 'down' : 'up'
    },

    tick() {
      if (this.requestQueue.length > 0) {
        this.currentFloor += this.sort() === 'up' ? 1 : -1

        const a = this.requestQueue.indexOf(this.currentFloor)

        if (a !== -1) {
          this.requestQueue.splice(a, 1)
        }
      }
    },
  }

  return lift
}

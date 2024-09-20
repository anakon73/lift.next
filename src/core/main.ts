import type { Lift } from './types'

export const lift: Lift = {
  liftId: 1,
  currentFloor: 1,
  targetFloor: 0,
  status: 'idle',
  movingDirection: null,
  requestQueue: [],

  acceptRequest(liftRequest) {
    this.requestQueue.push(liftRequest)
  },

  addToTargetFloor(floorNumber) {
    this.targetFloor = floorNumber

    if (floorNumber > this.currentFloor) {
      this.movingDirection = 'up'
    }
    else {
      this.movingDirection = 'down'
    }
  },

  moveToFloor() {
    if (
      this.movingDirection === 'up'
      && this.targetFloor !== this.currentFloor
    ) {
      this.currentFloor++
    }
  },

  tick() {
    this.status = 'moving'

    if (this.requestQueue.some(number => number < this.targetFloor)) {
      const floorBetweenIndex = this.requestQueue.findIndex(
        num => num < this.targetFloor && num >= this.currentFloor,
      )
      const floorBetween = this.requestQueue[floorBetweenIndex]

      if (floorBetween) {
        this.requestQueue.splice(floorBetweenIndex, 1)
        this.requestQueue.unshift(floorBetween)
      }
    }

    this.addToTargetFloor(this.requestQueue[0])

    if (this.status === 'moving' && this.requestQueue.length > 0) {
      this.moveToFloor()
    }

    this.status = 'idle'
    // if (this.status === 'idle' && this.requestQueue.length > 0) {
    //   this.moveToFloor(this.requestQueue[0])

    //   if (this.currentFlour === this.requestQueue[0]) {
    //     this.requestQueue.shift()
    //   }
    // }
    // else if (this.status === 'moving') {
    //   this.moveToFloor(this.targetFloor)
    // }
  },
}

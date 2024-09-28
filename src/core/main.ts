import type { Dir, Lift as ILift, Request } from './types'

abstract class Lift implements ILift {
  currentFloor: number = 1
  status: 'idle' | 'move' = 'idle'
  dir: Dir | null = null
  requestQueue: Request[] = []

  abstract acceptRequest(liftRequest: Request): void
  abstract tick(): void
}

export class LiftImpl extends Lift {
  onChangeFloor: () => void
  onChangeDir: () => void
  onChangeRequestQueue: () => void

  constructor(
    onChangeFloor: () => void,
    onChangeDir: () => void,
    onChangeRequestQueue: () => void,
  ) {
    super()
    this.onChangeFloor = onChangeFloor
    this.onChangeDir = onChangeDir
    this.onChangeRequestQueue = onChangeRequestQueue
  }

  acceptRequest(liftRequest: Request): void {
    this.requestQueue.push(liftRequest)
  }

  private sort(): Dir {
    if (this.dir === 'up') {
      if (this.requestQueue.some(v => v.floor > this.currentFloor)) {
        return 'up'
      }
      return 'down'
    }

    if (this.dir === 'down') {
      if (this.requestQueue.some(v => v.floor < this.currentFloor)) {
        return 'down'
      }
      return 'up'
    }

    return this.requestQueue.some(v => v.floor > this.currentFloor)
      ? 'up'
      : 'down'
  }

  tick() {
    if (this.requestQueue.length > 0) {
      this.status = 'move'

      const currentRequestIndex = this.requestQueue.findIndex(
        v => v.floor === this.currentFloor,
      )

      if (currentRequestIndex !== -1) {
        const request = this.requestQueue[currentRequestIndex]

        if (
          (request.dir === this.dir || request.dir === null)
          && ((this.dir === 'up' && request.dir !== 'down')
            || (this.dir === 'down' && request.dir !== 'up'))
        ) {
          this.requestQueue.splice(currentRequestIndex, 1)
          return
        }
      }

      const nextDirection = this.sort()

      if (this.dir !== nextDirection) {
        this.dir = nextDirection
      }

      this.currentFloor += this.dir === 'up' ? 1 : -1

      this.onChangeFloor()
      this.onChangeDir()
    }
    else {
      this.status = 'idle'
      this.dir = null
      this.onChangeDir()
    }

    this.onChangeRequestQueue()
  }
}

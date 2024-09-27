import type { Dir, Lift, Request } from './types'

export class LiftImpl implements Lift {
  currentFloor: number = 1
  status: 'idle' | 'move' = 'idle'
  dir: Dir | null = null
  requestQueue: Request[] = []

  acceptRequest(liftRequest: Request): void {
    this.requestQueue.push(liftRequest)
  }

  private sort(): Dir {
    if (this.dir === 'up') {
      return this.requestQueue.some(v => v.floor > this.currentFloor)
        ? 'up'
        : 'down'
    }
    else if (this.dir === 'down') {
      return this.requestQueue.some(v => v.floor < this.currentFloor)
        ? 'down'
        : 'up'
    }

    return this.requestQueue.some(v => v.floor > this.currentFloor)
      ? 'up'
      : 'down'
  }

  private changeDirection(newDirection: Dir): void {
    this.dir = newDirection
  }

  tick(): void {
    if (this.requestQueue.length > 0) {
      this.status = 'move'

      const a = this.requestQueue.findIndex(v => v.floor === this.currentFloor)

      if (a !== -1 && (
        this.requestQueue[a].dir === this.dir
        || this.requestQueue[a].dir === null
      )
      ) {
        this.requestQueue.splice(a, 1)
        return
      }

      const nextDirection = this.sort()
      if (this.dir !== nextDirection) {
        this.changeDirection(nextDirection)
      }

      this.currentFloor += this.sort() === 'up' ? 1 : -1
    }
    else {
      this.status = 'idle'
      this.dir = null
    }
  }
}

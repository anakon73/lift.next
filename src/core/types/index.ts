export type Dir = 'up' | 'down'

export type Request = {
  floor: number
  dir: Dir | null
  call: 'inside' | 'outside'
}

export interface Lift {
  currentFloor: number
  status: 'idle' | 'move'
  dir: Dir | null
  requestQueue: Request[]
  acceptRequest: (liftRequest: Request) => void
  tick: () => void
}

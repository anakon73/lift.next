export type Dir = 'up' | 'down'

export interface Lift {
  liftId: number
  currentFloor: number
  status: 'moving' | 'idle'
  dir: Dir | null
  requestQueue: number[]
  sort: () => Dir
  acceptRequest: (liftRequest: number) => void
  tick: () => void
}

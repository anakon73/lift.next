export interface Lift {
  liftId: number
  currentFloor: number
  status: 'moving' | 'idle'
  movingDirection: 'up' | 'down' | null
  requestQueue: number[]
  targetFloor: number
  addToTargetFloor: (floorNumber: number) => void
  acceptRequest: (liftRequest: number) => void
  moveToFloor: () => void
  tick: () => void
}

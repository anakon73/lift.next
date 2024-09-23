import { describe, expect, it } from 'vitest'
import { getLift } from './main'

describe('lift', () => {
  it('moving', () => {
    const lift = getLift()

    lift.acceptRequest(2)

    lift.tick()

    expect(lift.currentFloor).toEqual(2)

    lift.acceptRequest(3)

    lift.tick()

    expect(lift.currentFloor).toEqual(3)

    lift.acceptRequest(5)

    lift.tick()
    lift.tick()

    expect(lift.currentFloor).toEqual(5)
  })
})

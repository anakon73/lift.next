import { describe, expect, it } from 'vitest'
import { lift } from './main'

describe('lift', () => {
  it('lift moving up', () => {
    lift.acceptRequest(5)

    lift.tick()

    lift.acceptRequest(3)

    lift.tick()

    console.log(lift.requestQueue)

    expect(lift.targetFloor).toEqual(3)
    expect(lift.currentFloor).toEqual(3)

    // lift.tick()
    // lift.tick()

    // expect(lift.currentFlour).toEqual(5)
  })
})

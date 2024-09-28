import { beforeEach, describe, expect, it } from 'vitest'

import type { Request } from './types'
import { LiftImpl } from './main'

describe('lift', () => {
  let lift: LiftImpl

  beforeEach(() => {
    lift = new LiftImpl(() => {}, () => {}, () => {})
  })

  it('should initialize correctly', () => {
    expect(lift.currentFloor).toBe(1)
    expect(lift.status).toBe('idle')
    expect(lift.dir).toBeNull()
  })

  it('should accept requests', () => {
    const request: Request = { floor: 3, dir: 'up', call: 'outside' }
    lift.acceptRequest(request)
    expect(lift.requestQueue).toContain(request)
  })

  it('should move to the correct floor on tick', () => {
    lift.acceptRequest({ floor: 2, dir: 'up', call: 'outside' })
    lift.tick()
    lift.tick()
    expect(lift.currentFloor).toBe(2)
    expect(lift.requestQueue).toHaveLength(0)
  })

  it('should remain idle when there are no requests', () => {
    lift.tick()
    expect(lift.status).toBe('idle')
    expect(lift.dir).toBeNull()
  })

  it('should process a queue of floors correctly', () => {
    const requests: Request[] = [
      { floor: 3, dir: 'up', call: 'outside' },
      { floor: 5, dir: 'up', call: 'inside' },
      { floor: 2, dir: 'down', call: 'outside' },
      { floor: 1, dir: 'down', call: 'inside' },
    ]

    requests.forEach(request => lift.acceptRequest(request))

    expect(lift.currentFloor).toBe(1)
    expect(lift.requestQueue.length).toBe(requests.length)

    while (lift.currentFloor < 3) {
      lift.tick()
    }

    expect(lift.currentFloor).toBe(3)

    while (lift.currentFloor < 5) {
      lift.tick()
    }

    expect(lift.currentFloor).toBe(5)
    expect(lift.status).toBe('move')

    while (lift.currentFloor > 2) {
      lift.tick()
    }

    expect(lift.currentFloor).toBe(2)

    while (lift.currentFloor > 1) {
      lift.tick()
    }

    expect(lift.currentFloor).toBe(1)

    while (lift.requestQueue.length > 0) {
      lift.tick()
    }

    expect(lift.requestQueue.length).toBe(0)

    lift.tick()

    expect(lift.status).toBe('idle')
  })
})

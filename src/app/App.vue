<script setup lang="ts">
import { ChevronDownIcon, ChevronUpIcon } from '@radix-icons/vue'
import { LiftImpl } from '@/core/main'

const floorButtons = Array.from({ length: 9 }, (_, i) => i + 1)
const reverseFloors = floorButtons.reverse()

const lift = reactive(new LiftImpl())

onMounted(() => {
  const interval = setInterval(() => lift.tick(), 1000)
  return () => clearInterval(interval)
})

function getLiftPosition() {
  const floorHeight = 56
  const totalFloors = floorButtons.length

  return `${(totalFloors - lift.currentFloor) * floorHeight}px`
}
</script>

<template>
  <div class="mx-auto max-w-5xl px-6">
    <h1 class="mb-20 mt-20 text-center text-4xl font-bold">
      Welcome to Lift!
    </h1>
    <div class="flex justify-center gap-20">
      <div class="grid grid-cols-2 gap-5">
        <button
          v-for="button in floorButtons"
          :key="button"
          class="
            size-12 rounded-full bg-blue-600 text-lg font-semibold text-white
            shadow-lg

            disabled:bg-blue-400
          "
          :disabled="lift.requestQueue.some((v) => v.floor === button)"
          @click="lift.acceptRequest({
            floor: button, call: 'inside', dir: null,
          })"
        >
          {{ button }}
        </button>
      </div>
      <div class="relative w-20">
        <div
          class="
            absolute flex h-14 w-full items-center justify-between rounded-lg
            bg-pink-600 px-2 text-sm text-white transition-all duration-500
          "
          :style="{ top: getLiftPosition() }"
        >
          <p>floor: {{ lift.currentFloor }}</p>
          <ChevronUpIcon
            v-if="lift.dir === 'up'"
            class="size-5 animate-bounce"
          />
          <ChevronDownIcon
            v-if="lift.dir === 'down'"
            class="size-5 animate-bounce"
          />
        </div>
      </div>
      <div class="divide-y divide-blue-600 border-y border-blue-600">
        <div
          v-for="button in reverseFloors"
          :key="button"
          class="text-bold flex h-14 items-center gap-4 px-5 text-blue-600"
        >
          <p>{{ button }}</p>
          <div class="flex flex-col">
            <button
              v-if="button !== floorButtons.length"
              @click="lift.acceptRequest({
                floor: button, call: 'outside', dir: 'up',
              })
              "
            >
              <ChevronUpIcon class="size-5" />
            </button>
            <button
              v-if="button !== 1"
              @click="lift.acceptRequest({
                floor: button, call: 'outside', dir: 'down',
              })"
            >
              <ChevronDownIcon class="size-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

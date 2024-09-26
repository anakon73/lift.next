<script setup lang="ts">
import { onMounted, reactive } from 'vue'
import { ChevronDownIcon, ChevronUpIcon } from '@radix-icons/vue'

import { getLift } from '@/core/main'

const floorButtons = Array.from({ length: 9 }, (_, i) => i + 1)
const reverseFloors = floorButtons.reverse()

const lift = reactive(getLift())

onMounted(() => {
  const interval = setInterval(() => lift.tick(), 500)
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
          "
          @click="lift.acceptRequest(button)"
        >
          {{ button }}
        </button>
      </div>
      <div class="relative w-20">
        <div
          class="
            absolute h-14 w-full rounded-lg bg-pink-600 text-white
            transition-all
          "
          :style="{ top: getLiftPosition() }"
        >
          {{ lift.requestQueue }}
          {{ lift.currentFloor }}
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
            <button @click="lift.acceptRequest(button)">
              <ChevronUpIcon class="size-5" />
            </button>
            <button @click="lift.acceptRequest(button)">
              <ChevronDownIcon class="size-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { WaypointType, type TWaypoint } from '../models/orders.ts';

const props =  withDefaults(defineProps<{
  waypoint: TWaypoint,
  readonly?: boolean }>(), {
  readonly: false
});
const emit = defineEmits(['remove']);

function removeWaypoint(waypoint: TWaypoint) {
  emit('remove', waypoint);
}
</script>

<template>
  <div v-if="!!props.waypoint" class="waypointRow">
    <span>{{ waypoint.type === WaypointType.Delivery ? 'Delivery' : 'Pickup' }}</span>
    <span>{{ waypoint.location }}</span>
    <span>{{ waypoint.street }}</span>
    <span>{{ waypoint.number }}</span>
    <span>{{ waypoint.postalCode }}</span>
    <span>{{ waypoint.city }}</span>
    <span>{{ waypoint.country }}</span>
    <button v-if="!readonly" @click="removeWaypoint(props.waypoint)">Remove</button>
  </div>
</template>

<style scoped>
.waypointRow, .waypointHeader {
  display: grid;
  grid-template-columns: repeat(8, 1fr);
  gap: 5px;
  background-color: lightblue;
  border-radius: 5px;
  padding: 5px;
}
.waypointHeader > span {
  font-weight: bold;
}
</style>

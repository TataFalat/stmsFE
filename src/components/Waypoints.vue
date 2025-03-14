<script setup lang="ts">
import { type TWaypoint } from '../models/orders.ts';
import Waypoint from './Waypoint.vue';

const props =  withDefaults(defineProps<{
  waypoints: TWaypoint[],
  readonly?: boolean }>(), {
  readonly: false
});
const emit = defineEmits(['remove']);

function removeWaypoint(waypoint: TWaypoint) {
  emit('remove', props.waypoints.filter(w => w !== waypoint));
}
</script>

<template>
  <div class="waypointHeader">
    <span>Type</span>
    <span>Location</span>
    <span>Street</span>
    <span>Number</span>
    <span>Postal code</span>
    <span>City</span>
    <span>Country</span>
  </div>
  <Waypoint v-for="waypoint in waypoints" :waypoint="waypoint" @remove="removeWaypoint(waypoint)" :readonly="props.readonly"></Waypoint>
</template>

<style scoped>
.waypointHeader {
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

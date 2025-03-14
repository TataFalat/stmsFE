<script setup lang="ts">
import { ref, watch } from 'vue';
import { type TOrder, type TOrderFilter } from '../models/orders.ts';
import Waypoints from './Waypoints.vue';

const props = defineProps<{
  orders: TOrder[]
}>();
const emit = defineEmits(['remove']);
const filteredOrders = ref<TOrder[]>([]);
const filterData = ref<TOrderFilter>({number: '', customerName: '', date: ''});
const selectedOrder = ref<number|undefined>();

function filter() {
  filteredOrders.value = props.orders.filter(o => {
    let include = true;
    for (let key in filterData.value) {
      let searchString = filterData.value[key as keyof typeof filterData.value];
      if (searchString)
        include &&= !!o[key as keyof typeof o]?.toString().includes(searchString);
      if (!include) break;
    }
    return include;
  });
}

function removeOrder(order: TOrder) {
  emit('remove', order);
}

function showWaypoints(order: TOrder) {
  selectedOrder.value = selectedOrder.value === order.id ? undefined : order.id;
}

watch(() => props.orders, () => {
  filter();
});
</script>

<template>
  <div class="orderList">
    <div class="orderList orderFilter">
      <button @click="filter()">Filter</button>
      <div class="listRow">
        <label>Number:
          <input v-model="filterData.number">
        </label>
        <label>Customer:
          <input v-model="filterData.customerName">
        </label>
        <label>Date:
          <input v-model="filterData.date" type="date">
        </label>
      </div>
    </div>
    <div v-for="order in filteredOrders" :key="order.id" class="listRow" @click="showWaypoints(order)" :class="selectedOrder===order.id?'selectedRow':''">
      <span class="listItem">{{order.number}}</span>
      <span class="listItem">{{order.customerName}}</span>
      <span class="listItem">{{order.date}}</span>
      <span><button @click="removeOrder(order)">Remove</button></span>
      <div v-if="selectedOrder===order.id" class="orderWaypoints">
        <Waypoints :waypoints="order.waypoints" readonly></Waypoints>
      </div>
    </div>
  </div>
</template>

<style scoped>
.orderList {
  display: flex;
  flex-direction: column;
  background-color: cornsilk;
  border-radius: 5px;
  padding: 5px;
}
.orderFilter {
  background-color: antiquewhite;
}
.listRow {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1rem;
  align-items: center;
}
.listRow:hover {
  background-color: burlywood;
}
.selectedRow {
  background-color: lightblue;
  border-radius: 5px;
}
.listItem {
  padding: 5px;
}
.orderWaypoints {
  grid-column: 1 / span 4;
}
</style>

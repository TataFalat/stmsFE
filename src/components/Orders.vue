<script setup lang="ts">
import { ref } from 'vue';
import { WaypointType, type TWaypoint, type TOrder, type TOrderFilter } from '../models/orders.ts';
import Waypoints from './Waypoints.vue';
import OrderList from './OrderList.vue';

const newOrder = {number: '', customerName: '', date: (new Date()).toISOString().substring(0, 10), waypoints: []};
const order = ref<TOrder>({...newOrder});
const newWaypoint = {number: '', postalCode: '', city: '', country: '', type: 0};
const waypoint = ref<TWaypoint>({...newWaypoint});
const orders = ref<TOrder[]>([]);
const apiUrl = 'http://127.0.0.1:8000/api/order/';

async function addOrder() {
  try {
    const res = await fetch(apiUrl,
      { method: 'POST', body: JSON.stringify(order.value), mode: 'cors', headers: { "Content-Type": "application/json" }});
    if (!res.ok) {
      throw new Error(`Response status: ${res.status}`);
    }
    order.value = {...newOrder};
    fetchOrders();
  } catch (error) {
    console.error((error as Error).message);
  }
}

async function removeOrder(order: TOrder) {
  try {
    const res = await fetch(`${apiUrl}${order.id}/`, { method: 'DELETE' });
    if (!res.ok) {
      throw new Error(`Response status: ${res.status}`);
    }
    fetchOrders();
  } catch (error) {
    console.error((error as Error).message);
  }
}

async function fetchOrders() {
  try {
    const res = await fetch(apiUrl, { method: 'GET', mode: 'cors' });
    if (!res.ok) {
      throw new Error(`Response status: ${res.status}`);
    }
    orders.value = await res.json();
  } catch (error) {
    console.error((error as Error).message);
  }
}

function addWaypoint() {
  order.value.waypoints.push({...waypoint.value});
  waypoint.value = {...newWaypoint};
}

function removeWaypoint(waypoints: TWaypoint[]) {
  order.value.waypoints = waypoints;
}

fetchOrders();
</script>

<template>
  <div class="panel">
    <form @submit.prevent="addOrder" class="orderForm">
      <label>Number:
        <input v-model="order.number">
      </label>
      <label>Customer:
        <input v-model="order.customerName">
      </label>
      <label>Date:
        <input v-model="order.date" type="date">
      </label>
      <button :disabled="order.waypoints.length===0">Add order</button>
    </form>
    <div class="waypoints">
      <span>Waypoints</span>
      <form @submit.prevent="addWaypoint" class="waypointForm">
        <input v-model="waypoint.location" placeholder="location">
        <input v-model="waypoint.street" placeholder="street">
        <input v-model="waypoint.number" placeholder="number" required>
        <input v-model="waypoint.postalCode" placeholder="postalCode" required>
        <input v-model="waypoint.city" placeholder="city" required>
        <input v-model="waypoint.country" placeholder="country" required>
        <select v-model="waypoint.type" required>
          <option value=0>{{ WaypointType[0] }}</option>
          <option value=1>{{ WaypointType[1] }}</option>
        </select>
        <button>Add waypoint</button>
      </form>
      <Waypoints :waypoints="order.waypoints" @remove="w=>removeWaypoint(w)"></Waypoints>
    </div>
  </div>
  <OrderList :orders="orders" @remove="o=>removeOrder(o)"></OrderList>
</template>

<style scoped>
.panel {
  display: flex;
  flex-direction: column;
  background-color: lightskyblue;
  border-radius: 5px;
  padding: 5px;
}
.orderForm {
  display: flex;
  gap: 5px;
  padding: 5px;
}
.waypointForm {
  display: grid;
  grid-template-columns: repeat(8, 1fr);
  padding: 5px;
}
.waypoints {
  padding: 0;
  background-color: lightblue;
}
.waypoints > span {
  font-weight: bold;
  padding: 5px;
}
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

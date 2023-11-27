<script setup lang="ts">
import { ref } from "vue";
import FakeInput from "./components/FakeInput.vue";
const value = ref("");
const config = ref({
  width: 50,
  height: 50,
  fontSize: 16,
  spacing: 20
});
</script>

<template>
  <div>
    <div>{{ value }}</div>
    <FakeInput v-model="value" type="frame" :quantity="4" :config="config" />
  </div>
</template>

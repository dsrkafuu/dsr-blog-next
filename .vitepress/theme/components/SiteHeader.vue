<template>
  <div>
    <div>{{ JSON.stringify(page) }}</div>
    <Content />
  </div>
</template>

<script setup lang="ts">
import { useData } from 'vitepress';

const { page } = useData();
</script>

<script setup lang="ts">
import { useData } from 'vitepress';
import SiteHeader from './components/SiteHeader.vue';

const { page } = useData();
</script>

<template>
  <div>
    <SiteHeader />
  </div>
</template>

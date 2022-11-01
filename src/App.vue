<template>
  <van-overlay :show="store.loading">
    <van-loading vertical color="#1989fa" class="primary-loading">
      加载中...
    </van-loading>
  </van-overlay>
  <router-view :key="key" />
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { useCommonStore } from './stores/common'

const route = useRoute()
const key = computed(() =>
  route.name ? String(route.name) + new Date() : String(route.path) + new Date()
)

const store = useCommonStore()
</script>

<style scoped>
.primary-loading {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
</style>

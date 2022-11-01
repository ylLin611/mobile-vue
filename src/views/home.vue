<template>
  <div class="home">
    <div class="test">
      <van-button type="primary" @click="btnClick">主要按钮</van-button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useCommonStore } from '@/stores/common'

const store = useCommonStore()
const btnClick = () => {
  store.updateLoading(true)
  setTimeout(() => {
    store.updateLoading(false)
  }, 3000)
}
</script>

<style lang="less" scoped></style>

import { defineStore } from 'pinia'

export const useCommonStore = defineStore('common', {
  state: () => ({
    loading: false
  }),
  actions: {
    // 同步更新 message
    updateLoading(status: boolean): void {
      // 这里的 this 是当前的 Store 实例
      this.loading = status
    }
  }
})

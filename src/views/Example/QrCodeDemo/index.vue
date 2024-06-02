<script setup lang="ts">
import type { QRCodeInstance } from '@/components'

defineOptions({ name: 'QrCodeDemo' })

const qrcodeText = ref<string>('https://github.com/Ace627/vite-vue3-template')
const qrcodeIcon = ref<string>()
const qrcodeRef = ref<QRCodeInstance>()

function handleFileChange(event: Event) {
  const el = event.target as HTMLInputElement
  const file = el.files![0]
  qrcodeIcon.value = URL.createObjectURL(file)
}

function downloadQRCode() {
  qrcodeRef.value?.download()
}

onUnmounted(() => {
  qrcodeIcon.value && URL.revokeObjectURL(qrcodeIcon.value)
})
</script>

<template>
  <div class="app-content flex-center p-10vh">
    <form class=" ">
      <div v-if="qrcodeText" class="form-item">
        <button @click.prevent="downloadQRCode">
          下载二维码
        </button>
      </div>
      <div class="form-item">
        <span class="form-item__label">文本内容</span>
        <input v-model="qrcodeText" type="text" placeholder="请输入二维码内容文本">
      </div>
      <div class="form-item">
        <span class="form-item__label">中心图标</span>
        <input type="file" @change="handleFileChange">
      </div>
      <div class="form-item">
        <QRCode v-if="qrcodeText" ref="qrcodeRef" :text="qrcodeText" :icon="qrcodeIcon" />
      </div>
    </form>
  </div>
</template>

<style lang="scss" scoped>
button {
  cursor: pointer;
  padding: 8px 16px;
  color: #fff;
  background-color: #07f;
  border-radius: 4px;
  transition: background-color 0.32s;
  &:hover {
    opacity: 0.7;
  }
}
button ~ button {
  margin-left: 10px;
}

form {
  width: 500px;
  padding: 20px 30px;
  background-color: rgba(245, 246, 247, 0.75);
  box-shadow: -2px -2px 4px rgba(255, 255, 255, 0.9), 0px 5px 20px 5px rgba(15, 21, 51, 0.1), inset -1px 1px 1px rgba(255, 255, 255, 0.8);
  backdrop-filter: blur(136px);
  border-radius: 10px;
  .form-item {
    display: flex;
    align-items: center;
    &__label {
      width: 100px;
    }
    & ~ .form-item {
      margin-top: 16px;
    }
  }
}
input {
  width: 100%;
  margin: 0;
  padding: 4px 12px;
  font-size: 14px;
  border: 1px solid #d9d9d9;
  border-radius: 6px;
  color: rgba(0, 0, 0, 0.88);
  background-color: #fff;
  transition: all 0.32s;
  &::-webkit-input-placeholder {
    font-size: 12px;
    color: #d9d9d9;
  }
  &:focus {
    border-color: #07f;
  }
}
</style>

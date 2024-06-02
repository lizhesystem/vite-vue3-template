<script setup lang="ts">
import VueQr from 'vue-qr/src/packages/vue-qr.vue'
import { linkDownload } from '@/utils/download'

defineOptions({ name: 'QRCode' })

defineProps({
  /** 二维码内容 必需 */
  text: { type: String, required: true },
  /** 嵌入至二维码中心的 LOGO 地址 */
  icon: { type: String, default: '' },
  /** 二维码图像的外边距, 默认 0px */
  margin: { type: Number, default: 0 },
  /** 尺寸, 长宽一致, 包含外边距 */
  size: { type: Number, default: 150 },
  /** 二维码颜色 */
  color: { type: String, default: '#000' },
  /** 二维码背景颜色 */
  bgColor: { type: String, default: 'transparent' },
})

/** 二维码的组件实例 */
const vueQrInstance = ref()

/** 二维码转为 base64 格式 */
function toDataURL() {
  return vueQrInstance.value.imgUrl
}

/** 下载二维码图片到本地 */
function download(fileName?: string) {
  linkDownload(toDataURL(), fileName)
}

defineExpose({ toDataURL, download })
</script>

<template>
  <VueQr ref="vueQrInstance" class="qrcode" v-bind="$attrs" :text :size :margin :logo-src="icon" :color-dark="color" :background-color="bgColor" />
</template>

<style lang="scss" scoped>
.qrcode:hover {
  cursor: pointer;
}
</style>

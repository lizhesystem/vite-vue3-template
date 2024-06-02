<script setup lang="ts">
import type { CSSProperties } from 'vue'

defineOptions({ name: 'IconFont' })

const props = defineProps({
  /** 图标名字 */
  name: { type: String, required: true },
  /** 图标大小 */
  size: { type: [Number, String], default: '1em' },
  /** 图标颜色 */
  color: { type: String, default: 'inherit' },
  /** 图标是否加粗 */
  bold: { type: Boolean, default: false },
})

const styles = computed<CSSProperties>(() => {
  const { size, color, bold } = props
  const fontSize = typeof size === 'string' ? size : `${size}px`
  const fontWeight = bold ? 'bold' : 'normal'
  return { fontSize, color, fontWeight }
})
const classes = computed(() => {
  return `iconfont icon-${props.name} cursor-pointer`
})
</script>

<template>
  <i :class="classes" :style="styles" v-bind="$attrs" />
</template>

<style lang="scss" scoped></style>

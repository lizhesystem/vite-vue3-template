<template>
  <div class="h-80 w-full bg-gray-300 overflow-hidden relative">

    <el-popover
      placement="top-start"
      :width="200"
      :disabled="disabled"
      trigger="hover"
    >
      <div class="w-12 h-12 bg-amber-300 text-center rounded-3xl">
        <span>设置</span>
      </div>
      <template #reference>
        <div
          :style="{ left:btnStyle.left + 'px',top:btnStyle.top + 'px',}"
          id="btn"
          @mousedown="onmousedown"
          class="btn-a absolute ">Download
        </div>
      </template>
    </el-popover>


  </div>

</template>
<script setup>

import { ref } from "vue"

const btnStyle = ref({
  top: 0,
  left: 0
})

const disabled = ref(false)

const onmousedown = (e) => {
  disabled.value = true
  e.stopPropagation()
  e.preventDefault()
  const dom = document.getElementById("btn") // 或者使用refs
  //算出鼠标相对元素的位置
  const disX = e.clientX - dom.offsetLeft
  const disY = e.clientY - dom.offsetTop
  let left, top = ""
  const move = (moveEvent) => {
    //用鼠标的位置减去鼠标相对元素的位置，得到元素的位置
    left = moveEvent.clientX - disX
    top = moveEvent.clientY - disY
    btnStyle.value.top = top
    btnStyle.value.left = left
  }
  const up = () => {
    document.removeEventListener("mousemove", move)
    document.removeEventListener("mouseup", up)
    disabled.value = false
  }
  document.addEventListener("mousemove", move)
  document.addEventListener("mouseup", up)
}

const onmouseover = (event) => {
  console.log(event)
}


</script>
<style lang="scss" scoped>

.btn-a {
  @apply inline-block rounded border border-indigo-600 bg-indigo-600 px-12 py-3 text-sm font-medium text-white hover:bg-transparent hover:text-indigo-600 focus:outline-none focus:ring active:text-indigo-500
}
</style>

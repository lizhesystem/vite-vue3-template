<script setup lang="ts">
import type { CSSProperties } from 'vue'
import { onBeforeUnmount, ref, shallowRef } from 'vue'
import '@wangeditor/editor/dist/css/style.css'
import { Editor, type InsertFnType, Toolbar } from '@wangeditor/editor-for-vue'
import type { IDomEditor, IEditorConfig, IToolbarConfig } from '@wangeditor/editor'

defineOptions({ name: 'Editor' })

/** 接收父组件传递的属性 */
const props = defineProps({
  /** 工具栏中需要隐藏的菜单的 key */
  excludeToolBar: { type: Array as PropType<string[]>, default: [] },
  /** 编辑器为空时的提示字符 */
  placeholder: { type: String, default: '请输入内容...' },
  /** 编辑器是否只读 */
  readOnly: { type: Boolean, default: false },
  /** 编辑器内容区域高度 */
  height: { type: Number, default: 300 },
  /** 默认模式 - 集成了 wangEditor 所有功能 简洁模式 - 仅有部分常见功能，但更加简洁易用 */
  mode: { type: String as PropType<'default' | 'simple'>, default: 'default' },
})

/** 父子双向绑定数据字段 */
const modelValue = defineModel({ default: '', type: String })
/** 工具栏配置 */
const toolbarConfig: Partial<IToolbarConfig> = { excludeKeys: props.excludeToolBar, modalAppendToBody: false }
/** 编辑器配置 */
const editorConfig = ref<Partial<IEditorConfig>>({
  readOnly: props.readOnly,
  placeholder: props.placeholder,
  MENU_CONF: {
    uploadImage: { customUpload: handleImageUpload }, // 自定义图片上传逻辑
    uploadVideo: { customUpload: handleVideoUpload }, // 自定义视频上传逻辑
  },
})

const styles = computed<CSSProperties>(() => ({ height: `${props.height}px`, overflow: 'hidden' }))

/** 自定义图片上传逻辑 */
async function handleImageUpload(file: File, insertFn: InsertFnType) {
  const fileSize = file.size // 单位 bit
  const blobURL = URL.createObjectURL(file) // 此处可以替换为真正的图片上传逻辑
  insertFn(blobURL, 'image') // 调用inserFn函数将url加载到富文本编辑器中
}

/** 自定义视频上传逻辑 */
async function handleVideoUpload(file: File, insertFn: InsertFnType) {
  console.log('上传视频', file)
  const blobURL = URL.createObjectURL(file)
  insertFn(blobURL, 'video')
}

/**
 * 自定义粘贴。可阻止编辑器的默认粘贴，实现自己的粘贴逻辑
 * https://www.wangeditor.com/v5/editor-config.html#custompaste
 */
function handleCustomPaste(editor: IDomEditor, event: ClipboardEvent, callback: (status: boolean) => void) {
  callback(true) // 返回 true ，继续默认的粘贴行为
}

/** 编辑器实例，必须用 shallowRef */
const editorRef = shallowRef<IDomEditor>()
/** 富文本编辑器生成后触发 记录 editor 实例，重要！ */
const handleCreated = (editor: IDomEditor) => (editorRef.value = editor)
/** 组件销毁时，也及时销毁编辑器，重要！ */
onBeforeUnmount(() => editorRef.value && editorRef.value.destroy())
</script>

<template>
  <div class="editor-container">
    <Toolbar class="toolbar" :editor="editorRef" :default-config="toolbarConfig" :mode />
    <Editor
      v-model="modelValue" :style="styles" :default-config="editorConfig" :mode @on-created="handleCreated"
      @custom-paste="handleCustomPaste"
    />
  </div>
</template>

<style lang="scss" scoped>
.editor-container {
  border: 1px solid #dcdfe6;

  .toolbar {
    border-bottom: 1px solid #dcdfe6;
  }
}

:deep(.w-e-text-container) {
  em {
    font-style: italic;
  }

  strong {
    font-weight: bold;
  }

  em strong {
    font-style: italic;
  }

  h1 {
    font-size: 2em;
    font-weight: bold;
  }

  h2 {
    font-size: 1.5em;
    font-weight: bold;
  }

  h3 {
    font-size: 1.17em;
    font-weight: bold;
  }

  h4 {
    font-weight: bold;
  }

  h5 {
    font-size: 0.83em;
    font-weight: bold;
  }

  h6 {
    font-size: 0.67em;
    font-weight: bold;
  }
}
</style>

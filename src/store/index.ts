import { createPinia } from 'pinia'
import type { App } from 'vue'
// 如果你只需要在编译时使用 App 的类型而不需要在运行时引入实际的值，
// 可以使用 import type { App } from 'vue'；如果需要在运行时使用 App 的值，可以使用 import { App } from 'vue'。

const store = createPinia()

export function setupStore(app: App) {
  app.use(store)
}

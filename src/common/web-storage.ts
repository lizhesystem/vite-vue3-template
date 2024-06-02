interface WebStorageConfig {
  storage: Storage
  expired: number
}

// Partial定义某个对象的部分属性可能为空的情况，让这些属性变为可选，从而增加灵活性。
export class WebStorage {
  static getItem<T extends any>(key: string, config: Partial<WebStorageConfig> = {}): T | null {
    const storage = config.storage ?? window.localStorage
    const json = storage.getItem(key)
    if (!json) { return null }
    const { value, expired } = JSON.parse(json)
    if (expired && Date.now() >= expired) {
      storage.removeItem(key)
      return null
    }
    return value
  }

  static setItem(key: string, value: any, config: Partial<WebStorageConfig> = {}): void {
    const expired = config.expired ?? 0
    const storage = config.storage ?? window.localStorage
    const data = { value, expired }
    storage.setItem(key, JSON.stringify(data))
  }

  static removeItem(key: string, config: Partial<WebStorageConfig> = {}) {
    const storage = config.storage ?? window.localStorage
    storage.removeItem(key)
  }

  static clear(config: Partial<WebStorageConfig> = {}) {
    const storage = config.storage ?? window.localStorage
    storage.clear()
  }
}

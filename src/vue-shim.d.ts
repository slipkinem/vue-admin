declare module '*.vue' {
  import Vue from 'vue'
  export default Vue
}

declare module '*.json' {
  const value: any
  export default value
}

declare var require: (files: Array<string> | string, resolve?: any) => any

declare module 'wangeditor' {
  const value: any
  export default value
}

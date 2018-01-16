import * as ext from 'vue-property-decorator'
import axios from 'axios'
import { httpExtension } from './shard/utils/http'

// extending default vue instance with some more stuff
export class Vue extends ext.Vue {
  static get http () {
    return httpExtension
  }

  get $http () {
    return httpExtension
  }
}

export {
  Inject,
  Provide,
  Model,
  Prop,
  Component,
  Watch,
  Emit
} from 'vue-property-decorator'

declare module 'vue/types/vue' {
  interface VueConstructor {
    options: {
      name: string | undefined
    }
  }
}

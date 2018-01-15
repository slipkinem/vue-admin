import * as ext from 'vue-property-decorator'
import axios from 'axios'

// extending default vue instance with some more stuff
export class Vue extends ext.Vue {
  static get http () {
    return axios
  }

  get $http () {
    return axios
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

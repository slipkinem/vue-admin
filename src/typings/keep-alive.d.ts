/**
 * Created by slipkinem on 12/20/2017 at 2:03 PM.
 * Copyright © 2016, PuKang Health Maintenance Co.
 */
import { Vue } from 'vue/types/vue'

export declare interface KeepAlive extends Vue {
  removeCacheByKey: (key: string) => void
}

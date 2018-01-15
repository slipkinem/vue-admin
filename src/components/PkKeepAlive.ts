/**
 * Created by slipkinem on 9/26/2017 at 4:25 PM.
 */
import _ from 'lodash'
import { VNode, VNodeComponentOptions } from 'vue'
import { Component, Vue } from '../ext-nb'
import { Prop, Watch } from 'vue-property-decorator'
import { isDef } from '../shard/utils'

function getFirstComponentChild (children?: Array<VNode>): VNode | void {
  if (Array.isArray(children)) {
    for (let i = 0; i < children.length; i++) {
      const c = children[i]
      if (isDef(c) && isDef(c.componentOptions)) {
        return c
      }
    }
  }
}

type patternTypes = string | RegExp | Array<string>
type nodeCache = {
  [key: string]: VNode
}

function getComponentName (opts?: VNodeComponentOptions): string | undefined {
  return opts && (opts.Ctor.options.name || opts.tag)
}

function matches (pattern: string | RegExp | Array<string>, name: string): boolean {
  if (Array.isArray(pattern)) {
    return pattern.indexOf(name) > -1
  } else if (typeof pattern === 'string') {
    return pattern.split(',').indexOf(name) > -1
  } else if (_.isRegExp(pattern)) {
    return pattern.test(name)
  }
  /* istanbul ignore next */
  return false
}

function pruneCache (cache: nodeCache, current: VNode, filter: (name: string) => boolean) {
  for (const key in cache) {
    const cachedNode = cache[key]
    if (cachedNode) {
      const name: string | undefined = getComponentName(cachedNode.componentOptions)
      if (name && !filter(name)) {
        if (cachedNode !== current) {
          pruneCacheEntry(cachedNode)
        }
        cache[key] = Object.create(null)
      }
    }
  }
}

function pruneCacheEntry (vnode: VNode | null) {
  if (vnode && vnode.componentInstance) {
    vnode.componentInstance.$destroy()
  }
}

@Component({
  name: 'pk-keep-alive'
})
export default class PkKeepAlive extends Vue {
  @Prop()
  include: patternTypes

  @Prop()
  exclude: patternTypes

  @Prop()
  updateComponentsKey: Function

  private cache: nodeCache

  private _vnode: VNode

  created () {
    this.cache = Object.create(null)
  }


  destroyed () {
    for (const key in this.cache) {
      pruneCacheEntry(this.cache[key])
    }
  }

  @Watch('include')
  onIncludeChanged (val: string | RegExp | Array<string>) {
    pruneCache(this.cache, this._vnode, name => matches(val, name))
  }

  @Watch('exclude')
  onExcludeChanged (val: string | RegExp | Array<string>) {
    pruneCache(this.cache, this._vnode, name => !matches(val, name))
  }

  render () {
    const vnode: any = getFirstComponentChild(this.$slots.default)
    const componentOptions = vnode && vnode.componentOptions
    if (componentOptions) {
      // check pattern
      const name: string | undefined = getComponentName(componentOptions)
      if (name && (
              (this.include && !matches(this.include, name)) ||
              (this.exclude && matches(this.exclude, name))
          )) {
        return vnode
      }
      const key: string = vnode.key == null
          // same constructor may get registered as different local components
          // so cid alone is not enough (#3269)
          ? componentOptions.Ctor.cid + (componentOptions.tag ? `::${componentOptions.tag}` : '')
          : vnode.key
      this.updateComponentsKey && this.updateComponentsKey(key)
      if (this.cache[key]) {
        vnode.componentInstance = this.cache[key].componentInstance
      } else {
        this.cache[key] = vnode
      }
      vnode.data.keepAlive = true
    }
    return vnode
  }

  removeCacheByKey (key: string): void {
    pruneCacheEntry(this.cache[key])
    delete this.cache[key]
  }
}

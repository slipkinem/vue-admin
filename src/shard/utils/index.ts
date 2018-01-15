/**
 * Created by slipkinem on 1/15/2018 at 1:38 PM.
 * Copyright © 2016, PuKang Health Maintenance Co.
 */
export function isUndef (v: any): boolean {
  return v === undefined || v === null
}

export function isDef (v: any): boolean {
  return v !== undefined && v !== null
}

export {
  format
} from './format'

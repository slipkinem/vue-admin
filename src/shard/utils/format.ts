/**
 * Created by slipkinem on 2016/12/8.
 */

const SIGN_REGEXP = /([yMdwhsm])(\1*)/g
const DEFAULT_PATTERN = 'yyyy-MM-dd hh:mm:ss'

function padding (s: number | string, len: number): string {
  let leng = len - (s + '').length
  for (let i = 0; i < leng; i++) {
    s = '0' + s
  }
  return s.toString()
}

export function format (date: Date, pattern?: string): string {
  pattern = pattern || DEFAULT_PATTERN
  return pattern.replace(SIGN_REGEXP, $0 => {
    switch ($0.charAt(0)) {
      case 'y':
        return padding(date.getFullYear(), $0.length)
      case 'M':
        return padding(date.getMonth() + 1, $0.length)
      case 'd':
        return padding(date.getDate(), $0.length)
      case 'w':
        return (date.getDay() + 1).toString()
      case 'h':
        return padding(date.getHours(), $0.length)
      case 'm':
        return padding(date.getMinutes(), $0.length)
      case 's':
        return padding(date.getSeconds(), $0.length)
      default:
        return ''
    }
  })
}


/**
 * TypeScript Array Utils - Main Entry Point
 * ジェネリックな配列操作ユーティリティライブラリ
 *
 * @author Student
 * @version 1.0.0
 */

// 基本的な配列操作関数のエクスポート
export {
  chunk,
  compact,
  deepFlatten,
  difference,
  filter,
  filterAsync,
  filterWithTypeGuard,
  findIndex,
  findLastIndex,
  flatten,
  getStats,
  groupBy,
  intersection,
  map,
  mapAsync,
  partition,
  reduce,
  sample,
  shuffle,
  skip,
  take,
  union,
  unique,
  uniqueBy,
} from './array-utils'
// チェーン可能APIのエクスポート
export {
  ChainableArrayImpl as ChainableArray,
  chain,
  from,
  range,
  repeat,
} from './chainable'
export { benchmark, performanceTest } from './performance'

// 便利なヘルパー関数
export { createPipeline } from './pipeline'
// 型ガード関数
export {
  isAllBooleans,
  isAllNumbers,
  isAllStrings,
  isArray,
  isNonEmpty,
} from './type-guards'
// 型定義のエクスポート
export * from './types'

// バージョン情報
export const VERSION = '1.0.0'

/**
 * ライブラリの情報を取得
 */
export function getLibraryInfo(): {
  name: string
  version: string
  description: string
  author: string
} {
  return {
    name: 'ts-array-utils',
    version: VERSION,
    description: 'TypeScript generic array utilities library',
    author: 'Student',
  }
}

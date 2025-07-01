/**
 * TypeScript Array Utils - Core Implementation
 * ジェネリックな配列操作ユーティリティ関数
 */

import {
  type ArrayStats,
  ArrayUtilsError,
  type AsyncMapper,
  type AsyncPredicate,
  type KeySelector,
  type Mapper,
  type NonNullable,
  type PartitionResult,
  type Predicate,
  type Reducer,
  type TypeGuard,
} from './types'

/**
 * カスタムmap実装
 */
export function map<T, U>(array: T[], mapper: Mapper<T, U>): U[] {
  if (!Array.isArray(array)) {
    throw new ArrayUtilsError('First argument must be an array', 'map')
  }

  const result: U[] = []
  for (let i = 0; i < array.length; i++) {
    result.push(mapper(array[i], i, array))
  }
  return result
}

/**
 * カスタムfilter実装
 */
export function filter<T>(array: T[], predicate: Predicate<T>): T[] {
  if (!Array.isArray(array)) {
    throw new ArrayUtilsError('First argument must be an array', 'filter')
  }

  const result: T[] = []
  for (let i = 0; i < array.length; i++) {
    if (predicate(array[i], i, array)) {
      result.push(array[i])
    }
  }
  return result
}

/**
 * 型ガード付きfilter
 */
export function filterWithTypeGuard<T, U extends T>(array: T[], typeGuard: TypeGuard<T, U>): U[] {
  return filter(array, typeGuard) as U[]
}

/**
 * カスタムreduce実装
 */
export function reduce<T, U>(array: T[], reducer: Reducer<T, U>, initialValue: U): U {
  if (!Array.isArray(array)) {
    throw new ArrayUtilsError('First argument must be an array', 'reduce')
  }

  let accumulator = initialValue
  for (let i = 0; i < array.length; i++) {
    accumulator = reducer(accumulator, array[i], i, array)
  }
  return accumulator
}

/**
 * グループ化関数
 */
export function groupBy<T, K extends string | number>(array: T[], getKey: KeySelector<T, K>): Record<K, T[]> {
  if (!Array.isArray(array)) {
    throw new ArrayUtilsError('First argument must be an array', 'groupBy')
  }

  return reduce(
    array,
    (groups, item) => {
      const key = getKey(item)
      groups[key] = groups[key] ?? []
      groups[key].push(item)
      return groups
    },
    {} as Record<K, T[]>,
  )
}

/**
 * 配列を2つに分割
 */
export function partition<T>(array: T[], predicate: Predicate<T>): PartitionResult<T> {
  if (!Array.isArray(array)) {
    throw new ArrayUtilsError('First argument must be an array', 'partition')
  }

  const trueArray: T[] = []
  const falseArray: T[] = []

  for (let i = 0; i < array.length; i++) {
    if (predicate(array[i], i, array)) {
      trueArray.push(array[i])
    } else {
      falseArray.push(array[i])
    }
  }

  return [trueArray, falseArray]
}

/**
 * 重複要素の除去
 */
export function unique<T>(array: T[]): T[] {
  if (!Array.isArray(array)) {
    throw new ArrayUtilsError('First argument must be an array', 'unique')
  }

  const seen = new Set<T>()
  const result: T[] = []

  for (const item of array) {
    if (!seen.has(item)) {
      seen.add(item)
      result.push(item)
    }
  }

  return result
}

/**
 * キーに基づく重複除去
 */
export function uniqueBy<T, K>(array: T[], getKey: KeySelector<T, K>): T[] {
  if (!Array.isArray(array)) {
    throw new ArrayUtilsError('First argument must be an array', 'uniqueBy')
  }

  const seen = new Set<K>()
  const result: T[] = []

  for (const item of array) {
    const key = getKey(item)
    if (!seen.has(key)) {
      seen.add(key)
      result.push(item)
    }
  }

  return result
}

/**
 * 配列の平坦化
 */
export function flatten<T>(array: T[][]): T[]
export function flatten<T>(array: (T | T[])[]): T[]
export function flatten<T>(array: unknown[]): T[] {
  if (!Array.isArray(array)) {
    throw new ArrayUtilsError('First argument must be an array', 'flatten')
  }

  const result: T[] = []

  for (const item of array) {
    if (Array.isArray(item)) {
      result.push(...item)
    } else {
      result.push(item as T)
    }
  }

  return result
}

/**
 * 深い平坦化
 */
export function deepFlatten<T>(array: unknown[]): T[] {
  if (!Array.isArray(array)) {
    throw new ArrayUtilsError('First argument must be an array', 'deepFlatten')
  }

  const result: T[] = []

  for (const item of array) {
    if (Array.isArray(item)) {
      result.push(...deepFlatten<T>(item))
    } else {
      result.push(item as T)
    }
  }

  return result
}

/**
 * 配列のチャンク化
 */
export function chunk<T>(array: T[], size: number): T[][] {
  if (!Array.isArray(array)) {
    throw new ArrayUtilsError('First argument must be an array', 'chunk')
  }

  if (size <= 0) {
    throw new ArrayUtilsError('Chunk size must be greater than 0', 'chunk')
  }

  const result: T[][] = []

  for (let i = 0; i < array.length; i += size) {
    result.push(array.slice(i, i + size))
  }

  return result
}

/**
 * 配列の統計情報を計算
 */
export function getStats(array: number[]): ArrayStats {
  if (!Array.isArray(array)) {
    throw new ArrayUtilsError('First argument must be an array', 'getStats')
  }

  if (array.length === 0) {
    return { length: 0 }
  }

  const sorted = [...array].sort((a, b) => a - b)
  const sum = reduce(array, (acc, val) => acc + val, 0)
  const average = sum / array.length

  // 中央値の計算
  const median =
    array.length % 2 === 0
      ? (sorted[array.length / 2 - 1] + sorted[array.length / 2]) / 2
      : sorted[Math.floor(array.length / 2)]

  // 標準偏差の計算
  const variance = reduce(array, (acc, val) => acc + (val - average) ** 2, 0) / array.length
  const standardDeviation = Math.sqrt(variance)

  // 最頻値の計算
  const frequency = groupBy(array, (x) => x)
  const maxFreq = Math.max(...Object.values(frequency).map((arr) => arr.length))
  const mode = Object.keys(frequency)
    .filter((key) => frequency[Number(key)].length === maxFreq)
    .map(Number)

  return {
    length: array.length,
    sum,
    average,
    min: sorted[0],
    max: sorted[sorted.length - 1],
    median,
    mode,
    standardDeviation,
  }
}

/**
 * 配列の差集合
 */
export function difference<T>(array1: T[], array2: T[]): T[] {
  if (!Array.isArray(array1) || !Array.isArray(array2)) {
    throw new ArrayUtilsError('Both arguments must be arrays', 'difference')
  }

  const set2 = new Set(array2)
  return filter(array1, (item) => !set2.has(item))
}

/**
 * 配列の積集合
 */
export function intersection<T>(array1: T[], array2: T[]): T[] {
  if (!Array.isArray(array1) || !Array.isArray(array2)) {
    throw new ArrayUtilsError('Both arguments must be arrays', 'intersection')
  }

  const set2 = new Set(array2)
  return unique(filter(array1, (item) => set2.has(item)))
}

/**
 * 配列の和集合
 */
export function union<T>(...arrays: T[][]): T[] {
  for (const array of arrays) {
    if (!Array.isArray(array)) {
      throw new ArrayUtilsError('All arguments must be arrays', 'union')
    }
  }

  return unique(flatten(arrays))
}

/**
 * 指定した数の要素を取得
 */
export function take<T>(array: T[], count: number): T[] {
  if (!Array.isArray(array)) {
    throw new ArrayUtilsError('First argument must be an array', 'take')
  }

  if (count < 0) {
    throw new ArrayUtilsError('Count must be non-negative', 'take')
  }

  return array.slice(0, count)
}

/**
 * 指定した数の要素をスキップ
 */
export function skip<T>(array: T[], count: number): T[] {
  if (!Array.isArray(array)) {
    throw new ArrayUtilsError('First argument must be an array', 'skip')
  }

  if (count < 0) {
    throw new ArrayUtilsError('Count must be non-negative', 'skip')
  }

  return array.slice(count)
}

/**
 * 条件を満たす最初の要素のインデックス
 */
export function findIndex<T>(array: T[], predicate: Predicate<T>): number {
  if (!Array.isArray(array)) {
    throw new ArrayUtilsError('First argument must be an array', 'findIndex')
  }

  for (let i = 0; i < array.length; i++) {
    if (predicate(array[i], i, array)) {
      return i
    }
  }

  return -1
}

/**
 * 条件を満たす最後の要素のインデックス
 */
export function findLastIndex<T>(array: T[], predicate: Predicate<T>): number {
  if (!Array.isArray(array)) {
    throw new ArrayUtilsError('First argument must be an array', 'findLastIndex')
  }

  for (let i = array.length - 1; i >= 0; i--) {
    if (predicate(array[i], i, array)) {
      return i
    }
  }

  return -1
}

/**
 * null/undefinedでない要素のみを抽出
 */
export function compact<T>(array: (T | null | undefined)[]): NonNullable<T>[] {
  if (!Array.isArray(array)) {
    throw new ArrayUtilsError('First argument must be an array', 'compact')
  }

  return filter(array, (item): item is NonNullable<T> => item !== null && item !== undefined)
}

/**
 * 配列の要素をランダムに並び替え
 */
export function shuffle<T>(array: T[]): T[] {
  if (!Array.isArray(array)) {
    throw new ArrayUtilsError('First argument must be an array', 'shuffle')
  }

  const result = [...array]

  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[result[i], result[j]] = [result[j], result[i]]
  }

  return result
}

/**
 * 配列からランダムな要素を取得
 */
export function sample<T>(array: T[], count = 1): T[] {
  if (!Array.isArray(array)) {
    throw new ArrayUtilsError('First argument must be an array', 'sample')
  }

  if (count < 0) {
    throw new ArrayUtilsError('Count must be non-negative', 'sample')
  }

  if (count >= array.length) {
    return shuffle(array)
  }

  const shuffled = shuffle(array)
  return take(shuffled, count)
}

/**
 * 非同期map
 */
export async function mapAsync<T, U>(array: T[], mapper: AsyncMapper<T, U>): Promise<U[]> {
  if (!Array.isArray(array)) {
    throw new ArrayUtilsError('First argument must be an array', 'mapAsync')
  }

  const promises = array.map((item, index) => mapper(item, index, array))
  return Promise.all(promises)
}

/**
 * 非同期filter
 */
export async function filterAsync<T>(array: T[], predicate: AsyncPredicate<T>): Promise<T[]> {
  if (!Array.isArray(array)) {
    throw new ArrayUtilsError('First argument must be an array', 'filterAsync')
  }

  const results = await mapAsync(array, async (item, index) => ({
    item,
    include: await predicate(item, index, array),
  }))

  return results.filter((result) => result.include).map((result) => result.item)
}

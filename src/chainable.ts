/**
 * TypeScript Array Utils - Chainable API
 * メソッドチェーン可能なAPIの実装
 */

import * as ArrayUtils from './array-utils'
import {
  ArrayUtilsError,
  type ChainableArray,
  type Comparator,
  type Flatten,
  type Mapper,
  type Predicate,
  type Reducer,
} from './types'

/**
 * チェーン可能な配列クラス
 */
export class ChainableArrayImpl<T> implements ChainableArray<T> {
  private readonly data: T[]

  constructor(data: T[]) {
    if (!Array.isArray(data)) {
      throw new ArrayUtilsError('Data must be an array', 'ChainableArray')
    }
    this.data = [...data]
  }

  /**
   * 最終的な配列値を取得
   */
  value(): T[] {
    return [...this.data]
  }

  /**
   * map操作
   */
  map<U>(mapper: Mapper<T, U>): ChainableArray<U> {
    const mapped = ArrayUtils.map(this.data, mapper)
    return new ChainableArrayImpl(mapped)
  }

  /**
   * filter操作
   */
  filter(predicate: Predicate<T>): ChainableArray<T> {
    const filtered = ArrayUtils.filter(this.data, predicate)
    return new ChainableArrayImpl(filtered)
  }

  /**
   * reduce操作（終端操作）
   */
  reduce<U>(reducer: Reducer<T, U>, initialValue: U): U {
    return ArrayUtils.reduce(this.data, reducer, initialValue)
  }

  /**
   * sort操作
   */
  sort(comparator?: Comparator<T>): ChainableArray<T> {
    const sorted = [...this.data].sort(comparator)
    return new ChainableArrayImpl(sorted)
  }

  /**
   * reverse操作
   */
  reverse(): ChainableArray<T> {
    const reversed = [...this.data].reverse()
    return new ChainableArrayImpl(reversed)
  }

  /**
   * slice操作
   */
  slice(start?: number, end?: number): ChainableArray<T> {
    const sliced = this.data.slice(start, end)
    return new ChainableArrayImpl(sliced)
  }

  /**
   * concat操作
   */
  concat(...arrays: T[][]): ChainableArray<T> {
    const concatenated = this.data.concat(...arrays)
    return new ChainableArrayImpl(concatenated)
  }

  /**
   * unique操作
   */
  unique(): ChainableArray<T> {
    const uniqueData = ArrayUtils.unique(this.data)
    return new ChainableArrayImpl(uniqueData)
  }

  /**
   * flatten操作
   */
  flatten(): ChainableArray<Flatten<T>> {
    const flattened = ArrayUtils.flatten(this.data as unknown[]) as Flatten<T>[]
    return new ChainableArrayImpl(flattened)
  }

  /**
   * take操作
   */
  take(count: number): ChainableArray<T> {
    const taken = ArrayUtils.take(this.data, count)
    return new ChainableArrayImpl(taken)
  }

  /**
   * skip操作
   */
  skip(count: number): ChainableArray<T> {
    const skipped = ArrayUtils.skip(this.data, count)
    return new ChainableArrayImpl(skipped)
  }

  /**
   * groupBy操作（終端操作）
   */
  groupBy<K extends string | number>(getKey: (item: T) => K): Record<K, T[]> {
    return ArrayUtils.groupBy(this.data, getKey)
  }

  /**
   * partition操作（終端操作）
   */
  partition(predicate: Predicate<T>): [T[], T[]] {
    return ArrayUtils.partition(this.data, predicate)
  }

  /**
   * forEach操作（副作用操作）
   */
  forEach(callback: (item: T, index: number, array: T[]) => void): ChainableArray<T> {
    this.data.forEach(callback)
    return this
  }

  /**
   * tap操作（デバッグ用）
   */
  tap(callback: (data: T[]) => void): ChainableArray<T> {
    callback([...this.data])
    return this
  }

  /**
   * 統計情報の取得（数値配列のみ）
   */
  stats(): ReturnType<typeof ArrayUtils.getStats> {
    if (this.data.length > 0 && typeof this.data[0] === 'number') {
      return ArrayUtils.getStats(this.data as number[])
    }
    throw new ArrayUtilsError('Stats can only be calculated for number arrays', 'stats')
  }

  /**
   * 配列の長さを取得
   */
  length(): number {
    return this.data.length
  }

  /**
   * 空かどうかをチェック
   */
  isEmpty(): boolean {
    return this.data.length === 0
  }

  /**
   * 先頭要素を取得
   */
  first(): T | undefined {
    return this.data[0]
  }

  /**
   * 末尾要素を取得
   */
  last(): T | undefined {
    return this.data[this.data.length - 1]
  }

  /**
   * 指定インデックスの要素を取得
   */
  at(index: number): T | undefined {
    return index >= 0 ? this.data[index] : this.data[this.data.length + index]
  }

  /**
   * 要素が含まれているかチェック
   */
  includes(searchElement: T): boolean {
    return this.data.includes(searchElement)
  }

  /**
   * 条件を満たす要素が存在するかチェック
   */
  some(predicate: Predicate<T>): boolean {
    return ArrayUtils.findIndex(this.data, predicate) !== -1
  }

  /**
   * すべての要素が条件を満たすかチェック
   */
  every(predicate: Predicate<T>): boolean {
    return ArrayUtils.findIndex(this.data, (item, index, array) => !predicate(item, index, array)) === -1
  }

  /**
   * 条件を満たす最初の要素を取得
   */
  find(predicate: Predicate<T>): T | undefined {
    const index = ArrayUtils.findIndex(this.data, predicate)
    return index !== -1 ? this.data[index] : undefined
  }

  /**
   * 条件を満たす最初の要素のインデックスを取得
   */
  findIndex(predicate: Predicate<T>): number {
    return ArrayUtils.findIndex(this.data, predicate)
  }

  /**
   * 要素のインデックスを取得
   */
  indexOf(searchElement: T, fromIndex?: number): number {
    return this.data.indexOf(searchElement, fromIndex)
  }

  /**
   * 要素の最後のインデックスを取得
   */
  lastIndexOf(searchElement: T, fromIndex?: number): number {
    return this.data.lastIndexOf(searchElement, fromIndex)
  }

  /**
   * 文字列として結合
   */
  join(separator?: string): string {
    return this.data.join(separator)
  }

  /**
   * 配列をJSON文字列に変換
   */
  toJSON(): string {
    return JSON.stringify(this.data)
  }

  /**
   * 配列を文字列表現に変換
   */
  toString(): string {
    return this.data.toString()
  }

  /**
   * イテレータの実装
   */
  [Symbol.iterator](): Iterator<T> {
    return this.data[Symbol.iterator]()
  }
}

/**
 * チェーン可能な配列を作成
 */
export function chain<T>(data: T[]): ChainableArray<T> {
  return new ChainableArrayImpl(data)
}

/**
 * 範囲の数値配列を作成
 */
export function range(start: number, end: number, step = 1): ChainableArray<number> {
  if (step === 0) {
    throw new ArrayUtilsError('Step cannot be zero', 'range')
  }

  const result: number[] = []

  if (step > 0) {
    for (let i = start; i < end; i += step) {
      result.push(i)
    }
  } else {
    for (let i = start; i > end; i += step) {
      result.push(i)
    }
  }

  return new ChainableArrayImpl(result)
}

/**
 * 指定した値で配列を作成
 */
export function repeat<T>(value: T, count: number): ChainableArray<T> {
  if (count < 0) {
    throw new ArrayUtilsError('Count must be non-negative', 'repeat')
  }

  const result: T[] = new Array(count).fill(value)
  return new ChainableArrayImpl(result)
}

/**
 * 複数の配列をチェーン可能な配列として結合
 */
export function from<T>(...arrays: T[][]): ChainableArray<T> {
  const flattened = ArrayUtils.flatten(arrays)
  return new ChainableArrayImpl(flattened)
}

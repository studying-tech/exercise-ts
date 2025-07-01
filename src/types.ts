/**
 * TypeScript Array Utils - Type Definitions
 * 配列操作ユーティリティの型定義
 */

// 基本的な型エイリアス
export type Predicate<T> = (value: T, index: number, array: T[]) => boolean
export type Mapper<T, U> = (value: T, index: number, array: T[]) => U
export type Reducer<T, U> = (accumulator: U, current: T, index: number, array: T[]) => U
export type Comparator<T> = (a: T, b: T) => number
export type KeySelector<T, K extends string | number | symbol> = (item: T) => K

// 条件付き型の定義
export type NonNullable<T> = T extends null | undefined ? never : T
export type ElementType<T> = T extends (infer U)[] ? U : never
export type ArrayOrSingle<T> = T | T[]

// ユーティリティ型
export type Flatten<T> = T extends (infer U)[][] ? U[] : T extends (infer U)[] ? U : T
export type DeepFlatten<T> = T extends (infer U)[] ? DeepFlatten<U> : T

// 関数のオーバーロード用型
export interface GroupByResult<T, _K extends string | number | symbol> {
  [key: string]: T[]
  [key: number]: T[]
  [key: symbol]: T[]
}

// パフォーマンステスト用型
export interface PerformanceResult {
  name: string
  executionTime: number
  memoryUsage?: number
  operations: number
}

// エラー型
export class ArrayUtilsError extends Error {
  constructor(
    message: string,
    public readonly operation: string,
  ) {
    super(message)
    this.name = 'ArrayUtilsError'
  }
}

// チェーン可能な配列型
export interface ChainableArray<T> {
  value(): T[]
  map<U>(mapper: Mapper<T, U>): ChainableArray<U>
  filter(predicate: Predicate<T>): ChainableArray<T>
  reduce<U>(reducer: Reducer<T, U>, initialValue: U): U
  sort(comparator?: Comparator<T>): ChainableArray<T>
  reverse(): ChainableArray<T>
  slice(start?: number, end?: number): ChainableArray<T>
  concat(...arrays: T[][]): ChainableArray<T>
  unique(): ChainableArray<T>
  flatten(): ChainableArray<Flatten<T>>
  take(count: number): ChainableArray<T>
  skip(count: number): ChainableArray<T>
}

// 型ガード関数の型
export type TypeGuard<T, U extends T> = (value: T) => value is U

// 非同期処理用型
export type AsyncMapper<T, U> = (value: T, index: number, array: T[]) => Promise<U>
export type AsyncPredicate<T> = (value: T, index: number, array: T[]) => Promise<boolean>

// パーティション結果型
export type PartitionResult<T> = [T[], T[]]

// 統計情報型
export interface ArrayStats {
  length: number
  sum?: number
  average?: number
  min?: number
  max?: number
  median?: number
  mode?: number[]
  standardDeviation?: number
}

// ソート順序
export type SortOrder = 'asc' | 'desc'

// グループ化オプション
export interface GroupByOptions<T> {
  keySelector: KeySelector<T, string | number>
  valueTransformer?: <U>(item: T) => U
  sortKeys?: boolean
  sortOrder?: SortOrder
}

// チャンク化オプション
export interface ChunkOptions {
  size: number
  fillIncomplete?: boolean
  fillValue?: unknown
}

// 検索オプション
export interface FindOptions<T> {
  startIndex?: number
  predicate?: Predicate<T>
  multiple?: boolean
}

// ソートオプション
export interface SortOptions<T> {
  comparator?: Comparator<T>
  order?: SortOrder
  stable?: boolean
}

// マージオプション
export interface MergeOptions<T> {
  comparator?: Comparator<T>
  removeDuplicates?: boolean
  mergeStrategy?: 'concat' | 'union' | 'intersection'
}

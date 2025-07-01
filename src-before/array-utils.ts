import type { ArrayStats, Comparator, GroupedData, Mapper, Predicate, Reducer } from './types'

// 基本的な配列操作関数
// 【課題12】map関数を実装してください
// 要件:
// - ジェネリクスT、Uを使用
// - 配列の各要素にmapper関数を適用
// - 新しい配列を返す
export function map<T, U>(array: readonly T[], mapper: Mapper<T, U>): U[] {
  /* ここに実装 */
}

// 【課題13】filter関数を実装してください
// 要件:
// - ジェネリクスTを使用
// - predicateがtrueを返す要素のみを含む新しい配列を返す
export function filter<T>(array: readonly T[], predicate: Predicate<T>): T[] {
  /* ここに実装 */
}

// 【課題14】reduce関数を実装してください
// 要件:
// - ジェネリクスT、Uを使用
// - 配列を単一の値に畳み込む
// - initialValueから開始
export function reduce<T, U>(array: readonly T[], reducer: Reducer<T, U>, initialValue: U): U {
  /* ここに実装 */
}

// 【課題15】flatMap関数を実装してください
// 要件:
// - 各要素をmapper関数で変換（結果は配列）
// - 結果を1段階平坦化
export function flatMap<T, U>(array: readonly T[], mapper: Mapper<T, U[]>): U[] {
  /* ここに実装 */
}

// 高度な配列操作関数
// 【課題16】groupBy関数を実装してください
// 要件:
// - 配列をキーでグループ化
// - getKey関数でキーを取得
// - GroupedData<T>型を返す
export function groupBy<T, K extends PropertyKey>(array: readonly T[], getKey: (item: T) => K): GroupedData<T> {
  /* ここに実装 */
}

// 【課題17】partition関数を実装してください
// 要件:
// - predicateがtrueの要素とfalseの要素に分割
// - [trueの配列, falseの配列]のタプルを返す
export function partition<T>(array: readonly T[], predicate: Predicate<T>): [T[], T[]] {
  /* ここに実装 */
}

// 【課題18】unique関数を実装してください
// 要件:
// - 重複を除去した配列を返す
// - オプションのgetKey関数で比較キーを指定可能
export function unique<T, K = T>(array: readonly T[], getKey?: (item: T) => K): T[] {
  /* ここに実装 */
}

// 【課題19】flatten関数を実装してください
// 要件:
// - ネストした配列を指定した深さまで平坦化
// - デフォルトの深さは1
export function flatten<T>(array: readonly any[], depth = 1): T[] {
  /* ここに実装 */
}

// 【課題20】chunk関数を実装してください
// 要件:
// - 配列を指定サイズのチャンクに分割
// - 最後のチャンクはsizeより小さい可能性がある
export function chunk<T>(array: readonly T[], size: number): T[][] {
  if (size <= 0) {
    throw new Error('Chunk size must be greater than 0')
  }
  /* ここに実装 */
}

// 集合演算
// 【課題21】union関数を実装してください
// 要件:
// - 2つの配列の和集合を返す
// - 重複は除去
export function union<T>(array1: readonly T[], array2: readonly T[]): T[] {
  /* ここに実装 */
}

// 【課題22】intersection関数を実装してください
// 要件:
// - 2つの配列の積集合を返す
// - 両方に含まれる要素のみ
export function intersection<T>(array1: readonly T[], array2: readonly T[]): T[] {
  /* ここに実装 */
}

// 【課題23】difference関数を実装してください
// 要件:
// - array1にあってarray2にない要素を返す
export function difference<T>(array1: readonly T[], array2: readonly T[]): T[] {
  /* ここに実装 */
}

// 統計関数
// 【課題24】getStats関数を実装してください
// 要件:
// - 数値配列の統計情報を計算
// - min、max、sum、average、median、mode、countを含む
export function getStats(numbers: readonly number[]): ArrayStats {
  if (numbers.length === 0) {
    throw new Error('Cannot calculate stats for empty array')
  }

  /* ここに実装 */
}

// 非同期関数
// 【課題25】mapAsync関数を実装してください
// 要件:
// - 非同期mapper関数を使用
// - Promise.allで並列実行
export async function mapAsync<T, U>(
  array: readonly T[],
  mapper: (value: T, index: number) => Promise<U>,
): Promise<U[]> {
  /* ここに実装 */
}

// 【課題26】filterAsync関数を実装してください
// 要件:
// - 非同期predicate関数を使用
// - trueを返す要素のみを含む配列を返す
export async function filterAsync<T>(
  array: readonly T[],
  predicate: (value: T, index: number) => Promise<boolean>,
): Promise<T[]> {
  /* ここに実装 */
}

// 【課題27】reduceAsync関数を実装してください
// 要件:
// - 非同期reducer関数を使用
// - 順次実行（並列ではない）
export async function reduceAsync<T, U>(
  array: readonly T[],
  reducer: (accumulator: U, current: T, index: number) => Promise<U>,
  initialValue: U,
): Promise<U> {
  /* ここに実装 */
}

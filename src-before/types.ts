// 基本的な型定義
// 【課題1】Predicate型を定義してください
// 要件:
// - ジェネリクスTを受け取る
// - T型の値を受け取り、booleanを返す関数型
export type Predicate<T> = /* ここに実装 */;

// 【課題2】Mapper型を定義してください
// 要件:
// - ジェネリクスT、Uを受け取る
// - T型の値とindex(number)を受け取り、U型を返す関数型
export type Mapper<T, U> = /* ここに実装 */;

// 【課題3】Reducer型を定義してください
// 要件:
// - ジェネリクスT、Uを受け取る
// - accumulator(U型)、current(T型)、index(number)を受け取り、U型を返す関数型
export type Reducer<T, U> = /* ここに実装 */;

// 【課題4】Comparator型を定義してください
// 要件:
// - ジェネリクスTを受け取る
// - 2つのT型の値を受け取り、numberを返す関数型
export type Comparator<T> = /* ここに実装 */;

// 条件付き型
// 【課題5】NonNullable型を実装してください
// 要件:
// - Tからnullとundefinedを除外した型
export type NonNullable<T> = /* ここに実装 */;

// 【課題6】Flatten型を実装してください
// 要件:
// - T[][]をT[]に平坦化する型
// - T[]の場合はTを返す
// - それ以外はTを返す
export type Flatten<T> = /* ここに実装 */;

// 【課題7】DeepFlatten型を実装してください
// 要件:
// - 深くネストした配列を完全に平坦化する型
// - 再帰的に適用
export type DeepFlatten<T> = /* ここに実装 */;

// インターフェース定義
// 【課題8】ChainableArrayインターフェースを定義してください
// 要件:
// - ジェネリクスTを受け取る
// - filter、map、reduce、flatMap、sort、value、toArrayメソッドを持つ
export interface ChainableArray<T> {
  filter(predicate: Predicate<T>): ChainableArray<T>
  map<U>(mapper: Mapper<T, U>): ChainableArray<U>
  reduce<U>(reducer: Reducer<T, U>, initialValue: U): U
  flatMap<U>(mapper: Mapper<T, U[]>): ChainableArray<U>
  sort(comparator?: Comparator<T>): ChainableArray<T>
  value(): T[]
  toArray(): T[]
}

// 【課題9】GroupedDataインターフェースを定義してください
// 要件:
// - keyとstring | number | symbol、valueがT[]のRecord型
export type GroupedData<T> = {}

// 【課題10】ArrayStatsインターフェースを定義してください
// 要件:
// - min、max、sum、average、median、mode、countプロパティを持つ
// - すべてnumber型
export type ArrayStats = {}

// エラークラス
// 【課題11】ArrayUtilsErrorクラスを実装してください
// 要件:
// - Errorクラスを継承
// - constructorでmessageを受け取る
// - nameプロパティを'ArrayUtilsError'に設定
export class ArrayUtilsError extends Error {
  /* ここに実装 */
}

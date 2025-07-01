// 型ガード関数
// 【課題45】isArray型ガードを実装してください
// 要件:
// - valueがT[]型かどうかをチェック
// - 型述語を使用（value is T[]）
export function isArray<T>(value: unknown): value is T[] {
  /* ここに実装 */
}

// 【課題46】isString型ガードを実装してください
// 要件:
// - valueがstring型かどうかをチェック
export function isString(value: unknown): value is string {
  /* ここに実装 */
}

// 【課題47】isNumber型ガードを実装してください
// 要件:
// - valueがnumber型かどうかをチェック
// - NaNは除外
export function isNumber(value: unknown): value is number {
  /* ここに実装 */
}

// 【課題48】isBoolean型ガードを実装してください
// 要件:
// - valueがboolean型かどうかをチェック
export function isBoolean(value: unknown): value is boolean {
  /* ここに実装 */
}

// 【課題49】isObject型ガードを実装してください
// 要件:
// - valueがobject型かどうかをチェック
// - nullは除外
export function isObject(value: unknown): value is object {
  /* ここに実装 */
}

// 【課題50】isNull型ガードを実装してください
// 要件:
// - valueがnullかどうかをチェック
export function isNull(value: unknown): value is null {
  /* ここに実装 */
}

// 【課題51】isUndefined型ガードを実装してください
// 要件:
// - valueがundefinedかどうかをチェック
export function isUndefined(value: unknown): value is undefined {
  /* ここに実装 */
}

// 【課題52】isNullOrUndefined型ガードを実装してください
// 要件:
// - valueがnullまたはundefinedかどうかをチェック
export function isNullOrUndefined(value: unknown): value is null | undefined {
  /* ここに実装 */
}

// 【課題53】isDefined型ガードを実装してください
// 要件:
// - valueがnullでもundefinedでもないことをチェック
// - NonNullable<T>型を使用
export function isDefined<T>(value: T): value is NonNullable<T> {
  /* ここに実装 */
}

// 【課題54】hasProperty型ガードを実装してください
// 要件:
// - オブジェクトが特定のプロパティを持つかチェック
// - プロパティ名はK extends PropertyKey
export function hasProperty<K extends PropertyKey>(obj: unknown, key: K): obj is Record<K, unknown> {
  /* ここに実装 */
}

// 配列関連の型ガード
// 【課題55】isEmptyArray型ガードを実装してください
// 要件:
// - 配列が空かどうかをチェック
export function isEmptyArray<T>(value: T[]): value is [] {
  /* ここに実装 */
}

// 【課題56】isNonEmptyArray型ガードを実装してください
// 要件:
// - 配列が空でないかどうかをチェック
// - 型は[T, ...T[]]
export function isNonEmptyArray<T>(value: T[]): value is [T, ...T[]] {
  /* ここに実装 */
}

// 【課題57】isArrayOf型ガードを実装してください
// 要件:
// - 配列のすべての要素が特定の型ガードを満たすかチェック
export function isArrayOf<T>(value: unknown, guard: (item: unknown) => item is T): value is T[] {
  /* ここに実装 */
}

// 複合型ガード
// 【課題58】or型ガードを実装してください
// 要件:
// - 複数の型ガードのいずれかを満たすかチェック
export function or<T1, T2>(
  guard1: (value: unknown) => value is T1,
  guard2: (value: unknown) => value is T2,
): (value: unknown) => value is T1 | T2 {
  /* ここに実装 */
}

// 【課題59】and型ガードを実装してください
// 要件:
// - 複数の型ガードのすべてを満たすかチェック
export function and<T1, T2>(
  guard1: (value: unknown) => value is T1,
  guard2: (value: unknown) => value is T2,
): (value: unknown) => value is T1 & T2 {
  /* ここに実装 */
}

// 【課題60】not型ガードを実装してください
// 要件:
// - 型ガードの否定
// - Exclude<unknown, T>を使用
export function not<T>(guard: (value: unknown) => value is T): (value: unknown) => value is Exclude<unknown, T> {
  /* ここに実装 */
}

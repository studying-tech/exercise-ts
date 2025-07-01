# 09 TypeScript 配列ユーティリティ - 型安全な配列操作ライブラリの開発

[GitHub Repository](https://github.com/studying-tech/exercise-react)

TypeScript の高度な型システムを活用して、ジェネリックな配列操作ユーティリティライブラリを開発し、型安全性とパフォーマンスを両立させる実践的なスキルを学習します。

## この演習で学べること

- TypeScript のジェネリクスと高度な型システム
- 型推論と型ガードの実装テクニック
- 条件付き型とユーティリティ型の活用
- 関数型プログラミングのパターン
- パフォーマンス最適化とベンチマーク手法

## 演習の目標

型安全で使いやすい配列操作ユーティリティライブラリを実装します。ネイティブの配列メソッドを拡張し、より便利で型安全な機能を提供することで、TypeScript の型システムの強力さを実感し、実務で活用できるスキルを身につけます。

## 前提条件

- Node.js 18.0 以上
- npm または yarn
- TypeScript の基本知識
- 配列操作の基本概念
- 関数型プログラミングの基礎

## クイックスタート

```sh
# 1. ディレクトリに移動
cd repos/9

# 2. 依存関係のインストール
npm install

# 3. TypeScriptビルド
npm run build

# 4. テストの実行
npm test

# 5. 開発モード（ファイル監視）
npm run build:watch

# 6. 使用例の実行
npm run dev
```

## プロジェクト構成

```txt
/
├── src/                        # TypeScriptソースコード
│   ├── index.ts               # メインエントリーポイント
│   ├── types.ts               # 型定義
│   ├── array-utils.ts         # 基本配列操作関数
│   ├── chainable.ts           # チェーン可能API
│   ├── pipeline.ts            # パイプライン処理
│   ├── performance.ts         # パフォーマンステスト
│   ├── type-guards.ts         # 型ガード関数
│   └── examples.ts            # 使用例
├── tests/                      # テストスイート
│   ├── array-utils.test.ts    # 基本関数のテスト
│   ├── chainable.test.ts      # チェーンAPIのテスト
│   └── type-guards.test.ts    # 型ガードのテスト
├── benchmarks/                 # ベンチマーク
│   └── performance.bench.ts   # パフォーマンステスト
├── dist/                       # ビルド成果物
├── package.json               # プロジェクト設定
├── tsconfig.json              # TypeScript設定
└── README.md                  # このファイル
```

## 開発の進め方

### ステップ 1: 基本的な配列操作関数の実装

map、filter、reduce などの基本関数を型安全に実装します。

```ts
// src/array-utils.ts
export function map<T, U>(array: readonly T[], mapper: (value: T, index: number, array: readonly T[]) => U): U[] {
  const result: U[] = [];
  for (let i = 0; i < array.length; i++) {
    result.push(mapper(array[i], i, array));
  }
  return result;
}

export function filter<T>(
  array: readonly T[],
  predicate: (value: T, index: number, array: readonly T[]) => boolean
): T[] {
  const result: T[] = [];
  for (let i = 0; i < array.length; i++) {
    if (predicate(array[i], i, array)) {
      result.push(array[i]);
    }
  }
  return result;
}
```

### ステップ 2: 高度な配列操作関数の追加

groupBy、partition、unique などの便利な関数を実装します。

```ts
// groupByの実装例
export function groupBy<T, K extends PropertyKey>(array: readonly T[], getKey: (item: T) => K): Record<K, T[]> {
  return array.reduce((groups, item) => {
    const key = getKey(item);
    if (!groups[key]) {
      groups[key] = [];
    }
    groups[key].push(item);
    return groups;
  }, {} as Record<K, T[]>);
}
```

### ステップ 3: チェーン可能 API の実装

メソッドチェーンによる流暢なインターフェースを提供します。

```ts
// src/chainable.ts
export class ChainableArray<T> {
  constructor(private items: readonly T[]) {}

  filter(predicate: (value: T) => boolean): ChainableArray<T> {
    return new ChainableArray(filter(this.items, predicate));
  }

  map<U>(mapper: (value: T) => U): ChainableArray<U> {
    return new ChainableArray(map(this.items, mapper));
  }

  value(): T[] {
    return [...this.items];
  }
}

export function chain<T>(array: readonly T[]): ChainableArray<T> {
  return new ChainableArray(array);
}
```

## 必須要件

- [ ] 基本的な配列操作関数（map、filter、reduce）の実装
- [ ] ジェネリクスを活用した型安全な実装
- [ ] 型ガード関数の実装
- [ ] 包括的なユニットテスト（カバレッジ 80%以上）
- [ ] エラーハンドリングの実装
- [ ] 型定義ファイル（.d.ts）の生成

## 追加課題（オプション）

- [ ] チェーン可能 API の実装
- [ ] 非同期版関数（mapAsync、filterAsync 等）
- [ ] パイプライン処理と関数合成
- [ ] パフォーマンステストとベンチマーク
- [ ] 条件付き型を活用した高度な型定義
- [ ] メモ化などの最適化機能
- [ ] 包括的な API ドキュメント

## 採点基準

| 項目       | 配点  | 評価内容                       |
| ---------- | ----- | ------------------------------ |
| 機能性     | 40 点 | 必須関数の実装と正しい動作     |
| 型安全性   | 30 点 | ジェネリクス、型推論、型ガード |
| テスト     | 20 点 | カバレッジとテストの品質       |
| コード品質 | 10 点 | 可読性、保守性、ドキュメント   |

## トラブルシューティング

### TypeScript のコンパイルエラー

**問題**: ジェネリクスの型推論が期待通りに動作しない
**解決方法**:

- 型パラメータを明示的に指定
- `extends`制約を適切に使用
- `tsconfig.json`の`strict`オプションを確認

### テストが失敗する

**問題**: 型の不一致でテストがコンパイルできない
**解決方法**:

```ts
// 型アサーションを使用
const result = map([1, 2, 3], (x) => x.toString()) as string[];

// または型注釈を明示
const mapper = (x: number): string => x.toString();
const result = map([1, 2, 3], mapper);
```

### パフォーマンスの問題

**問題**: 大規模配列で処理が遅い
**解決方法**:

- for ループによる最適化
- 不要な配列コピーを避ける
- メモ化の活用

## 参考資料

- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [TypeScript Deep Dive](https://basarat.gitbook.io/typescript/)
- [Functional Programming in TypeScript](https://gcanti.github.io/fp-ts/)
- [Jest Testing Framework](https://jestjs.io/)
- [TypeScript Performance](https://github.com/microsoft/TypeScript/wiki/Performance)

## 課題提出方法

1. このリポジトリをフォーク
2. `submission/[あなたの名前]` ブランチを作成
3. TypeScript 配列ユーティリティを実装
4. プルリクエストを作成
5. 自動採点の結果を確認
6. 必要に応じて修正

### 詳細な提出手順

#### 1. リポジトリのフォーク

```sh
# GitHub で Fork ボタンをクリック後
git clone https://github.com/[あなたのユーザー名]/exercise-react.git
cd exercise-react
```

#### 2. ブランチ作成

```sh
git checkout -b submission/taro-yamada
```

#### 3. 実装とコミット

```sh
# 基本的な配列操作関数の実装
git add src/array-utils.ts src/types.ts
git commit -m "feat: map, filter, reduce等の基本関数を実装"

# 高度な配列操作関数の追加
git add src/array-utils.ts
git commit -m "feat: groupBy, partition, unique等の高度な関数を追加"

# チェーン可能APIの実装
git add src/chainable.ts
git commit -m "feat: メソッドチェーン可能なAPIを実装"

# テストの追加
git add tests/
git commit -m "test: 全関数の単体テストを追加（カバレッジ90%）"
```

#### 4. プッシュと PR 作成

```sh
git push origin submission/taro-yamada
```

GitHub でプルリクエストを作成：

- タイトル: `[提出] 演習09: TypeScript配列ユーティリティ - 山田太郎`
- 本文: 実装した機能と型システムの活用方法を記載

## 開発のヒント

### ジェネリクスの活用

```ts
// 良い例：型推論が効く実装
export function map<T, U>(array: readonly T[], mapper: (value: T, index: number) => U): U[] {
  // 実装
}

// 使用時に型が自動推論される
const numbers = [1, 2, 3];
const strings = map(numbers, (x) => x.toString()); // string[]と推論
```

### 型ガードの実装

- カスタム型ガードで型の絞り込み
- `is`述語を活用した型安全性の向上
- 実行時の型チェックと静的型付けの連携

### パフォーマンス最適化

- 不要な配列コピーを避ける
- イテレータパターンの活用
- 遅延評価の実装

頑張って型安全で高性能なライブラリを作成してください！

# GAS LikeLog Library

## 目的

iframe に埋め込めるいいね機能をスプレッドシートをデータソースにして実装できるGASライブラリ

https://user-images.githubusercontent.com/15701307/212114766-f9190290-4a1b-431a-b64e-b61196214e2e.mov


## スクリプトID

  ```
  10vTUuQfTCuXRvZVzCxjCzFFqWIMCdDx6sDsuODgZ4vjVV5Q1xCqTagz8
  ```

## 導入手順

### スプレッドシート作成

- スプレッドシートに sheetName で指定したシートを作成
- 先頭行に各 ColumnName 入力  
  <img width="386" alt="image" src="https://user-images.githubusercontent.com/15701307/212110772-6fe2769f-5960-4542-9a1d-5fdc96576dfa.png">

### スクリプト作成

- 拡張機能から AppScript を開く  
  <img width="350" alt="image" src="https://user-images.githubusercontent.com/15701307/212111055-cc0a39fd-9296-4ce2-9da7-36dd367d30f9.png">

- ライブラリを追加から以下のスクリプト ID を検索しインポート  
  <img width="303" alt="image" src="https://user-images.githubusercontent.com/15701307/212111413-591d3261-a149-4f0e-9a60-42757f01900c.png">  
  <img width="533" alt="image" src="https://user-images.githubusercontent.com/15701307/212111583-c2969e24-f8a0-4d18-b74d-8453735bad3d.png">  
  <img width="526" alt="image" src="https://user-images.githubusercontent.com/15701307/212111693-e1c7f058-8c31-43fb-a1cc-22209212802f.png">  
  <img width="237" alt="image" src="https://user-images.githubusercontent.com/15701307/212111784-f3b09fab-8a45-488f-b5b5-b7f45a1f39db.png">  


- スクリプト ID
  ```
  10vTUuQfTCuXRvZVzCxjCzFFqWIMCdDx6sDsuODgZ4vjVV5Q1xCqTagz8
  ```
- GASスクリプトに以下のコードをコピー

  ```javascript:GASコード
  const likelog = () => {
    return LikeLogLibrary.create({
      sheetName: "タグ別",
      tagColumnName: "tag",
      likeColumnName: "like"
    });
  }

  const getLikeCount = (tag) => {
    return likelog().getLikeCount(tag);
  }

  const addLikeCount = (tag) => {
    return likelog().addLikeCount(tag);
  }

  const doGet = (e) => {
    return likelog().hookHandler(e);
  };
  ```

### スクリプトの公開設定

- スクリプトをデプロイしてウェブアプリとして公開
  - [GASデプロイとは？GASでデプロイする方法とは？ | つみきIT](https://building-block2022.com/gas/336#:~:text=GAS%E3%83%87%E3%83%97%E3%83%AD%E3%82%A4%E3%81%A8%E3%81%AF%E3%80%81GAS,%E3%81%99%E3%82%8B%E3%81%93%E3%81%A8%E3%82%92%E6%8C%87%E3%81%97%E3%81%BE%E3%81%99%E3%80%82&text=%E9%81%8B%E7%94%A8%E7%92%B0%E5%A2%83%E3%81%AB%E9%85%8D%E7%BD%AE%E3%83%BB%E5%B1%95%E9%96%8B,%E3%81%8C%E5%8F%AF%E8%83%BD%E3%81%AB%E3%81%AA%E3%82%8A%E3%81%BE%E3%81%99%E3%80%82)  


### ウェブアプリを外部サービスで表示

- デプロイ画面でコピーできるウェブアプリの URL を任意の iframe で表示する。
  ```html
  <iframe src="{ウェブアプリURL}" heigth="100%" width="100%" sandbox frameborder="no" loading="lazy"></iframe>
  ```
- 必要に応じて URL パラメータに tag をつけると複数設定することもできます！

  ```
  {ウェブアプリURL}?tag=tag_name
  ```

### 注意事項

- 自分のアカウントで実行を選択していない場合は初回に権限付与用のダイアログが表示されます。また、ウェブアプリの公開範囲を変更すれば、社内向け、個人用など閲覧者を制限することもできます。

## 開発方法

詳細は[Document](https://developers.google.com/apps-script/guides/clasp)を参照

[clasp を使って Google Apps Script の開発環境を構築してみた | DevelopersIO](https://dev.classmethod.jp/articles/vscode-clasp-setting/)  
[GAS を git 管理したいので、Clasp 環境を作る](https://zenn.dev/marusho/scraps/3579309aabf5eb)

### ログイン

```
clasp login
```

### 既存スクリプトを clone する

```
clasp clone {scriptId}
```

### GAS を開く

```
clasp open
```

### スクリプトを push する

```
clasp push
```

### スクリプトを pull する

```
clasp pull
```

### 状況確認

#### バージョン一覧

```
clasp versions
```

#### デプロイ一覧

```
clasp deployments
```

### 更新処理

#### 新規バージョン発行

```
clasp version "new version"
```

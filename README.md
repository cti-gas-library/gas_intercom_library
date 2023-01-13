# GAS Intercom Library

## 目的

iframeに埋め込めるインターホン機能を実装できるGASライブラリ

<img width="166" alt="image" src="https://user-images.githubusercontent.com/15701307/212430435-db95e14a-6a85-41f7-8d68-ee4dbf09e11c.png">


## スクリプトID

  ```
  1j4RlRogkCMBCgLq9-EoNBKQQDiq52NFC1NJh8pAptkLD1p8fmHImOmLX
  ```

## 導入手順

### スクリプト作成

- 拡張機能から AppScript を開く  
  <img width="350" alt="image" src="https://user-images.githubusercontent.com/15701307/212111055-cc0a39fd-9296-4ce2-9da7-36dd367d30f9.png">

- ライブラリを追加から以下手順でスクリプト ID を検索しインポート  
  <img width="303" alt="image" src="https://user-images.githubusercontent.com/15701307/212111413-591d3261-a149-4f0e-9a60-42757f01900c.png">  
  <img width="526" alt="image" src="https://user-images.githubusercontent.com/15701307/212429702-8ede3f2c-b466-4138-b837-e9003533f00e.png">  
  <img width="527" alt="image" src="https://user-images.githubusercontent.com/15701307/212429791-5c6c8bdf-220e-4702-a99f-92ed885b4634.png">  
  <img width="238" alt="image" src="https://user-images.githubusercontent.com/15701307/212429350-c8b4a71f-eea0-4a5b-b6ec-47c0fbb21c43.png">  

- スクリプト ID
  ```
  1j4RlRogkCMBCgLq9-EoNBKQQDiq52NFC1NJh8pAptkLD1p8fmHImOmLX
  ```
- GASスクリプトに以下のコードをコピー

  ```javascript
  const intercom = () => {
    const env = ScriptProperties.getProperties();
    return IntercomLibrary.create({
      tagSettings: {
        slack: {
          slackToken: env?.SLACK_TOKEN,
          slackChannel: "test",
          message: "<!here>インターホンが押されました！"
        },
        line: {
          lineNotifyToken: env?.LINE_NOTIFY_TOKEN,
          message: "インターホンが押されました！"
        },
        teams: {
          teamsWebhookURL: env?.TEAMS_WEBHOOK_URL,
          message: "インターホンが押されました！"
        }
      },
      onPush: (data) => {
        console.log(data);
        if(data?.tag === "mail") {
          GmailApp.sendEmail(env?.SEND_MAIL_ADDRESS, "【通知】訪問者通知","インターホンが押されました！\n\n対応をお願いします！")
        }
      }
    });
  }

  const pushIntercom = (data) => {
    return intercom().pushIntercom(data);
  }

  const doGet = (e) => {
    return intercom().hookHandler(e);
  };
  ```

- GASスクリプトにスクリプトプロパティを追加（任意）

  <img width="748" alt="スクリーンショット 2023-01-14 7 21 45" src="https://user-images.githubusercontent.com/15701307/212430268-d564e3a6-9754-46d5-8852-7534899f9043.png">  

  スクリプトプロパティを使用することで編集権限がないユーザーが設定値を参照できないようにする。  
  [【GAS】プロパティサービスについてまとめる](https://qiita.com/chii-08/items/c8bb24c1141eb6ede83e)

  環境変数名|発行手順
  :-|:-
  SLACK_TOKEN| [Slackアプリでチャンネルにメッセージを送信する方法](https://christina04.hatenablog.com/entry/sending-messages-with-slack-app)
  LINE_NOTIFY_TOKEN|[LINE Notify アクセストークン発行方法](https://firestorage.jp/business/line-notify/)
  TEAMS_WEBHOOK_URL|[Microsoft TeamsのWebhookによる通知](https://qiita.com/SDN/items/3754ae1e8960df01cc11)
  SEND_MAIL_ADDRESS|任意のメールアドレスを入力

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

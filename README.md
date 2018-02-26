# sample-speech-nodejs

## Setup

```
$ npm install
$ export GOOGLE_APPLICATION_CREDENTIALS=service-account.json // 事前にサービスアカウントを発行してダウンロードしておく
$ vi setup.json // Google Cloud Platform のプロジェクトIDを設定する
```

## How to Use

### Sample

- Google Storage Service
```
$ node sample/speech-sync-gcs.js
Transcription: how old is the Brooklyn Bridge

$ node sample/speech-async-gcs.js
Transcription: how old is the Brooklyn Bridge
```

- Local File
```
$gsutil cp gs://cloud-samples-tests/speech/brooklyn.flac resources/brooklyn.flac

$ node sample/speech-sync-local.js
Transcription: how old is the Brooklyn Bridge

$ node sample/speech-async-local.js
Transcription: how old is the Brooklyn Bridge
```

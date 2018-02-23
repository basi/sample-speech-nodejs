// Imports the Google Cloud client library
const Speech = require('@google-cloud/speech');
const fs = require('fs');

// Your Google Cloud Platform project ID
const projectId = 'your-project-id'; // NOTE: 適切に変更する

// Creates a client
const client = new Speech.SpeechClient({
  projectId: projectId,
});

// The name of the audio file to transcribe
const fileName = './resources/filename.flac'; // NOTE: 適切に変更する

// Reads a local audio file and converts it to base64
const file = fs.readFileSync(fileName);
const audioBytes = file.toString('base64');

// The audio file's encoding, sample rate in hertz, and BCP-47 language code
const audio = {
  content: audioBytes,
};

// NOTE: 適切に変更する
const config = {
  encoding: 'FLAC',
  sampleRateHertz: 48000,
  languageCode: 'ja-JP',
};

const request = {
  audio: audio,
  config: config,
};

// Detects speech in the audio file
client
  .recognize(request)
  .then(data => {
    const response = data[0];
    const transcription = response.results
      .map(result => result.alternatives[0].transcript)
      .join('\n');
    console.log(`Transcription: ${transcription}`);
  })
  .catch(err => {
    console.error('ERROR:', err);
  });
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
const fileName = './resources/brooklyn.flac';

// Reads a local audio file and converts it to base64
const file = fs.readFileSync(fileName);
const audioBytes = file.toString('base64');

// The audio file's encoding, sample rate in hertz, and BCP-47 language code
const audio = {
  content: audioBytes,
};

const config = {
  encoding: 'FLAC',
  sampleRateHertz: 16000,
  languageCode: 'en-US',
};

const request = {
  audio: audio,
  config: config,
};

// Detects speech in the audio file. This creates a recognition job that you
// can wait for now, or get its result later.
client.longRunningRecognize(request)
  .then((data) => {
    const operation = data[0];
    // Get a Promise representation of the final result of the job
    return operation.promise();
  })
  .then((data) => {
    const response = data[0];
    response.results.forEach((result) => {
      console.log(`Transcription: ${result.alternatives[0].transcript}`);
    });
  })
  .catch((err) => {
    console.error('ERROR:', err);
  });

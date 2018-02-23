// Imports the Google Cloud client library
const Speech = require('@google-cloud/speech');

// Your Google Cloud Platform project ID
const projectId = 'your-project-id'; // NOTE: 適切に変更する

const client = new Speech.SpeechClient({
  projectId: projectId,
});

// The Google Cloud Storage URI of the file on which to perform speech recognition, e.g. gs://my-bucket/audio.raw
const gcsUri = 'gs://cloud-samples-tests/speech/brooklyn.flac';

// The encoding of the audio file, e.g. 'LINEAR16'
const encoding = 'FLAC';

// The sample rate of the audio file in hertz, e.g. 16000
const sampleRateHertz = 16000;

// The BCP-47 language code to use, e.g. 'en-US'
const languageCode = 'en-US';

const config = {
  encoding: encoding,
  sampleRateHertz: sampleRateHertz,
  languageCode: languageCode
};

const audio = {
  uri: gcsUri
};

const request = {
  config: config,
  audio: audio
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
    const transcription = response.results.map(result =>
        result.alternatives[0].transcript).join('\n');
    console.log(`Transcription: ${transcription}`);
  })
  .catch((err) => {
    console.error('ERROR:', err);
  });

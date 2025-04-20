import { YoutubeTranscript } from 'youtube-transcript';

YoutubeTranscript.fetchTranscript('https://www.youtube.com/watch?v=vflWLItnwfA&ab_channel=ZakirKhan')
  .then(transcript => {
    let arr = transcript.map(item => item.text).join(' ');
    console.log(arr);
  })
  .catch(error => {
    console.error('Error fetching transcript:', error);
  });

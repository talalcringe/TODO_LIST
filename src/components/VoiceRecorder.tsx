import { useState } from 'react';
import { ReactMediaRecorder } from 'react-media-recorder';

import Box from '@mui/material/Box';
import Fab from '@mui/material/Fab';
import Typography from '@mui/material/Typography';
import CardMedia from '@mui/material/CardMedia';
import MicRounded from '@mui/icons-material/MicRounded';
import SettingsVoiceRounded from '@mui/icons-material/SettingsVoiceRounded';

type VoiceRecorderProps = {
  onRecordingComplete: (url: string) => void;
};

function VoiceRecorder({ onRecordingComplete }: VoiceRecorderProps) {
  const [isRecording, setIsRecording] = useState(false);

  function toggleIsRecording() {
    setIsRecording((prev) => !prev);
  }

  return (
    <>
      <ReactMediaRecorder
        audio
        onStop={(blobUrl) => {
          onRecordingComplete(blobUrl);
        }}
        render={({ status, startRecording, stopRecording, mediaBlobUrl }) => (
          <Box
            display='flex'
            flexDirection='row'
            justifyContent='space-between'
            alignItems='center'
            mt={2}
            width={'100%'}
          >
            <Box
              display={'flex'}
              // flexDirection={'column'}
              gap={1}
              justifyContent={'center'}
              alignItems={'center'}
            >
              {isRecording ? (
                <Fab
                  size='small'
                  color='primary'
                  onClick={() => {
                    toggleIsRecording();
                    stopRecording();
                  }}
                >
                  <SettingsVoiceRounded />
                </Fab>
              ) : (
                <Fab
                  size='small'
                  color='info'
                  onClick={() => {
                    toggleIsRecording();
                    startRecording();
                  }}
                >
                  <MicRounded />
                </Fab>
              )}
              <Typography variant='body1'>{status}</Typography>
            </Box>

            <CardMedia
              component={'audio'}
              src={mediaBlobUrl}
              controls
              autoPlay
              loop
            />
          </Box>
        )}
      />
    </>
  );
}

export default VoiceRecorder;

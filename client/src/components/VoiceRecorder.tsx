import { useState } from 'react';
import { ReactMediaRecorder } from 'react-media-recorder';

import Fab from '@mui/material/Fab';
import Typography from '@mui/material/Typography';
import CardMedia from '@mui/material/CardMedia';
import MicRounded from '@mui/icons-material/MicRounded';
import SettingsVoiceRounded from '@mui/icons-material/SettingsVoiceRounded';

import Box from '@mui/material/Box';

type VoiceRecorderProps = {
  prevUrl?: string;
  onRecordingComplete: (url: string) => void;
  updateRecordingStatus: (status: boolean) => void;
};

function VoiceRecorder({
  prevUrl,
  onRecordingComplete,
  updateRecordingStatus,
}: VoiceRecorderProps) {
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
                    updateRecordingStatus(false);
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
                    updateRecordingStatus(true);
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
              src={mediaBlobUrl ? mediaBlobUrl : prevUrl}
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

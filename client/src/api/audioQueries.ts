import { useQuery, useMutation, useQueryClient } from 'react-query';
import {
  ref,
  deleteObject,
  getDownloadURL,
  uploadBytes,
} from 'firebase/storage';
import { storage } from './firebase';

export const useFetchAudio = (audioPath?: string) => {
  return useQuery(
    ['fetchAudio', audioPath],
    async () => {
      if (!audioPath) {
        throw new Error('Audio path is required');
      }
      const audioRef = ref(storage, audioPath);
      const url = await getDownloadURL(audioRef);
      return url;
    },
    {
      retry: false,
    }
  );
};

export const useDeleteAudio = () => {
  const queryClient = useQueryClient();
  return useMutation(
    async (audioPath: string) => {
      const audioRef = ref(storage, audioPath);
      await deleteObject(audioRef);
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries('tasks');
      },
    }
  );
};

export const useUploadAudio = () => {
  return useMutation(async (recordingUrl: string) => {
    const response = await fetch(recordingUrl);
    const blob = await response.blob();
    const storageRef = ref(storage, `audio/${Date.now()}.mp3`);
    const snapshot = await uploadBytes(storageRef, blob);
    const downloadURL = await getDownloadURL(snapshot.ref);
    return downloadURL;
  });
};

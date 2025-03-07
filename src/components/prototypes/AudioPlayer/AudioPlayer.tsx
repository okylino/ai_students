import { useEffect, useRef, useState } from 'react';

import PauseIcon from '@/assets/svgr/icons/pause-filled.svg';
import PlayIcon from '@/assets/svgr/icons/play-filled.svg';
import * as Styled from '@/components/prototypes/AudioPlayer/AudioPlayer.style';
import { AudioPlayerProps } from '@/components/prototypes/AudioPlayer/AudioPlayer.type';

const formatTime = (time: number) => {
  const minutes = Math.floor(time / 60);
  const seconds = Math.floor(time % 60)
    .toString()
    .padStart(2, '0');
  return `${minutes}:${seconds}`;
};

const AudioPlayer = ({ src = '', width = '408px', height = '62px' }: AudioPlayerProps) => {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return () => {};

    const handleLoadedMetadata = () => {
      setDuration(audio.duration);
    };

    const handleTimeUpdate = () => {
      setCurrentTime(audio.currentTime);
      if (audio.duration <= audio.currentTime) setIsPlaying(false);
    };

    audio.addEventListener('loadedmetadata', handleLoadedMetadata);
    audio.addEventListener('timeupdate', handleTimeUpdate);

    return () => {
      audio.removeEventListener('loadedmetadata', handleLoadedMetadata);
      audio.removeEventListener('timeupdate', handleTimeUpdate);
    };
  }, []);

  const handlePlayPause = () => {
    const audio = audioRef.current;
    if (!audio) return;
    if (isPlaying) {
      audio.pause();
    } else {
      audio.play();
    }
    setIsPlaying(!isPlaying);
  };

  const handleProgressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const audio = audioRef.current;
    if (!audio) return;
    const newTime = (Number(e.target.value) / 100) * duration;
    audio.currentTime = newTime;
    setCurrentTime(newTime);
  };

  return (
    <Styled.PlayerContainer $width={width} $height={height}>
      <Styled.PlayPauseButton as={isPlaying ? PauseIcon : PlayIcon} onClick={handlePlayPause} />
      <Styled.ProgressBar type='range' value={(currentTime / duration) * 100 || 0} onChange={handleProgressChange} />
      <Styled.TimeDisplay>{formatTime(currentTime || duration || 0)}</Styled.TimeDisplay>
      <audio ref={audioRef} src={src} preload='auto'>
        <track kind='captions' />
      </audio>
    </Styled.PlayerContainer>
  );
};

export default AudioPlayer;

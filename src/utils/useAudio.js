import { useState, useEffect } from "react";

const useAudio = (config) => {
  const [audio, setAudio] = useState(new Audio());
  const [hasConfig, setHasConfig] = useState(false);
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    if (config) setHasConfig(true);

    audio.addEventListener("ended", () => setPlaying(false));

    return () => {
      audio.removeEventListener("ended", () => setPlaying(false));
    };
  }, []);

  useEffect(() => {
    if (playing) {
      audio.play();
    }
    else {
      audio.pause();
      audio.currentTime = 0;
    }
  }, [playing]);

  useEffect(() => {
    let audioObj = audio;

    for (const propriedade in config) {
      if (config.hasOwnProperty(propriedade)) {
        const valor = config[propriedade];
        audioObj[propriedade] = valor;
      }
    }

    setAudio(audioObj);
  }, [hasConfig]);

  return [audio, setPlaying];
};

export default useAudio;

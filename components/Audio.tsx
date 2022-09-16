import React from "react";
import ReactDOM from "react-dom";
import { useAudio } from "react-use";

const Audio = () => {
  const [audio, state, controls, ref] = useAudio({
    src: "https://www.myinstants.com/media/sounds/wrong-answer-sound-effect.mp3",
    autoPlay: true
  });
}
export default Audio
import { useState, useEffect, useRef } from "react"
import useAudio from "./utils/useAudio";

import StarWarsIntroComponent from "./components/starWarsIntroComponent.jsx"

import darthVaderImagePNG from "./images/darth-vader.png"
import darthVaderImageWEB from "./images/darth-vader.webp"

import themeURL from "./audio/star-wars-intro-jhon-williams.mp3";
import darthVaderTheme from "./audio/darth-vader-theme.mp3";
import darthVaderMessage from "./audio/darth-vader-message.mp3";

const awaitVaderTheme = 12000; /* ms */

export default function App() {
  const [ hasStart, setHasStart ] = useState(false);
  const [ showIntro, setShowIntro ] = useState(true);
  const [ showDarthVaderMessage, setDarthVaderMessage ] = useState(false);
  const [ scrollText, setScrollText ] = useState(false);

  const introComponentRef = useRef(null);
  const darthVaderMessageComponentRef = useRef(null);

  const [ starWarsThemeAudio, setStarWarsThemePlaying ] = useAudio({ volume: 0.1, preload: "auto", src: themeURL});
  const [ darthVaderThemeAudio, setDarthVaderThemePlaying ] = useAudio({ loop: true, preload: "auto", volume: 0.2, src: darthVaderTheme});
  const [ darthVaderMessageAudio, setDarthVaderMessagePlaying ] = useAudio({ preload: "auto", src: darthVaderMessage});
  
  useEffect(() => {
    window.alert("É necessário que o volume seja aumentado. Juro que não irei sacanear...")
    document.addEventListener("click", handleClick);

    return () => {
      document.removeEventListener("click", handleClick);
    }
  }, []);

  useEffect(() => {
    if(showIntro) {
      introComponentRef.current.classList.add("fade-in");
      introComponentRef.current.classList.remove("fade-out");
    }
    else {
      introComponentRef.current.classList.add("fade-out");
      introComponentRef.current.classList.remove("fade-in");

      setDarthVaderMessage(true);
    }
  }, [showIntro]);

  useEffect(() => {
    if(showDarthVaderMessage) {
      darthVaderMessageComponentRef.current.classList.add("fade-in");
      darthVaderMessageComponentRef.current.classList.remove("fade-out");

      setStarWarsThemePlaying(false);
      setDarthVaderThemePlaying(true);

      window.setTimeout(() => {
        while(darthVaderThemeAudio.volume > 0.05) {
          darthVaderThemeAudio.volume -= 0.05;
        }
        
        setDarthVaderMessagePlaying(true);
      }, awaitVaderTheme);
    }
    else {
      darthVaderMessageComponentRef.current.classList.add("fade-out");
      darthVaderMessageComponentRef.current.classList.remove("fade-in");
    }
  }, [showDarthVaderMessage]);

  const handleClick = () => {
    if(!hasStart) {
      setHasStart(true);
      setScrollText(true);
      setStarWarsThemePlaying(true);
    }
  }

  return (
    <main className="main">
      <section className="star-wars-intro" ref={introComponentRef}>
        <StarWarsIntroComponent scrollText={scrollText} setShowIntro={setShowIntro}/>
      </section>
      <section className="darth-vader-message" ref={darthVaderMessageComponentRef}>
        <picture>
          <source srcSet={darthVaderImageWEB}/>
          <img src={darthVaderImagePNG} alt="Darth Vader"/>
        </picture>
      </section>
    </main>
  )
}
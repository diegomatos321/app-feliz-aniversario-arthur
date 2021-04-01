import { useState, useEffect, useRef } from "react";

import "./intro.css"

export default function StarWarsIntroComponent({ scrollText, setShowIntro }) {
  const [showHeader, setShowHeader] = useState(true);
  const [showPrevia, setShowPrevia] = useState(false);
  const [showText, setShowText] = useState(false);

  const headerRef = useRef(null);
  const previaRef = useRef(null);
  const textRef = useRef(null);

  useEffect(() => {
    if (scrollText) {
      init();
    }
  }, [scrollText])

  const init = () => {
    setShowHeader(false);
    setShowPrevia(true);

    window.setTimeout(() => {
      setShowPrevia(false);
      setShowText(true);
    }, 3000)
  }

  useEffect(() => {
    if (showHeader) {
      headerRef.current.classList.add("fade-in");
      headerRef.current.classList.remove("slide-up");
    }
    else {
      headerRef.current.classList.remove("fade-in");
      headerRef.current.classList.add("slide-up");
    }
  }, [showHeader]);

  useEffect(() => {
    if (showPrevia) {
      previaRef.current.classList.add("fade-in");
      previaRef.current.classList.remove("fade-out");
    }
    else {
      previaRef.current.classList.remove("fade-in");
      previaRef.current.classList.add("fade-out");
    }
  }, [showPrevia]);

  useEffect(() => {
    if (showText) {
      textRef.current.classList.add("fade-in");
      textRef.current.classList.add("scroll");
      textRef.current.classList.remove("fade-out");

      textRef.current.addEventListener("animationend", (e) => {
        console.log("Scoll Ended");
        setShowIntro(false);
      }, false);
    }
    else {
      textRef.current.classList.remove("fade-in");
      textRef.current.classList.add("fade-out");
    }
  }, [showText]);

  return (
    <>
      <header className="header" ref={headerRef}>
        <h1>Star Wars</h1>
        <p>Clique parar continuar</p>
      </header>

      <div className="previa" ref={previaRef}>
        <p>Há muito tempo atrás, em uma galáxia muito, muito distante...</p>
      </div>

      <div className="text" ref={textRef}>
        <p>
          Há 20 anos terrestres atrás, nascia uma criança especial que futuramente se tornaria fã de anime e quadrinhos.
        </p>
        <p>
          Com muitos dons artísticos e criatividade, faria muita merda durante sua infancia / adolescencia, mas ao se tornar "homenzinho" se alistaria para o exército, o quê colocaria rumo em sua vida.
        </p>
      </div>
    </>
  )
}
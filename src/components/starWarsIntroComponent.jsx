import { useState, useEffect, useRef } from "react";

import "./intro.css"

export default function StarWarsIntroComponent({scrollText}) {
  const [showHeader, setShowHeader] = useState(true);
  const [showPrevia, setShowPrevia] = useState(false);
  const [showText, setShowText] = useState(false);

  const headerRef = useRef(null);
  const previaRef = useRef(null);
  const textRef = useRef(null);

  useEffect(() => {
    console.log(scrollText)
    if(scrollText) {
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
    if(showHeader) {
      headerRef.current.classList.add("fade-in");
      headerRef.current.classList.remove("slide-up");
    }
    else {
      headerRef.current.classList.remove("fade-in");
      headerRef.current.classList.add("slide-up");
    }
  }, [showHeader]);

  useEffect(() => {
    if(showPrevia) {
      previaRef.current.classList.add("fade-in");
      previaRef.current.classList.remove("fade-out");
    }
    else {
      previaRef.current.classList.remove("fade-in");
      previaRef.current.classList.add("fade-out");
    }
  }, [showPrevia]);

  useEffect(() => {
    if(showText) {
      textRef.current.classList.add("fade-in");
      textRef.current.classList.add("scroll");
      textRef.current.classList.remove("fade-out");
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
      </header>

      <div className="previa" ref={previaRef}>
        <p>Há muito tempo atrás, em uma galáxia muito, muito distante...</p>
      </div>

      <div className="text" ref={textRef}>
        <p>
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Dolorum recusandae molestias minus at praesentium iure in reiciendis magni reprehenderit et. Quia obcaecati voluptate praesentium, beatae in ut debitis itaque voluptatibus officia dolorem eum a modi? Perferendis deserunt possimus pariatur excepturi magni? Nisi aperiam quidem possimus omnis eum odit in ducimus! Aperiam ipsum consectetur temporibus iste. Corporis veniam, facilis ipsum deserunt enim voluptatem, asperiores a, officiis natus quis amet. Ducimus tempore accusamus modi laudantium vero ratione adipisci quibusdam corrupti, iure, voluptas quod sit omnis sunt maiores ipsam, sequi quisquam! Voluptatem eligendi ipsa possimus at mollitia laborum, ea quibusdam minima temporibus quasi!
        </p>
      </div>
    </>
  )
}
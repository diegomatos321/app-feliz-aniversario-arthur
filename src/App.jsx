import { useState, useEffect, useRef } from "react"

import StarWarsIntroComponent from "./components/starWarsIntroComponent.jsx"

export default function App() {
  const [ showIntro, setShowIntro ] = useState(true);
  const [ scrollText, setScrollText ] = useState(false);
  const introComponentRef = useRef(null);
  
  useEffect(() => {
    document.addEventListener("click", () => {
      setScrollText(true);
      introComponentRef.current.classList.remove("active");
      introComponentRef.current.classList.add("idle");
    });
  }, [])

  useEffect(() => {
    if(showIntro) {
      introComponentRef.current.classList.add("active");
      introComponentRef.current.classList.remove("disabled");
    }
    else {
      introComponentRef.current.classList.add("disabled");
      introComponentRef.current.classList.remove("active");
    }
  }, [showIntro]);

  return (
    <main className="main">
      <section className="star-wars-intro" ref={introComponentRef}>
        <StarWarsIntroComponent scrollText={scrollText}/>
      </section>
    </main>
  )
}
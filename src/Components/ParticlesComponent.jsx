"use client";
import Particles, { initParticlesEngine } from "@tsparticles/react";
import { useEffect, useMemo, useState } from "react";
// import { loadAll } from "@/tsparticles/all"; // if you are going to use `loadAll`, install the "@tsparticles/all" package too.
// import { loadFull } from "tsparticles"; // if you are going to use `loadFull`, install the "tsparticles" package too.
import { loadSlim } from "@tsparticles/slim"; 


const ParticlesComponent = (props) => {

  const [init, setInit] = useState(false);
  // this should be run only once per application lifetime
  useEffect(() => {
    initParticlesEngine(async (engine) => {
      await loadSlim(engine);
      //await loadBasic(engine);
    }).then(() => {
      setInit(true);
    });
  }, []);

  const particlesLoaded = (container) => {
    console.log(container);
  };


  const options = useMemo(
    () => ({
      
      fpsLimit: 80,
      interactivity: {
        events: {
          onClick: {
            enable: true,
            mode: "bubble",
          },
          onHover: {
            enable: true,
            mode: 'bubble',
          },
          parallax: {
            enable: false,
            force: 60,
            smooth: 10
          }
        },
        modes: {
          push: {
            distance: 200,
            duration: 15,
          },
          bubble: {
            size: 10,
          },
        },
      },
      particles: {
        color: {
          // value: "lineargraeient",
          value: ["#4B0082", "#800080", "#0000ff"]
        },
        links: {
          width: 0,
        },
        move: {
          direction: "none",
          enable: true,
          outModes: {
            default: "bounce",
          },
          random: true,
          speed: 1,
          straight: false,
        },
        number: {
          density: {
            enable: true,
          },
          value: 100,
        },
        opacity: {
          value: 1,
        },
        shape: {
          type: "circle",
        },
        size: {
          value: { min: 2, max: 4 },
        },
      },
      detectRetina: true,
    }),
    [],
  );


  return (
    <Particles id="particles" options={options} init={init} loaded={particlesLoaded} />
    
  )
  ; 
};

export default ParticlesComponent;
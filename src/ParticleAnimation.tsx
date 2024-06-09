import anime from "animejs";
import {ReactElement, useEffect, useRef} from 'react';
import styles from './ParticleAnimation.module.css';

function ParticleAnimation() {
  const ref = useRef(null);
  useEffect(() => {
    const animeTargets = document.querySelectorAll("." + styles.dot);
    const stagger = anime.stagger(1, {easing: 'easeInCubic'}); // https://easings.net/
    const dtMax = 1000;
    ref.current = anime({
      targets: animeTargets,
      loop: false,
      easing: "linear",
      opacity: [
        { value: 1, duration: 100, delay: stagger},
        { value: 0, duration: function(){return anime.random(500, dtMax);}}
      ],
      width: { value: 2, duration: 500, delay: stagger },
      height: { value: 2, duration: 500, delay: stagger },
      translateX: {
        value: function() {
          return anime.random(-30, 30);
        },
        duration: dtMax,
        delay: stagger,
      },
      translateY: {
        value: function() {
          return anime.random(-30, 30);
        },
        duration: dtMax,
        delay: stagger,
      }
    });
  }, []);

  const elements: ReactElement[] = [];
  for (let i = 0; i < 100; i++) {
    const top = 100 + i *3;
    const left = 100 + i *3;
    const n = 10;
    for (let j = 0; j < n; j++) {
      const size = anime.random(10, 20);
      const Dot = <div key={"anim" +(n*i+j)} className={styles.dot}
            style={{
              width: size + "px",
              height: size + "px",
              top: top + anime.random(-15, 15) + "px",
              left: left + anime.random(-15, 15) + "px",
              opacity: 0,
            }}
          />;
      elements.push(Dot);
    }
  }
  console.log("init component")
  return (
    <>
      {elements}
    </>
  );
}

export default ParticleAnimation;

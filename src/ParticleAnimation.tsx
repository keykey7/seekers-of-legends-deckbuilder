// @ts-expect-error TS7016: Could not find a declaration file for module react-anime.
import Anime, {anime} from 'react-anime';
import React, {ReactElement} from 'react';
import styles from './ParticleAnimation.module.css';

function ParticleAnimation() {
  const elements: ReactElement[] = [];
  for (let i = 0; i < 100; i++) {
    const top = 100 + i *3;
    const left = 100 + i *3;
    const n = 15;
    for (let j = 0; j < n; j++) {
      const size = anime.random(5, 10);
      const Dot = <div key={"anim" + i * n + j} className={styles.dot}
            style={{
              width: size + "px",
              height: size + "px",
              top: top + anime.random(-15, 15) + "px",
              left: left + anime.random(-15, 15) + "px",
              //opacity: 0,
            }}
          />;
      elements.push(Dot);
    }
  }
  return (
    <div>
      <Anime
        //loop={true} // debug
        easing={'linear'}
        opacity={[
          { value: 1, duration: 50, delay: anime.stagger(2) },
          { value: 0, duration: function(){return anime.random(500,1500);}}
        ]}
        width={{ value: 2, duration: 500, delay: anime.stagger(2) }}
        height={{ value: 2, duration: 500, delay: anime.stagger(2) }}
        duration={1500}
        delay={anime.stagger(2)}
        // TODO 08-Jun-2024/kk: translate
      >
        {elements.map(x => x)}
      </Anime>
    </div>
  );
}

export default ParticleAnimation;

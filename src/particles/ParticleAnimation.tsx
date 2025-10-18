import {ReactElement, useEffect, useRef} from 'react';
import {animate, utils, stagger, AnimeInstance} from "animejs";
import styles from './ParticleAnimation.module.css';

import {Rect, useDeckAnimation} from './ParticleSignals.ts';

function useInitialAnime() {
  const ref = useRef<AnimeInstance | null>(null);
  useEffect(() => {
    const animeTargets = document.querySelectorAll(`.${styles.dot}`);
    const stag = stagger(1.5, {ease: 'inCubic'}); // https://easings.net/
    const dtMax = 500; // [ms]
    ref.current = animate(animeTargets, {
      autoplay: false, // only render on restart
      loop: false,
      ease: 'linear',
      opacity: [
        {
          to: 1,
          duration: 100,
          delay: stag,
        }, {
          to: 0,
          duration: () => utils.random(400, dtMax),
        },
      ],
      width: {
        to: 2,
        duration: 500,
        delay: stag,
      },
      height: {
        to: 2,
        duration: 500,
        delay: stag,
      },
      translateX: {
        to: () => utils.random(-5, 50),
        duration: dtMax,
        delay: stag,
      },
      translateY: {
        to: () => utils.random(-20, 20),
        duration: dtMax,
        delay: stag,
      },
    });
  }, []);
  return ref;
}

const noRect: Rect = {
  top: 0,
  left: 0,
  height: 0,
  width: 0,
}

function ParticleAnimation() {
  const animeRef = useInitialAnime();
  const deckAnimation = useDeckAnimation().value;
  useEffect(() => {
    if (deckAnimation?.target) {
      animeRef.current?.restart();
    }
  }, [animeRef, deckAnimation?.target]);

  const initialOpacity = deckAnimation?.target ? 1 : 0;
  const from = deckAnimation?.origin ?? noRect;
  const to = deckAnimation?.target ?? noRect;
  const elements: ReactElement[] = [];
  const amount = 150;
  for (let i = 0; i < amount; i += 1) {
    const spawnArea: Rect = {
      top: from.top + (to.top - from.top) / amount * i,
      left: from.left + (to.left - from.left) / amount * i,
      width: from.width + (to.width - from.width) / amount * i,
      height: from.height + (to.height - from.height) / amount * i,
    };
    const size = utils.random(10, 20);
    // string concat is faster than templatestrings: https://jsperf.app/es6-string-literals-vs-string-concatenation
    const Dot = <div key={'anim' + i}
      className={styles.dot}
      style={{
        width: size + 'px',
        height: size + 'px',
        top: spawnArea.top + utils.random(0, spawnArea.height - size) + 'px',
        left: spawnArea.left + utils.random(0, spawnArea.width - size) + 'px',
        opacity: initialOpacity,
      }} />;
    elements.push(Dot);
  }
  return (<>
    {elements}
  </>);
}

export default ParticleAnimation;

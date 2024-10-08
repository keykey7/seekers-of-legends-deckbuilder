import {ReactElement, useEffect, useRef} from 'react';
import anime from 'animejs';
import styles from './ParticleAnimation.module.css';

import {deckAnimationTargetSignal, Rect, useDeckAnimation} from './ParticleSignals.ts';

function useInitialAnime() {
  const ref = useRef<anime.AnimeInstance | null>(null);
  useEffect(() => {
    const animeTargets = document.querySelectorAll(`.${styles.dot}`);
    const stagger = anime.stagger(1.5, {easing: 'easeInCubic'}); // https://easings.net/
    const dtMax = 500; // [ms]
    ref.current = anime({
      targets: animeTargets,
      autoplay: false, // only render on restart
      loop: false,
      easing: 'linear',
      opacity: [
        {
          value: 1,
          duration: 100,
          delay: stagger,
        }, {
          value: 0,
          duration: () => anime.random(500, dtMax),
        },
      ],
      width: {
        value: 2,
        duration: 500,
        delay: stagger,
      },
      height: {
        value: 2,
        duration: 500,
        delay: stagger,
      },
      translateX: {
        value: () => anime.random(-5, 50),
        duration: dtMax,
        delay: stagger,
      },
      translateY: {
        value: () => anime.random(-20, 20),
        duration: dtMax,
        delay: stagger,
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
  const deckAnimation = useDeckAnimation().value;
  const from = deckAnimation === undefined ? noRect : deckAnimation.origin;
  const to = deckAnimationTargetSignal.value ?? noRect;
  const ref = useInitialAnime();
  useEffect(() => {
    if (ref.current && deckAnimationTargetSignal.value && deckAnimation) {
      ref.current.restart();
    }
  }, [ref, deckAnimation]);
  const elements: ReactElement[] = [];
  const amount = 150;
  for (let i = 0; i < amount; i += 1) {
    const spawnArea: Rect = {
      top: from.top + (to.top - from.top) / amount * i,
      left: from.left + (to.left - from.left) / amount * i,
      width: from.width + (to.width - from.width) / amount * i,
      height: from.height + (to.height - from.height) / amount * i,
    };
    const size = anime.random(10, 20);
    // string concat is faster than templatestrings: https://jsperf.app/es6-string-literals-vs-string-concatenation
    const Dot = <div key={'anim' + i}
      className={styles.dot}
      style={{
        width: size + 'px',
        height: size + 'px',
        top: spawnArea.top + anime.random(0, spawnArea.height - size) + 'px',
        left: spawnArea.left + anime.random(0, spawnArea.width - size) + 'px',
        opacity: 0,
      }} />;
    elements.push(Dot);
  }
  return (<>
    {elements}
  </>);
}

export default ParticleAnimation;

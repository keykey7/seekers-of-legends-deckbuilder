import anime from 'animejs';
import {ReactElement, useEffect, useRef} from 'react';
import styles from './ParticleAnimation.module.css';

export interface Rect {
  top: number;
  left: number;
  width: number;
  height: number;
}

interface ParticleAnimationProps {
  from: Rect,
  to: Rect,
}

function ParticleAnimation({from, to}: Readonly<ParticleAnimationProps>) {
  const ref = useRef<anime.AnimeInstance | null>(null);
  useEffect(() => {
    const animeTargets = document.querySelectorAll('.' + styles.dot);
    const stagger = anime.stagger(1, {easing: 'easeInCubic'}); // https://easings.net/
    const dtMax = 500; // [ms]
    ref.current = anime({
      targets: animeTargets,
      loop: false,
      easing: 'linear',
      opacity: [
        {value: 1, duration: 100, delay: stagger},
        {
          value: 0, duration: function () {
            return anime.random(500, dtMax);
          },
        },
      ],
      width: {value: 2, duration: 500, delay: stagger},
      height: {value: 2, duration: 500, delay: stagger},
      translateX: {
        value: function () {
          return anime.random(-5, 50);
        },
        duration: dtMax,
        delay: stagger,
      },
      translateY: {
        value: function () {
          return anime.random(-20, 20);
        },
        duration: dtMax,
        delay: stagger,
      },
    });
  }, []);
  useEffect(() => {
    if (ref.current) {
      ref.current.restart();
    }
  }, [from, to]);

  const elements: ReactElement[] = [];
  const amount = 200;
  for (let i = 0; i < amount; i++) {
    const spawnArea: Rect = {
      top: from.top + (to.top - from.top) / amount * i,
      left: from.left + (to.left - from.left) / amount * i,
      width: from.width + (to.width - from.width) / amount * i,
      height: from.height + (to.height - from.height) / amount * i,
    };
    const size = anime.random(10, 20);
    const Dot = <div key={'anim' + (i)} className={styles.dot} style={{
      width: size + 'px',
      height: size + 'px',
      top: spawnArea.top + anime.random(0, spawnArea.height - size) + 'px',
      left: spawnArea.left + anime.random(0, spawnArea.width - size) + 'px',
      opacity: 0,
    }} />;
    elements.push(Dot);
  }
  return (
    <>
      {elements}
    </>
  );
}

export default ParticleAnimation;

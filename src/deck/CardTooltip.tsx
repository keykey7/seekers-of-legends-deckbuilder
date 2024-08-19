import {Card, Skill} from '../core/Card.ts';
import {ReactNode} from 'react';
import {IconButton, Tooltip, Typography} from '@mui/material';
import {useIsMobile} from '../MobileUtil.ts';
import unicorn from '../assets/unicorn.png';
import reactStringReplace from 'react-string-replace';
import CachedIcon from '@mui/icons-material/Cached';

interface CardTooltipTextProps {
  card: Card,
  children?: ReactNode,
}

export function CardTooltipText({card}: Readonly<CardTooltipTextProps>) {
  const re = /(:macht:|:pfeil:| {2}|Avatareffekt|Flug|Fernkampf|Hast|Ausdauer|Lebensraub|Ersthieb|Doppelhieb|Dreifachhieb|Durchbruch|Duellant|Fäulnis|Ansturm|Festigung|Verhüllung|Schild|Unbesiegbarkeit|Schnelligkeit)/ug;
  const prefix = card.skill.length === 0 ? '' :
    card.skill.map(x => Skill[x].replace('Faeulnis', 'Fäulnis').replace('Verhuellung', 'Verhüllung')).join(', ') + '  ';
  const richText = reactStringReplace(prefix + card.description, re, (match) => {
    switch (match) {
      case ':macht:':
        return <IconButton sx={{
          position: 'relative',
          bottom: '3px',
          height: '0.6em',
          p: 0,
          m: 0,
        }}>
          <img src={unicorn}
            alt="Macht"
            style={{height: '100%'}} />
        </IconButton>;
      case ':pfeil:':
        return <CachedIcon alt="erschöpfen"
          sx={{
            position: 'relative',
            top: '2px',
            height: '0.7em',
            p: 0,
            m: 0,
          }} />;
      case '  ':
        return <br />;
      default:
        return <b>{match}</b>;
    }
  });
  return <Typography color="inherit"
    variant="body1">{richText}</Typography>;
}

export function CardTooltip({
  card,
  children,
}: Readonly<CardTooltipTextProps>) {
  const isMobile = useIsMobile();
  return <Tooltip enterDelay={500}
    disableInteractive
    placement={isMobile ? 'bottom' : 'left'}
    title={<CardTooltipText card={card} />}>
    {children}
  </Tooltip>;
}

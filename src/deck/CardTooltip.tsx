import { Card, skillAsText } from '../core/Card.ts';
import { ReactNode } from 'react';
import { IconButton, Tooltip, Typography } from '@mui/material';
import { useIsSmallScreen } from '../Util.ts';
import unicorn from '../assets/unicorn.png';
import reactStringReplace from 'react-string-replace';
import CachedIcon from '@mui/icons-material/Cached';
import BoltIcon from '@mui/icons-material/Bolt';
import ShieldIcon from '@mui/icons-material/Shield';
import FavoriteIcon from '@mui/icons-material/Favorite';

interface CardTooltipTextProps {
  card: Card,
  children?: ReactNode,
}

const inlineIconStyle = {
  position: 'relative',
  top: '2px',
  height: '0.7em',
  p: 0,
  m: 0,
};

function CardTooltipStats({card}: Readonly<CardTooltipTextProps>) {
  if (!card.stats) {
    return null;
  }
  let stats = <>
    <BoltIcon sx={inlineIconStyle} />{card.stats.attack}{' '}
    <ShieldIcon sx={inlineIconStyle} />{card.stats.defence}{' '}
  </>;
  if ('health' in card.stats) {
    stats = <>
      {stats}
      <FavoriteIcon sx={inlineIconStyle} />{(card.stats).health}{' '}
    </>;
  }
  return <>
    {stats}
  </>;
}

function CardTooltipText({card}: Readonly<CardTooltipTextProps>) {
  const re = /(:macht:|:pfeil:| {2}|\[[^]+\][A-Za-z-]*|Avatareffekt|Flug|Fernkampf|Hast|Ausdauer|Lebensraub|Ersthieb|Doppelhieb|Dreifachhieb|Durchbruch|Duellant|Fäulnis|Ansturm|Festigung|Verhüllung|Schild|Unbesiegbarkeit|Schnelligkeit)/ug;
  const prefix = card.skill.length === 0 ? '' : card.skill.map(x => skillAsText(x)).join(', ') + '  ';
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
        return <CachedIcon sx={inlineIconStyle} />;
      case '  ':
        return <br />;
      default:
        if (match.startsWith('[')) {
          return <span style="white-space: nowrap;">{match}</span>;
        }
        return <b>{match}</b>;
    }
  });
  return <>
    <Typography color="inherit"
      variant="subtitle2">
      <CardTooltipStats card={card} />
    </Typography>
    <Typography color="inherit"
      variant="body1">
      {richText}
    </Typography>
  </>;
}

export function CardTooltip({
  card,
  children,
}: Readonly<CardTooltipTextProps>) {
  const isMobile = useIsSmallScreen();
  return <Tooltip enterDelay={500}
    disableInteractive
    placement={isMobile ? 'top' : 'left'}
    title={<CardTooltipText card={card} />}>
    {children}
  </Tooltip>;
}

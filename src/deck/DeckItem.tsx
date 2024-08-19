import {Box, ListItem} from '@mui/material';
import {CardCostModifier} from '../core/Card.ts';
import {drawerWidth} from './DeckDrawer.tsx';
import {cardById} from '../core/CardData.ts';
import {removeCardFromDeck} from '../core/DeckSignals.ts';
import {CardCount} from '../core/Deck.ts';
import {CardTooltip} from './CardTooltip.tsx';

interface DeckItemProps {
  cardId: number,
  actualCost: string,
  costModifier: CardCostModifier,
  amount: CardCount,
}

function costModifierToColor(costModifier: CardCostModifier): string {
  if (costModifier === 0) {
    return 'white';
  }
  if (costModifier === 1) {
    return 'orange';
  }
  return 'red';
}

/**
 * A card-type + amount in your deck.
 */
function DeckItem({
  cardId,
  actualCost,
  costModifier,
  amount,
}: Readonly<DeckItemProps>) {
  const card = cardById(cardId);
  return (<ListItem onClick={e => removeCardFromDeck(card, e.currentTarget.getBoundingClientRect())}
      sx={{
        height: '48px',
        my: 1,
        cursor: 'pointer',
      }}>
      <CardTooltip card={card}>
      {/* this draws the title text of the card */}
      <Box component="span"
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: `linear-gradient(to right, black 52px, white 56px, white 70%, black 85%), ` +
            `linear-gradient(to top, black 0px, transparent 8px), ` + // hide a bit of the bottom
            `url('${card.imageSrc()}') 55% 5.5% / ${drawerWidth * 1.2}px`,
          backgroundBlendMode: 'multiply', // gradient combined with image
        }}>
        {/* this draws the diamond (outline) containing the cost */}
        <Box component="span"
          sx={{
            position: 'absolute',
            width: '62px',
            top: -10,
            left: -5,
            right: -5,
            bottom: 0,
            background: `linear-gradient(45deg, black 17px, transparent 17px), ` + // from bot left
              `linear-gradient(135deg, black 23px, transparent 23px), ` + // from top left
              `linear-gradient(225deg, black 23px, transparent 23px), ` + // from top right
              `linear-gradient(-45deg, black 17px, transparent 17px), ` + // from bot right
              `linear-gradient(to top, black 0px, transparent 5px), ` + // hide the unicorn icon at the bottom
              `linear-gradient(to right, white 62px, black 62px), url('${card.imageSrc()}') right 92% top 4.6% / ${drawerWidth * 1.6}px`,
            backgroundBlendMode: 'multiply', // gradient combined with image
            mixBlendMode: 'screen', // the combined background printed onto the layer below
          }}>
          {/* this draws the actual cost on a grey background to hide the original number */}
          <Box sx={{
            position: 'relative',
            display: 'flex',
            justifyContent: 'center',
            top: 20,
            right: 2,
            fontSize: '25px',
            lineHeight: '0.9',
            letterSpacing: '-0.1em',
            color: costModifierToColor(costModifier),
          }}>
            <Box component="div"
              sx={{
                background: '#3c3c3e',
                px: '2px',
              }}>
              {actualCost}
            </Box>
          </Box>
        </Box>
        {/* this draws the right-side preview of the center motive on top of the title text */}
        <Box component="span"
          sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: `linear-gradient(to right, black 70%, white 85%), url('${card.imageSrc()}') right -300% top 25% / ${drawerWidth /
            1.2}px`,
            backgroundBlendMode: 'multiply', // gradient combined with image
            mixBlendMode: 'screen', // the combined background printed onto the layer below
          }}>
          <Box component="div"
            sx={{
              float: 'right',
              p: '14px',
              textAlign: 'center',
              fontSize: '22px',
              lineHeight: '1',
              fontWeight: 'bold',
              textShadow: '0 0 5px #000, 0 0 10px #000', // dark glow around it
            }}>
            {amount > 1 ? amount : ''}
          </Box>
        </Box>
      </Box>
      </CardTooltip>
    </ListItem>);
}

export default DeckItem;

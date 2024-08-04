import {useDeck} from './context/DeckProvider.tsx';
import {useEffect} from 'react';
import {AvatarAndCards, CardAndCount} from './context/DeckContext.tsx';
import {Card, cardById} from '../Card.tsx';

function toUrl(deck: AvatarAndCards): string {
  let s = "1"; // version
  s += deck.avatar ?  deck.avatar.id.toString(16).padStart(2, "0") : "00";
  s += deck.cards.map(x => x[0].id.toString(16).padStart(2, "0") + x[1]).join("");
  if (s === '100') {
    return "";
  }
  return s;
}

export function fromUrl(): AvatarAndCards {
  const hash = document.location.hash;
  if (1 < hash.length) {
    try {
      return fromString(hash?.substring(1))
    } catch (e) {
      console.error("unexpected #hash, cannot load " + hash, e);
    }
  }
  return new AvatarAndCards(undefined, [], undefined);
}

function fromString(s: string): AvatarAndCards {
  const version = s.substring(0, 1);
  if (version !== '1') {
    throw new Error(`Unsupported version "${version}"`);
  }
  const avatarId = parseInt(s.substring(1, 3), 16);
  const avatar = avatarId == 0 ? undefined : cardById(avatarId);
  const cards: CardAndCount[] = [];
  for (let i = 3; i < s.length; i+=3) {
    const card = cardById(parseInt(s.substring(i, i + 2), 16));
    const amount = parseInt(s.substring(i + 2, i + 3));
    if (amount <= 0 || 4 < amount) {
      throw new Error('unexpected amount ' + amount);
    }
    cards.push([card, amount] as [Card, 1 | 2 | 3 | 4]);
  }
  return new AvatarAndCards(avatar, cards, undefined);
}

function StableUrl() {
  const deck = useDeck();
  useEffect(() => {
    document.location.hash = toUrl(deck);
  }, [deck])
  return (
    <></>
  );
}

export default StableUrl;

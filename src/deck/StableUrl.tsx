import {useDeck} from './context/DeckProvider.tsx';
import {useEffect} from 'react';
import {AvatarAndCards, CardAndCount} from './context/DeckContext.tsx';
import {allCards, Card, cardById} from '../Card.tsx';

const MAXID = BigInt(allCards.length + 1);
const MAXAMOUNT = 4n;

function bigintToBase64(num: bigint): string {
  let hex = num.toString(16);
  if (hex.length % 2) { hex = `0${hex}`; }
  const bin: string[] = [];
  let i = 0;
  while (i < hex.length) {
    const d = parseInt(hex.slice(i, i + 2), 16);
    const b = String.fromCharCode(d);
    bin.push(b);
    i += 2;
  }
  return btoa(bin.join(''));
}

function toUrl(deck: AvatarAndCards): string {
  let num = BigInt(0);
  deck.cards.forEach(x => {
    num *= MAXID;
    num += BigInt(x[0].id);
    num *= MAXAMOUNT; // max amount
    num += BigInt(x[1] - 1); // -1 because 0 isnt possible
  });
  num *= MAXID;
  num += BigInt(deck.avatar ? deck.avatar.id : 0);
  return `2${bigintToBase64(num)}`;
}

function base64ToBigint(b64: string): bigint {
  const bin = atob(b64);
  const hex: string[] = [];
  bin.split('').forEach((ch) => {
    let h = ch.charCodeAt(0).toString(16);
    if (h.length % 2) {
      h = `0${h}`;
    }
    hex.push(h);
  });
  return BigInt(`0x${hex.join('')}`);
}

function fromString(s: string): AvatarAndCards {
  const version = s.substring(0, 1);
  if (version !== '2') {
    throw new Error(`Unsupported version "${version}"`);
  }
  let deck = AvatarAndCards.empty();
  let num = base64ToBigint(s.substring(1));
  const cards: CardAndCount[] = [];
  const avatarId = Number(num % MAXID);
  const avatar = avatarId===0 ? undefined : cardById(avatarId);
  deck = deck.withAvatar(avatar);
  num /= MAXID;
  while (num > BigInt(0)) {
    // +1 because range is [0,3]
    const amount = Number(num % MAXAMOUNT) + 1;
    num /= MAXAMOUNT;
    const card = cardById(Number(num % MAXID));
    num /= MAXID;
    cards.push([card, amount] as [Card, 1 | 2 | 3 | 4]);
  }
  return deck.withCards(cards);
}

export function fromUrl(): AvatarAndCards {
  const {hash} = document.location;
  if (hash.length > 1) {
    try {
      return fromString(hash?.substring(1))
    } catch (e) {
      console.error(`unexpected #hash, cannot load ${hash}`, e);
    }
  }
  return new AvatarAndCards(undefined, [], undefined);
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

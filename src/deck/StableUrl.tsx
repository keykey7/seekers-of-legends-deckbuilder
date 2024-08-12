import {useDeck} from './context/DeckProvider.tsx';
import {useEffect} from 'react';
import {AvatarAndCards, CardAndCount} from './context/DeckContext.tsx';
import {allCards, Card, cardById, CardType} from '../Card.tsx';

const VERSION = "3";
// max card is excluding zero: data-range [0-160]
// +1 because index is 1-based
// +1 because we need the zero to know when we are done parsing
const MAXID = BigInt(allCards.length + 2);
// max card-amount (non-avatar cards), data-range [0,3]
const MAXAMOUNT = 4n;
// all characters allowed within an url-fragment (after the #)
const CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz1234567890?/:@-._~!$&'()*+,;="
const CHARS_MAX = BigInt(CHARS.length);

/** converts a positive number to a valid url-fragment using all valid characters */
function bigintToFragment(num: bigint): string {
  let n = num;
  let fragment = '';
  while (n > 0n) {
    fragment = CHARS[Number(n % CHARS_MAX)] + fragment;
    n /= CHARS_MAX;
  }
  return fragment;
}

/** reverse fragment to bigint */
function fragmentToBigint(fragment: string): bigint {
  let num = 0n;
  fragment.split('')
    .map(char => CHARS.indexOf(char))
    .forEach(n => {
      if (n < 0) {
        throw new Error('invalid char in fragment');
      }
      num *= CHARS_MAX;
      num += BigInt(n);
    });
  return num;
}

function toUrl(deck: AvatarAndCards): string {
  let num = BigInt(0);
  deck.cards.forEach(x => {
    if (x[0].type !== CardType.Avatar) {
      num *= MAXAMOUNT; // max amount
      num += BigInt(x[1] - 1); // -1 because 0 isn't possible
    }
    num *= MAXID;
    num += BigInt(x[0].id); // -1 for a zero-based index
  });
  num *= MAXID;
  num += BigInt(deck.avatar ? deck.avatar.id : 0);
  return `${VERSION}${bigintToFragment(num)}`;
}

function fromString(s: string): AvatarAndCards {
  const version = s.substring(0, 1);
  if (version !== VERSION) {
    throw new Error(`Unsupported version "${version}", expected "${VERSION}"`);
  }
  let deck = AvatarAndCards.empty();
  let num = fragmentToBigint(s.substring(1));
  const cards: CardAndCount[] = [];
  // generally the read-order is reversed from the write-order
  const avatarId = Number(num % MAXID);
  const avatar = avatarId===0 ? undefined : cardById(avatarId);
  deck = deck.withAvatar(avatar);
  num /= MAXID;
  while (num > BigInt(0)) {
    const card = cardById(Number(num % MAXID));
    num /= MAXID;
    let amount = 1;
    if(card.type !== CardType.Avatar) {
      // +1 because range is [0,3]
      amount = Number(num % MAXAMOUNT) + 1;
      num /= MAXAMOUNT;
    }
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
  return AvatarAndCards.empty();
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

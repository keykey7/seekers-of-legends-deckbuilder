import {CardType} from '../core/Card.ts';
import {allCards, cardById} from '../core/CardData.ts';
import {AvatarAndCards, CardAndCount, CardCount} from '../core/Deck.ts';

const VERSION = '3';
// max card is excluding zero: data-range [0-160]
// +1 because index is 1-based
// +1 because we need the zero to know when we are done parsing
const CARD_ID_MAX = BigInt(allCards.length + 2);
// max card-amount (non-avatar cards), data-range [0,3]
const CARD_COUNT_MAX = 4n;
// all characters allowed within an url-fragment (after the #)
// according to RFC 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz1234567890?/:@-._~!$&\'()*+,;=';
// however we strip some which many apps do not recogize as valid characters of an URL
const CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz1234567890?/:@-_~!$&*+=';
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

export function toUrl(deck: AvatarAndCards): string {
  let num = 0n;
  deck.cards.forEach(x => {
    if (x.card.type !== CardType.Avatar) {
      num *= CARD_COUNT_MAX; // max amount
      num += BigInt(x.count - 1); // -1 because 0 isn't possible
    }
    num *= CARD_ID_MAX;
    num += BigInt(x.card.id); // -1 for a zero-based index
  });
  num *= CARD_ID_MAX;
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
  const avatarId = Number(num % CARD_ID_MAX);
  const avatar = avatarId === 0 ? undefined : cardById(avatarId);
  deck = deck.withAvatar(avatar);
  num /= CARD_ID_MAX;
  while (num > 0n) {
    const card = cardById(Number(num % CARD_ID_MAX));
    num /= CARD_ID_MAX;
    let amount: CardCount = 1;
    if (card.type !== CardType.Avatar) {
      // +1 because range is [0,3]
      amount = Number(num % CARD_COUNT_MAX) + 1 as CardCount;
      num /= CARD_COUNT_MAX;
    }
    cards.push(new CardAndCount(card, amount));
  }
  return deck.withCards(cards);
}

export function fromUrl(): AvatarAndCards {
  const {hash} = document.location;
  if (hash.length > 1) {
    try {
      return fromString(hash?.substring(1));
    } catch (e) {
      console.error(`unexpected #hash, cannot load ${hash}`, e);
    }
  }
  return AvatarAndCards.empty();
}


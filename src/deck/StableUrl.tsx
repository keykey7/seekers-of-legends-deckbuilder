import {useEffect} from 'react';
import {toUrl} from './StableUrl.ts';
import {useDeck} from './context/DeckContext.ts';

function StableUrl() {
  const deck = useDeck();
  useEffect(() => {
    document.location.hash = toUrl(deck);
  }, [deck]);
  return (<></>);
}

export default StableUrl;

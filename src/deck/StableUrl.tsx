import {useDeck} from './context/DeckProvider.ts';
import {useEffect} from 'react';
import {toUrl} from './StableUrl.ts';

function StableUrl() {
  const deck = useDeck();
  useEffect(() => {
    document.location.hash = toUrl(deck);
  }, [deck]);
  return (<></>);
}

export default StableUrl;

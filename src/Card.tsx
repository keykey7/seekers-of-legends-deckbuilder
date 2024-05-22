class Card {
  id!: number;
  name!: string;
  color!: 'r' | 'g' | 'b';

  imageSrc() : string {
    return "/cards/card-" + String(this.id).padStart(3, '0') + ".jpg"
  }
}

export function cardById(id: number): Card {
  const card = new Card();
  card.id = id;
  return card;
}

export default Card;

export enum Fraction { BLUE, RED, VIOLET, WHITE, YELLOW, BLACK, GREEN, BROWN }

export class Card {
  id!: number;
  name!: string;
  fraction!: Fraction;

  imageSrc() : string {
    return "/cards/card-" + String(this.id).padStart(3, '0') + ".jpg"
  }
}

export function cardById(id: number): Card {
  const card = new Card();
  card.id = id;
  return card;
}

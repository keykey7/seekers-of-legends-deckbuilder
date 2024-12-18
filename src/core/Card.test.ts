import { cardById } from './CardData.ts';

test('computed costs depends on avatar', () => {
  const card = cardById(4);
  expect(card.cost).toBe(1);
  expect(card.costNumber(undefined)).toBe(1);
  expect(card.costNumber('BLUE')).toBe(1);
  expect(card.costNumber('GREEN')).toBe(2);
  expect(card.costNumber('RED')).toBe(3);
});

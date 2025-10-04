import { el } from '../utils/dom.js';

export function CardEl(card) {
  const root = el('div', { className: 'card' });
  const inner = el('div', { className: 'card-inner' });
  const back = el('div', { className: 'card-face card-back' }, [
    el('div', {}, ['☽✧✦✧☾'])
  ]);
  const front = el('div', { className: 'card-face card-front' });

  const title = el('div', { className: `card-title ${card.isReversed ? 'card-reversed' : ''}` }, [card.name]);
  const hint = el('small', {}, [card.isReversed ? card.reversed : card.upright]);
  front.append(el('div', {}, [title, hint]));

  inner.append(back, front);
  root.append(inner);

  root.addEventListener('click', () => {
    root.classList.toggle('is-flipped');
  });

  return root;
}

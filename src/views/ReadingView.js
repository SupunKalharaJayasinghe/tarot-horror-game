import { el } from '../utils/dom.js';
import { spreads } from '../components/Spread.js';
import { createDeck } from '../components/Deck.js';
import { state, setState } from '../state/store.js';
import { toast } from '../components/Toast.js';
import { append as logAppend } from '../components/SessionLog.js';

export function ReadingView() {
  const wrap = el('div', { className: 'stack' });

  const info = el('div', { className: 'row' }, [
    el('h1', {}, ['Reading']),
    el('div', { className: 'spacer' }),
    el('small', {}, [`Spread: ${state.spread}`]),
    el('small', {}, [`Seed: ${state.seed}`]),
    el('small', { id: 'remain' }, ['Deck: …'])
  ]);

  const panel = el('div', { className: 'panel stack' });
  panel.append(info);

  const grid = el('div', { className: 'spread-grid' });
  panel.append(grid);

  const footer = el('div', { className: 'row' });
  const backBtn = el('button', { className: 'btn ghost' }, ['Back']);
  backBtn.addEventListener('click', () => setState({ view: 'home' }));
  const logBtn = el('button', { className: 'btn', disabled: true }, ['Save to Journal']);
  footer.append(backBtn, logBtn);
  panel.append(footer);

  wrap.append(panel);

  (async () => {
    const deck = await createDeck(state.seed);
    const pos = spreads[state.spread] || [];
    const results = [];

    const updateRemain = () => {
      const elRemain = wrap.querySelector('#remain');
      if (elRemain) elRemain.textContent = `Deck: ${deck.remaining()} remaining`;
    };
    updateRemain();

    pos.forEach((p, idx) => {
      const cell = el('div', { className: 'stack' });
      const label = el('div', { className: 'row' }, [
        el('strong', {}, [`${p.label}`]),
        el('div', { className: 'spacer' }),
        el('small', {}, [`#${idx + 1}`]),
      ]);

      const slot = el('div', { className: 'center', style: { minHeight: '320px' } });
      const drawBtn = el('button', { className: 'btn' }, ['Draw']);
      drawBtn.addEventListener('click', () => {
        const card = deck.draw();
        if (!card) { toast('No more cards'); return; }
        import('../components/Card.js').then(({ CardEl }) => {
          slot.innerHTML = '';
          const node = CardEl(card);
          slot.append(node);
          setTimeout(() => node.classList.add('is-flipped'), 150);
        });
        drawBtn.disabled = true;
        results.push({ id: p.id, label: p.label, card });
        updateRemain();
        if (results.length === pos.length) {
          logBtn.disabled = false;
        }
      });

      const placeholder = el('div', { className: 'card ghost-fade' }, [
        el('div', { className: 'card-inner' }, [
          el('div', { className: 'card-face card-back' }, [ el('div', {}, ['Touch to reveal']) ])
        ])
      ]);

      slot.append(placeholder);
      cell.append(label, slot, drawBtn);
      const cellWrap = el('div', { className: 'panel' }, [cell]);
      grid.append(cellWrap);
    });

    logBtn.addEventListener('click', () => {
      if (results.length !== pos.length) { toast('Draw all cards first'); return; }
      logAppend({ spread: state.spread, seed: state.seed, results });
      toast('Reading saved to Journal.');
    });
  })();

  return wrap;
}

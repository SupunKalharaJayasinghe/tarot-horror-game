import { el } from '../utils/dom.js';
import { state, setState } from '../state/store.js';

export function HomeView() {
  const wrap = el('div', { className: 'stack' });
  wrap.append(
    el('div', { className: 'panel stack' }, [
      el('h1', {}, ['Tarot Horror']),
      el('p', {}, ['A no-build Tarot reading table with a sinister vibe.']),
      el('hr'),
      el('div', { className: 'row' }, [
        el('div', { className: 'field' }, [
          el('label', { htmlFor: 'spread' }, ['Spread']),
          (() => {
            const s = el('select', { id: 'spread' });
            ['one-card', 'three-card'].forEach((opt) => {
              const o = el('option', { value: opt }, [opt]);
              if (state.spread === opt) o.selected = true;
              s.append(o);
            });
            return s;
          })(),
        ]),
        el('div', { className: 'field' }, [
          el('label', { htmlFor: 'seed' }, ['Seed']),
          el('input', { id: 'seed', type: 'text', placeholder: 'e.g. 333 or any number', value: String(state.seed ?? Date.now()) }),
        ]),
      ]),
      el('div', { className: 'row' }, [
        (() => {
          const btn = el('button', { className: 'btn' }, ['Begin Reading']);
          btn.addEventListener('click', () => {
            const spread = wrap.querySelector('#spread').value;
            const seedVal = wrap.querySelector('#seed').value.trim();
            const seed = seedVal === '' ? Date.now() : Number(seedVal) || seedVal.length; 
            setState({ spread, seed, view: 'reading' });
          });
          return btn;
        })(),
        (() => {
          const btn = el('button', { className: 'btn ghost' }, ['Randomize Seed']);
          btn.addEventListener('click', () => {
            wrap.querySelector('#seed').value = String(Date.now());
          });
          return btn;
        })(),
      ]),
    ])
  );
  return wrap;
}

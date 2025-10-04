import { el } from '../utils/dom.js';
import * as Journal from '../components/SessionLog.js';

function formatDate(ts) {
  const d = new Date(ts);
  return d.toLocaleString();
}

function toPlainText(entries) {
  const lines = [];
  for (const e of entries) {
    lines.push(`# Reading — ${formatDate(e.time)}`);
    lines.push(`Spread: ${e.spread} | Seed: ${e.seed}`);
    for (const r of e.results) {
      lines.push(`- ${r.label}: ${r.card.name}${r.card.isReversed ? ' (reversed)' : ''}`);
    }
    lines.push('');
  }
  return lines.join('\n');
}

export function JournalView() {
  const wrap = el('div', { className: 'stack' });
  const header = el('div', { className: 'row' }, [
    el('h1', {}, ['Journal']),
    el('div', { className: 'spacer' }),
  ]);

  const toolbar = el('div', { className: 'row' });
  const btnExport = el('button', { className: 'btn' }, ['Export (.txt)']);
  const btnClear = el('button', { className: 'btn ghost' }, ['Clear Journal']);
  toolbar.append(btnExport, btnClear);

  const panel = el('div', { className: 'panel stack' });
  panel.append(header, toolbar);

  const list = el('div', { className: 'stack' });
  panel.append(list);

  function renderList() {
    list.innerHTML = '';
    const entries = Journal.all().slice().reverse();
    if (!entries.length) {
      list.append(el('small', { style: { color: 'var(--muted)' } }, ['No entries yet. Do a reading and save it.']));
      return;
    }
    for (const e of entries) {
      const item = el('div', { className: 'panel' });
      const head = el('div', { className: 'row' }, [
        el('strong', {}, [formatDate(e.time)]),
        el('div', { className: 'spacer' }),
        el('small', {}, [`Spread: ${e.spread}`]),
        el('small', {}, [`Seed: ${e.seed}`])
      ]);
      const ul = el('ul');
      e.results.forEach((r) => {
        const li = el('li');
        li.textContent = `${r.label}: ${r.card.name}${r.card.isReversed ? ' (reversed)' : ''}`;
        ul.append(li);
      });
      item.append(head, ul);
      list.append(item);
    }
  }

  btnExport.addEventListener('click', () => {
    const entries = Journal.all();
    const txt = toPlainText(entries);
    const blob = new Blob([txt], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'tarot-journal.txt';
    a.click();
    URL.revokeObjectURL(url);
  });

  btnClear.addEventListener('click', () => {
    if (confirm('Clear all journal entries?')) {
      Journal.clear();
      renderList();
    }
  });

  renderList();
  wrap.append(panel);
  return wrap;
}

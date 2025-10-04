import { HomeView } from './views/HomeView.js';
import { ReadingView } from './views/ReadingView.js';
import { JournalView } from './views/JournalView.js';
import { state, setState, subscribe } from './state/store.js';
import { load as loadState, save as saveState } from './state/persistence.js';

const root = document.getElementById('app');

function renderNav() {
  const nav = document.createElement('nav');
  nav.className = 'topbar container';
  nav.innerHTML = `
    <div class="brand">Tarot Horror</div>
    <div class="spacer"></div>
    <button class="btn ghost" data-go="home">Home</button>
    <button class="btn" data-go="reading">Reading</button>
    <button class="btn ghost" data-go="journal">Journal</button>
  `;
  nav.addEventListener('click', (e) => {
    const btn = e.target.closest('button[data-go]');
    if (!btn) return;
    setState({ view: btn.dataset.go });
  });
  return nav;
}

function getView(view) {
  switch (view) {
    case 'reading':
      return ReadingView();
    case 'journal':
      return JournalView();
    case 'home':
    default:
      return HomeView();
  }
}

function render() {
  root.innerHTML = '';
  root.appendChild(renderNav());
  const main = document.createElement('main');
  main.className = 'main container';
  main.appendChild(getView(state.view));
  root.appendChild(main);
}

// Restore persisted state
const persisted = loadState();
if (persisted) {
  Object.assign(state, persisted);
}

if (!state.seed) {
  setState({ seed: Date.now() });
}

render();

subscribe((s) => {
  saveState(s);
  render();
});

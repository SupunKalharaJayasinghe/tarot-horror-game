export function showModal(title, contentNode) {
  const backdrop = document.createElement('div');
  backdrop.className = 'modal-backdrop';
  const modal = document.createElement('div');
  modal.className = 'modal';
  const header = document.createElement('header');
  const h = document.createElement('h3'); h.textContent = title;
  const x = document.createElement('button'); x.className = 'btn ghost'; x.textContent = 'Close';
  x.addEventListener('click', () => backdrop.remove());
  header.append(h, x);
  modal.append(header, contentNode);
  backdrop.append(modal);
  backdrop.addEventListener('click', (e) => { if (e.target === backdrop) backdrop.remove(); });
  document.body.append(backdrop);
}

export const qs = (sel, ctx = document) => ctx.querySelector(sel);
export const qsa = (sel, ctx = document) => Array.from(ctx.querySelectorAll(sel));
export function el(tag, props = {}, children = []) {
  const e = document.createElement(tag);
  if (props) {
    const { dataset, style, ...rest } = props;
    Object.assign(e, rest);
    if (dataset) Object.entries(dataset).forEach(([k, v]) => (e.dataset[k] = v));
    if (style) Object.assign(e.style, style);
  }
  for (const c of children) e.append(c);
  return e;
}

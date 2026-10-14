/**
 * Textura procedural autônoma: Capim.
 *
 * Retorna somente a cor RGBA do pixel (x, y) de um tile 16×16.
 * Não cria canvas, atlas, WebGL, DOM ou qualquer estado de jogo.
 */
export const nome = 'Capim';
export const tamanho = 16;
export const seedPadrao = 731947;

function clamp(valor, minimo, maximo) {
  return Math.max(minimo, Math.min(maximo, valor));
}

// Mesmo hash inteiro usado pelo jogo original.
function hash(x, y, seed) {
  let n = Math.imul(x | 0, 374761393) ^ Math.imul(y | 0, 668265263) ^ seed;
  n = Math.imul(n ^ (n >>> 13), 1274126177);
  return ((n ^ (n >>> 16)) >>> 0) / 4294967295;
}

function corComRuido(base, intensidade, x, y, tile) {
  const ruido = (hash(x + tile * 93, y + tile * 47, 1693) - 0.5) * intensidade;
  return base.map(valor => clamp(Math.round(valor + ruido), 0, 255));
}

export function pixel(x, y, seed = seedPadrao) {
  let cor = corComRuido([0, 0, 0], 0, x, y, 18);
  const folha = y > 3 && Math.abs(x - 7) < 1.3 ||
    (y > 5 && Math.abs(x - (3 + y * 0.21)) < 1.2) ||
    (y > 4 && Math.abs(x - (13 - y * 0.23)) < 1.1);
  if (folha) return [102 + (hash(x, y, seed) * 22 | 0), 149 + (hash(y, x, seed) * 17 | 0), 51, 255];
  return [0, 0, 0, 0];
}

/**
 * Textura procedural autônoma: Vidro.
 *
 * Retorna somente a cor RGBA do pixel (x, y) de um tile 16×16.
 * Não cria canvas, atlas, WebGL, DOM ou qualquer estado de jogo.
 */
export const nome = 'Vidro';
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
  let cor = corComRuido([181, 222, 225], 8, x, y, 10);
  if (x === 0 || y === 0 || x === 15 || y === 15) return [161, 205, 205, 230];
  if ((x + y === 7 || x + y === 8 || x + y === 18) && x > 2 && x < 13 && y > 2 && y < 13) return [237, 255, 250, 100];
  return [155, 209, 218, 28];
}

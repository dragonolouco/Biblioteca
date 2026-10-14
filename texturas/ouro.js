/**
 * Textura procedural autônoma: Ouro.
 *
 * Retorna somente a cor RGBA do pixel (x, y) de um tile 16×16.
 * Não cria canvas, atlas, WebGL, DOM ou qualquer estado de jogo.
 */
export const nome = 'Ouro';
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
  let cor = corComRuido([143, 149, 145], 25, x, y, 14);
  if ((x > 2 && x < 6 && y > 3 && y < 7) || (x > 9 && x < 14 && y > 10 && y < 14)) {
    cor = [227 + (hash(x, y, seed) * 25 | 0), 180 + (hash(x, y, seed) * 28 | 0), 56];
  }
  return [cor[0], cor[1], cor[2], 255];
}

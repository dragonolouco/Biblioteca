/**
 * Textura procedural autônoma: Grama (lateral).
 *
 * Retorna somente a cor RGBA do pixel (x, y) de um tile 16×16.
 * Não cria canvas, atlas, WebGL, DOM ou qualquer estado de jogo.
 */
export const nome = 'Grama (lateral)';
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
  let cor = corComRuido([144, 102, 62], 32, x, y, 1);
  if (y < 3 + (hash(x, 3, 74) * 3 | 0)) {
    cor = [105 + (hash(x, y, seed) * 30 | 0), 151 + (hash(y, x, seed) * 25 | 0), 58];
  }
  return [cor[0], cor[1], cor[2], 255];
}

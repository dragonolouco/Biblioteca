/**
 * Textura procedural autônoma: Flor.
 *
 * Retorna somente a cor RGBA do pixel (x, y) de um tile 16×16.
 * Não cria canvas, atlas, WebGL, DOM ou qualquer estado de jogo.
 */
export const nome = 'Flor';
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
  let cor = corComRuido([0, 0, 0], 0, x, y, 17);
  if (y >= 6 && y <= 15 && (x === 7 || x === 8)) return [79, 128, 51, 255];
  if (y >= 10 && y <= 12 && x >= 8 && x <= 11) return [99, 153, 54, 255];
  if (y >= 8 && y <= 10 && x >= 4 && x <= 7) return [86, 137, 49, 255];
  if ((x - 7.5) ** 2 + (y - 4) ** 2 < 13) {
    return (x === 7 || x === 8) && (y === 4 || y === 5) ? [240, 167, 41, 255] : [245, 217, 154, 255];
  }
  return [0, 0, 0, 0];
}

/**
 * Textura procedural autônoma: Madeira (topo).
 *
 * Retorna somente a cor RGBA do pixel (x, y) de um tile 16×16.
 * Não cria canvas, atlas, WebGL, DOM ou qualquer estado de jogo.
 */
export const nome = 'Madeira (topo)';
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
  let cor = corComRuido([178, 139, 82], 18, x, y, 6);
  const raio = Math.max(Math.abs(x - 7.5), Math.abs(y - 7.5));
  if (Math.floor(raio) % 3 === 0) cor = [125, 91, 53];
  return [cor[0], cor[1], cor[2], 255];
}

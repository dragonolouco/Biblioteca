# Biblioteca

## Texturas procedurais individuais

A pasta [`texturas/`](texturas/) contém um arquivo JavaScript autônomo para cada bloco/material.
Cada arquivo contém **somente a definição procedural da textura**: não há WebGL, Canvas, DOM, atlas, câmera, mundo ou lógica de jogo.

### Contrato de cada arquivo

Cada módulo exporta:

- `nome`: nome do material;
- `tamanho`: tamanho lógico do tile (`16`);
- `seedPadrao`: seed usada pelo jogo original;
- `pixel(x, y, seed)`: retorna `[r, g, b, a]` para uma coordenada de `0` a `15`.

Exemplo:

```js
import { pixel } from './texturas/terra.js';

const rgba = pixel(4, 9);
// [red, green, blue, alpha]
```

O consumidor decide como transformar os valores RGBA em uma textura da própria engine. Os arquivos não fazem essa etapa, para permanecerem leves e reutilizáveis.

### Arquivos

- `grama_topo.js` e `grama_lateral.js`
- `terra.js`, `pedra.js`, `areia.js`, `pedregulho.js`, `rochamae.js`
- `madeira_topo.js`, `madeira_lateral.js`, `folhas.js`, `tabuas.js`
- `tijolos.js`, `vidro.js`, `agua.js`, `neve.js`
- `ouro.js`, `minerio_carvao.js`, `flor.js`, `capim.js`, `luminaria.js`

As regras de cor e os padrões foram separados a partir do gerador procedural original, mantendo os tiles 16×16 e o comportamento baseado em seed.

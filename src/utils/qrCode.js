/**
 * Client-Side Zero-Dependency QR Code Generator
 * Used for instant rendering of FamGateway dynamic UPI payment orders on the web client.
 */

const GF256_EXP = new Array(512);
const GF256_LOG = new Array(256);

(function initGalois() {
  let x = 1;
  for (let i = 0; i < 255; i++) {
    GF256_EXP[i] = x;
    GF256_EXP[i + 255] = x;
    GF256_LOG[x] = i;
    x <<= 1;
    if (x & 256) {
      x ^= 285;
    }
  }
  GF256_LOG[0] = 0;
})();

function gfMul(x, y) {
  if (x === 0 || y === 0) return 0;
  return GF256_EXP[GF256_LOG[x] + GF256_LOG[y]];
}

function polyMul(p1, p2) {
  const result = new Array(p1.length + p2.length - 1).fill(0);
  for (let i = 0; i < p1.length; i++) {
    for (let j = 0; j < p2.length; j++) {
      result[i + j] ^= gfMul(p1[i], p2[j]);
    }
  }
  return result;
}

function getGeneratorPoly(numEc) {
  let g = [1];
  for (let i = 0; i < numEc; i++) {
    g = polyMul(g, [1, GF256_EXP[i]]);
  }
  return g;
}

function calculateEc(data, numEc) {
  const gen = getGeneratorPoly(numEc);
  const msg = [...data, ...new Array(numEc).fill(0)];
  for (let i = 0; i < data.length; i++) {
    const coef = msg[i];
    if (coef !== 0) {
      for (let j = 0; j < gen.length; j++) {
        msg[i + j] ^= gfMul(gen[j], coef);
      }
    }
  }
  return msg.slice(data.length);
}

const QR_VERSIONS = [
  { version: 1, size: 21, dataBytes: 16, alignPos: [], blocks: [{ count: 1, dataBytes: 16, ecBytes: 10 }] },
  { version: 2, size: 25, dataBytes: 28, alignPos: [6, 18], blocks: [{ count: 1, dataBytes: 28, ecBytes: 16 }] },
  { version: 3, size: 29, dataBytes: 44, alignPos: [6, 22], blocks: [{ count: 1, dataBytes: 44, ecBytes: 26 }] },
  { version: 4, size: 33, dataBytes: 64, alignPos: [6, 26], blocks: [{ count: 2, dataBytes: 32, ecBytes: 18 }] },
  { version: 5, size: 37, dataBytes: 86, alignPos: [6, 30], blocks: [{ count: 2, dataBytes: 43, ecBytes: 24 }] },
  { version: 6, size: 41, dataBytes: 108, alignPos: [6, 34], blocks: [{ count: 4, dataBytes: 27, ecBytes: 14 }] },
];

export function generateQrMatrix(text) {
  const utf8Bytes = Array.from(new TextEncoder().encode(text));
  const needed = utf8Bytes.length + 2;
  const selectedVersion = QR_VERSIONS.find((v) => needed <= v.dataBytes);
  if (!selectedVersion) {
    throw new Error(`UPI payload too large for QR (${utf8Bytes.length} bytes).`);
  }

  const bitBuffer = [];
  const pushBits = (val, len) => {
    for (let i = len - 1; i >= 0; i--) {
      bitBuffer.push((val >> i) & 1);
    }
  };

  pushBits(0b0100, 4);
  pushBits(utf8Bytes.length, 8);
  for (const b of utf8Bytes) {
    pushBits(b, 8);
  }

  const maxBits = selectedVersion.dataBytes * 8;
  const termLen = Math.min(4, maxBits - bitBuffer.length);
  pushBits(0, termLen);

  while (bitBuffer.length % 8 !== 0) {
    bitBuffer.push(0);
  }

  const padBytes = [0xec, 0x11];
  let padIdx = 0;
  while (bitBuffer.length < maxBits) {
    pushBits(padBytes[padIdx % 2], 8);
    padIdx++;
  }

  const dataBytes = [];
  for (let i = 0; i < bitBuffer.length; i += 8) {
    let byte = 0;
    for (let j = 0; j < 8; j++) {
      byte = (byte << 1) | bitBuffer[i + j];
    }
    dataBytes.push(byte);
  }

  const blockResults = [];
  let dataOffset = 0;
  for (const bSpec of selectedVersion.blocks) {
    for (let b = 0; b < bSpec.count; b++) {
      const bData = dataBytes.slice(dataOffset, dataOffset + bSpec.dataBytes);
      dataOffset += bSpec.dataBytes;
      const bEc = calculateEc(bData, bSpec.ecBytes);
      blockResults.push({ data: bData, ec: bEc });
    }
  }

  const fullCodewords = [];
  const maxDataLen = Math.max(...blockResults.map((b) => b.data.length));
  for (let i = 0; i < maxDataLen; i++) {
    for (const b of blockResults) {
      if (i < b.data.length) {
        fullCodewords.push(b.data[i]);
      }
    }
  }

  const maxEcLen = Math.max(...blockResults.map((b) => b.ec.length));
  for (let i = 0; i < maxEcLen; i++) {
    for (const b of blockResults) {
      if (i < b.ec.length) {
        fullCodewords.push(b.ec[i]);
      }
    }
  }

  const size = selectedVersion.size;
  const matrix = Array.from({ length: size }, () => new Array(size).fill(null));

  const placeFinder = (r, c) => {
    for (let dr = -1; dr <= 7; dr++) {
      for (let dc = -1; dc <= 7; dc++) {
        const row = r + dr;
        const col = c + dc;
        if (row >= 0 && row < size && col >= 0 && col < size) {
          if (dr >= 0 && dr <= 6 && dc >= 0 && dc <= 6) {
            matrix[row][col] = dr === 0 || dr === 6 || dc === 0 || dc === 6 || (dr >= 2 && dr <= 4 && dc >= 2 && dc <= 4);
          } else {
            matrix[row][col] = false;
          }
        }
      }
    }
  };

  placeFinder(0, 0);
  placeFinder(0, size - 7);
  placeFinder(size - 7, 0);

  for (let i = 8; i < size - 8; i++) {
    if (matrix[6][i] === null) matrix[6][i] = i % 2 === 0;
    if (matrix[i][6] === null) matrix[i][6] = i % 2 === 0;
  }

  if (selectedVersion.alignPos.length >= 2) {
    const coords = selectedVersion.alignPos;
    for (const r of coords) {
      for (const c of coords) {
        if (matrix[r][c] !== null) continue;
        for (let dr = -2; dr <= 2; dr++) {
          for (let dc = -2; dc <= 2; dc++) {
            const isBorder = Math.abs(dr) === 2 || Math.abs(dc) === 2;
            const isCenter = dr === 0 && dc === 0;
            matrix[r + dr][c + dc] = isBorder || isCenter;
          }
        }
      }
    }
  }

  matrix[size - 8][8] = true;

  for (let i = 0; i < 9; i++) {
    if (matrix[8][i] === null) matrix[8][i] = false;
    if (matrix[i][8] === null) matrix[i][8] = false;
  }
  for (let i = size - 8; i < size; i++) {
    if (matrix[8][i] === null) matrix[8][i] = false;
    if (matrix[i][8] === null) matrix[i][8] = false;
  }

  let bitIdx = 0;
  const fullBits = [];
  for (const cw of fullCodewords) {
    for (let b = 7; b >= 0; b--) {
      fullBits.push((cw >> b) & 1);
    }
  }

  let col = size - 1;
  let upwards = true;

  while (col > 0) {
    if (col === 6) col--;
    const rows = upwards
      ? Array.from({ length: size }, (_, i) => size - 1 - i)
      : Array.from({ length: size }, (_, i) => i);

    for (const r of rows) {
      for (const c of [col, col - 1]) {
        if (matrix[r][c] === null) {
          const bit = bitIdx < fullBits.length ? fullBits[bitIdx++] : 0;
          const mask = (r + c) % 2 === 0;
          matrix[r][c] = (bit === 1) !== mask;
        }
      }
    }
    col -= 2;
    upwards = !upwards;
  }

  const formatBits = [1, 0, 1, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 1, 0];

  for (let i = 0; i < 6; i++) matrix[8][i] = formatBits[i] === 1;
  matrix[8][7] = formatBits[6] === 1;
  matrix[8][8] = formatBits[7] === 1;
  matrix[7][8] = formatBits[8] === 1;
  for (let i = 9; i < 15; i++) matrix[14 - i][8] = formatBits[i] === 1;

  for (let i = 0; i < 7; i++) matrix[size - 1 - i][8] = formatBits[i] === 1;
  for (let i = 0; i < 8; i++) matrix[8][size - 8 + i] = formatBits[7 + i] === 1;

  return matrix.map((row) => row.map((cell) => cell ?? false));
}

export function generateQrSvgString(text, size = 200, quiet = 4) {
  const matrix = generateQrMatrix(text);
  const matrixSize = matrix.length;
  const totalModules = matrixSize + quiet * 2;
  const cellSize = (size / totalModules).toFixed(2);
  const offset = quiet * (size / totalModules);

  let rects = `<rect x="0" y="0" width="${size}" height="${size}" fill="white" />`;
  for (let r = 0; r < matrixSize; r++) {
    for (let c = 0; c < matrixSize; c++) {
      if (matrix[r][c]) {
        const x = (offset + c * (size / totalModules)).toFixed(2);
        const y = (offset + r * (size / totalModules)).toFixed(2);
        rects += `<rect x="${x}" y="${y}" width="${cellSize}" height="${cellSize}" fill="#0f172a" />`;
      }
    }
  }

  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${size} ${size}" width="${size}" height="${size}" shape-rendering="crispEdges" role="img">${rects}</svg>`;
}

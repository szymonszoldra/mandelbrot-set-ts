const SIZE = 5000;

interface Complex {
  r: number;
  i: number;
}

class ComplexNumber implements Complex {
  r:number;
  i:number;

  constructor(r: number = 0, i: number = 0){
    this.r = r;
    this.i = i;
  }
}

const canvas = document.querySelector('canvas') as HTMLCanvasElement;
canvas.width = SIZE;
canvas.height = SIZE;

const ctx = canvas.getContext('2d') as CanvasRenderingContext2D;
const imageData = ctx.createImageData(SIZE, SIZE) as ImageData;



const isInTheMandelbrotSet = (point: Complex): number => {
  let z = new ComplexNumber();

  for (let i = 0; i < 255; i++){
    const z2 = new ComplexNumber(
      z.r * z.r - z.i * z.i,
      z.r * z.i + z.i * z.r
      );

    z = new ComplexNumber(
      z2.r + point.r,
      z2.i + point.i
    );

    if (z.r * z.r + z.i * z.i > 4) {
      return i;
    }
  }

  return -1;
}

const colorThePointBlack = (i: number): void => {
  imageData.data[i + 0] = 0;
  imageData.data[i + 1] = 0;
  imageData.data[i + 2] = 0;
  imageData.data[i + 3] = 255;
}

const colorThePoint = (i: number, returnedValue: number): void => {
  imageData.data[i + 0] = returnedValue;
  imageData.data[i + 1] = returnedValue;
  imageData.data[i + 2] = 0;
  imageData.data[i + 3] = 255;
}

for (let y = 0; y < SIZE; y++) {
  for (let x = 0; x < SIZE; x++) {
    const i = y * (SIZE * 4) + x * 4;
    const real = (x / SIZE) * 4 - 2;
    const imaginary = (y / SIZE) * 4 - 2;
    const point = new ComplexNumber(real, imaginary);

    const returnedValue = isInTheMandelbrotSet(point);

    if (returnedValue === -1) {
      colorThePointBlack(i);
    } else {
      colorThePoint(i, returnedValue);
    }
  }
}

ctx.putImageData(imageData, 0, 0);
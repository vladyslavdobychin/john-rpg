const canvas = document.getElementById('canvas') as HTMLCanvasElement;
const ctx = canvas.getContext('2d');

canvas.width = screen.width - 60;
canvas.height = screen.height - 200;

ctx!.fillStyle = 'white';
ctx!.fillRect(0, 0, canvas.width, canvas.height);


const canvas = document.getElementById("canvas") as HTMLCanvasElement;
const ctx = canvas.getContext("2d");

if (ctx) {
    ctx.fillStyle = "green";
    ctx.fillRect(10, 10, 150, 100);
}

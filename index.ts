const canvas = document.getElementById("canvas") as HTMLCanvasElement;
const ctx = canvas.getContext("2d")!;
const width = canvas.width;
const height = canvas.height;

function init() {
    window.requestAnimationFrame(draw);
}

const directions = [
    { x: -1, y: 0 }, //left
    { x: 0, y: -1 }, //up
    { x: 1, y: 0 }, //right
    { x: 0, y: 1 }, //down
];

let direction = 0;
let pos = { x: width / 2, y: height / 2 };

function draw() {
    ctx.clearRect(0, 0, 300, 300); // clear canvas

    window.requestAnimationFrame(draw);
}

init();

window.addEventListener("keydown", (event) => {
    console.log(event);
    if (event.key === "ArrowLeft" || event.key === "a") {
        direction = 0;
    }
    if (event.key === "ArrowUp" || event.key === "w") {
        direction = 1;
    }
    if (event.key === "ArrowRight" || event.key === "d") {
        direction = 2;
    }
    if (event.key === "ArrowDown" || event.key === "s") {
        direction = 3;
    }
});

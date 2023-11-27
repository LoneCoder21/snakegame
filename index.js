var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");
var width = canvas.width;
var height = canvas.height;
function init() {
    window.requestAnimationFrame(draw);
}
var directions = [
    { x: -1, y: 0 },
    { x: 0, y: -1 },
    { x: 1, y: 0 },
    { x: 0, y: 1 },
];
var direction = 0;
var pos = { x: width / 2, y: height / 2 };
function draw() {
    ctx.clearRect(0, 0, 300, 300); // clear canvas
    window.requestAnimationFrame(draw);
}
init();
window.addEventListener("keydown", function (event) {
    console.log(event);
    if (event.key === "ArrowLeft" || event.key === "a") {
        console.log("left");
    }
    if (event.key === "ArrowUp" || event.key === "w") {
        console.log("up");
    }
    if (event.key === "ArrowDown" || event.key === "s") {
        console.log("down");
    }
    if (event.key === "ArrowRight" || event.key === "d") {
        console.log("right");
    }
    // do something
});

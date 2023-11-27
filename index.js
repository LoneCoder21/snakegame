var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");
var width = 20;
var height = 20;
var rate = 100; // draw rate
var size = Math.floor(canvas.width / width);
var directions = [
    { x: -1, y: 0 }, //left
    { x: 0, y: -1 }, //up
    { x: 1, y: 0 }, //right
    { x: 0, y: 1 },
];
var score = 0;
var direction = 0;
var parts_pos = [{ x: width / 2, y: height / 2 }];
growSnake();
var apple_pos = {
    x: Math.floor(Math.random() * width),
    y: Math.floor(Math.random() * height),
};
var interval_id = setInterval(draw, rate);
function objectEqual(a, b) {
    return JSON.stringify(a) === JSON.stringify(b);
}
function eatApple() {
    score++;
    apple_pos = {
        x: Math.floor(Math.random() * width),
        y: Math.floor(Math.random() * height),
    };
    console.log(score);
}
function growSnake() {
    var len = parts_pos.length;
    if (len === 1) {
        var next_dir_1 = {
            x: directions[direction].x * -1,
            y: directions[direction].y * -1,
        };
        var next_pos_1 = {
            x: parts_pos[len - 1].x + next_dir_1.x,
            y: parts_pos[len - 1].y + next_dir_1.y,
        };
        parts_pos.push(next_pos_1);
        return;
    }
    var next_dir = {
        x: parts_pos[len - 1].x - parts_pos[len - 2].x,
        y: parts_pos[len - 1].y - parts_pos[len - 2].y,
    };
    var next_pos = {
        x: parts_pos[len - 1].x + next_dir.x,
        y: parts_pos[len - 1].y + next_dir.y,
    };
    parts_pos.push(next_pos);
}
function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height); // clear canvas
    ctx.fillStyle = "grey";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    var cur_pos = {
        x: parts_pos[0].x + directions[direction].x,
        y: parts_pos[0].y + directions[direction].y,
    };
    if (cur_pos.x < 0 ||
        cur_pos.x >= width ||
        cur_pos.y < 0 ||
        cur_pos.y >= height) {
        console.log("gameover");
        clearInterval(interval_id);
    }
    parts_pos = __spreadArray([cur_pos], parts_pos, true);
    parts_pos.pop();
    if (objectEqual(parts_pos[0], apple_pos)) {
        eatApple();
        growSnake();
    }
    //render snake
    ctx.fillStyle = "green";
    parts_pos.forEach(function (pos) {
        ctx.fillRect(pos.x * size, pos.y * size, size, size);
    });
    //render apple
    ctx.fillStyle = "red";
    ctx.fillRect(apple_pos.x * size, apple_pos.y * size, size, size);
}
window.addEventListener("keydown", function (event) {
    if ((event.key === "ArrowLeft" || event.key === "a") && direction != 2) {
        direction = 0;
    }
    if ((event.key === "ArrowUp" || event.key === "w") && direction != 3) {
        direction = 1;
    }
    if ((event.key === "ArrowRight" || event.key === "d") && direction != 0) {
        direction = 2;
    }
    if ((event.key === "ArrowDown" || event.key === "s") && direction != 1) {
        direction = 3;
    }
});

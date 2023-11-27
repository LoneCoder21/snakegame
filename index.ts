const canvas = document.getElementById("canvas") as HTMLCanvasElement;
const ctx = canvas.getContext("2d")!;

const width = 20;
const height = 20;
const rate = 100; // draw rate

const size = Math.floor(canvas.width / width);

type Direction = { x: number; y: number };

const directions: Direction[] = [
    { x: -1, y: 0 } as Direction, //left
    { x: 0, y: -1 } as Direction, //up
    { x: 1, y: 0 } as Direction, //right
    { x: 0, y: 1 } as Direction, //down
];

let score = 0;
let direction = 0;
let parts_pos: Direction[] = [{ x: width / 2, y: height / 2 }];
growSnake();

let apple_pos = {
    x: Math.floor(Math.random() * width),
    y: Math.floor(Math.random() * height),
} as Direction;

const interval_id = setInterval(draw, rate);

function objectEqual(a: any, b: any) {
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
    const len = parts_pos.length;
    if (len === 1) {
        const next_dir = {
            x: directions[direction].x * -1,
            y: directions[direction].y * -1,
        };
        const next_pos = {
            x: parts_pos[len - 1].x + next_dir.x,
            y: parts_pos[len - 1].y + next_dir.y,
        };
        parts_pos.push(next_pos);
        return;
    }
    let next_dir: Direction = {
        x: parts_pos[len - 1].x - parts_pos[len - 2].x,
        y: parts_pos[len - 1].y - parts_pos[len - 2].y,
    };
    const next_pos = {
        x: parts_pos[len - 1].x + next_dir.x,
        y: parts_pos[len - 1].y + next_dir.y,
    };
    parts_pos.push(next_pos);
}

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height); // clear canvas
    ctx.fillStyle = "grey";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    let cur_pos = {
        x: parts_pos[0].x + directions[direction].x,
        y: parts_pos[0].y + directions[direction].y,
    };

    if (
        cur_pos.x < 0 ||
        cur_pos.x >= width ||
        cur_pos.y < 0 ||
        cur_pos.y >= height
    ) {
        console.log("gameover");
        clearInterval(interval_id);
    }

    parts_pos = [cur_pos, ...parts_pos];
    parts_pos.pop();

    if (objectEqual(parts_pos[0], apple_pos)) {
        eatApple();
        growSnake();
    }

    //render snake
    ctx.fillStyle = "green";
    parts_pos.forEach((pos) => {
        ctx.fillRect(pos.x * size, pos.y * size, size, size);
    });

    //render apple
    ctx.fillStyle = "red";
    ctx.fillRect(apple_pos.x * size, apple_pos.y * size, size, size);
}

window.addEventListener("keydown", (event) => {
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

var p1;
var p2;

var p1V;
var p2V;

var ball, ballV;

var p1S;
var p2S;

function setup() {
  createCanvas(600, 400);
  p1 = height / 2 - 50;
  p2 = height / 2 - 50;

  p1V = 0;
  p2V = 0;

  p1S = 0;
  p2S = 0;

  ball = createVector(width / 2, height / 2);
  ballV = createVector(random(-1, 1), random(-1, 1));
  ballV.setMag(3);

  textAlign(CENTER);
  textSize(30);
  fill(255);

}


function draw() {

  background(51);
  /* draw paddles */
  rect(20, p1, 10, 100);
  rect(width - 30, p2, 10, 100);
  /* draw ball */
  ellipse(ball.x, ball.y, 20);

  /* draw score board */
  //width and height
  text(p1S + " | " + p2S, width / 2, 50);

  /* handle inputs */
  handlePaddles();
  handleBall();

}


function handleBall() {

  ball.x += ballV.x;
  ball.y += ballV.y;

  /*collisions with the top and bottom*/
  if (ball.y > height || ball.y < 0) {
    ballV.y *= -1;
  }
  /*collisions with the paddles*/
  if (ball.x <= 30) {
    //right side

    //out of bounds
    if (ball.x <= 10) {
      p2S++;
      reset();
      checkScores();
      return;
    }
    //right paddle
    if (ball.y > p1 && ball.y < p1 + 100){

      if (ballV.x < 0) {
        ballV.x *= -1;
        ballV.mult(random(1, 1.5));
      }
    }
    } else if (ball.x >= width - 30) {

      //out of bounds
      if (ball.x >= width - 10) {
        p1S++;
        reset();
        checkScores();
        return;
      }

      //left paddle
      if (ball.y > p2 && ball.y < p2 + 100){

        if (ballV.x > 0) {
        ballV.x *= -1;
        ballV.mult(random(1, 1.5));
      }
      }
    }
}

function checkScores() {
  if (p1S === 2 || p2S === 2)
  {
    postGame()
    alert("Game over!");
    window.location.reload()
  }
}

let userIds = {
  player1: undefined,
  player2: undefined
}

function postGame(){
  console.log(userIds);
  const url = 'http://localhost:3000/api/v1/games'
  fetch(url, {
    method: 'POST',
    headers: {
      "Accept" : "application/json",
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      user_one_id: userIds.player1,
      user_two_id: userIds.player2,
      user_one_score: p1S,
      user_two_score: p2S
    })
  })
}


function reset() {
  ballV.setMag(3);
  ball = createVector(width / 2, height / 2);

}


function handlePaddles(){
  /*checking player 1 controls*/
  if (keyIsDown(83)){
    p1V += 5;
  } else if (keyIsDown(87)) {
    p1V -= 5;
  }
  /*checking player 2 controls*/
  if (keyIsDown(DOWN_ARROW)){
    p2V += 5;
} else if (keyIsDown(UP_ARROW)) {
    p2V -= 5;
  }

  p1 += p1V;
  p2 += p2V;

  /* "friction" */
  p1V *= 0.4;
  p2V *= 0.4;
    /* constrain paddles */

    p1 = constrain(p1, 0, height - 100);
    p2 = constrain(p2, 0, height - 100);
}

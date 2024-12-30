let currentMoleTile; // 현재 두더지 Tile 전역(global) 변수
let currentPlantTile; // 현재 피라냐 Tile 전역(global) 변수
let score = 0; // 점수 전역(global) 변수
let gameOver = false; // game over를 알리는 bool 변수

window.onload = function() {
    console.log("window onload complete!!"); // log 출력 - 개발자 도구에서만 보임
    setGame();
}

function setGame() {
    // set up the grid for the game board in html
    for (let i=0; i<9; i++) { // for문 - 반복문, i는 for문을 동작시키는 회전 변수(i goes from 0 to 8, stops at 9)
        //<div id="0-8"></div>
        let tile = document.createElement("div"); // div tag 생성
        tile.id = i.toString(); // i는 number로 원래 숫자, 이것을 toString이라는 내장함수를 활용해 문자로 치환
        tile.addEventListener("click", selectTile);
        document.getElementById("board").appendChild(tile); // board라는 id 속성 값을 갖고 있는 태그 밑에 tile(div)변수를 추가
    }

    //setTimeout(function(){ // 3초 후 실행
        console.log("setting complete!!");  // 'setting complete' log 출력
    //}, 3000);

    setInterval(setMole, 1000); // 1000 milliseconds = 1 seconds
    setInterval(setPlant, 2000); // 2000 milliseconds = 2 seconds
}

// Math는 js 기본 내장 객체로 안에 floor 함수는 내림 함수 
function getRandomTile() {
    // math.random --> (0-1) * 9 = (0-9) --> round down to (0-8) integers
    let num = Math.floor(Math.random() * 9);
    return num.toString(); // string 반환
}

function setMole() {

    if (gameOver) { // game over => 동작 X
        return;
    }

    // valid test
    if (currentMoleTile) {
        currentMoleTile.innerHTML = "";
    }

    let mole = document.createElement("img"); // img tag 생성성
    mole.src = "./monty-mole.png"; // src 속성값에 image url 값 설정
    
    let num = getRandomTile(); // 0-8 random value
    if (currentPlantTile && currentPlantTile.id == num) {
        return;    // id가 겹치면 mole을 생략
    }

    currentMoleTile = document.getElementById(num); // id가 num(0-8)인 값인 tag 찾기기
    currentMoleTile.appendChild(mole);
}

function setPlant() {

    if (gameOver) { // game over => 동작 X
        return;
    }

    // valid test
    if (currentPlantTile) {
        currentPlantTile.innerHTML = "";        
    }

    let plant = document.createElement("img");
    plant.src = "./piranha-plant.png";

    let num = getRandomTile();
    if (currentMoleTile && currentMoleTile.id == num) {
        return;    // id가 겹치면 plant를 생략
    }

    currentPlantTile = document.getElementById(num);
    currentPlantTile.appendChild(plant);
}

function selectTile() {

    if (gameOver) { // game over => 동작 X
        return;
    }

    if (this == currentMoleTile) {
        score += 10;
        document.getElementById("score").innerText = score.toString();

        // 두더지를 클릭한 후에는 현재 타일을 비워주고
        currentMoleTile.innerHTML = ""; 
        // 현재 두더지 타일을 초기화하여 다시 클릭할 수 없게 만듦
        currentMoleTile = null; 
    } else if (this == currentPlantTile) {
        document.getElementById("score").innerText = "GAME OVER: " + score.toString();
        gameOver = true;
    }
}
let header = document.getElementById("header");
let main = document.getElementById("main");
let flipContainers = document.querySelectorAll(".flip-container");
let newGame = document.getElementById("new-game-button");
let clickedElements = [];
let intervalId;

function setUp() {
  let start = document.getElementById("start-button");
  start.addEventListener("click", function () {
    let picsOption,
      diffOption = null;
    let options = document.querySelectorAll('input[name="difficulty"]');
    for (let i = 0; i < options.length; i++) {
      if (options[i].checked) {
        diffOption = options[i].value;
        break;
      }
    }
    options = document.querySelectorAll('input[name="pictures"]');
    for (let i = 0; i < options.length; i++) {
      if (options[i].checked) {
        picsOption = options[i].value;
        break;
      }
    }

    let myDiv = document.getElementById("header");
    let temp = myDiv.innerHTML;
    myDiv.innerHTML = '<div id="timer">3</div>';
    let countdown = 3;
    let timerElement = document.getElementById("timer");
    let startTimer;

    intervalId = setInterval(function () {
      countdown--;
      timerElement.textContent = countdown;
      flipContainers = document.querySelectorAll(".flip-container");
      if (countdown === 0) {
        header.classList.add("hide-header");
        document.getElementById("level").innerHTML = diffOption;
        document.getElementById("pics").innerHTML = picsOption;
        if (picsOption === "8") {
          main.classList.add("eight");
          setImage(8);
          document.getElementById("time").innerHTML = 120;
        } else if (picsOption === "10") {
          main.classList.add("ten");
          setImage(10);
          document.getElementById("time").innerHTML = 150;
        } else if (picsOption === "12") {
          main.classList.add("twelve");
          setImage(12);
          document.getElementById("time").innerHTML = 180;
        }
      } else if (countdown < 0) {
        if (countdown === -3 && diffOption === "hard") {
          startTimer = hideImage(flipContainers, intervalId, temp, myDiv);
        } else if (countdown === -5 && diffOption === "medium") {
          startTimer = hideImage(flipContainers, intervalId, temp, myDiv);
        } else if (countdown === -8 && diffOption === "easy") {
          startTimer = hideImage(flipContainers, intervalId, temp, myDiv);
        }
      }

      if (startTimer === true) {
        let play = parseInt(document.getElementById("time").textContent);
        startCheckingClicked();
        intervalId = setInterval(function () {
          if (play === 0) {
            clearInterval(intervalId);
            play++;
            showGameOver();
          }
          play--;
          document.getElementById("time").innerHTML = play;
        }, 1000);
      }
    }, 1000);
  });
}

function setImage(numberOfImages) {
  let index = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
  let matchIndex = [];
  while (index.length > 12 - numberOfImages) {
    let ran = Math.floor(Math.random() * index.length);
    let dom = index[ran];
    index.splice(ran, 1);
    matchIndex.push(dom);
    main.insertAdjacentHTML(
      "beforeend",
      `
    <div class="flip-container">
      <div class="flipper">
        <img class="front" src="${dom}.jpg" alt="Front Image" />
        <img class="back" src="mark.jpeg" alt="Back Image" />
      </div>
    </div>
    `
    );
    if (index.length === 9) {
      while (matchIndex.length > 0) {
        let ran = Math.floor(Math.random() * matchIndex.length);
        let dom = matchIndex[ran];
        matchIndex.splice(ran, 1);
        main.insertAdjacentHTML(
          "beforeend",
          `
          <div class="flip-container">
            <div class="flipper">
              <img class="front" src="${dom}.jpg" alt="Front Image" />
              <img class="back" src="mark.jpeg" alt="Back Image" />
            </div>
          </div>
          `
        );
      }
    } else if (index.length === 6) {
      while (matchIndex.length > 0) {
        let ran = Math.floor(Math.random() * matchIndex.length);
        let dom = matchIndex[ran];
        matchIndex.splice(ran, 1);
        main.insertAdjacentHTML(
          "beforeend",
          `
          <div class="flip-container">
            <div class="flipper">
              <img class="front" src="${dom}.jpg" alt="Front Image" />
              <img class="back" src="mark.jpeg" alt="Back Image" />
            </div>
          </div>
          `
        );
      }
    }
  }
  while (matchIndex.length > 0) {
    let ran = Math.floor(Math.random() * matchIndex.length);
    let dom = matchIndex[ran];
    matchIndex.splice(ran, 1);
    main.insertAdjacentHTML(
      "beforeend",
      `
      <div class="flip-container">
        <div class="flipper">
          <img class="front" src="${dom}.jpg" alt="Front Image" />
          <img class="back" src="mark.jpeg" alt="Back Image" />
        </div>
      </div>
      `
    );
  }
}

function flipClickHandler() {
  this.classList.toggle("clicked");
}

function flip() {
  flipContainers.forEach((container) => {
    container.addEventListener("click", flipClickHandler);
  });
}

function hideImage(flipContainers, intervalId, temp, myDiv) {
  clearInterval(intervalId);
  flipContainers.forEach((container) => {
    container.classList.add("clicked");
  });
  myDiv.innerHTML = temp;
  flip();
  newGame.addEventListener("click", function () {
    location.reload();
    // clearInterval(intervalId);
    // setUp();
    // main.innerHTML = `
    // <div id="info">
    //   <p>Level: <span id="level"></span></p>
    //   <p>Pics: <span id="pics"></span></p>
    //   <p>Time Left: <span id="time"></span></p>
    // </div>`;
    // header.classList.remove("hide-header");
    // main.classList.remove(...main.classList);
  });
  return true;
}

function checkTwoClicked() {
  clickedElements = [];
  flipContainers.forEach((container) => {
    if (!container.classList.contains("clicked")) {
      clickedElements.push(container);
    }
  });

  if (clickedElements.length === 2) {
    return clickedElements;
  } else {
    return null;
  }
}

function startCheckingClicked() {
  let checkClickedInterval = setInterval(() => {
    clickedElements = checkTwoClicked();
    if (clickedElements) {
      const img1 = clickedElements[0].querySelector(".front").src;
      const img2 = clickedElements[1].querySelector(".front").src;
      if (img1 === img2) {
        clickedElements[0].querySelector(".front").classList.add("matched");
        clickedElements[0].querySelector(".back").classList.add("matched");
        clickedElements[1].querySelector(".front").classList.add("matched");
        clickedElements[1].querySelector(".back").classList.add("matched");
        clickedElements.forEach((container) => {
          container.classList.add("clicked");
        });
        clickedElements[0].removeEventListener("click", flipClickHandler);
        clickedElements[1].removeEventListener("click", flipClickHandler);
      } else if (clickedElements.length === 2) {
        clearInterval(checkClickedInterval);
        showGameOver();
      }
    }
  }, 300); // Adjust the interval value as needed
}

function showGameOver() {
  const gameOverScreen = document.createElement("div");
  gameOverScreen.id = "game-over-screen";
  gameOverScreen.innerHTML = `
    <h1>GAME OVER</h1>
    <div class="new-game-button-container">
      <button id="new-game-button-over">New Game!</button>
    </div>
  `;
  gameOverScreen.style = `
    z-index: 1;
    background-color: black;
    position: absolute;
    top:0;
    color:red;
    font-size: 64px;
    height: 100vh;
    width: 100%;
    opacity: 0.98;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    row-gap: 20px;
  `;
  document.body.appendChild(gameOverScreen);

  const newGameButton = document.getElementById("new-game-button-over");
  newGameButton.addEventListener("click", () => {
    document.body.removeChild(gameOverScreen);
    location.reload();
  });
}

setUp();

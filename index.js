"use strict";

let game = null;
function insertAfter(referenceNode, newNode) {
  referenceNode.parentNode.insertBefore(newNode, referenceNode.nextSibling);
}

function capitalizeFirstLetter(string) {
  if (typeof string !== "string") {
    throw new Error("Input must be a string");
  }

  if (string.length === 0) {
    return "";
  }

  return string.charAt(0).toUpperCase() + string.slice(1);
}

const splashScreen = () => {
  return `        <div class="screen splash" id="splash">
          <div class="png-container">
            <figure>
              <img
                class="pirate"
                width="150px"
                height="150px"
                src="images/pirate.png"
                alt=""
              />
            </figure>

            <figure style="display: none">
              <img
                class="treasure"
                width="150px"
                height="150px"
                src="images/treasure.png"
                alt=""
              />
            </figure>
          </div>
          <div class="game-instruction">
            <h1 class="title">Hi-Low</h1>

            <div class="game-info">
              <h2 class="sub-title">Game Story</h2>

              <p>
                Once upon a time, in a magical land, there was a deserted island
                filled with a secret treasure. To find the treasure, you need to
                play a game and guess the secret number. Don't worry, it's a
                game for beginners! When you make a guess, the pirate will tell
                you if your number is too low or too high. This will help you
                get closer to the right answer. Pay attention to the hints and
                use your thinking skills to figure out the secret number. Are
                you ready to play and discover the amazing treasure hidden
                inside this deserted island? Let the adventure begin!
              </p>
            </div>
            <button type="button" id="start" class="btn btn-success">
              Launch Game
            </button>
            <audio autoplay controls class="audio" style="display: none">
              <source src="media/game-audio.mp3" type="audio/ogg" />
              <source src="media/game-audio.mp3" type="audio/mpeg" />
              Your browser does not support the audio element.
            </audio>
            <!-- Modal -->
          </div>`;
};

const playersInput = `
  <div class="row">
    <div class="col">
      <label class="form-label">First Player</label>
      <input
        name="playerName1"
        placeholder="Enter your name"
        type="text"
        class="form-control w-100 mt-3"
        id="first-player-input"
        aria-describedby="emailHelp"
        style="width: 200px; margin: 0 auto"
        required
      />
    </div>
    
  </div>`;

const playersInputs = `
  <div class="row">
      <div class="col">
          <label class="form-label">First Player</label>
          <input
            name="playerName1"
            placeholder="Enter your name"
            type="text"
            class="form-control w-100 mt-3"
            id="first-player-input"
            aria-describedby="emailHelp"
            style="width: 200px; margin: 0 auto"
            required
          />
        </div>
        <div class="col">
          <label class="form-label">Second Player</label>
          <input
            name="playerName2"
            placeholder="Enter your name"
            type="text"
            class="form-control w-100 mt-3"
            id="second-player-input"
            aria-describedby="emailHelp"
            style="width: 200px; margin: 0 auto"
            required
          />
      </div>
    
    </div>`;

const gameStartScreen = `<div class="screen" id="game-start">
      <form id="game-form">
        <label class="form-label">How many players are there?</label>
        <div
          class="btn-group btn-number-of-player w-100 mb-4"
          role="group"
          aria-label="Basic radio toggle button group"
          data-toggle="buttons"
        >
          <input
            type="radio"
            class="btn-check"
            value="1"
            name="numberOfPlayers"
            id="player1"
            autocomplete="off"
            checked
          />
          <label class="btn btn-outline-primary" for="player1"
            >One player</label
          >

          <input
            type="radio"
            class="btn-check"
            value="2"
            name="numberOfPlayers"
            id="player2"
            autocomplete="off"
          />
          <label class="btn btn-outline-primary" for="player2"
            >Two player</label
          >
        </div>
        <div class="players mb-4">
          <div class="row">
            <div class="col">
              <label class="form-label">First Player</label>
              <input
                name="playerName1"
                placeholder="Enter your name"
                type="text"
                class="form-control w-100 mt-3"
                id="first-player-input"
                aria-describedby="emailHelp"
                style="width: 200px; margin: 0 auto"
                required
              />
            </div>
          </div>
        </div>
        <label class="form-label">Select Difficulty Level</label>
        <div
          class="btn-group btn-level-group w-100 mb-4"
          role="group"
          aria-label="Basic radio toggle button group"
          data-toggle="buttons"
        >
          <input
            type="radio"
            class="btn-check"
            value="easy"
            name="currentDifficultyLevel"
            id="currentDifficultyLevel1"
            autocomplete="off"
            checked
          />
          <label class="btn btn-outline-primary" for="currentDifficultyLevel1"
            >Easy</label
          >

          <input
            type="radio"
            class="btn-check"
            value="medium"
            name="currentDifficultyLevel"
            id="currentDifficultyLevel2"
            autocomplete="off"
          />
          <label class="btn btn-outline-primary" for="currentDifficultyLevel2"
            >Medium</label
          >

          <input
            type="radio"
            class="btn-check"
            value="difficult"
            name="currentDifficultyLevel"
            id="currentDifficultyLevel3"
            autocomplete="off"
          />
          <label class="btn btn-outline-primary" for="currentDifficultyLevel3"
            >Difficult</label
          >
        </div>

        <button type="submit" id="submit" class="btn btn-primary mt-0">
          Submit
        </button>
      </form>
      
       <audio controls class="audio" style="display: none">
            <source src="media/game-audio.mp3" type="audio/ogg" />
            <source src="media/game-audio.mp3" type="audio/mpeg" />
            Your browser does not support the audio element.
          </audio>
    </div>`;

const gameOverScreenHTML = (game) => {
  const players = game.players;
  const maxNumberOfLives = Number(
    game.difficultyLevels[game.currentDifficultyLevel].numberOfAttempt
  );
  const message =
    players.length > 1
      ? `${capitalizeFirstLetter(players[0].name)} tried ${
          maxNumberOfLives - Number(players[0].numberOfAttempt)
        } times and ${players[0].status} | ${capitalizeFirstLetter(
          players[1].name
        )} tried ${
          maxNumberOfLives - Number(players[1].numberOfAttempt)
        } times - ${players[1].status} `
      : `${capitalizeFirstLetter(players[0].name)} tried ${
          maxNumberOfLives - Number(players[0].numberOfAttempt)
        } times - ${players[0].status}`;

  return `<div class="png-container">
        <img src="images/sad-face.png" width="150px" height="150px" alt="" />
      </div>
      <div class="game-over-text-container">
        <p class="mt-5">Sorry, gameover!</p>
        <p>${message}</p>
      </div>
      <audio autoplay controls class="audio" style="display: none">
              <source src="media/gameoverAudio.wav" type="audio/ogg" />
              <source src="media/gameoverAudio.wav" type="audio/mpeg" />
              Your browser does not support the audio element.
            </audio>
      <div class="buttons">
        <button id="play-again" type="button" class="btn btn-primary">Play Again</button>
        <button id="quit" type="button" class="btn btn-danger">Quit</button>
      </div>`;
};

const victoryScreenHTML = (game) => {
  const players = game.players;
  const maxNumberOfLives = Number(
    game.difficultyLevels[game.currentDifficultyLevel].numberOfAttempt
  );

  const winners = [];

  let finalMessage = null;
  console.log({ players });
  if (players.length === 2) {
    if (players[0].status === "failed" && players[1].status === "success") {
      winners.push(players[1]);
    } else if (
      players[0].status === "success" &&
      players[1].status === "failed"
    ) {
      winners.push(players[0]);
    } else {
      if (players[0].numberOfAttempt > players[1].numberOfAttempt) {
        winners.push(players[0]);
      } else if (players[0].numberOfAttempt < players[1].numberOfAttempt) {
        winners.push(players[1]);
      } else if (players[0].numberOfAttempt === players[1].numberOfAttempt) {
        winners.push(players[0], players[1]);
      }
    }
  } else {
    winners.push(players[0]);
  }

  console.log({ winners });

  if (winners.length === 1) {
    finalMessage = `  <p class="victory-text">
          Congratulations <strong>${capitalizeFirstLetter(
            winners[0].name
          )} </strong><br />
          You tried ${
            Number(maxNumberOfLives) - Number(winners[0].numberOfAttempt)
          } times and find the secret number, and deserved this
          amazing <em>treasure!</em>. Enjoy your victory.
        </p>
        <audio controls class="audio" style="display: none">
            <source src="media/victory.mp3" type="audio/ogg" />
            <source src="media/victory.mp3" type="audio/mpeg" />
            Your browser does not support the audio element.
          </audio>`;
  } else {
    finalMessage = `  <p class="victory-text">
          Congratulations <strong>${capitalizeFirstLetter(
            winners[0].name
          )} and ${capitalizeFirstLetter(winners[1].name)}</strong><br />
          You tried ${
            Number(maxNumberOfLives) - Number(winners[0].numberOfAttempt)
          } times and find the secret number, and deserved this
          amazing <em>treasure!</em>. Enjoy your victory.
        </p>
        <audio controls class="audio" style="display: none">
            <source src="media/victory.mp3" type="audio/ogg" />
            <source src="media/victory.mp3" type="audio/mpeg" />
            Your browser does not support the audio element.
          </audio>`;
  }

  return `<div class="victory-text-container">
        ${finalMessage}
      </div>
      <div class="buttons">
        <button id="play-again" type="button" class="btn btn-primary">Play Again</button>
        <button id="quit" type="button" class="btn btn-danger">Quit</button>
      </div>
      <audio controls class="audio" style="display: none">
            <source src="media/victory.mp3" type="audio/ogg" />
            <source src="media/victory.mp3" type="audio/mpeg" />
            Your browser does not support the audio element.
          </audio>
      <div class="png-container">
        <figure>
          <img
            class="treasure"
            width="250px"
            height="250px"
            src="images/treasure.png"
            alt=""
          />
        </figure>
      </div>`;
};

const computerThinking = () => {
  return `
    <img
      src="/images/computer-thinking.gif"
      height="100px"
      alt="computer is thinking gif"
      
    />
    <p style="color: #2b154d;">Computer is thinking for the secret number! Please wait...</p>`;
};

const alertFunc = (text, status) => {
  const alertClasses = status === "success" ? "alert-success" : "alert-danger";

  return `<div class="alert ${alertClasses} mt-3" role="alert">
            ${text}
          </div>`;
};

const scoreBoard = (players, numberOfAttempt) => {
  if (players.length === 1) {
    return `   
    <div class="screen" id="game">
      <div class="score-board">
          <div class="row">
            <div class="col text-center">
              <div class="score-board-player score-board-player-${
                players[0].id
              }">
                <img
                  src="https://img.fruugo.com/product/4/02/350353024_max.jpg"
                  class="rounded-circle shadow-lg p-2 bg-body-tertiary rounded"
                  style="width: 70px; height: 70px"
                  alt="Avatar"
                />
                <div class="score-board-player-labels">
                  <span class="player-name">Name: ${capitalizeFirstLetter(
                    players[0].name
                  )}</span>
                  <span class="lives">Lives: ${numberOfAttempt}</span>
                </div>
              </div>
            </div>
          </div>
           </div>
        </div>`;
  } else {
    return `<div class="game-screen">
    
      <div class="screen" id="game"><div class="score-board">
      <div class="row">
        <div class="col text-center">
          <div class="score-board-player score-board-player-${players[0].id}">
            <img
              src="https://img.fruugo.com/product/4/02/350353024_max.jpg"
              class="rounded-circle shadow-lg p-2 bg-body-tertiary rounded"
              style="width: 70px; height: 70px"
              alt="Avatar"
            />
            <div class="score-board-player-labels">
              <span class="player-name">Name: ${capitalizeFirstLetter(
                players[0].name
              )}</span>
              <span class="lives">Lives: ${numberOfAttempt}</span>
            </div>
          </div>
        </div>
        <div class="col text-center">
          <div class="score-board-player score-board-player-${players[1].id}">
            <img
              src="https://i.ebayimg.com/images/g/nNYAAOSwjAJjboH1/s-l500.jpg"
              class="rounded-circle shadow-lg p-2 bg-body-tertiary rounded"
              style="width: 70px; height: 70px"
              alt="Avatar"
            />
            <div class="score-board-player-labels">
              <span class="player-name">Name: ${capitalizeFirstLetter(
                players[1].name
              )}</span>
              <span class="lives">Lives: ${numberOfAttempt}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
    </div>
    </div>`;
  }
};

const gameScreen = (maxNumber) => {
  return `
       <div class="guesing pt-4 mt-4">
          <form id="guess-form">
            <div class="input-group p-0 w-100">
              <input
                type="text"
                class="form-control"
                id="guessed-number"
                placeholder="Type a number between 1 and ${maxNumber}"
                aria-label="Type a number between 1 and ${maxNumber}"
                aria-describedby="button-addon2"
                required
              />
              <button
                class="btn btn-primary m-0"
                id="button-addon2"
                type="submit"
                
              >
                Make your guess
              </button>
            </div>
          </form>
          <div class="alert-wrapper"></div>
        </div>
  `;
};

const secretNumberScreen = (maxNumber, currentPlayerName, nextPlayerName) => {
  return `
    <div class="game-set-secret-num-screen">
      <p>${capitalizeFirstLetter(
        currentPlayerName
      )}! Set your secret number for ${capitalizeFirstLetter(
    nextPlayerName
  )}.  </p>
      <form id="set-secret-num-form">
        <div class="input-group p-0 w-100">
          <input
            id="secretNum"
            type="password"
            pattern="[0-9]*"
            class="form-control"
            id="set-secret-num-number"
            name="secretNumber"
            placeholder="Set a number between 1 and ${maxNumber}"
            aria-label="Set a number between 1 and ${maxNumber}"
            aria-describedby="button-addon2"
            required
          />
          <button class="btn btn-primary m-0" id="button-addon2" type="submit">
            Set secret number
          </button>
        </div>
      </form>
    </div>`;
};

class Player {
  constructor(name, playerIndex) {
    this.id = playerIndex + new Date().valueOf();
    this.name = name;
    this.numberOfAttempt = 0;
    this.status = null;
  }
  updateAttempt() {
    --this.numberOfAttempt;
  }
  setNumberOfAttempt(number) {
    this.numberOfAttempt = number;
  }
  setStatus(value) {
    this.status = value;
  }
}

class Game {
  constructor(currentDifficultyLevel, numberOfPlayers, players) {
    this.secretNumber = null;
    this.players = players;
    this.numberOfPlayers = numberOfPlayers;
    this.currentPlayer = players[0];
    this.difficultyLevels = {
      easy: {
        numberOfAttempt: 10,
        max: 100,
      },
      medium: {
        numberOfAttempt: 11,
        max: 200,
      },
      difficult: {
        numberOfAttempt: 12,
        max: 300,
      },
    };
    this.currentDifficultyLevel = currentDifficultyLevel;
  }

  setSecretNumber(playerSecretNumber) {
    const min = 1;
    const computerScretNumber =
      Math.floor(
        Math.random() *
          (this.difficultyLevels[this.currentDifficultyLevel].max - min + 1)
      ) + min;
    if (!playerSecretNumber) {
      // following console.log for testing purposes.
      console.log({ computerScretNumber });
    }
    this.secretNumber = playerSecretNumber
      ? playerSecretNumber
      : computerScretNumber;
  }

  setNumberOfAttemptForPlayers() {
    const numberOfAttempt =
      this.difficultyLevels[`${this.currentDifficultyLevel}`].numberOfAttempt;
    this.players.forEach((player) =>
      player.setNumberOfAttempt(numberOfAttempt)
    );
  }
  setCurrentPlayer(player) {
    this.currentPlayer = player;
  }

  makeGuess(number) {
    this.currentPlayer.updateAttempt();
    if (this.currentPlayer.numberOfAttempt > 0) {
      if (this.secretNumber > number) {
        $("#guessed-number").val("");
        return "Ups! It is too low. Try again!";
      } else if (this.secretNumber < number) {
        $("#guessed-number").val("");
        return "Ups! It is too high. Try again!";
      } else if (this.secretNumber === number) {
        $("#guessed-number").val("");
        return "Congratulations.";
      }
    } else {
      $("#guess-form").remove();
      // console.log("No more lives");
      return "No more lives";
    }
  }
}

const gameController = {
  gameTrack: null,
  gameLaunchBtn: document.querySelector("#start"),
  gameScreen: document.querySelector(".game-screen"),

  init() {
    this.gameLaunchBtn.addEventListener("click", () => {
      this.gameScreen.innerHTML = gameStartScreen;
      this.startPlayingAudio();
      this.startGame();
    });
  },

  startPlayingAudio() {
    this.gameTrack = new Audio("media/game-audio.mp3");
    this.gameTrack.play();
    this.gameTrack.volume = 0.5;
  },
  startPlayingGameOverAudio() {
    this.gameOverAudio = new Audio("media/gameoverAudio.wav");
    this.gameOverAudio.play();
    this.gameOverAudio.volume = 0.5;
  },
  startPlayingVictoryAudio() {
    this.victoryAudio = new Audio("media/victory.mp3");
    this.victoryAudio.play();
    this.victoryAudio.volume = 0.5;
  },
  startGame() {
    const gameForm = $("#game-form");
    gameForm.submit((e) => {
      e.preventDefault();
      // convert form inputs to js object
      const formData = new FormData(e.target);
      const formProps = Object.fromEntries(formData);

      const players = [];

      const { currentDifficultyLevel, numberOfPlayers, ...playerNames } =
        formProps; // learn about javascript object destructuring

      Object.values(playerNames).forEach((playerName, playerIndex) => {
        const newPlayer = new Player(playerName, playerIndex);
        players.push(newPlayer);
      });

      game = new Game(currentDifficultyLevel, Number(numberOfPlayers), players);

      game.setNumberOfAttemptForPlayers();

      // set score board
      this.gameScreen.innerHTML = scoreBoard(
        players,
        game.difficultyLevels[currentDifficultyLevel].numberOfAttempt
      );

      if (game.numberOfPlayers === 1) {
        const scoreBoard = document.querySelector(".score-board");
        const computerThinkingWrapper = document.createElement("div");
        computerThinkingWrapper.classList.add("computer-thinking");
        computerThinkingWrapper.innerHTML = computerThinking();

        insertAfter(scoreBoard, computerThinkingWrapper);
        game.setSecretNumber();

        setTimeout(() => {
          // this.startGuessing();
          computerThinkingWrapper.remove();
          this.setActivePlayerBoard(game.currentPlayer.id);
          this.setGuessScreen();
        }, 3000);
      } else {
        // set active player score board
        this.setActivePlayerBoard(game.currentPlayer.id);
        this.setSecretNumberForm(game);
      }
    });

    $('input[name="numberOfPlayers"]').each(function (index) {
      $(this).on("click", (e) => {
        console.log(e.target.value);
        const playersWrapper = document.querySelector(".players");
        if (e.target.value === "1") {
          playersWrapper.innerHTML = playersInput;
        } else {
          playersWrapper.innerHTML = playersInputs;
        }
      });
    });
  },
  startGuessing() {
    const guessingForm = $("#guess-form");
    guessingForm.submit((e) => {
      e.preventDefault();

      if (
        Number($("#guessed-number").val()) >
        Number(game.difficultyLevels[game.currentDifficultyLevel].max)
      ) {
        alert("Enter a number in the range!");
        return false;
      }

      const result = game.makeGuess(Number($("#guessed-number").val()));
      const alertWrapper = document.querySelector(".alert-wrapper");
      const playerLives = document.querySelector(
        `.score-board-player-${game.currentPlayer.id} .lives`
      );

      playerLives.innerHTML = `Lives: ${game.currentPlayer.numberOfAttempt}`;

      if (result === "No more lives") {
        game.currentPlayer.setStatus("failed");

        // update alert based on result
        alertWrapper.innerHTML = alertFunc(
          `${result}. You'll be redirect to next screen.`,
          "failed"
        );
        const nextPlayer = this.findNextPlayer();
        setTimeout(() => {
          if (nextPlayer.length > 0 && !nextPlayer[0].status) {
            $(".guess-wrapper").remove();
            this.setSecretNumberForm(game);
          } else {
            this.moveFinalScreen();
          }
        }, 2000);
      } else if (result === "Congratulations.") {
        game.currentPlayer.setStatus("success");

        // update alert based on result
        alertWrapper.innerHTML = alertFunc(
          `${result}. You'll be redirect to next screen.`,
          "success"
        );
        const nextPlayer = this.findNextPlayer();
        setTimeout(() => {
          if (nextPlayer[0] && !nextPlayer[0]?.status) {
            $(".guess-wrapper").remove();
            this.setSecretNumberForm(game);
          } else {
            this.moveFinalScreen();
          }
        }, 2000);
      } else {
        // update alert based on result
        alertWrapper.innerHTML = alertFunc(result, "failed");
      }
    });
  },
  setActivePlayerBoard(id) {
    // set active player score board
    const players = document.querySelectorAll(`.score-board-player`);
    players.forEach((player) =>
      player.classList.contains("score-board-player-active")
        ? player.classList.remove("score-board-player-active")
        : null
    );

    const activePlayer = document.querySelector(`.score-board-player-${id}`);
    activePlayer.classList.toggle("score-board-player-active");
  },
  setSecretNumberForm(game) {
    // set secret number screen
    const scoreBoard = document.querySelector(".score-board");
    const setSecretWrapper = document.createElement("div");
    setSecretWrapper.classList.add("pt-4");
    setSecretWrapper.classList.add("pb-4");
    setSecretWrapper.classList.add("game-set-secret-num-screen");
    const nextPlayer = game.players.filter(
      (player) => player.id != game.currentPlayer.id
    );

    setSecretWrapper.innerHTML = secretNumberScreen(
      game.difficultyLevels[game.currentDifficultyLevel].max,
      game.currentPlayer.name,
      nextPlayer[0].name
    );
    insertAfter(scoreBoard, setSecretWrapper);

    // add submit event listener to form
    const secretNumForm = $("#set-secret-num-form");
    secretNumForm.submit((e) => {
      e.preventDefault();
      // convert form inputs to js object
      const formData = new FormData(e.target);
      const formProps = Object.fromEntries(formData);
      if (
        formProps.secretNumber >
          game.difficultyLevels[game.currentDifficultyLevel].max ||
        formProps.secretNumber < 1
      ) {
        console.log("set secret number in range");
        alert("set the secret number in the range!");

        document.getElementById("secretNum").focus();
        return false;
      }
      // set secret number
      game.setSecretNumber(Number(formProps.secretNumber));
      $(".game-set-secret-num-screen").remove();

      // change current player
      this.changeCurrentPlayer();
      this.setGuessScreen();
    });
  },
  setGuessScreen() {
    // set Guesss screeen
    const scoreBoard = document.querySelector(".score-board");
    const guessScreen = document.createElement("div");
    guessScreen.classList.add("guess-wrapper");
    guessScreen.innerHTML = gameScreen(
      game.difficultyLevels[game.currentDifficultyLevel].max
    );
    insertAfter(scoreBoard, guessScreen);
    this.startGuessing();
  },
  findNextPlayer() {
    const nextPlayer = game.players.filter(
      (player) => player.id != game.currentPlayer.id
    );

    return nextPlayer;
  },
  changeCurrentPlayer() {
    const nextPlayer = this.findNextPlayer();
    game.setCurrentPlayer(nextPlayer[0]);
    this.setActivePlayerBoard(game.currentPlayer.id);
  },
  moveFinalScreen() {
    const players = game.players;

    const playersStatus = players.some((player) => player.status === "success");

    if (!playersStatus) {
      // game over screen
      this.gameOverScreen();
      startPlayingGameOverAudio();
    } else {
      this.victoryScreen();
      this.startPlayingVictoryAudio();
    }
  },
  victoryScreen() {
    const gameWrapper = document.getElementById("game");

    gameWrapper.innerHTML = victoryScreenHTML(game);
    this.listenGameOverScreen();
    this.gameTrack.pause();
    this.startPlayingVictoryAudio();
  },
  gameOverScreen() {
    const gameWrapper = document.getElementById("game");

    gameWrapper.innerHTML = gameOverScreenHTML(game);
    this.listenGameOverScreen();
    this.gameTrack.pause();
    startPlayingGameOverAudio();
  },

  listenGameOverScreen() {
    const gameScreen = document.querySelector(".game-screen");
    const playAgainBtn = document.getElementById("play-again");
    const quitBtn = document.getElementById("quit");

    // Start game again
    playAgainBtn.addEventListener("click", () => {
      gameScreen.innerHTML = gameStartScreen;
      this.startGame();
      this.startPlayingAudio();
    });

    quitBtn.addEventListener("click", () => {
      game = null;
      location.reload(true);
    });
  },
};
gameController.init();

// ! Setting Game Variable
let duration = 1000;
let blocksContainer = document.querySelector(".memory-game-blocks");
let blocks = Array.from(blocksContainer.children);
let orderRange = Array.from(Array(blocks.length).keys());
// ! Functions DownBelow
document.querySelector(".over-lay button").onclick = function () {
  // Take Value From User Make Condition check if is Empty Add Default Unkown
  let yourName = prompt("Whats Your Name");
  yourName == null || yourName == ""
    ? (document.querySelector(".name span").innerHTML = "Unknown")
    : (document.querySelector(".name span").innerHTML = yourName);
  // Remove Splash Screen loading be Baldy
  document.querySelector(
    ".over-lay"
  ).style.cssText = `opacity:0; transform:translateY(-100%)`;
  document.querySelector("#start-game").play();
};
shuffle(orderRange);
function shuffle(element) {
  // Settings Vars,
  let current = element.length,
    temp,
    random;
  while (current > 0) {
    // Get Random Number
    random = Math.floor(Math.random() * current);
    // Decrease Length By One,
    current--;
    //[1]: Save Current Element In Stash
    temp = element[current];
    // [2]: Current Element = Random Element
    element[current] = element[random];
    // [3]: Random Element = Get Element From Stash
    element[random] = temp;
  }
  return element;
}
blocks.forEach((block, index) => {
  block.style.order = orderRange[index]; // Add random Indexes To Every Block Element,
  // Add Click Event to Every Elemnt
  block.addEventListener("click", function () {
    flipBlock(block);
  });
});
//Function Flip BLock
function flipBlock(selectedBlock) {
  //  Waitng Element Then,
  selectedBlock.classList.add("is-flipped");
  // Collect All flipped Cards,
  let collectFlipS = blocks.filter((collectFlip) =>
    collectFlip.classList.contains("is-flipped")
  );
  let winner = collectFlipS;
  // if Theres Two CollectFlips
  if (collectFlipS.length === 2) {
    // Stop, Clicking Function,
    // Check Matched Block Function,
    stopClicking(); // Fn
    checkMatchedBlocks(collectFlipS[0], collectFlipS[1]);
  }
}

function stopClicking() {
  // Add Class, No Clicking On Main Container
  blocksContainer.classList.add("no-clicking");
  setTimeout(() => {
    blocksContainer.classList.remove("no-clicking");
  }, duration);
}
let Winner = 0;
function checkMatchedBlocks(FirstBlock, SecondBlock) {
  let triesElement = document.querySelector(".tries span");

  if (FirstBlock.dataset.technology === SecondBlock.dataset.technology) {
    FirstBlock.classList.remove("is-flipped");
    SecondBlock.classList.remove("is-flipped");
    FirstBlock.classList.add("has-match");
    SecondBlock.classList.add("has-match");
    document.getElementById("sucess").play();
    Winner += 2;
    if (Winner === 20) {
      document.querySelector(
        "main"
      ).style.cssText = `opacity: 0.5;pointer-events: none`;
      let p = document.createElement("p");
      p.innerHTML = "Congrats You Completed The Game Thanks For Play :<3";
      document.body.appendChild(p);
      p.className = "Winner";
    }
  } else {
    triesElement.innerHTML = parseInt(triesElement.innerHTML) + 1;

    if (+triesElement.innerHTML === 30) {
      let div = document.createElement("div");
      document.body.appendChild(div);
      div.className = "Game-Over";
      div.innerHTML = "Game Over You Lost Try Again:(";
      document.querySelector(
        "main"
      ).style.cssText = `opacity: 0.5;pointer-events: none`;
      document.querySelector("#start-game").remove();
    }
    setTimeout(() => {
      FirstBlock.classList.remove("is-flipped");
      SecondBlock.classList.remove("is-flipped");
      document.getElementById("Fail").play();
    }, duration);
  }
}

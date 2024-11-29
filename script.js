document.addEventListener("DOMContentLoaded", () => {
  const gameBoard = document.getElementById("game-board");
  const startButton = document.querySelector("button");

  // قائمة الرموز التعبيرية للبطاقات
  const emojis = ["🍮", "🍇", "🥝", "🍌", "🍟", "🎂", "🍎", "🍫"];
  const cards = [...emojis, ...emojis]; // إنشاء نسختين من كل بطاقة
  let flippedCards = [];
  let matchedCards = [];

  // خلط البطاقات عشوائيًا
  function shuffle(array) {
    return array.sort(() => Math.random() - 0.5);
  }

  // إنشاء البطاقات في اللعبة
  function createBoard() {
    gameBoard.innerHTML = "";
    const shuffledCards = shuffle(cards);
    shuffledCards.forEach((emoji, index) => {
      const card = document.createElement("div");
      card.classList.add("card");
      card.dataset.emoji = emoji;

      const cardInner = document.createElement("div");
      cardInner.classList.add("card-inner");

      const cardFront = document.createElement("div");
      cardFront.classList.add("card-front");

      const cardBack = document.createElement("div");
      cardBack.classList.add("card-back");
      cardBack.textContent = emoji;

      cardInner.appendChild(cardFront);
      cardInner.appendChild(cardBack);
      card.appendChild(cardInner);
      gameBoard.appendChild(card);

      card.addEventListener("click", () => flipCard(card));
    });
  }

  // قلب البطاقات
  function flipCard(card) {
    if (
      flippedCards.length < 2 &&
      !flippedCards.includes(card) &&
      !matchedCards.includes(card)
    ) {
      card.classList.add("flipped");
      flippedCards.push(card);

      if (flippedCards.length === 2) {
        checkForMatch();
      }
    }
  }

  // التحقق من تطابق البطاقات
  function checkForMatch() {
    const [card1, card2] = flippedCards;
    if (card1.dataset.emoji === card2.dataset.emoji) {
      matchedCards.push(card1, card2);
      flippedCards = [];
      if (matchedCards.length === cards.length) {
        setTimeout(() => alert("You won!"), 500);
      }
    } else {
      setTimeout(() => {
        card1.classList.remove("flipped");
        card2.classList.remove("flipped");
        flippedCards = [];
      }, 1000);
    }
  }

  // إعادة بدء اللعبة
  startButton.addEventListener("click", () => {
    flippedCards = [];
    matchedCards = [];
    createBoard();
  });

  // إنشاء اللعبة عند بدء الصفحة
  createBoard();

  // إضافة وظيفة قلب البطاقة باستخدام toggle
  const allCards = document.querySelectorAll(".card");
  allCards.forEach(card => {
    card.addEventListener("click", () => {
      card.classList.toggle("flipped");
    });
  });
});

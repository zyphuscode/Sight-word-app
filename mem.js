const cardsContainer = document.getElementById("cards-container");
const prevBtn = document.getElementById("prev");
const nextBtn = document.getElementById("next");
const currentEl = document.getElementById("current");
const showBtn= document.getElementById("show");
const hideBtn = document.getElementById("hide");
const questionEl = document.getElementById("question");
const answerEl = document.getElementById("answer");
const addCardBtn = document.getElementById("add-card");
const clearBtn = document.getElementById("clear");
const addContainer = document.getElementById("add-container");

// Keep track of current card

let currentCard = 0;

//store dom card
const sightEl = [];



const wordData = getWordData();

// Create all cards
function createWordCards(){
  wordData.forEach((data, index) => createWordCard(data, index));
}

//single card
function createWordCard(data, index){
  const card = document.createElement("div");
  card.classList.add("card");

  if (index === 0){
    card.classList.add("active")
  }
  card.innerHTML = `
  <div class="inner-card">
      <div class="inner-card-front">
      <p></p>
      <br>
        <h1>
          ${data.question}
        </h1>
      </div>
     
    </div>
   </div>
 `;

 card.addEventListener("click", () => card.classList.toggle("show-answer"));

 // add to dom
 sightEl.push(card);

 cardsContainer.appendChild(card);

 addNumbersCards();
}

function addNumbersCards(){
  currentEl.innerText = `
  ${currentCard + 1}/${sightEl.length}
  
  `
}

//fetch words from storage
function getWordData(){
  const words = JSON.parse(localStorage.getItem('words'));
  return words === null ? [] : words;
}

//save words to local storage
function saveWords(words){
   localStorage.setItem("words", JSON.stringify(words));
   window.location.reload();
}


createWordCards();

//event listners

//next button
nextBtn.addEventListener("click", () => {
  sightEl[currentCard].className = "card left";

  currentCard = currentCard + 1;

  if(currentCard > sightEl.length - 1) {
    currentCard = sightEl.length -1;
  }

  sightEl[currentCard].className = "card active";

  addNumbersCards();
});

//previous button
prevBtn.addEventListener("click", () => {
  sightEl[currentCard].className = "card right";

  currentCard = currentCard - 1;

  if(currentCard < 0) {
    currentCard = 0;
  }

  sightEl[currentCard].className = "card active";

  addNumbersCards();
});

// show word cards
showBtn.addEventListener("click", () => addContainer.classList.add("show"));
hideBtn.addEventListener("click", () => addContainer.classList.remove("show"));

//add new words

addCardBtn.addEventListener("click", () => {
  const question = questionEl.value;
  //const answer = answerEl.value;
  console.log(question);

  if(question.trim()){
    const newWord = {question}
    
      createWordCard(newWord);

      questionEl.value = "";
      //answerEl.value = "";


      addContainer.classList.remove("show");
      wordData.push(newWord);

      saveWords(wordData);
  }
});

//clear cards
clearBtn.addEventListener("click", () => {
  localStorage.clear();

  cardsContainer.innerHTML = "";
  window.location.reload();
})

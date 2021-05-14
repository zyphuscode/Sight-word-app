
const main = document.querySelector('main');
const voicesSelect = document.getElementById('voices');
const textarea = document.getElementById('text');
const readBtn = document.getElementById('read');
const toggleBtn = document.getElementById('toggle');
const closeBtn = document.getElementById('close');
const data = [
  {
    image: './img/rain.jpeg',
    text: "the"
  },
  {
    image: './img/animals.jpeg',
    text: "of"
  },
  {
    image: './img/cute.jpeg',
    text: "and"
  },
  {
    image: './img/bus.jpeg',
    text: "a"
  },
  {
    image: './img/fam.jpeg',
    text: "to"
  },
  {
    image: './img/swim.jpeg',
    text: "in"
  },
  {
    image: './img/veggies.jpeg',
    text: "is"
  },
  {
    image: './img/uni.jpeg',
    text: "you"
  },
  {
    image: './img/space.jpeg',
    text: 'that'
  },
  {
    image: './img/carnival.jpeg',
    text: 'words'
  },

  {
    image: './img/cool.jpeg',
    text: 'said'
  },
  {
    image: './img/ballerina.jpeg',
    text: 'look'
  }
];

data.forEach(createBox);
//create sight box

function createBox(item) {
  const box = document.createElement('div');

  const{ image, text} = item;

  box.classList.add('box');

  box.innerHTML = `
  <img src="${image}" alt"=${text}" />
  <p class="info">${text}</p>`

  box.addEventListener("click", () => {
    setTextMessage(text);
    speakText();

    box.classList.add("active");
    setTimeout(() => box.classList.remove("active"), 800);

  });

  main.appendChild(box);
}

const message = new SpeechSynthesisUtterance();
let voices = [];

function getVoices() {
  voices = speechSynthesis.getVoices();

  voices.forEach(voice => {
    const option = document.createElement('option');
    option.value = voice.name;

    voicesSelect.appendChild(option);
  })
}

function setTextMessage(text) {
  message.text = text;
}

function speakText() {
  speechSynthesis.speak(message);
}

function setVoice(e) {
  message.voice = voices.find(voice => voice.name === e.target.value);
}

speechSynthesis.addEventListener("voiceschanged", getVoices);

toggleBtn.addEventListener("click", () => {
  document.getElementById("text-box").classList.toggle("show-speech")

});

closeBtn.addEventListener("click", () => {
  document.getElementById("text-box").classList.remove("show-speech")
});

voicesSelect.addEventListener("change", setVoice);

readBtn.addEventListener("click", () => {
  setTextMessage(textarea.value);
  speakText();
});








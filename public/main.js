const socket = io("/"),
  messageForm = document.querySelector(".js-messageForm"),
  messageList = document.querySelector(".js-messageList"),
  messageInput = messageForm.querySelector(".js-input"),
  nicknameForm = document.querySelector(".js-nickNameForm"),
  nicknameInput = nicknameForm.querySelector(".js-input");

const YOURS_CLASS = "yours";
const MINE_CLASS = "mine";
const NICKNAME = "nickname";

let nickName = localStorage.getItem(NICKNAME);

const loadMessages = () => {
  fetch("/previous")
    .then(response => response.json())
    .then(messages => {
      messages.forEach(message => {
        addMessage(
          message.text,
          message.creator === nickName ? MINE_CLASS : YOURS_CLASS
        );
      });
    });
};

if (nickName) {
  loadMessages();
  messageForm.style.display = "block";
} else {
  nicknameForm.style.display = "block";
}

const addMessage = (data, cssClass) => {
  const newMessage = document.createElement("li");
  newMessage.innerHTML = data;
  newMessage.classList.add(cssClass);
  messageList.appendChild(newMessage);
};

socket.on("new message sent", data => {
  const {
    message: { text }
  } = data;
  addMessage(text, YOURS_CLASS);
});

const submitMessage = event => {
  event.preventDefault();
  const inputValue = messageInput.value;
  socket.emit("new message", { text: inputValue, creator: nickName });
  addMessage(inputValue, MINE_CLASS);
  messageInput.value = "";
};

const setNickName = event => {
  event.preventDefault();
  const inputValue = nicknameInput.value;
  localStorage.setItem(NICKNAME, inputValue);
  nickName = inputValue;
  messageForm.style.display = "block";
  nicknameForm.style.display = "none";
  loadMessages();
};

messageForm.addEventListener("submit", submitMessage);
nicknameForm.addEventListener("submit", setNickName);

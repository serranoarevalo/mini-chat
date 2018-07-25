const socket = io("/"),
  form = document.querySelector(".js-form"),
  messageList = document.querySelector(".js-messageList"),
  input = document.querySelector(".js-input");

const YOURS_CLASS = "yours";
const MINE_CLASS = "mine";

const addMessage = (data, cssClass) => {
  const newMessage = document.createElement("li");
  newMessage.innerHTML = data;
  newMessage.classList.add(cssClass);
  messageList.appendChild(newMessage);
};

socket.on("new message sent", data => {
  const { message } = data;
  addMessage(message, YOURS_CLASS);
});

const submitMessage = event => {
  event.preventDefault();
  const inputValue = input.value;
  socket.emit("new message", inputValue);
  addMessage(inputValue, MINE_CLASS);
  input.value = "";
};

form.addEventListener("submit", submitMessage);

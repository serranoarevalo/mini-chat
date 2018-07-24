const socket = io("http://localhost:4000"),
  form = document.querySelector(".js-form"),
  input = document.querySelector(".js-input");

const submitMessage = event => {
  event.preventDefault();
  const inputValue = input.value;
  socket.emit("new message", inputValue);
};

form.addEventListener("submit", submitMessage);

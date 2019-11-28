document.addEventListener("DOMContentLoaded", run);

const db = firebase.firestore();
//{text: "Bog off", user_name: "Joe"}

function handleSend(e) {
  let userName, message;

  userName = document.querySelector("#username").value;
  message = document.querySelector("#message").value;

  if (!userName || !message) {
    return;
  }

  db.collection("messages")
    .add({
      user_name: userName,
      text: message
    })
    .then(() => {
      getChatList();
    });
}

function getChatList() {
  var docRef = db
    .collection("messages")
    .get()
    .then(r => {
      let list = [];
      r.forEach(m => {
        list.push(m.data());
      });
      document.querySelector(".chat").innerHTML = render(list);
    });
}

function run() {
  getChatList();
  document.querySelector("#submit").addEventListener("click", handleSend);
}

function render(list) {
  let output = list
    .map(m => `<p><strong> ${m.user_name}: </strong>  ${m.text}</p>`)
    .join("");
  return output;
}

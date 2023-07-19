const chatInput = document.querySelector(".chat-input textarea");
const sendChatBtn = document.querySelector(".chat-input span");
const chatbox = document.querySelector(".chatbox");

let userMessage;

const createChatLi = (message, className) => {

    //creating a <li> element with the entered message and class name
    const chatLi = document.createElement("li");
    chatLi.classList.add("chat", className);

    let chatContent = className === "outgoing" ? `<p>${message}</p>` :  `<span class="material-symbols-outlined">smart_toy</span><p>${message}</p>`;
    chatLi.innerHTML = chatContent;
    return chatLi;
}

const handleChat = () =>{
    userMessage = chatInput.value.trim();
    
    if(!userMessage) return;

    //add the message user types to the chatbox as an outgoing message
    chatbox.appendChild(createChatLi(userMessage, "outgoing"));

    //display thinking... as an message while the AI responds
    setTimeout(() =>{
        chatbox.appendChild(createChatLi("Thinking...", "incoming"));
    }, 600);
}

sendChatBtn.addEventListener("click", handleChat);
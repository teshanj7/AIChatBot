const chatInput = document.querySelector(".chat-input textarea");
const sendChatBtn = document.querySelector(".chat-input span");
const chatbox = document.querySelector(".chatbox");
const chatbotToggler = document.querySelector(".chatbot-toggler");
const chatbotCloseBtn = document.querySelector(".close-btn");

let userMessage;
const API_KEY = ""; // insert API KEY here 

const createChatLi = (message, className) => {

    //creating a <li> element with the entered message and class name
    const chatLi = document.createElement("li");
    chatLi.classList.add("chat", className);

    let chatContent = className === "outgoing" ? `<p></p>` :  `<span class="material-symbols-outlined">smart_toy</span><p></p>`;
    chatLi.innerHTML = chatContent;
    chatLi.querySelector("p").textContent = message; // now you can apply html tags without facing issues
    return chatLi;
}

const generateResponse = (incomingChatLi) =>{
    const API_URL = "https://api.openai.com/v1/chat/completions";
    const messageElement = incomingChatLi.querySelector("p");

    // const requestOptions = {
    //     method: "POST",
    //     headers : {
    //         "Content-Type": "application/json",
    //         "Authorization": `Bearer ${API_KEY}`
    //     },
    //     body: JSON.stringify({
    //         "model": "gpt-3.5-turbo",
    //         "messages": [{"role": "user", "content": userMessage}]
    //     })
    // }

    const requestOptions = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${API_KEY}`
        },
        body: JSON.stringify({
            model: "gpt-3.5-turbo",
            messages: [{role: "user", content: userMessage}],
        })
    }

    //sending POST req to API to get response
    fetch(API_URL, requestOptions).then(res => res.json()).then(data => {
        messageElement.textContent = data.choices[0].message.content;
    }).catch((error) => {
        messageElement.classList.add("error");
        messageElement.textContent = "Oops! I am currently undergoing some issues. Please try again later :(";

    }).finally(() => chatbox.scrollTo(0, chatbox.scrollHeight));
}

const handleChat = () =>{
    userMessage = chatInput.value.trim();
    
    if(!userMessage) return;
    chatInput.value = ""; // to refresh the message input space

    //add the message user types to the chatbox as an outgoing message
    chatbox.appendChild(createChatLi(userMessage, "outgoing"));
    chatbox.scrollTo(0, chatbox.scrollHeight); // scroll auto matically when the chat goes

    //display thinking... as an message while the AI responds
    setTimeout(() =>{
        const incomingChatLi = createChatLi("Thinking...", "incoming")
        chatbox.appendChild(incomingChatLi);
        chatbox.scrollTo(0, chatbox.scrollHeight);
        generateResponse(incomingChatLi);
    }, 600);
}


chatbotCloseBtn.addEventListener("click", () => document.body.classList.remove("show-chatbot"));
chatbotToggler.addEventListener("click", () => document.body.classList.toggle("show-chatbot"));

sendChatBtn.addEventListener("click", handleChat);

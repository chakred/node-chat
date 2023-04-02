const socket = io();
const ENTER = 'Enter';
const NONAME = 'anonimous';
const messages = document.getElementById('messages');
const input = document.getElementById('messageArea');
const inputUserName = document.getElementById('userName');
const allGenders = document.querySelectorAll('input[name="gender"]')
const genderImages = {
  male: 'https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava3-bg.webp',
  female: 'https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava4-bg.webp'
};
let inputGender = document.querySelector('input[name="gender"]:checked').value;
const uniqueId = Math.random();

/**
 * Handle gender radio button
 * @param {*} gender
 */
function handleClick(gender) {
  inputGender = gender.value;
}

/**
 * Handle keypress - ENTER
 */
input.addEventListener("keypress", (event) => {
    // If the user presses the "Enter" key on the keyboard
    if (event.key === ENTER && input.value) {

        // Cancel the default action, if needed
        event.preventDefault();

        // Trigger the button element with a click
        let date = new Date();

        // Disable fileds with username and gender
        inputUserName.disabled = true;
        allGenders.forEach(gender => gender.disabled = true);

        // Emit socket to backend and clear message input
        socket.emit('chat message', {
          userName:  inputUserName.value || NONAME,
          userGender: inputGender,
          dateTime:  date.toLocaleString(),
          message:   input.value,
          uniqueId:  uniqueId
        });
        input.value = '';
    }
});

/**
 * Get socket from backend and build markup
 */
socket.on('chat message', (data) => {
  let messageForeign = '<div class="d-flex justify-content-between">'
                 + '<p class="mb-1 small-date">'
                 + data.dateTime
                 + '</p>'
                 + '<p class="small mb-1">'
                 + data.userName
                 + '</p>'
                 + '</div>'
                 + '<div class="d-flex flex-row justify-content-end mb-4 pt-1">'
                 + '<div>'
                 + '<p class="small p-2 me-3 mb-3 rounded-3 foreign-message">'
                 + data.message
                 + '</p>'
                 + '</div>'
                 + '<img src="'
                 + genderImages[data.userGender]
                 + '" alt="avatar 1" style="width: 45px; height: 100%;">'
                 + '</div>';

  let messageOwn = '<div class="d-flex justify-content-between">'
                + '<p class="small mb-1">'
                + data.userName
                + '</p>'
                + '<p class="mb-1 small-date">'
                + data.dateTime
                + '</p>'
                + '</div>'
                + '<div class="d-flex flex-row justify-content-start">'
                + '<img src="'
                + genderImages[inputGender]
                + '" alt="avatar 1" style="width: 45px; height: 100%;">'                   
                + '<div>'
                + '<p class="small p-2 ms-3 mb-3 rounded-3" style="background-color: #f5f6f7;">'
                + data.message
                + '</p>'
                + '</div>'
                + '</div>';

    /**
     * Check if user is owner of massage ot foreigner
     */
    
    messageBlock = data.uniqueId === uniqueId ? messageOwn : messageForeign;

    /**
     * Pass markup to template
     */
    let htmlObject = document.createElement('div');
    htmlObject.classList.add("mb-3");
    htmlObject.innerHTML = messageBlock;
    messages.appendChild(htmlObject);
});
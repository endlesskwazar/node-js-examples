const apiUrl = 'http://localhost:8080/api/';
const logInContainer = document.getElementById('logIn');
const messagesContainer = document.getElementById('messages');

/*
Helpers functions over fetch
*/

const postCall = (url, data) => {
    return fetch(url, {
        method: 'POST',
        headers: new Headers({
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}`
        }),
        body: JSON.stringify(data)
    });
}

const getCall = (url) => {
    return fetch(url, {
        headers: new Headers({
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}`
        })
    });
}

/*
Application code
*/

const prepare = () => {
    logInContainer.style.display = 'none';
    messagesContainer.style.display = 'none';
    document.getElementById('logInForm').onsubmit = logIn;
    document.getElementById('logOut').onclick = logOut;
    document.getElementById('add-message-form').onsubmit = addMessage;
}

const appendNewMessage = (msg) => {
    const messageBody = document.getElementById('message-body');
    messageBody.insertAdjacentHTML('afterbegin', `<div class="card mb-2 mt-2">
    <div class="card-body">
      <blockquote class="blockquote mb-0">
        <p>${msg.body}</p>
        <footer class="blockquote-footer"><cite title="Source Title">${msg.User.email}</cite><cite title="Source Title"> ${msg.createdAt}</cite></footer>
      </blockquote>
    </div>
  </div>`);
}

const loadMessages = () => {
    getCall(`${apiUrl}messages`)
    .then(res => {
        if(res.status == '200') {
            return res.json();
        }
    })
    .then(data => {
        data.forEach(item => {
            appendNewMessage(item);
        });
    })
    .catch(err => {
        alert(err);
    });
}

const addMessage = (e) => {
    e.preventDefault();
    const body = e.target[0].value;
    
    postCall(`${apiUrl}messages`, {body})
    .then(res => {
        if (res.status == '201') {
            return res.json();
        }
    })
    .then(data => {
        appendNewMessage(data);
    })
    .catch(err => {
        alert(err);
    });
}

const checkIfLoggedAndHideShowContainers = () => {
    if (!localStorage.getItem('token')) {
        document.getElementById('logIn').style.display = 'block';
        document.getElementById('messages').style.display = 'none';
    }
    else {
        document.getElementById('logIn').style.display = 'none';
        document.getElementById('messages').style.display = 'block';
        // user logged load messages
        loadMessages();
    }
}

const logIn = (e) => {
    e.preventDefault();
    const email = e.target[0].value;
    const password = e.target[1].value;

    postCall(`${apiUrl}login`, {email, password})
    .then(res => {
        if (res.status == '200') {
            return res.json();
        }
    })
    .then(data => {
        localStorage.setItem('token', data.token);
        localStorage.setItem('userId', data.userId);
        checkIfLoggedAndHideShowContainers();
    })
    .catch(err => {
        alert(err);
    });
}

const logOut = (e) => {
    e.preventDefault();
    localStorage.removeItem('token');
    checkIfLoggedAndHideShowContainers();
}

const ready = () => {
    prepare();
    checkIfLoggedAndHideShowContainers();

    const socket = io();

    socket.on('new message', function(msg){
        if (msg.sender != localStorage.getItem('userId')) {
            appendNewMessage(msg.msg);
        }
    });
}

window.onload = ready;
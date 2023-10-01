function searchRequestInfo() {
    const mentorId = document.getElementById('userIdInput').value;

    const requestData = {
        userId: mentorId
    };
      
    fetch(`/request-mentor/notification`, {
        method: 'POST',  // Use POST method to send data in the request body
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(requestData)  // Convert data to JSON string for the request body
    })
    .then(response => response.json())
    .then(data => displayUserInfo(data, mentorId));
}

function displayUserInfo(data, mentorId) {
    const userList = document.getElementById('userList');
    userList.innerHTML = '';

    if (data.length === 0) {
        userList.innerHTML = '<li class="list-group-item">You have no request</li>';
        return;
    }

    data.forEach(user => {
        const listItem = document.createElement('li');
        listItem.classList.add('list-group-item', 'userListItem');

        const userDetails = document.createElement('div');
        userDetails.classList.add('userDetails');
        userDetails.innerHTML = `
          <strong>User ID:</strong> ${user._id}<br>
          <strong>Name:</strong> ${user.name}<br>
          <strong>Point:</strong> ${user.point}
        `;
            
        const buttonDiv = document.createElement('div');
        buttonDiv.classList.add('buttonDiv');

        const buttonAccept = document.createElement('button');
        buttonAccept.classList.add('btn', 'btn-secondary');
        buttonAccept.setAttribute('data-userid', `${user._id}-accept`);
        buttonAccept.innerText = "Accept";
        buttonAccept.addEventListener('click', () => AcceptRequest(user._id, mentorId));
        
        const buttonDeny = document.createElement('button');
        buttonDeny.classList.add('btn', 'btn-secondary');
        buttonDeny.setAttribute('data-userid', `${user._id}-deny`);
        buttonDeny.innerText = "Deny";
        buttonDeny.addEventListener('click', () => DenyRequest(user._id, mentorId));
        
        buttonDiv.appendChild(buttonAccept);
        buttonDiv.appendChild(buttonDeny);
        listItem.appendChild(userDetails);
        listItem.appendChild(buttonDiv);
        userList.appendChild(listItem);
    });
}

async function DenyRequest(userId, mentorId) {
    const button = document.querySelector(`button[data-userid="${userId}-deny"]`);
    if (button) {
        try {
            const response = await denyRequest(mentorId, userId);
        } catch (error) {
            console.error('Error sending request:', error);
        }
    }
}

async function denyRequest(mentorId, userId) {
    const requestData = {
        mentorId: mentorId,
        userId: userId
    };

    const response = await fetch('/request-mentor/deny', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(requestData)
    });

    if (!response.ok) {
        throw new Error('Network response was not ok');
    }

    return response.json();
}

async function AcceptRequest(userId, mentorId) {
    const button = document.querySelector(`button[data-userid="${userId}-accept"]`);
    if (button) {
        try {
            const response = await acceptRequest(mentorId, userId);
        } catch (error) {
            console.error('Error sending request:', error);
        }
    }
}

async function acceptRequest(mentorId, userId) {
    const requestData = {
        mentorId: mentorId,
        userId: userId
    };

    const response = await fetch('/request-mentor/accept', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(requestData)
    });

    if (!response.ok) {
        throw new Error('Network response was not ok');
    }

    return response.json();
}
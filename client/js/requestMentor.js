function searchMentorInfo() {
    const userId = document.getElementById('userIdInput').value;

    const requestData = {
        userId: userId
    };
      
    fetch(`/request-mentor/search`, {
        method: 'POST',  // Use POST method to send data in the request body
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(requestData)  // Convert data to JSON string for the request body
    })
    .then(response => response.json())
    .then(data => displayUserInfo(data, userId));
}

function displayUserInfo(data, userId) {
    const userList = document.getElementById('userList');
    userList.innerHTML = '';

    if (data.length === 0) {
        userList.innerHTML = '<li class="list-group-item">No information found for this user ID.</li>';
        return;
    }

    data.forEach(user => {
        const listItem = document.createElement('li');
        listItem.classList.add('list-group-item', 'userListItem');

        const userDetails = document.createElement('div');
        userDetails.classList.add('userDetails');
        userDetails.innerHTML = `
          <strong>Mentor ID:</strong> ${user.mentor._id}<br>
          <strong>Name:</strong> ${user.mentor.name}<br>
          <strong>Point:</strong> ${user.mentor.point}
        `;
            
        const buttonDiv = document.createElement('div');
        buttonDiv.classList.add('buttonDiv');
        const button = document.createElement('button');
        button.classList.add('btn', 'btn-secondary');
        button.setAttribute('data-userid', user.mentor._id);
        
        button.innerText = user.status;
        button.addEventListener('click', () => RequestMentorId(user.mentor._id, userId));
        
        buttonDiv.appendChild(button);
        listItem.appendChild(userDetails);
        listItem.appendChild(buttonDiv);
        userList.appendChild(listItem);
    });
}

async function RequestMentorId(mentorId, userId) {
    const button = document.querySelector(`button[data-userid="${mentorId}"]`);
    if (button) {
        if (button.innerText === 'Pending') {
            button.innerText = 'Request';
        } else {
            button.innerText = 'Pending';
            try {
                const response = await requestMentor(mentorId, userId);
                console.log('Request sent successfully:', response);
                // Handle the response as needed
            } catch (error) {
                console.error('Error sending request:', error);
            }
        }
    }
}

async function requestMentor(mentorId, userId) {
    const requestData = {
        mentorId: mentorId,
        userId: userId
    };

    const response = await fetch('/request-mentor/request', {
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
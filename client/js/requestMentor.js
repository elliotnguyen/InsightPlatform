function searchMentorInfo() {
    const userId = document.getElementById('userIdInput').value;

    fetch(`/request-mentor/search`)
        .then(response => response.json())
        .then(data => displayUserInfo(data, userId));

    displayUserInfo(data);
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
          <strong>Mentor ID:</strong> ${user._id}<br>
          <strong>Name:</strong> ${user.name}<br>
          <strong>Point:</strong> ${user.point}
        `;
            
        const buttonDiv = document.createElement('div');
        buttonDiv.classList.add('buttonDiv');
        const button = document.createElement('button');
        button.classList.add('btn', 'btn-secondary');
        button.innerText = 'Request';
        button.addEventListener('click', () => RequestMentorId(user.userId));
        
        buttonDiv.appendChild(button);
        listItem.appendChild(userDetails);
        listItem.appendChild(buttonDiv);
        userList.appendChild(listItem);
    });
}

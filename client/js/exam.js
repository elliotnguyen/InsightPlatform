let Questions = []
let maxQuestion = 5
let shuffledQuestions = [] 
let allAnswer = [] // Store all answer's index
let indexNumber = 0
let courseId = ""
let difficulty = 0
function handleQuestions() { 
    while (shuffledQuestions.length < maxQuestion) {
        const random = Questions[Math.floor(Math.random() * Questions.length)]
        if (!shuffledQuestions.includes(random)) {
            shuffledQuestions.push(random)
            allAnswer.push(-1)
        }
    }
}

//GetAndDisplay
function GetQuestion(index) {
    handleQuestions()
    const currentQuestion = shuffledQuestions[index]
    document.getElementById("question-number").innerHTML = indexNumber + 1
    document.getElementById("question-number-max").innerHTML = maxQuestion
    document.getElementById("display-question").innerHTML = currentQuestion.question;
    document.getElementById("option-one-label").innerHTML = currentQuestion.options[0];
    document.getElementById("option-two-label").innerHTML = currentQuestion.options[1];
    document.getElementById("option-three-label").innerHTML = currentQuestion.options[2];
    document.getElementById("option-four-label").innerHTML = currentQuestion.options[3];
}

function checkForAnswer() {
    const currentQuestion = shuffledQuestions[indexNumber] //gets current Question 

    const options = document.getElementsByName("option");
    options.forEach((option) => {
        if (option.checked == true) {
            allAnswer[indexNumber] = option.value
        }
    })
}

function handleNextQuestion() {
    checkForAnswer()
    indexNumber++
    unCheckRadioButtons()
    setTimeout(() => {
        if (indexNumber == maxQuestion - 1) {
            document.getElementById("next-submit-button").innerHTML = "Submit";
        }
        else {
            document.getElementById("next-submit-button").innerHTML = "Next";
        }
        if (indexNumber < maxQuestion ) {
            GetQuestion(indexNumber)
        }
        else {
            indexNumber = maxQuestion - 1
            handleEndGame()
        }
        resetOptionBackground()
    }, 100);
}

function handlePrevQuestion() {
    checkForAnswer() 
    indexNumber--
    unCheckRadioButtons()
    
    setTimeout(() => {
        if (indexNumber < 0) {
            indexNumber = 0
        }
        GetQuestion(indexNumber)
        unCheckRadioButtons()
        resetOptionBackground()
    }, 100);
}

function resetOptionBackground() {
    const options = document.getElementsByName("option");
    options.forEach((option) => {
        document.getElementById(option.labels[0].id).style.backgroundColor = ""
    })
}

function unCheckRadioButtons() {
    const options = document.getElementsByName("option");
    for (let i = 0; i < options.length; i++) {
        options[i].checked = false;
        if (options[i].value == allAnswer[indexNumber]) {
            options[i].checked = true;
        }
    }
}

async function verifyAnswers(shuffledQuestions,allAnswer) {
    let correct = 0
    for (let i = 0; i < shuffledQuestions.length; i++) {
        let apiPath = `http://localhost:3001/api/question/verifyanswer/?id=${shuffledQuestions[i]._id}&answer=${allAnswer[i]}`
        let response = await fetch(apiPath, {
            method: 'GET',
        });
        const resJson = await response.json();
        if (resJson.verification)
            correct++
    }
    return correct
}

function handleEndGame() {
    
    document.getElementById('grade-exam').style.display = "none"
    document.getElementById('score-modal').style.display = "flex"
}

async function closeScoreModal() {
    if (document.getElementById('grade-exam').style.display == "none") {
        let playerScore = await verifyAnswers(shuffledQuestions,allAnswer)
        let remark = null
        let remarkColor = null
        const playerGrade = (playerScore / maxQuestion) * 100

        if (playerGrade >= 80) {
            remark = "Excellent, Keep the good work going."
            remarkColor = "green"
        }
        else if (playerGrade >= 50) {
            remark = "Average Grades, You can do better."
            remarkColor = "orange"
        }
        else {
            remark = "Bad Grades, Keep Practicing."
            remarkColor = "red"
        }
        document.getElementById('remarks').innerHTML = remark
        document.getElementById('remarks').style.color = remarkColor
        document.getElementById('grade-percentage').innerHTML = playerGrade
        document.getElementById('attemps').innerHTML = maxQuestion
        document.getElementById('right-answers').innerHTML = playerScore
        document.getElementById('grade-exam').style.display = "flex"
        document.getElementById('modal-button-end').innerHTML = "Done"
    }
    else {
        document.getElementById('score-modal').style.display = "none"
        window.location.reload(true);
    }
    
}

async function closeStartModal() {
    document.getElementById('start-modal').style.display = "none"
    courseId = document.getElementById('course-id').value
    difficulty = 1
    let response = await fetch(`http://localhost:3001/api/question/getquestions/?courseId=${courseId}&difficulty=${difficulty}`, {
        method: 'GET',
    });
    const resJson = await response.json();
    Questions = resJson.questions
    GetQuestion(indexNumber)
}

function closeOptionModal() {
    document.getElementById('option-modal').style.display = "none"
}
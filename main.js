let playerName="";
let level="";
let number1 =0;
let number2 =0;
let exp ='';
operators = ['+','-','*','/','%'];
question = `${number1} ${exp} ${number2} = ?`;
let time =0;
let counter = null;
let requestAnswer;
let correctAnswer =0;
let resultSheet =[];
let correctAnswers =0;
let wrongAnswers =0;
let questionNumber =0;
let answerState = false ;


//start login form js

letGetStarted=()=>{
    let playerNameElement=
        document.getElementById('playerName');
    let levelElement=
        document.getElementById('level');
    setBorderColor(playerNameElement)
    let tempPlayerName=
        playerNameElement.value;
    console.log(tempPlayerName)
    if(tempPlayerName.trim()===''){ //trim rid space _abc_ => after trim()==> abc
            playerNameElement.style.borderColor='red';
            alert('Please insert name and select level to continue!');
           return;
    }

    playerName = playerNameElement.value;
    level = levelElement.value;

    //redirect to gaming console
    let playerData={name:playerName,level:level};
    localStorage.setItem("playerData",JSON.stringify(playerData));
    console.log(localStorage.getItem("playerData"))
    window.location.href="game.html";

}
setBorderColor=(element)=>{
    element.style.borderColor='';

}
//end login form js

//Start game console js
setPlayerData=()=>{
    let storageData =JSON.parse(localStorage.getItem('playerData'))
    playerName = storageData.name;
    level = storageData.level;

    document.getElementById('Player-name').innerHTML=playerName;
    document.getElementById('Player-level').innerHTML=level;

}


startGame=()=>{
    generateQuestion();
}

generateQuestion=()=>{
    questionNumber++;
    document.getElementById("questionNumber").innerHTML = questionNumber;
    clearTime();
    let selectMax = checkLevel();
    number1 = generateNumber(1,selectMax);
    number2  = generateNumber(1,selectMax);
    exp =operators[generateNumber(0,5)];
    for (const sElement of question = `${number1} ${exp} ${number2} = ?`) {
        
    };
    document.getElementById('question').innerHTML = question;
    executeTime();


}
generateNumber=(min,max)=>{

    return Math.floor(Math.random()*(max-min)+min); // specific range ==> example 1- 101
}

checkLevel=()=>{
    let levelNumber = 0;
    switch (level){
        case "Beginner" : levelNumber = 51; break;
        case "Middle" : levelNumber = 101; break;
        case "Advance" : levelNumber = 1001; break;
    }
    return levelNumber;
}

executeTime=()=>{
     counter = setInterval(()=>{
          time++;
          document.getElementsByClassName('counter-time')[0].innerHTML=time;

          if(time===60){
              clearTime();
              alert('failed');
          }
      },1000)
}
clearTime=()=>{
    time=0;
    clearInterval(counter)
}

submitAnswer=()=>{
    requestAnswer = document.getElementById('requestAnswer').value;
    if(isNaN(requestAnswer) || number1===0 || requestAnswer===''){
        alert('please insert a number or start the game');
        return;
    }
    console.log(requestAnswer);

    findAnswer();

    //check the answer correct or not
    if (correctAnswer===Number(requestAnswer)){
        answerState= true;
         correctAnswers++;
        console.log("correctAnswers"+correctAnswers);
            document.getElementById('congrats').innerHTML = 'Congratulation';
            document.getElementById('congrats').style.color = 'blue';
            document.getElementById('correctAnswer').innerHTML = correctAnswers ;
    }else {
        wrongAnswers++;
        answerState= false;
        console.log("wrongAnswers"+wrongAnswers);
        document.getElementById('congrats').innerHTML = `Ooops...(A : ${correctAnswer})`;
        document.getElementById('congrats').style.color = 'red';
        document.getElementById('wrongAnswer').innerHTML= wrongAnswers++;

    }


    document.getElementById('question').innerHTML = 'Processing..';

    setTimeout(()=>{
        greeting();

    },3000);
}

findAnswer=()=>{
    switch (exp){
        case "+" : correctAnswer = number1+number2 ; break ;
        case "-" : correctAnswer = number1-number2 ; break ;
        case "/" : correctAnswer = number1/number2 ; break ;
        case "*" : correctAnswer = number1*number2 ; break ;
        case "%" : correctAnswer = number1%number2 ; break ;
    }
    return correctAnswer;
}

greeting=()=>{
    let result = {
        question_id :questionNumber,
        question : question,
        request_answer : requestAnswer,
        answer: correctAnswer,
        state :answerState,
        time :time

    };
    resultSheet.push(result);
    document.getElementById("congrats").innerHTML = "";
    document.getElementById("requestAnswer").value = " ";
    if(questionNumber !==10){
        generateQuestion();
    }else {
        console.log('Done')
        localStorage.setItem('result',JSON.stringify(resultSheet));
        window.location.href="result.html";
        //reset old data

    }
}

setResult=()=>{
    const data = JSON.parse(localStorage.getItem('result'));
    for(const  tempDataset of data){
        const element= document.getElementsByTagName('tbody')[0];
        const newRow = `<tr> 
        <td> ${tempDataset.question_id} </td> 
        <td> ${tempDataset.question} </td> 
        <td> ${tempDataset.request_answer} </td> 
        <td> ${tempDataset.answer} </td> 
        <td> ${tempDataset.state?'😍':'😢'} </td> 
        <td> ${tempDataset.time} </td> 
        </tr>`;
        element.innerHTML+=newRow;
    }
}


//End game console js
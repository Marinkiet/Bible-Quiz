//get elements
const start_btn = document.querySelector('.start_btn button');
const info_box = document.querySelector('.info_box');
const exit_btn = info_box.querySelector('.buttons .quit');
const continue_btn = info_box.querySelector('.buttons .restart');
const quiz_box = document.querySelector('.quiz_box');
const option_list= document.querySelector(".option_list");
const timeCount = quiz_box.querySelector(".timer .timer_sec");
const timeLine = quiz_box.querySelector("header .time_line");
const timeOff = quiz_box.querySelector("header .time_text");

                                                
start_btn.onclick =() =>{                       //if the Start btn clicked then...          
    info_box.classList.add("activeInfo");       //show the info box with rules  
}

                                                
exit_btn.onclick=()=>{                          //if exit btn is clicked then...
    info_box.classList.remove("activeInfo");    //return to the start btn
}

                                                
continue_btn.onclick=()=>{                      //if continue btn is clicked then...
    info_box.classList.remove("activeInfo");    //hide the start quiz btn
    quiz_box.classList.add("activeQuiz");       //hide the rules info box
    showQuestions(0);   
    queCounter(1);
    startTimer(15);                //defualt page displayed
    startTimerLine(0);
}

let que_count = 0;                 //keep count of index
let que_num = 1;
let counter ;
let counterLine;
let timeValue = 15;
let widthValue = 0;
let userScore = 0;

                                                
const next_btn = quiz_box.querySelector(".next_btn");               //get next button element
const result_box = document.querySelector(".results_box");          //get results_box div element
const restart_quiz = result_box.querySelector(".buttons .restart"); //get restart_quize  button element
const quit_quiz = result_box.querySelector(".buttons .quit");       //get quit_quiz button element

quit_quiz.onclick =()=>{
    window.location.reload();           //reload page which automatically refreshes site
}

restart_quiz.onclick = () =>{                            //on click of restart quiz

    result_box.classList.remove("activeResult");         //remove last card with results
    quiz_box.classList.add("activeQuiz");                //show the quiz cards
    let que_count = 0;                                   //reset que_count
    let que_num = 1;                                     //reset the que_num
    let timeValue = 15;                                  //start all time at 15sec
    let widthValue = 0;                                  //start the counter line at 0
    let userScore = 0;                                   //reset the user score back to 0

    showQuestions(que_count);                            //call all methods that apply to quiz pages and restulta page
    queCounter(que_num); 
    clearInterval(counter);
    startTimer(timeValue);            
    clearInterval(counterLine);
    startTimerLine(widthValue);  
    next_btn.style.display = "none";
    timeOff.textContent = "Time Left";

}
                                                
next_btn.onclick=()=>{                          //if next btn is clicked then...
    if(que_count < questiondb.length - 1){      //check if index < length(last object) objects in the quesion db
        que_count++;
        que_num++;                            
        showQuestions(que_count);  
        queCounter(que_num); 
        clearInterval(counter);
        startTimer(timeValue);            
        clearInterval(counterLine);
        startTimerLine(widthValue);  
        next_btn.style.display = "none";
        timeOff.textContent = "Time Left";

       
    }else{                                          
        //alert('end of questions')               //end of objects array
        clearInterval(counter);
        clearInterval(counterLine);
        showResultBox();
    }
}

                                                //fetch questions from the array
function showQuestions(index){
    const que_text= document.querySelector(".que_text");
    let que_tag = '<span>'+questiondb[index].numb+'. '+questiondb[index].question +'</span>';

    let option_tag = '<div class="option">'+questiondb[index].options[0]+'<span></span></div>'+
                     '<div class="option">'+questiondb[index].options[1]+'<span></span></div>'+
                     '<div class="option">'+questiondb[index].options[2]+'<span></span></div>'+
                     '<div class="option">'+questiondb[index].options[3]+'<span></span></div>';
    que_text.innerHTML = que_tag;
    option_list.innerHTML = option_tag;

    const option = option_list.querySelectorAll(".option");

    for(let i = 0 ; i < option.length;i++){
        option[i].setAttribute("onclick","optionSelected(this)");
    }
}
let tickIcon = '<div class="icon tick"><i class="fas fa-check"></i></div>';
let crossIcon = '<div class="icon cross"><i class="fas fa-times"></i></div>';


function optionSelected(answer){
    clearInterval(counter);
    clearInterval(counterLine);
    let userAns = answer.textContent;
    let correctAns = questiondb[que_count].answer;
    let allOptions = option_list.children.length;

    if(userAns ===correctAns){
       // console.log('ANSWER CORRECT');
        userScore+=1;
        //alert(userScore);
        answer.classList.add('correct');
        answer.insertAdjacentHTML("beforeend",tickIcon);
    }else{
       // console.log(':(');
        answer.classList.add('incorrect');
        answer.insertAdjacentHTML("beforeend",crossIcon);

                                                                                     //if incorrect answ selected automartically select the correct ans
        for(let i =0;i<allOptions;i++){
            if(option_list.children[i].textContent==correctAns){
                option_list.children[i].setAttribute("class","option correct");
                option_list.children[i].insertAdjacentHTML("beforeend",tickIcon);

            }
        }
    }
                                                                                     //once user selects an answer disable all option
    for(let i = 0 ; i < allOptions;i++){
        option_list.children[i].classList.add("disabled");
    }
    next_btn.style.display = "block";
    //console.log(userAns);
    //console.log(correctAns);

}
function queCounter(index){
    const button_que_counter = quiz_box.querySelector('.total_que');
    let totalQueCounting = ' <span><p>'+que_num+'</p><p>of<p>'+ questiondb.length+'</p> Questions</span>';
    button_que_counter.innerHTML = totalQueCounting;
}

function showResultBox(){
    info_box.classList.remove("activeInfo");                                                                //hide the info box
    quiz_box.classList.remove("activeQuiz");                                                                //hide the quiz box
    result_box.classList.add("activeResult");                                                               //show the result box
    const scoreText = result_box.querySelector(".score_text");

    if(userScore >= 3){
        let scoreTag ='<span>Yay! You got <p>'+userScore+'</p>out of<p>'+questiondb.length+'</p></span>';
        scoreText.innerHTML =scoreTag;
    }else{
        scoreTag = '<span>Sorry, You got only<p>'+userScore+'</p>out of<p>'+questiondb.length+'</p></span>';
        scoreText.innerHTML =scoreTag;
    }
}

function startTimer(time){
    counter=setInterval(timer,1000);
    function timer(){
        timeCount.textContent = time;
        time--;
        if(time < 9){
            let addZero = timeCount.textContent;
            timeCount.textContent = "0" + addZero;
        }
        if(time < 0){
            clearInterval(counter);
            timeCount.textContent="00";
            timeOff.textContent = "Time out :("

            let correctAns = questiondb[que_count].answer;
            let allOptions = option_list.children.length;

            for(let i =0;i<allOptions;i++){
                if(option_list.children[i].textContent==correctAns){
                    option_list.children[i].setAttribute("class","option correct");
                    option_list.children[i].insertAdjacentHTML("beforeend",tickIcon);
    
                }
            }
            for(let i = 0 ; i < allOptions;i++){
                option_list.children[i].classList.add("disabled");
            }
            next_btn.style.display = "block";
        }
    }
}

function startTimerLine(time){
    counterLine=setInterval(timer,29);
    function timer(){
        time +=1;
        timeLine.style.width = time + "px";
    
        if(time > 549){
            clearInterval(counterLine);
        }
    }
}
const testItem = document.getElementById("textDisplay");
const inputItem = document.getElementById("textInput");
const timeName = document.getElementById("timeName");
const time = document.getElementById("time");
const cwName = document.getElementById("cwName");
const cw = document.getElementById("cw");
const restartBtn = document.getElementById("restartBtn");
const thirty = document.getElementById("thirty");
const sixty = document.getElementById("sixty");
const intro = document.getElementById("intro");
const body = document.getElementById("body");
const conc = document.getElementById("conc");

var wordNo = 1;
var wordsSubmitted = 0;
var wordsCorrect = 0;
var timer = 30;
var flag=0;
var factor=2;
var seconds;
var difficulty=1;

showTest(difficulty);

//on Input
inputItem.addEventListener('input', function(event){
  if(flag===0){
    flag=1;
    timeStart();
  }
  var charEntered = event.data;
  if(/\s/g.test(charEntered)){  //check if the character entered is a whitespace
    checkWord();
  }
  else{
    currentWord();
  }
});

//time selection
thirty.addEventListener("click",function(){
  timer = 30;
  factor = 2;
  limitColor(thirty,sixty);
  time.innerText = timer;
});
sixty.addEventListener("click",function(){
  timer = 60;
  factor = 1;
  limitColor(sixty, thirty);
  time.innerText = timer;
});

//difficulty Selection
intro.addEventListener("click",function(){
  difficulty = 1;
  showTest(difficulty);
  limitColor2(intro,body,conc);
});
body.addEventListener("click",function(){
  difficulty = 2;
  showTest(difficulty);
  limitColor2(body,conc,intro);
});

conc.addEventListener("click",function(){
  difficulty = 3;
  showTest(difficulty);
  limitColor2(conc,intro,body);
});

//color of time and diff
function limitColor(itema,itemr){
  itema.classList.add('cyan');
  itemr.classList.remove('cyan');
}

function limitColor2(itema,itemr,itemd){
  itema.classList.add('cyan');
  itemr.classList.remove('cyan');
  itemd.classList.remove('cyan');
}

//restart Test
restartBtn.addEventListener("click",function(){

  wordsSubmitted = 0;
  wordsCorrect = 0;
  flag=0;

  time.classList.remove("current");
  cw.classList.remove("current");
  time.innerText = timer;
  timeName.innerText = "Time";
  cw.innerText = wordsCorrect;
  cwName.innerText = "CW";
  inputItem.disabled = false;
  inputItem.value = '';
  inputItem.focus();

  showTest(difficulty);
  clearInterval(seconds);
  limitVisible();
});

//start the timer 
function timeStart(){
  limitInvisible();
  seconds = setInterval(function() {
    time.innerText--;
    if (time.innerText == "-1") {
        timeOver();
        clearInterval(seconds);
    }
  }, 1000);
}

//disable textarea and wait for restart
function timeOver(){
  inputItem.disabled = true;
  restartBtn.focus();

  displayScore();
}

//set Limit visibility
function limitVisible(){
  thirty.style.visibility = 'visible';
  sixty.style.visibility = 'visible';
  intro.style.visibility = 'visible';
  body.style.visibility = 'visible';
  conc.style.visibility = 'visible';
}
function limitInvisible(){
  thirty.style.visibility = 'hidden';
  sixty.style.visibility = 'hidden';
  intro.style.visibility = 'hidden';
  body.style.visibility = 'hidden';
  conc.style.visibility = 'hidden';
}

//display the score
function displayScore(){
  let percentageAcc = 0;
  if(wordsSubmitted!==0){
    percentageAcc = Math.floor((wordsCorrect/wordsSubmitted)*100);
  }

  time.classList.add("current");
  cw.classList.add("current");

  time.innerText = percentageAcc+"%";
  timeName.innerText = "PA";

  cw.innerText = factor*wordsCorrect;
  cwName.innerText = "WPM";
}

//check if word input is right
function currentWord(){
  const wordEntered = inputItem.value;
  const currentID = "word "+wordNo;
  const currentSpan = document.getElementById(currentID);
  const curSpanWord = currentSpan.innerText;

  if(wordEntered == curSpanWord.substring(0,wordEntered.length)){
    colorSpan(currentID, 2);
  }
  else{
    colorSpan(currentID, 3);
  }

}
//checks word entered
function checkWord(){
  const wordEntered = inputItem.value;
  inputItem.value='';

  const wordID = "word "+wordNo;
  const checkSpan = document.getElementById(wordID);
  wordNo++;
  wordsSubmitted++;

  if(checkSpan.innerText === wordEntered){
    colorSpan(wordID, 1);
    wordsCorrect++;
    cw.innerText=wordsCorrect;
  }
  else{
    colorSpan(wordID, 3);
  }

  if(wordNo>100){

    showTest(difficulty);
  }
  else{
    const nextID = "word "+wordNo;
    colorSpan(nextID, 2);
  }
}

//color the words
function colorSpan(id, color){
  const span = document.getElementById(id);
  if(color === 1 ){
    span.classList.remove('wrong');
    span.classList.remove('current');
    span.classList.add('correct');
  }
  else if(color ===2){
    span.classList.remove('correct');
    span.classList.remove('wrong');
    span.classList.add('current');
  }
  else{
    span.classList.remove('correct');
    span.classList.remove('current');
    span.classList.add('wrong');
  }
}

//display the random words on screen
function showTest(diff){
  wordNo = 1;
  testItem.innerHTML = '';

  let newTest = randomWords(diff);
  newTest.forEach(function(word, i){
    let wordSpan = document.createElement('span');
    wordSpan.innerText = word;
    wordSpan.setAttribute("id", "word " + (i+1));
    testItem.appendChild(wordSpan);
  });

  const nextID = "word "+wordNo;
  colorSpan(nextID, 2);
}

//Generate text
function randomWords(diff){

  var introWords = ["The", "Philippine", "elections", "are", "a", "crucial", "part", "of", "the", "country's", "democratic", "process", "where", "eligible", "citizens", "have", "the", "right", "to", "vote", "for", "their", "chosen", "leaders.", "These", "elections", "occur", "every", "three", "years,", "with", "the", "most", "important", "being", "the", "national", "elections", "held", "every", "six", "years.", "Philippine", "elections", "are", "of", "utmost", "importance", "as", "they", "provide", "citizens", "with", "the", "opportunity", "to", "participate", "in", "the", "selection", "of", "their", "government", "leaders'", "enabling", "them", "to", "exercise", "their", "right", "to", "suffrage", "and", "have", "a", "say", "in", "shaping", "the", "future", "of", "their", "nation.", "Through", "elections,", "the", "Filipino", "people", "have", "the", "power", "to", "hold", "their", "leaders", "accountable", "and", "ensure", "that", "their", "interests", "are", "represented", "in", "the", "government.", "However,", "despite", "its", "importance,", "the", "Philippine", "elections", "have", "long", "been", "ridden", "with", "misconceptions,", "which", "can", "be", "both", "frustrating", "and", "confusing", "for", "voters,", "sowing", "doubt", "in", "the", "legitimacy", "of", "the", "election", "results."]

  var bodyWords = ["The", "first", "misconception", "is", "that", "social", "media", "is", "a", "reliable", "source", "of", "information,", "when", "in", "reality,", "fake", "news", "and", "disinformation", "are", "prevalent,", "and", "fact-checking", "is", "limited.", "As", "a", "country", "that", "is", "heavily", "reliant", "on", "social", "media", "for", "information,", "it", "is", "pivotal", "for", "Filipinos", "to", "be", "critical", "of", "the", "information", "they", "consume", "on", "social", "media", "and", "for", "efforts", "to", "be", "made", "to", "combat", "the", "spread", "of", "disinformation", "and", "promote", "media", "literacy.", "The", "second", "misconception", "is", "that", "campaign", "promises", "reflect", "a", "politician's", "true", "intentions,", "when", "in", "reality,", "these", "promises", "are", "often", "made", "for", "political", "gain", "and", "do", "not", "necessarily", "reflect", "a", "candidate's", "genuine", "values.", "It", "can", "often", "lead", "to", "disappointment", "and", "a", "loss", "of", "trust", "in", "politicians", "when", "they", "fail", "to", "deliver", "on", "their", "promises,", "and", "it", "also", "highlights", "the", "importance", "of", "researching", "a", "candidate's", "track", "record", "and", "past", "actions", "to", "better", "understand", "their", "true", "values", "and", "priorities.", "Lastly,", "the", "third", "misconception", "is", "that", "vote", "buying", "is", "a", "normalized", "practice,", "and", "shouldn’t", "be", "a", "cause", "for", "concern,", "when", "in", "reality,", "vote", "buying", "is", "an", "illegal", "and", "corrupt", "practice", "that", "undermines", "the", "democratic", "process", "and", "the", "principle", "of", "fair", "and", "free", "elections.", "It", "also", "reinforces", "a", "culture", "of", "impunity", "and", "discourages", "qualified", "and", "competent", "candidates", "from", "running", "for", "public", "office."];

  var concWords = ["Voter", "education", "is", "crucial", "junction", "in", "the", "Philippines", "to", "ensure", "that", "citizens", "are", "able", "to", "make", "informed", "decisions", "when", "they", "cast", "their", "ballots", "and", "to", "critical", "of", "the", "common", "misconceptions", "regarding", "the", "Philippine", "elections.", "However,", "there", "are", "many", "misconceptions", "about", "what", "voter", "education", "actually", "entails.", "Some", "people", "believe", "that", "it", "is", "simply", "a", "matter", "of", "providing", "information", "about", "the", "mechanics", "of", "voting", "such", "as", "how", "to", "mark", "a", "ballot", "or", "where", "to", "go", "to", "cast", "it.", "In", "reality,", "voter", "education", "goes", "much", "deeper", "than", "that,", "encompassing", "topics", "such", "as", "political", "issues,", "candidates'", "platforms,", "and", "the", "role", "of", "government", "in", "society.", "In", "addition", "to", "this,", "voter", "education", "also", "serves", "to", "encourage", "civic", "engagement", "and", "participation", "in", "the", "democratic", "process.","By", "fostering", "an", "informed", "and", "engaged", "electorate,", "voter", "education", "can", "help", "to", "ensure", "that", "the", "government", "reflects", "the", "will", "of", "the", "people", "and", "is", "accountable", "to", "them.", "Ultimately,", "it", "is", "through", "education", "and", "participation", "that", "citizens", "can", "play", "an", "active", "role", "in", "shaping", "the", "future", "of", "their", "country."];

  switch (diff) {
  case 1: wordArray = introWords;
    break;
  case 2: wordArray = bodyWords;
    break;
  case 3: wordArray = concWords;
    break;
  }

  var selectedWords = [];
for(var i=0; i<wordArray.length; i++){
  selectedWords.push(wordArray[i]+" ");
}

  return selectedWords;
}

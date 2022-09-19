//                                          MODULES

const readline = require('readline').createInterface({                  // including built-in module readline 
  input: process.stdin,                                                 // readline module to  get input from a readable stream such as the process.stdin stream, 
  output: process.stdout,                                               // which during the execution of a Node.js program is the terminal input, one line at a time.
});

//Before that will works it's needed to install JS module 'figlet' by calling the command in console npm install figlet
var figlet = require('figlet');                                         // including module "figlet"

/**************************************************************************************************************************************/
/**************************************************************************************************************************************/
//                                       VARIABLES

let vocabulary = ['ONE', 'TWO', 'three', 'four', 'five',                // array with all possible words for game
  'six', 'seven', 'eight', 'nine', 'hangman', 'malicious', 
  'ten', 'hundred', 'thousand', 'turtleneck', 'vocabulary'
];
let answer = '';                                                        // variable for answer word
let answerLowerCase = '';                                               // convert answer to lower case in order to make game case insensetive
let wordStatus = '';                                                    // word with current number of letter that player guessed right
let guesses = 10;                                                       // number of remaining guesses
let letter = '';                                                        // variable for player input
let message = "Please input ONE English LETTER (case doesn't matter). What is your guess?\r\n";

/****************************************************************************************************************************************/
/****************************************************************************************************************************************/
//                                      FUNCTIONS

function randomWord() {                                   // function of randomize choosing of word from array vocabulary
  answer = vocabulary[Math.floor(Math.random() * vocabulary.length)];   // random index for array vocabulary.
  answerLowerCase = answer.toLowerCase();                 // convert word to lower case for realization of case insensivity
}

function answerCodified(){                                // fill word status with '*' as a number of letter in answer word
  for (let i = 0; i<answer.length; i++){
    wordStatus += '*';
  }
}

function outputWordSatus(){                               // output word status
  console.log('The word is:\r\n', wordStatus);
}

function updateGuesses() {                                // output how many gusses remains    
  console.log(`You have ${guesses} guesses`);
}

function checkIfGameWon() {                               // fuction that compare status word with answer word in order to know if player won
  if (wordStatus === answer) {
    console.log('You Won!!!');                           
    return 1;                                             // return 1 for control statement if
  }
}

function checkIfGameLost() {                              // check if player lost
  if (guesses === 0) {
    console.log('You Lost!!!');                           
    console.log('The answer is: ', answer);           // dislay answer word
    return 1;
  }
}

function inputPrompt(message){                            // input line for player
    readline.question(message, letter => {
    if (isValidInput(letter)){                            // check if input valid
      isGuessRight(letter);                               // checking if guess is right
    }
  });
}

function isValidInput(letter){                            // input checking
  if (letter.length !== 1){                               // checking lenght of input
    message = 'Invalid Input: You entered MORE or LESS than ONE letter. Please enter ONLY ONE letter\r\n';
    inputPrompt(message);
  }

  else if (letter.charCodeAt(0) < 65                      //checking character of input
  || (letter.charCodeAt(0) > 90 && letter.charCodeAt(0) < 97) 
  || letter.charCodeAt(0) > 122){
    message = 'Invalid Input: Please enter LETTER (not another type of character)\r\n';
    inputPrompt(message);
  } else {
    return 1;                                             // return 1 for control statement if
  }
}

function isGuessRight(letter){                            // checking if guess is right
  let arrAnswer = answerLowerCase.split('');              // making from string array, each element of array is one letter of the answerLowerCase
  let arrWordStatus = wordStatus.split('');               // making from string array, each element of it is one letter of the wordStatus
  let count = 0;
  for (let i =0; i < arrAnswer.length; i++){
    if(arrAnswer[i] === letter.toLowerCase()){            // checking if there is this letter in answer word
      arrWordStatus[i] = answer[i];
      count += 1;                                         // counter for if statement
    }
  }
  wordStatus = arrWordStatus.join('');                    // convert array into string
  
  if(count === 0){                                        // if guess was wrong (there is no one letter fit in answer)
    guesses -= 1;                                         // reduce number of remaining guesses
    if(checkIfGameLost()){                                // if number of remaining guesses = 0
      readline.close();                     
    } else {                                              // if there is a remaining guess
      updateGuesses();                                    // print how much guesses are still available
      outputWordSatus();                                  // Show current guessed word
      message = 'Your guess was WRONG. Enter ONE English LETTER\r\n';
      inputPrompt(message);                               // another input prompt for the next guess
    }
  }  
  
  if(count !== 0){                                        // if number of right guessed letter more then 0
    if(checkIfGameWon()){                                 // checking if player already guessed word (answer)
      outputWordSatus();
      readline.close();                   
    } else {                                              // if still not whole word is guessed                         
        updateGuesses();                                  // print how much guesses are still available
        outputWordSatus();                                // pring states word
        message = 'Your guess was RIGHT. Enter ONE English LETTER\r\n';
        inputPrompt(message);                             // another input prompt for the next guess
    }
  }
}

//Before that will works it's needed to install JS module 'figlet' by calling the command in console npm install figlet 
figlet.text('HangMan', {                                  //  splash screen
  font: 'Ghost',
  horizontalLayout: 'default',
  verticalLayout: 'default',
  width: 80,
  whitespaceBreak: true
}, function(err, data) {
  if (err) {
      console.log('Something went wrong...');
      console.dir(err);
  }
  console.log(data);
});

/********************************************************************************************************************************************/
/********************************************************************************************************************************************/
//                                STARTING POINT OF A PROGRAM

randomWord();                                              // choose random word from array
answerCodified();                                          // convert word into *******
updateGuesses();                                           // convert all letter in answer into * 
outputWordSatus();                                         // show resulted word from previous statement
inputPrompt(message);                                      // input prompt for player                           // input prompt for player
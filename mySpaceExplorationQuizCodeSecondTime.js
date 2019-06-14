/*  Code to create a 5 Question Multiple Choice Quiz.
    1/ There must be four answers to choose from
    2/ Everytime the program is loaded the questions should appear in a random order
    3/ Every time the program is loaded the answers should be ordganised in a random order
    4/ Results must be displayed at the end of the quiz
*/

function code(){                                                                                                                    // Sets up function inside Adobe Animate.

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////// SETUP ////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

var myStage = stage.children[0];                                                                                                    // allows myStage to be typed rather than stage.children[0]         

// Setting anything which shouldnt be shown on the title screen as invisible. Visible property used on buttons so that they cannot be pressed even when not seen, and alpha used on plain text.
myAnswerBoxVisibility(false,false,false,false);                                                                                     // Sets the answer boxes to invisible so that they cannot be seen or interacted with.
answerCorrectIncorrectVisibility(0, 0, 0, 0, 0);                                                                                    // Function is hiding the text boxes which are only to be displayed on the answer page at the end of the quiz.
myStage.myResultsThanks_txt.alpha = 0;                                                                                              // Hides the myResultsThanks_txt text box.

// All event Listeners to control mouse click events
myStage.myQuizStart_btn.addEventListener("click", myQuizStart);                                                                      // on press of the quiz start button, the myQuizStart function is invoked
myStage.answerA_btn.addEventListener("click", myAnswerButtonFunction);                                                               // on press of an answer, invoke function myAnswerButtonFunction which links to 2 more funnctions
myStage.answerB_btn.addEventListener("click", myAnswerButtonFunction);                                                               // on press of an answer, invoke function myAnswerButtonFunction which links to 2 more funnctions
myStage.answerC_btn.addEventListener("click", myAnswerButtonFunction);                                                               // on press of an answer, invoke function myAnswerButtonFunction which links to 2 more funnctions
myStage.answerD_btn.addEventListener("click", myAnswerButtonFunction);                                                               // on press of an answer, invoke function myAnswerButtonFunction which links to 2 more funnctions

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////// VARIABLES ///////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// Variables containing the questions to be asked
var questionOne = "What is the smallest planet in the Solar System?";
var questionTwo = "Ganymede and Io are moons of which planet?";
var questionThree = "What is the name of the spacecraft that landed on the moon in 1969?";
var questionFour = "Who was the first woman in space?";
var questionFive = "Which year was the International Space Station launched?";
var myQuestionArray = [questionOne, questionTwo, questionThree, questionFour, questionFive];                                       // Array containing all 5 questions, used later to determine if all questions have been used, based on array.length property

var questionAnswerArray =[];                                                                                                       // Global variable to hold the question answers generated through the randomQuestioNGenerator function. Declared globlally so that this variable can be populated in one function, then used by another (myAnswerRandomiser).
var correctAnswerArray = ["Pluto", "Jupiter", "Apollo 11", "Valentina Tereshkova", "1998"];                                        // Global variable array containing all of the correct answers, used for a function later on to establish if answers were correct or false.
var myQuestionOrder =[];                                                                                                           // Each time a random question is generated, it's pushed into this array. The array keeps track of the questions order, so array 0 = question 1, array 1 = question 2 etc. This is used to pass the correct question to the results page text box in order of question asked.
var myAnswerOrder = [];                                                                                                            // Array to hold the spliced answers to keep them in order for the results page
var correctOrIncorrect = "";                                                                                                       // variable to enter either correct or incorrect, which is then sent to the myAnswerOrder array to keep the answers in order.

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////// CUSTOM MOUSE POINTER ////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

myStage.mousePointer_mc.mouseEnabled = false;                                                                                       // allows the image to click on buttons like a mouse curser
myStage.addEventListener("tick", myCustomMouseCursor);                                                                              // Tick even created to constantly check mouse position on each tick, and run the myCustomCursor function.

function myCustomMouseCursor(){                                                                                                     // Function to make the custom cursor image (mousePointer_mc) follow where the mouse is on the stage
        myStage.cursor = "none";                                                                                                    // Hides the default Cursor. To get back it would be cursor = "pointer"
        myStage.mousePointer_mc.x = stage.mouseX;                                                                                   // states that the custom pointer follows where the mouse is on the X axis
        myStage.mousePointer_mc.y = stage.mouseY;                                                                                   // states that the custom pointer follows where the mouse is on the Y axis
}

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////// NASA BUTTON //////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

myStage.myNasaTest_btn.addEventListener("click", myNasaButton);                                                                     // Event listner for click on NASA symbol. 

function myNasaButton(){                                                                                                            // Opens upto NASA website for Quiz hints
    window.open('https://www.nasa.gov/');                                                                                           // window.open() creates a new tab with in URL entered between the parenthesis
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////// FUNCTIONS //////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

function myAnswerBoxVisibility(a,b,c,d){                                                                                           // Function to control the visibility of the answerboxes. Saves having to write it out each time, as you can just pass true or false into the () for each answer box. E.g (true,true,false,false) would show up boxes A and B but keep C and D hidden.
        myStage.answerA_btn.visible = a;
        myStage.answerB_btn.visible = b;
        myStage.answerC_btn.visible = c;
        myStage.answerD_btn.visible = d;
}

function answerCorrectIncorrectVisibility(a, b, c, d, e){                                                                           // Function to control the visibility of the correct or incorrect results page text boxes.
        myStage.questionOneCorrectIncorrect_txt.alpha = a;
        myStage.questionTwoCorrectIncorrect_txt.alpha = b;
        myStage.questionThreeCorrectIncorrect_txt.alpha = c;
        myStage.questionFourCorrectIncorrect_txt.alpha = d;
        myStage.questionFiveCorrectIncorrect_txt.alpha = e;
}

function myQuizStart(){                                                                                                             // This function houses further functions used to set the stage up (either a question or the results page), generate a random question and its answers in a random order, or bring up the results page with the user input answers as correct or incorrect.
        
        if (myQuestionArray.length == 0){                                                                                           // If there are 0 entries in the myQuestionArray, display setup the stage for the results to be displayed and display results (via the functions invoked)
            stageForResults();                                                                                                      // Sets up the text boxes and alphas for the results page.
            answerQuestionOrder();                                                                                                  // Function displays the contents of the myQuestionOrder array into text boxes on the results page. Each results page text box is linked to an array entry to keep the order correct.
            answerResultOrder();                                                                                                    // Function displays the contents of the myAnswerOrder array into text boxes on the results page. Each results page text box is linked to an array entry to keep the order correct.
            correctCountFunction();                                                                                                 // Function counts up the number of "correct" answers and displays this into a text box on the results page.
        }

         else{                                                                                                                      // If there are entries in the the myQuestionArray, setup the stage for a question, generate a question and its answers (randomly) via function.
            stageForQuestions();                                                                                                    // Function sorts out all of the alphas to display the question and answer text boxes, whilst removing the start button and title from the screen.
            randomQuestionGeneration();                                                                                             // Function to randomly order the questions. Uses an array and takes a random question from it, displays question then removes it from the array so that it cant be repeated.
            randomAnswerGeneration();                                                                                               // Function to randomise the order of the answers from questionAnswerArray, and put each of the 4 answers into a dynamic text box.
        }        
}

function stageForResults(){                                                                                                         // Function sets the stage by bringing up the correct results text boxes and hiding question and answer text boxes.
       
    myStage.myResultsThanks_txt.alpha = 1;                                                                                          // Displays the results page title
    myStage.questionBox_txt.alpha = 0;                                                                                              // Hides the question text boxes
    myStage.answerTxt0_txt.text = "";                                                                                               // Clears any content from the answerText boxes so that they appear invisible
    myStage.answerTxt1_txt.text = "";
    myStage.answerTxt2_txt.text = "";
    myStage.answerTxt3_txt.text = "";
    answerCorrectIncorrectVisibility(1, 1, 1, 1, 1);                                                                                // Displays the correct or incorrect text boxes via the function
    myAnswerBoxVisibility(false,false,false,false);                                                                                 // Sets the answer boxes to invisible so that they cannot be seen or interacted with.

}

function stageForQuestions(){                                                                                                       // Function sorts out all of the alphas to display the question and answer text boxes, whilst removing the start button and title from the screen.
        
    myStage.myQuizTitle_mc.alpha = 0;                                                                                               // hides the quiz title page title
    myStage.myQuizStart_btn.visible = false;                                                                                        // hides the start button      
    myAnswerBoxVisibility(true,true,true,true);                                                                                     // Sets the answer boxes to visible and allows them to be interacted with.

}

// Invoked from a click event on any of the answer buttons. Runs the resultsCorrectIncorrect function which is a switch statement depending on which button was pressed. Then runs the myQuizStart function to generate another question or go to the results page. 
function myAnswerButtonFunction(event){                                                                                             //If you want to use event.currentTarget in any of the functions within another function, you nned to pass the paramenter at the top level!!! This means there is something to look at!                                                                                            
        resultsCorrectIncorrect(event.currentTarget);                                                                               // event.currentTarget is passed into this function as a paramenter        
        myQuizStart();                                                                                                              // This function houses further functions used to set the stage up (either a question or the results page), generate a random question and its answers in a random order, or bring up the results page with the user input answers as correct or incorrect.
        console.debug("currentTarget is ======", event.currentTarget);                                                              // Displays to the console what the event.currentTarget is. Used for debugging to ensure event.currentTarget was coming up with the right button click.  
}

function randomQuestionGeneration(){                                                                                                // Function to randomly order the questions. Uses an array and takes a random question from it, displays question then removes it from the array so that it cant be repeated.

        myRandomQuestion = myQuestionArray[Math.floor(Math.random() * myQuestionArray.length)];                                     // Generates a random array entry out of the 5 questions, and places this into a new variable.
        myStage.questionBox_txt.text = myRandomQuestion;                                                                            // Displays myRandomQuestion Variable into the question dynamic text box to display a question.
        myQuestionOrder.push(myRandomQuestion);                                                                                     // pushes the randomQuestion into a new array (myQuestionOrder) which is used by the answerQuestionOrder function to display the questions in the correct order on the answer page.
        var questionToRemove = myQuestionArray.indexOf(myRandomQuestion);                                                           // New variable containing the array position (index) of the question.  
        myQuestionArray.splice(questionToRemove, 1);                                                                                // Splices (removes) the question which has just been displayed on the screen, from the array via its index position. The 1 means remove only that one selection. 
        console.debug("The array length ===========", myQuestionArray.length);                                                      // Displays the number of array entrys remaining to the console.
        console.debug(myRandomQuestion);                                                                                            // Displays the full question to the console for debug purposes.
}

function randomAnswerGeneration(){                                                                                                  // Function to control the generation of the answers, and ensure they are randomised.
    switch (myRandomQuestion){                                                                                                      // Switch statement to control the generation of random answer sequence. myRandomQuestion is tested against different cases to find the answers to the correct question.
    
        case questionOne:                                                                                                           // If myRandomQuestion matches var Question 1. Could also write out the entire answer of the question hear, but reads alot better to stick the answer into a variable / binding and use that variables name.
        console.debug("QUESTION 1");                                                                                                // displays the question number to the console for debug purposes.
        questionAnswerArray = ["Pluto", "Neptune", "Saturn", "Uranus"];                                                             // Changes the Global results of questionAnswerArray so that it can be passed to the myAnswerRandomiser function. The correct answer is always in position [0].
        myAnswerRandomiser();                                                                                                       // Invokes the myAnswerRandomiser function to randomise the order of the answers from questionAnswerArray, and place them into dynamic text boxes.
        break;                                                                                                                      // Used to leave the switch preventing an infinite loop.
        
        case questionTwo:
        console.debug("QUESTION 2");
        questionAnswerArray = ["Jupiter", "Saturn", "Venus", "Mars"];
        myAnswerRandomiser();
        break;

        case questionThree:
        console.debug("QUESTION 3");
        questionAnswerArray = ["Apollo 11", "Apollo 9", "Apollo 10", "Apollo 8"];
        myAnswerRandomiser();
        break;

        case questionFour:
        console.debug("QUESTION 4");
        questionAnswerArray = ["Valentina Tereshkova", "Sally Ride", "Peggy Whitson", "Svetlana Savitskaya"];
        myAnswerRandomiser();
        break;

        case questionFive:
        console.debug("QUESTION 5");
        questionAnswerArray = ["1998", "1999", "2000", "2001"];
        myAnswerRandomiser();
        break;
    }
}

function myAnswerRandomiser(){                                                                                                      // Function to randomise the order of the answers from questionAnswerArray, and put each of the 4 answers into a dynamic text box.
                                                                                
    for (i = 0; i < 4; i++){                                                                                                        // For loop setup to occur 4 times, once for each question answer
        myRandomAnswer = questionAnswerArray[Math.floor(Math.random() * questionAnswerArray.length)];                               // Gets random entry from the questionAnswerArray and places into a new variable, answerToRemove
        var answerToRemove = questionAnswerArray.indexOf(myRandomAnswer);                                                           // Gets position of the randomAnswer variable, as an array index number, and places into a new variable (answerToRemove)
        myStage["answerTxt" + i + "_txt"].text = questionAnswerArray[answerToRemove];	                                            // Places the random answer (answerToRemove) into a dynamic text box. This is doen by passing the value of 'i' to match the text box name, therfore changing the textbox name each loop so that 4 seperate text boxes can be used.
        questionAnswerArray.splice(answerToRemove, 1);                                                                              // Removes the entry from the questionAnswerArray so that it isnt repeated   
    }
}

// Function to work out if the answer was right or wrong based on which button was pressed. Looks at event.currentTarget (the button pressed), and enters into a switch statement. Switch compares the button to its alotted text box. 
function resultsCorrectIncorrect(a){                                                                                                 // event.currentTarget is passed into this function  from a previous function, therefore event.currentTarget becomes 'a'     
        switch (a){                                                                                                                  // Switch statement to see which button (a = currentTarget) was pressed, then carry out actions depending on if the txt box text matches any answer from the correctAnswers array.
            
            case myStage.answerA_btn:                                                                                                // Does event.currentTarget = myStage.answerA_btn, then carry out this case.
                console.debug("Answer A was clicked");                                                                               // Displays which answer button was pressed to the console for debug purposes.                                                                      
               // myStage.answerA_btn.contains = myStage.answerTxt0_txt;                                                             // creates a custom property of answerA_btn which allows it to access another stage object. 
                if(correctAnswerArray.indexOf(myStage.answerTxt0_txt.text) != -1){                                                   // If answerTxt0_txt.text is in the array (indexOf - checks to see if value is in an index of the array) put "Correct" into varaible correctOrIncorrect, if not put "incorrect" into the variable. -1
                   console.log("CORRECT");                                                                                           // != 'is not'. So if the indexOf answertxt doesn't equal -1, it means its in the array (as array starts at 0...)
                    correctOrIncorrect = "Correct";                                                   
                }
                else{
                    console.log("FALSE");
                    correctOrIncorrect = "Incorrect";    
                }
                myAnswerOrder.push(correctOrIncorrect);                                                                              // Pushes the correctOrIncorrect varaible into array myAnswerOrder, which is then passed to a function to display the answers in the correct order in the results page.
                break;
            
            case myStage.answerB_btn:                                                                                                // Does event.currentTarget = myStage.answerB_btn, then carry out this case.
            console.debug("Answer B was clicked");                                                                                   // Displays which answer button was pressed to the console for debug purposes.
                if(correctAnswerArray.indexOf(myStage.answerTxt1_txt.text) != -1){
                    console.log("CORRECT");
                    correctOrIncorrect = "Correct";
                }
            else{
                console.log("FALSE");
                correctOrIncorrect = "Incorrect";
                }
                myAnswerOrder.push(correctOrIncorrect); 
                break;

            case myStage.answerC_btn:                                                                                               // Does event.currentTarget = myStage.answerC_btn, then carry out this case.
            console.debug("Answer C was clicked");                                                                                  // Displays which answer button was pressed to the console for debug purposes.
            if(correctAnswerArray.indexOf(myStage.answerTxt2_txt.text) != -1){
                console.log("CORRECT");
                correctOrIncorrect = "Correct";
                }
            else{
                console.log("FALSE");
                correctOrIncorrect = "Incorrect";
                }
                myAnswerOrder.push(correctOrIncorrect);
                break;
             
            case myStage.answerD_btn:                                                                                                // Does event.currentTarget = myStage.answerC_btn, then carry out this case.
            console.debug("Answer D was clicked");                                                                                   // Displays which answer button was pressed to the console for debug purposes.
                if(correctAnswerArray.indexOf(myStage.answerTxt3_txt.text) != -1){
                console.log("CORRECT");
                correctOrIncorrect = "Correct";
                }
            else{
                console.log("FALSE");
                correctOrIncorrect = "Incorrect";
                }
                myAnswerOrder.push(correctOrIncorrect);
                break;
                }
}

function answerQuestionOrder(){                                                                                                      // Function displays the contents of the myQuestionOrder array into text boxes on the results page. Each results page text box is linked to an array entry to keep the order correct.
    myStage.resultsQuestion1_txt.text = myQuestionOrder[0];
    myStage.resultsQuestion2_txt.text = myQuestionOrder[1];
    myStage.resultsQuestion3_txt.text = myQuestionOrder[2];
    myStage.resultsQuestion4_txt.text = myQuestionOrder[3];
    myStage.resultsQuestion5_txt.text = myQuestionOrder[4];

}

function answerResultOrder(){                                                                                                        // Function displays the contents of the myAnswerOrder array into text boxes on the results page. Each results page text box is linked to an array entry to keep the order correct.
    myStage.questionOneCorrectIncorrect_txt.text = myAnswerOrder[0];
    myStage.questionTwoCorrectIncorrect_txt.text = myAnswerOrder[1];
    myStage.questionThreeCorrectIncorrect_txt.text = myAnswerOrder[2];
    myStage.questionFourCorrectIncorrect_txt.text = myAnswerOrder[3];
    myStage.questionFiveCorrectIncorrect_txt.text = myAnswerOrder[4];
}

function correctCountFunction(){                                                                                                     // Function counts up the number of "correct" answers and displays this into a text box on the results page.
    var count = 0;                                                                                                                   // Variable to keep count of the amount of "Correct"'s found in the array. This variable is used to populate the result text box.
    for (var i = 0; i < myAnswerOrder.length; i++) {                                                                                 // For loop stating that if i is less than the array length, carryout action and add +1 to i (so that it loops the entire array checking for "Correct")
        if (myAnswerOrder[i] === "Correct") {                                                                                        // if myAnswerOrder index(i) is equal to "Correct", add +1 to the counter variable.
            count++;
        }
    }
    myStage.resultsOfFive_txt.text = "You Scored "+count+" out of 5";                                                                // display in the resultsOfFive text box on the results page the score out of 5, using the variable count to contain the nubmer of "correct" answers.
    }
}
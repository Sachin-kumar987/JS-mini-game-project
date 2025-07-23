const quizData = [
  {
    "question": "What year was JavaScript launched?",
    "a": "1996",
    "b": "1995",
    "c": "1994",
    "d": "none of the above",
    "correct": "b"
  },
  {
    "question": "Which company developed JavaScript?",
    "a": "Microsoft",
    "b": "Sun Microsystems",
    "c": "Netscape",
    "d": "IBM",
    "correct": "c"
  },
  {
    "question": "Inside which HTML element do we put the JavaScript?",
    "a": "<js>",
    "b": "<script>",
    "c": "<javascript>",
    "d": "<code>",
    "correct": "b"
  },
  {
    "question": "Which symbol is used for comments in JavaScript?",
    "a": "//",
    "b": "#",
    "c": "/* */",
    "d": "<!-- -->",
    "correct": "a"
  },
  {
    "question": "How do you create a function in JavaScript?",
    "a": "function myFunction()",
    "b": "def myFunction()",
    "c": "function:myFunction()",
    "d": "create myFunction()",
    "correct": "a"
  },
  {
    "question": "Which of the following is a JavaScript data type?",
    "a": "Float",
    "b": "Number",
    "c": "Decimal",
    "d": "Char",
    "correct": "b"
  },
  {
    "question": "How do you call a function named 'myFunction'?",
    "a": "call myFunction()",
    "b": "myFunction()",
    "c": "call function myFunction",
    "d": "execute myFunction",
    "correct": "b"
  },
  {
    "question": "Which keyword is used to declare a variable in JavaScript?",
    "a": "let",
    "b": "var",
    "c": "const",
    "d": "All of the above",
    "correct": "d"
  },
  {
    "question": "Which of these is a JavaScript framework?",
    "a": "Laravel",
    "b": "Django",
    "c": "React",
    "d": "Bootstrap",
    "correct": "c"
  },
  {
    "question": "How do you write an IF statement in JavaScript?",
    "a": "if i = 5",
    "b": "if i == 5 then",
    "c": "if (i == 5)",
    "d": "if i = 5 then",
    "correct": "c"
  }
]

let index = 0;
let correct = 0,
    incorrect = 0,
    total = quizData.length;
let questionBox = document.getElementById("questionBox");
let allInputs = document.querySelectorAll("input[type='radio']")
const loadQuestion = () => {
    if (total === index) {
        return quizEnd()
    }
    reset()
    const data = quizData[index]
    questionBox.innerHTML = `${index + 1}) ${data.question}`
    allInputs[0].nextElementSibling.innerText = data.a
    allInputs[1].nextElementSibling.innerText = data.b
    allInputs[2].nextElementSibling.innerText = data.c
    allInputs[3].nextElementSibling.innerText = data.d
}

document.querySelector("#submit").addEventListener(
    "click",
    function() {
        const data = quizData[index]
        const ans = getAnswer()
        if (ans === data.correct) {
            correct++;
        } else {
            incorrect++;
        }
        index++;
        loadQuestion()
    }
)

const getAnswer = () => {
    let ans;
    allInputs.forEach(
        (inputEl) => {
            if (inputEl.checked) {
                ans = inputEl.value;
            }
        }
    )
    return ans;
}

const reset = () => {
    allInputs.forEach(
        (inputEl) => {
            inputEl.checked = false;
        }
    )
}

const quizEnd = () => {
    // console.log(document.getElementsByClassName("container"));
    document.getElementsByClassName("container")[0].innerHTML = `
        <div class="col">
            <h3 class="w-100"> Hii, you've scored ${correct} / ${total} </h3>
        </div>
    `
}
loadQuestion(index);
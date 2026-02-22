const allQuestions = [
    { q: "Which is the largest animal in the world?", o: ["Elephant", "Blue whale", "Shark", "Giraffe"], a: "Blue whale" },
    { q: "HTML stands for?", o: ["Hyper Text Markup Language", "High Text Machine Language", "Hyper Tool ML", "None"], a: "Hyper Text Markup Language" },
    { q: "Which language is used for styling?", o: ["HTML", "Java", "CSS", "Python"], a: "CSS" },
    { q: "Which one is JavaScript framework?", o: ["React", "Laravel", "Django", "MySQL"], a: "React" },
    { q: "Which is NOT a programming language?", o: ["Python", "HTML", "Java", "C++"], a: "HTML" },
    { q: "Which tag is used for link?", o: ["<a>", "<link>", "<href>", "<url>"], a: "<a>" },
    { q: "JavaScript runs in?", o: ["Browser", "Compiler", "Assembler", "OS"], a: "Browser" },
    { q: "CSS stands for?", o: ["Cascading Style Sheets", "Creative Style System", "Color Style Sheet", "None"], a: "Cascading Style Sheets" },
    { q: "Which company developed JavaScript?", o: ["Netscape", "Google", "Microsoft", "Apple"], a: "Netscape" },
    { q: "Which symbol is used for comments in JS?", o: ["//", "##", "<!-- -->", "**"], a: "//" },
    { q: "Which is backend language?", o: ["HTML", "CSS", "Node.js", "Bootstrap"], a: "Node.js" },
    { q: "Which tag is used for image?", o: ["<img>", "<image>", "<pic>", "<src>"], a: "<img>" }
];

// shuffle questions on every refresh
const quizData = allQuestions.sort(() => 0.5 - Math.random()).slice(0, 10);

let index = 0;
let score = 0;
let answered = false;

const questionEl = document.getElementById("question");
const optionsEl = document.getElementById("options");
const nextBtn = document.getElementById("nextBtn");
const scoreBox = document.getElementById("scoreBox");

loadQuestion();

function loadQuestion() {
    answered = false;
    nextBtn.style.display = "none";
    optionsEl.innerHTML = "";

    const q = quizData[index];
    questionEl.innerText = `${index + 1}. ${q.q}`;

    q.o.forEach(opt => {
        const btn = document.createElement("button");
        btn.innerText = opt;
        btn.onclick = () => checkAnswer(btn, q.a);
        optionsEl.appendChild(btn);
    });
}

function checkAnswer(btn, correct) {
    if (answered) return;
    answered = true;

    const buttons = optionsEl.children;

    for (let b of buttons) {
        b.disabled = true;
        if (b.innerText === correct) {
            b.classList.add("correct");
        }
    }

    if (btn.innerText !== correct) {
        btn.classList.add("wrong");
    } else {
        score++;
    }

    nextBtn.style.display = "block";
}

nextBtn.onclick = () => {
    index++;
    if (index < quizData.length) {
        loadQuestion();
    } else {
        showResult();
    }
};

function showResult() {
    questionEl.innerText = "Quiz Completed ✅";
    optionsEl.innerHTML = "";
    nextBtn.style.display = "none";
    scoreBox.innerText = `Your Score: ${score} / 10`;
}
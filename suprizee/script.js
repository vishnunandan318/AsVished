const questions = [
    {
        q: "If we were stuck in an elevator for 2 hours, what would we do?",
        options: ["Panic", "Talk non-stop", "Take selfies", "Enjoy silence together"]
    },
    {
        q: "What is your favorite memory of us?",
        options: ["First trip", "Late-night talks", "Laughing day", "Every day"]
    },
    {
        q: "When you think of us, what feeling comes first?",
        options: ["Peace", "Comfort", "Happiness", "Home"]
    },
    {
        q: "If we could be anywhere now, where would we be?",
        options: ["Beach", "Mountains", "Cafe date", "Anywhere together"]
    }
];

const reactions = [
    "Yayyy! I like that answer 😍",
    "Hehe… good choice 😉",
    "Hurrayy!! 🎉",
    "Wrong answer… I bite you 😝"
];

let current = 0;
let answers = [];

function loadQuestion() {
    const q = document.getElementById("question");
    const opt = document.getElementById("options");
    const reaction = document.getElementById("reaction");

    reaction.innerText = "";

    if (current < questions.length) {
        q.innerText = questions[current].q;
        opt.innerHTML = "";

        questions[current].options.forEach(o => {
            const btn = document.createElement("button");
            btn.innerText = o;
            btn.onclick = () => handleAnswer(o);
            opt.appendChild(btn);
        });
    } else {
        showFinal();
    }
}

function handleAnswer(ans) {
    answers.push(ans);
    const reaction = document.getElementById("reaction");
    reaction.innerText = reactions[Math.floor(Math.random() * reactions.length)];

    setTimeout(() => {
        current++;
        loadQuestion();
    }, 1000);
}

function showFinal() {
    const card = document.getElementById("card");
    card.innerHTML = `
        <h2>So… after all this ❤️</h2>
        <h1>Will you be my Valentine?</h1>
        <button onclick="celebrate()">YES 💘</button>
        <button onclick="celebrate()">Of course YES 😍</button>
        <br/><br/>
        <input type="file" id="photoUpload" accept="image/*"/>
        <p>Upload our photo 🥰</p>
    `;
}

function celebrate() {
    sendEmail();
    document.body.innerHTML = `
        <div style="text-align:center;margin-top:15%">
            <h1>Yayyyy! ❤️🥳</h1>
            <p>You made my day!</p>
            <img id="preview" style="max-width:300px;border-radius:20px;margin-top:20px"/>
        </div>
    `;

    const file = document.getElementById("photoUpload");
    if (file && file.files[0]) {
        const reader = new FileReader();
        reader.onload = e => {
            document.getElementById("preview").src = e.target.result;
        };
        reader.readAsDataURL(file.files[0]);
    }
}

function sendEmail() {
    fetch("https://formspree.io/f/mykpekww", {
        method: "POST",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ answers: answers })
    });
}

loadQuestion();

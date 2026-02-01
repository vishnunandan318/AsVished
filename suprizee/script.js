const questions = [
    {
        q: "If we were stuck in an elevator for 2 hours, what would we do?",
        options: ["Panic", "Talk non-stop", "Take selfies", "Enjoy the silence together"]
    },
    {
        q: "What is your favorite memory of us?",
        options: ["Our first trip", "Late-night talks", "That crazy laughing day", "Every day with you"]
    },
    {
        q: "When you think of us, what feeling comes first?",
        options: ["Peace", "Comfort", "Happiness", "Home"]
    },
    {
        q: "If we could be anywhere right now, where would we be?",
        options: ["Beach", "Mountains", "Cafe date", "Anywhere together"]
    }
];

let current = 0;

function loadQuestion() {
    const card = document.getElementById("card");
    const q = document.getElementById("question");
    const opt = document.getElementById("options");

    if (current < questions.length) {
        q.innerText = questions[current].q;
        opt.innerHTML = "";

        questions[current].options.forEach(o => {
            const btn = document.createElement("button");
            btn.innerText = o;
            btn.onclick = () => {
                current++;
                loadQuestion();
            };
            opt.appendChild(btn);
        });
    } else {
        card.innerHTML = `
            <h2>So… after all this… ❤️</h2>
            <h1>Will you be my Valentine?</h1>
            <button onclick="celebrate()">YES</button>
            <button onclick="celebrate()">Of course YES</button>
        `;
    }
}

function celebrate() {
    document.body.innerHTML = `
        <h1 style="text-align:center;margin-top:20%">Yayyy! ❤️🥰</h1>
        <h2 style="text-align:center">You just made my day!</h2>
    `;
}

loadQuestion();

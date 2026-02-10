/* ---------------- SOUNDS ---------------- */
function play(){ document.getElementById("chime").play(); }
function playbg(){ document.getElementById("bg").play(); }

/* ---------------- EMOJI BG ---------------- */
const emojis=["💖","💘","💕","🌸","✨","🥰"];
setInterval(()=>{
    const e=document.createElement("div");
    e.className="emoji";
    e.innerText=emojis[Math.floor(Math.random()*emojis.length)];
    e.style.left=Math.random()*100+"vw";
    e.style.fontSize=(18+Math.random()*30)+"px";
    e.style.animationDuration=(4+Math.random()*6)+"s";
    document.body.appendChild(e);
    setTimeout(()=>e.remove(),10000);
},200);

/* ---------------- QUESTIONS ---------------- */
let step=0;
let yesSize=1;
let yesClicks=0;
let noClicks = 0;

const questions=[
{
 q:'When did I say "love you" first?',
 options:["Dec 15th","Dec 23rd","Dec 16th","Dec 18th"],
 correct:"Dec 15th",
 reactCorrect:"Hurrey!!! 🎉",
 reactWrong:"I will bite you 😝"
},
{
 q:"What is your favorite memory of us?",
 options:["First trip","Late-night talks","Laughing day","Every day"],
 react:"Aww nice 🥰"
},
{
 q:"When you think of us, what feeling comes first?",
 options:["Peace","Comfort","Happiness","Home"],
 react:"Hmm Interesting!!! 🤔"
},
{
 q:"If you could be anywhere now, where do you wanna be?",
 options:["Iceland","Macherla","Arizona","In your Heart"],
 react:"😊"
}
];

function loadQ(){
    playbg();
    const card=document.getElementById("card");

    // Create quiz skeleton every time
    card.innerHTML=`
        <h2 id="question"></h2>
        <div id="options"></div>
        <p id="reaction"></p>
    `;

    if(step<questions.length){
        document.getElementById("question").innerText=questions[step].q;
        const opt=document.getElementById("options");

        questions[step].options.forEach(o=>{
            const b=document.createElement("button");
            b.innerText=o;
            b.onclick=()=>answer(o);
            opt.appendChild(b);
        });
    } else valentineQ();
}

function answer(ans){
    play();
    const r=document.getElementById("reaction");
    const q=questions[step];

    if(q.correct){
        r.innerText = (ans===q.correct)? q.reactCorrect : q.reactWrong;
    }else{
        r.innerText=q.react;
    }

    setTimeout(()=>{step++; r.innerText=""; loadQ();},900);
}

/* ---------------- VALENTINE ---------------- */
function valentineQ(){
    document.getElementById("mainHeading").innerText="Will you be my Valentine?";
    document.getElementById("mainHeading").style.fontFamily="fantasy";

    const card=document.getElementById("card");
    card.innerHTML=`
        <button id="yes">Yes</button>
        <button id="no">No</button>
        <p id="reaction"></p>
    `;

    document.getElementById("yes").onclick=yesClick;
    document.getElementById("no").onclick=noClick;
}

function yesClick(){
    play();
    yesClicks++;
    yesSize+=0.2;
    const y=document.getElementById("yes");
    y.style.transform=`scale(${yesSize})`;
    document.getElementById("reaction").innerText="Saripoledu 😄";

    if(yesClicks>=10){
        burstConfetti();
        setTimeout(confettiGifts,1200);
    }
}

function noClick(){
    const n=document.getElementById("no");
    noClicks++;

    if(noClicks<=5){
        n.style.transform=`scale(${1 - noClicks*0.15})`;
    }

    document.getElementById("reaction").innerText="niku option vundi anukunava? 😜";
}

/* ---------------- GIFTS ---------------- */
function confettiGifts(){
    document.getElementById("mainHeading").innerText="Yay, you said yes!";
    document.getElementById("mainHeading").style.display="block";

    const card=document.getElementById("card");
    card.innerHTML=`
    <div class="gift-tiles">

      <div class="gift-item" onclick="roses()">
        <img src="ADD_GIFT1_IMAGE" class="gift-img"/>
        <h3>Gift 1</h3>
      </div>

      <div class="gift-item" onclick="letter()">
        <img src="img/gift_1_img.png" class="gift-img"/>
        <h3>Gift 2</h3>
      </div>

      <div class="gift-item" onclick="wordcloud()">
        <img src="img/gift_2_img.png" class="gift-img"/>
        <h3>Gift 3</h3>
      </div>

    </div>`;
}

/* EDIT LETTER HERE */
function letter(){
    document.getElementById("mainHeading").style.display="none";
    document.getElementById("card").innerHTML=`
    <div class="letter">
    <h2>Na modati premalekha 💌</h2>
    <p>
    Dear Bangari 💖,<br><br>

    I can only begin with gratitude for having you in my life. You came out of nowhere and slowly became my entire world — and I wouldn’t want it any other way. ✨<br><br>

    You are precious to me. You are amazing, talented, beautiful, smart, understanding, and truly everything a man could ever wish for. 🥰<br><br>

    Thank you for choosing me… not just once, but for the second time in a row. That means more to me than you can ever imagine. ❤️<br><br>

    I’m so excited and grateful to celebrate this Valentine’s Day with my Bangari! 💘🌹<br><br>

    With all my love,<br>
    <b>Itlu,<br>Rowdy Gadu 😎</b>
    </p>
    </div>
    <br/>
    <button onclick="backToGifts()">Back to Gifts</button>
    `;
}

/* ADD ROSE IMAGE / GIF HERE */
function roses(){
    document.getElementById("mainHeading").style.display="none";
    document.getElementById("card").innerHTML=`
    <h2>For you 🌹🎈</h2>
    <img src="ADD_ROSE_IMAGE_URL" style="width:80%;border-radius:20px"/>
    <br/><br/>
    <button onclick="backToGifts()">Back to Gifts</button>
    `;
}

/* ADD WORDCLOUD IMAGE HERE
function wordcloud(){
    document.getElementById("mainHeading").style.display="none";
    document.getElementById("CloudSearch").innerHTML=`
    <h2>Words that define us ☁️</h2>
    <img src="img/wordcloud.png" style="width:100%;border-radius:20px"/>
    <br/><br/>
    <button onclick="confettiGifts()">Back to Gifts</button>
    `;
} */

function wordcloud(){
    const card = document.getElementById("card");
    const heading = document.getElementById("mainHeading");

    heading.style.display = "none";

    // 👉 Add special class for bigger size
    card.classList.add("wordcloud-mode");

    card.innerHTML = `
        <h2>Words that define us ☁️</h2>
        <img src="img/wordcloud3.png" class="wordcloud-img"/>
        <br/><br/>
        <button onclick="backToGifts()">Back to Gifts</button>
    `;
}

function backToGifts(){
    const card = document.getElementById("card");

    // ❗ Remove special size when going back
    card.classList.remove("wordcloud-mode");

    confettiGifts();
}

function burstConfetti(){
    for(let i=0;i<5;i++){
        setTimeout(()=>{
            confetti({
                particleCount: 100,
                spread: 70,
                origin: { y: 0.6 }
            });
        }, i*300);
    }
}

function showIntro(){
    playbg();
    document.getElementById("mainHeading").innerText="Welcome My Love 💖";
    document.getElementById("mainHeading").style.fontFamily="'Brush Script MT', cursive";

    const card=document.getElementById("card");

    card.innerHTML=`
        <h2 style="font-family:cursive">Hey Bangari 🥰</h2>
        <p style="font-size:18px">
        I made a tiny surprise for you… ✨<br><br>
        A small journey of us, our memories,<br>
        and something special waiting at the end 💘<br><br>
        Ready to begin?
        </p>
        <button onclick="loadQ()">Start the Journey ❤️</button>
    `;
}

window.addEventListener("DOMContentLoaded", showIntro);

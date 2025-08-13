const verbs = [
  { base: "go", past: "went", participle: "gone", hint: "C’est le verbe pour aller quelque part." },
  { base: "eat", past: "ate", participle: "eaten", hint: "Tu fais ça avec de la nourriture." },
  { base: "see", past: "saw", participle: "seen", hint: "Utilisé avec les yeux." },
  { base: "write", past: "wrote", participle: "written", hint: "Tu fais ça avec un stylo." },
  { base: "take", past: "took", participle: "taken", hint: "Synonyme de attraper." },
  { base: "drink", past: "drank", participle: "drunk", hint: "Tu fais ça avec de l’eau ou du jus." },
  { base: "begin", past: "began", participle: "begun", hint: "C’est le contraire de finir." },
  { base: "run", past: "ran", participle: "run", hint: "Tu fais ça avec tes jambes, rapidement." },
  { base: "break", past: "broke", participle: "broken", hint: "Ce qui arrive quand quelque chose se casse." },
  { base: "choose", past: "chose", participle: "chosen", hint: "Tu fais ça quand tu prends une décision." }
];

let current = 0;
let score = 0;
let timeLeft = 30;
let timer;
let isPaused = false;

function loadVerb() {
  clearInterval(timer);
  timeLeft = 30;
  isPaused = false;
  document.getElementById("verb").textContent = "to " + verbs[current].base;
  document.getElementById("past").value = "";
  document.getElementById("participle").value = "";
  document.getElementById("feedback").textContent = "";
  document.getElementById("hint").textContent = "";
  document.getElementById("timer").textContent = `⏱️ Temps restant : ${timeLeft}s`;
  document.getElementById("pauseBtn").textContent = "⏸️ Pause";

  timer = setInterval(() => {
    if (!isPaused) {
      timeLeft--;
      document.getElementById("timer").textContent = `⏱️ Temps restant : ${timeLeft}s`;
      if (timeLeft <= 0) {
        clearInterval(timer);
        document.getElementById("feedback").textContent = "⏳ Temps écoulé !";
        document.getElementById("hint").textContent = "Indice : " + verbs[current].hint;
        setTimeout(() => {
          current = (current + 1) % verbs.length;
          loadVerb();
        }, 2000);
      }
    }
  }, 1000);
}

function checkAnswer() {
  const past = document.getElementById("past").value.trim().toLowerCase();
  const participle = document.getElementById("participle").value.trim().toLowerCase();
  const verb = verbs[current];

  if (past === verb.past && participle === verb.participle) {
    score += 10;
    document.getElementById("feedback").textContent = "✅ Bravo !";
    document.getElementById("score").textContent = "💰 Pièces : " + score;
    clearInterval(timer);
    current = (current + 1) % verbs.length;
    setTimeout(loadVerb, 1500);
  } else {
    document.getElementById("feedback").textContent = "❌ Essaie encore !";
    document.getElementById("hint").textContent = "Indice : " + verb.hint;
  }
}

function togglePause() {
  isPaused = !isPaused;
  const btn = document.getElementById("pauseBtn");
  btn.textContent = isPaused ? "▶️ Reprendre" : "⏸️ Pause";
}

window.onload = loadVerb;

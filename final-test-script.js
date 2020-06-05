// Τα ερωτήματα 2 έως 7 θα απαντηθούν στο αρχείο αυτό

const newGuess = document.querySelector("#new-guess");
const message = document.querySelector("#message");
const lowHigh = document.querySelector("#low-high");
const checkButton = document.querySelector("#check");
const restartButton = document.querySelector("#restart");

// 2. να ορίσετε τους σχετικούς χειριστές συμβάντων
newGuess.addEventListener("keyup", checkKey);
checkButton.addEventListener("click", checkGuess);
restartButton.addEventListener("click", restart);

let previousGuesses = [];
let theGuess;
window.onload = newRandom();
newGuess.focus();

restartButton.style.display = "none";

function newRandom() {
  /* 3. συνάρτηση που βρίσκει ένα τυχαίο αριθμό μεταξύ 1 και 100 
 και τον εκχωρεί στη μεταβλητή theGuess */
  theGuess = Math.floor(Math.random() * 100 + 1);
}

function checkKey(e) {
  /* 4. συνάρτηση που όταν ο χρήστης πατήσει <<enter>> 
 να καλεί τη συνάρτηση που αποτελεί τον κεντρικό ελεγκτή του παιχνιδιού.
 */
  if (e.code === "Enter" || e.code === "NumpadEnter") {
    checkGuess();
  }
}

function checkGuess() {
  /* 5. Να ορίσετε συνάρτηση checkGuess η οποία καλείται είτε όταν ο χρήστης πατήσει <<enter>>
στο πεδίο "new-guess" είτε όταν πατήσει το πλήκτρο "check", η οποία είναι ο κεντρικός ελεγκτής,
καλεί τη συνάρτηση processGuess (η οποία αποφαίνεται για την ορθότητα του αριθμού) και κάνει τις
κατάλληλες ενέργειες για εμφάνιση του πλήκτρου 'restart' και την εξαφάνιση του πλήκτρου 'check'
σε περίπτωση ολοκλήρωσης του παιχνιδιού. */
  let val = parseInt(newGuess.value);
  let procGuess = processGuess(val);

  if (procGuess === "lost" || procGuess === "win") {
    newGuess.disabled = true;
    checkButton.style.display = "none";
    restartButton.style.display = "block";
  }
}

let i = 1;
function processGuess(newValue) {
  /* 6.  Να ορίσετε συνάρτηση processGuess(newValue) η οποία καλείται από τη συνάρτηση checkGuess,
 περιέχει τη λογική του παιχνιδιού, ελέγχει αν η τιμή του χρήστη είναι σωστή, ή αν το παιχνίδι έχει
 τελειώσει χωρίς ο χρήστης να έχει βρει τον αριθμό, και επιστρέφει αντίστοιχα την τιμή "win", ή "lost",
 δημιουργεί και εμφανίζει τα κατάλληλα μηνύματα, αλλάζοντας το χρώμα του στοιχείου μηνυμάτων.
 Όλα τα μηνύματα του προγράμματος εμφανίζονται από την processGuess().
 Σε περίπτωση που το παιχνίδι δεν έχει ακόμα τελειώσει, η συνάρτηση μπορεί είτε να μην επιστρέφει κάποια ιδιαίτερη τιμή,
 είτε να επιστρέφει κάποια τιμή της επιλογής σας */
  let result;
  if (isNaN(newValue)) {
    message.textContent = "Δώσε αριθμό";
    message.style.backgroundColor = "var(--msg-wrong-color)";
  } else {
    if (newValue < theGuess) {
      message.textContent = "Λάθος, είσαι πιο χαμηλά";
      message.style.backgroundColor = "var(--msg-wrong-color)";
    } else {
      if (newValue > theGuess) {
        message.textContent = "Λάθος, το ξεπέρασες";
        message.style.backgroundColor = "var(--msg-wrong-color)";
      } else {
        message.textContent = `Mπράβο, το βρήκες σε ${i} προσπάθειες!`;
        message.style.backgroundColor = "var(--msg-win-color)";

        result = "win";
      }
    }
    previousGuesses.push(newValue);
    i++;
  }

  lowHigh.innerHTML = "Προηγούμενες προσπάθειες: " + previousGuesses.join(" ");
  if (i > 10) {
    result = "lost";
    message.textContent = `Τέλος παιχνιδιού, έχασες!. Ο αριθμός ήταν ο ${theGuess}`;
  }
  newGuess.value = '';
  return result;
}

function restart() {
  /* 7. Να ορίσετε συνάρτηση restart η οποία καλείται όταν ο χρήστης πατήσει το πλήκτρο 
'restart' και επανεκινεί τη διαδικασία */
  theGuess = Math.floor(Math.random() * 100 + 1);
  i = 1;
  restartButton.style.display = "none";
  checkButton.style.display = "inline-block";
  previousGuesses = [];
  message.textContent = "";
  lowHigh.textContent = "";
  newGuess.disabled = false;
  newGuess.value = "";
  newGuess.focus();
  message.style.backgroundColor = "#fff";

}

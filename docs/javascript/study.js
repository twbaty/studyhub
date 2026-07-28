document.addEventListener("DOMContentLoaded", async () => {
  const container = document.getElementById("studyhub-reviewer");

  if (!container) {
    return;
  }

  try {
    const response = await fetch("./questions.json");

    if (!response.ok) {
      throw new Error(`Could not load questions.json: ${response.status}`);
    }

    const questions = await response.json();

    if (!Array.isArray(questions) || questions.length === 0) {
      throw new Error("Question bank is empty or invalid.");
    }

    renderQuestion(container, questions, 0);
  } catch (error) {
    container.innerHTML = `
      <div class="studyhub-error">
        <strong>Question bank failed to load.</strong>
        <p>${error.message}</p>
      </div>
    `;

    console.error(error);
  }
});

function renderQuestion(container, questions, index) {
  const question = questions[index];

  container.innerHTML = `
    <section class="question-card">
      <div class="question-meta">
        ${question.category ?? ""}
      </div>

      <h2>${question.question}</h2>

      <div class="choice-list">
        ${question.choices
          .map(
            (choice) => `
              <button
                type="button"
                class="answer-choice"
                data-choice-id="${choice.id}"
              >
                <strong>${choice.id}.</strong> ${choice.text}
              </button>
            `
          )
          .join("")}
      </div>

      <div id="question-feedback" class="question-feedback" hidden></div>

      <button
        type="button"
        id="next-question"
        class="next-question"
        hidden
      >
        Next Question
      </button>
    </section>
  `;

  const feedback = document.getElementById("question-feedback");
  const nextButton = document.getElementById("next-question");
  const answerButtons = container.querySelectorAll(".answer-choice");

  answerButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const selectedAnswer = button.dataset.choiceId;
      const isCorrect = selectedAnswer === question.answer;

      answerButtons.forEach((answerButton) => {
        answerButton.disabled = true;

        if (answerButton.dataset.choiceId === question.answer) {
          answerButton.classList.add("correct");
        }
      });

      if (!isCorrect) {
        button.classList.add("incorrect");
      }

      feedback.hidden = false;
      feedback.innerHTML = `
        <h3>${isCorrect ? "Correct" : "Not quite"}</h3>
        <p>${question.explanation}</p>
      `;

      nextButton.hidden = questions.length <= 1;
    });
  });

  nextButton.addEventListener("click", () => {
    const nextIndex = (index + 1) % questions.length;
    renderQuestion(container, questions, nextIndex);
  });
}

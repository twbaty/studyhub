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

    const session = createSession();

    // Temporary three-question test set.
    let originalQuizQuestions = [];
    const testQuestions = questions.slice(0, 3);

    renderQuestion(
      container,
      testQuestions,
      0,
      session,
      testQuestions,
      false
    );
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

function createSession() {
  return {
    correct: 0,
    incorrect: 0,
    missedQuestionIds: [],
    domainResults: {}
  };
}

function recordAnswer(session, question, isCorrect) {
  if (isCorrect) {
    session.correct += 1;
  } else {
    session.incorrect += 1;
    session.missedQuestionIds.push(question.id);
  }

  const domainId = question.domain_id ?? "uncategorized";
  const domainName = question.domain ?? "Uncategorized";

  if (!session.domainResults[domainId]) {
    session.domainResults[domainId] = {
      name: domainName,
      asked: 0,
      correct: 0,
      incorrect: 0
    };
  }

  const domainResult = session.domainResults[domainId];

  domainResult.asked += 1;

  if (isCorrect) {
    domainResult.correct += 1;
  } else {
    domainResult.incorrect += 1;
  }
}

function renderQuestion(
  container,
  currentQuestions,
  index,
  session,
  mainQuestions,
  isReviewMode
) {
  const question = currentQuestions[index];

  container.innerHTML = `
    <section class="question-card">
      <div class="question-meta">
        Question ${index + 1} of ${currentQuestions.length}
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

      <div
        id="question-feedback"
        class="question-feedback"
        hidden
      ></div>

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

  const feedback = container.querySelector("#question-feedback");
  const nextButton = container.querySelector("#next-question");
  const answerButtons = container.querySelectorAll(".answer-choice");

  let answerRecorded = false;

  answerButtons.forEach((button) => {
    button.addEventListener("click", () => {
      if (answerRecorded) {
        return;
      }

      answerRecorded = true;

      const selectedAnswer = button.dataset.choiceId;
      const isCorrect = selectedAnswer === question.answer;

      recordAnswer(session, question, isCorrect);

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

      nextButton.hidden = false;

      if (index === currentQuestions.length - 1) {
        nextButton.textContent = "View Results";
      }
    });
  });

  nextButton.addEventListener("click", () => {
    const nextIndex = index + 1;

    if (nextIndex >= currentQuestions.length) {
      renderCompletionScreen(
        container,
        currentQuestions,
        session,
        mainQuestions,
        isReviewMode
      );
      return;
    }

    renderQuestion(
      container,
      currentQuestions,
      nextIndex,
      session,
      mainQuestions,
      isReviewMode
    );

    container.scrollIntoView({
      behavior: "smooth",
      block: "start"
    });
  });
}

function renderCompletionScreen(
  container,
  currentQuestions,
  session,
  mainQuestions,
  isReviewMode
) {
  const totalReviewed = session.correct + session.incorrect;
  const missedCount = session.missedQuestionIds.length;

  const heading = isReviewMode ? "Review Complete" : "Quiz Complete";
  const summaryText = isReviewMode
    ? `You reviewed ${totalReviewed} questions.`
    : `You answered ${totalReviewed} questions.`;

  container.innerHTML = `
    <section class="question-card completion-screen">
      <h2>${heading}</h2>

      <p>${summaryText}</p>

      <div class="session-results">
        <p><strong>Correct:</strong> ${session.correct}</p>
        <p><strong>Incorrect:</strong> ${session.incorrect}</p>
      </div>

      ${
        missedCount > 0
          ? `
            <button
              type="button"
              id="review-missed"
              class="next-question"
            >
              Review Missed Questions
            </button>
          `
          : ""
      }

      <button
        type="button"
        id="restart-review"
        class="next-question"
      >
        Start Again
      </button>
    </section>
  `;

  const reviewMissedButton = container.querySelector("#review-missed");
  const restartButton = container.querySelector("#restart-review");

  if (reviewMissedButton) {
    reviewMissedButton.addEventListener("click", () => {
      const missedQuestions = session.missedQuestionIds
        .map((questionId) =>
          currentQuestions.find((question) => question.id === questionId)
        )
        .filter(Boolean);

      const newSession = createSession();

      renderQuestion(
        container,
        missedQuestions,
        0,
        newSession,
        mainQuestions,
        true
      );

      container.scrollIntoView({
        behavior: "smooth",
        block: "start"
      });
    });
  }

  restartButton.addEventListener("click", () => {
    const newSession = createSession();

    renderQuestion(
      container,
      mainQuestions,
      0,
      newSession,
      mainQuestions,
      false
    );

    container.scrollIntoView({
      behavior: "smooth",
      block: "start"
    });
  });
}

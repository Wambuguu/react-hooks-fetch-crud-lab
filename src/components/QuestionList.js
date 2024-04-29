import React from "react";
import QuestionItem from "./QuestionItem";

function QuestionList({ questions, onSetQuestions }) {
  const handleDeleteQuestion = (qId) => {
    fetch(`http://localhost:4000/questions/${qId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((resp) => resp.json())
      .then(() => {
        const remainingQs = questions.filter((q) => q.id !== qId);
        onSetQuestions(remainingQs);
      })
      .catch((error) => {
        console.error("Error deleting question:", error);
      });
  };

  const handleAnswerChange = (qId, qCorrectIndex) => {
    fetch(`http://localhost:4000/questions/${qId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        correctIndex: qCorrectIndex,
      }),
    })
      .then((resp) => resp.json())
      .then((updatedQuestion) => {
        const updatedQuestions = questions.map((q) =>
          q.id === qId ? updatedQuestion : q
        );
        onSetQuestions(updatedQuestions);
      })
      .catch((error) => {
        console.error("Error updating question:", error);
      });
  };

  const listQuestions = questions.map((q) => (
    <QuestionItem
      key={q.id}
      question={q}
      onDeleteQuestion={handleDeleteQuestion}
      onAnswerChange={handleAnswerChange}
    />
  ));

  return (
    <section>
      <h1>Quiz Questions</h1>
      <ul>{listQuestions}</ul>
    </section>
  );
}

export default QuestionList;

import { useEffect, useState } from "react";
export function useQuestionActivity(questionsData) {
  const [checkedChoices, setCheckedChoices] = useState([]);
  const [counter, setCounter] = useState(0);
  const [loadingState, setLoadingState] = useState({});


  useEffect(() => {
    const activeQuestionIds = questionsData
      .filter((question) => isQuestionActive(question.QuestionId))
      .map((question) => question.QuestionId);
    setCounter(activeQuestionIds.length);
  }, [checkedChoices, questionsData]);

  const handleCheckboxChange = (choiceId, checked) => {
    setLoadingState((prevLoadingState) => ({ ...prevLoadingState, [choiceId]: true }));
    setTimeout(() => {
      setCheckedChoices((prevCheckedChoices) => {
        if (checked) {
          return [...prevCheckedChoices, choiceId];
        } else {
          return prevCheckedChoices.filter((id) => id !== choiceId);
        }
      });
      setLoadingState((prevLoadingState) => ({ ...prevLoadingState, [choiceId]: false }));


    }, 500);
  };

  //check sidebar question active
  const isQuestionActive = (questionId) => {
    const activeQuestion = questionsData.find((item) => item.QuestionId === questionId);
    return (
      activeQuestion &&
      activeQuestion.Choices.some((choice) => checkedChoices.includes(choice.ChoiceId))
    );
  };


  const handleChoiceChange = (choiceId, checked) => {
    handleCheckboxChange(choiceId, checked);

    if (checked) {
      setCheckedChoices([...checkedChoices, choiceId]);
    } else {
      setCheckedChoices(checkedChoices.filter((id) => id !== choiceId));
    }
  };


  return {
    isQuestionActive,
    counter,
    handleChoiceChange,
    loadingState,
    checkedChoices,
  };
}


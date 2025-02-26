import { View, Text, ToastAndroid } from "react-native";
import React, { useContext, useEffect, useState } from "react";
import AppBackground from "../../components/AppBackground";
import Questions from "./Questions";
import LevelBackground from "../../assets/maps/1.png";
import data from "./data.json";
import RationaleModal from "./RationaleModal";
import Results from "./Results";
import AccountContext from "../../contexts/AccountContext";

const Game = (props) => {
  const { level, levelIndex, category} = props.route.params;
  const {accountData, setAccountData} = useContext(AccountContext)
  const [questions, setQuestions] = useState(null);
  const [currentNumber, setCurrentNumber] = useState(0);
  const [currentQuestion, setCurrentQuestion] = useState(null);
  const [rationaleModal, setRationaleModal] = useState(null);
  const [stats, setStats] = useState({
    correct: 0,
    wrong: 0,
    answers: [],
  });

  const showRationale = (answer) => {
    let newStats = {
      ...stats,
      answers: [...stats.answers, answer],
    };

    if (answer === currentQuestion.answer) {
      newStats.correct = stats.correct + 1;
    } else {
      newStats.wrong = stats.wrong + 1;
    }
    setStats(newStats);

    setRationaleModal({
      title: `Question ${currentNumber + 1}`,
      subtitle: `${answer.toUpperCase()}. ${
        currentQuestion.choices[answer].text
      }`,
      body: currentQuestion.choices[answer].rationale,
      isCorrect: answer === currentQuestion.answer,
      primaryFn: () => {
        nextQuestion();
        setRationaleModal(null);
      },
    });
    setCurrentQuestion(null);
  };
  const nextQuestion = () => {
    if (currentNumber + 1 === questions.length) {
      ToastAndroid.show(
        `Done\nCorrect: ${stats.correct}\nWrong: ${stats.wrong}`,
        ToastAndroid.SHORT
      );
      
      const newAccountData = accountData
      console.log(accountData.progress[category] === levelIndex);
      
      if (accountData.progress[category] === levelIndex) {
        newAccountData.progress[category] = accountData.progress[category] + 1;
        setAccountData(newAccountData);
        console.log("settedAccount", newAccountData);
      }

      setCurrentNumber((current) => current + 1);
      return;
    }
    setCurrentNumber((current) => current + 1);
    setCurrentQuestion(questions[currentNumber + 1]);
  };

  useEffect(() => {
    setQuestions(data);
    setCurrentQuestion(data[currentNumber]);
  }, []);

  return (
    <AppBackground
      source={LevelBackground}
      viewStyle={{
        justifyContent: "center",
        backgroundColor: "rgba(0,0,0,0.6)",
      }}
    >
      {currentQuestion && (
        <Questions
          level={level}
          data={currentQuestion}
          number={currentNumber}
          onAnswer={showRationale}
        />
      )}
      {rationaleModal && <RationaleModal modal={rationaleModal} />}
      {questions && currentNumber === questions.length && (
        <Results stats={stats} category={category} />
      )}
    </AppBackground>
  );
};

export default Game;

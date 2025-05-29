import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Button, Card, Typography, Radio, Space } from "antd";
import { shuffle } from "lodash";

const { Title, Text } = Typography;

interface Question {
  question: string;
  correct_answer: string;
  incorrect_answers: string[];
}

const decodeHTML = (html: string) => {
  const txt = document.createElement("textarea");
  txt.innerHTML = html;
  return txt.value;
};

const Quiz: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const { questions, category, amount } = location.state as {
    questions: Question[];
    category: { name: string };
    amount: number;
  };

  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState<string | null>(null);
  const [score, setScore] = useState(0);
  const [showAnswer, setShowAnswer] = useState(false);
  const [isFinished, setIsFinished] = useState(false);
  const [options, setOptions] = useState<string[]>([]);

  const question = questions[current];

  // Shuffle options only when question changes
  useEffect(() => {
    const shuffled = shuffle([
      question.correct_answer,
      ...question.incorrect_answers,
    ]);
    setOptions(shuffled);
  }, [current, question]);

  const handleNext = () => {
    if (selected === question.correct_answer) {
      setScore((s) => s + 1);
    }

    setSelected(null);
    setShowAnswer(false);

    if (current + 1 < questions.length) {
      setCurrent((i) => i + 1);
    } else {
      setIsFinished(true);
    }
  };

  if (isFinished) {
    return (
      <Card style={{ maxWidth: 600, margin: "40px auto", textAlign: "center" }}>
        <Title level={2}>🎉 Quiz Completed!</Title>
        <Text style={{ fontSize: 18 }}>
          You scored <strong>{score}</strong> out of <strong>{amount}</strong>
        </Text>
        <div style={{ marginTop: 32 }}>
          <Button type="primary" onClick={() => navigate("/")}>
            Go to Home
          </Button>
        </div>
      </Card>
    );
  }

  return (
    <Card style={{ maxWidth: 700, margin: "40px auto" }}>
      <Title level={4}>
        {category.name} — Question {current + 1} of {amount}
      </Title>
      <Text strong>{decodeHTML(question.question)}</Text>

      <Radio.Group
        onChange={(e) => setSelected(e.target.value)}
        value={selected}
        style={{ display: "block", marginTop: 20 }}
        disabled={showAnswer}
      >
        <Space direction="vertical">
          {options.map((option, i) => (
            <Radio key={i} value={option}>
              {decodeHTML(option)}
            </Radio>
          ))}
        </Space>
      </Radio.Group>

      <div style={{ marginTop: 24 }}>
        <Button
          type="primary"
          disabled={!selected}
          onClick={() => setShowAnswer(true)}
        >
          Submit Answer
        </Button>
        {showAnswer && (
          <div style={{ marginTop: 16 }}>
            {selected === question.correct_answer ? (
              <Text type="success">✅ Correct!</Text>
            ) : (
              <Text type="danger">
                ❌ Incorrect. Correct answer:{" "}
                {decodeHTML(question.correct_answer)}
              </Text>
            )}
            <div style={{ marginTop: 16 }}>
              <Button onClick={handleNext}>Next</Button>
            </div>
          </div>
        )}
      </div>
    </Card>
  );
};

export default Quiz;

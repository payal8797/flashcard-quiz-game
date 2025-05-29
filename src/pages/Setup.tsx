import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Typography, Form, Select, Button, message, Card } from "antd";
import axios from "axios";
import { type Category } from "./Home";

const { Title } = Typography;
const { Option } = Select;

const Setup: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const category = location.state as Category;

  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

  const startQuiz = async (values: { difficulty: string; amount: number }) => {
    const { difficulty, amount } = values;
    const url = `https://opentdb.com/api.php?amount=${amount}&category=${category.id}&difficulty=${difficulty}&type=multiple`;

    try {
      setLoading(true);
      const res = await axios.get(url);

      if (res.data.response_code !== 0) {
        message.error("Could not fetch quiz questions. Please try again.");
        return;
      }

      navigate("/quiz", {
        state: { questions: res.data.results, category, difficulty, amount },
      });
    } catch {
      message.error("Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card style={{ maxWidth: 500, margin: "40px auto" }}>
      <Title level={3} style={{ textAlign: "center" }}>
        🧩 Setup Quiz: {category.name}
      </Title>

      <Form form={form} layout="vertical" onFinish={startQuiz}>
        <Form.Item
          name="difficulty"
          label="Difficulty"
          rules={[{ required: true }]}
        >
          <Select placeholder="Select difficulty">
            <Option value="easy">Easy</Option>
            <Option value="medium">Medium</Option>
            <Option value="hard">Hard</Option>
          </Select>
        </Form.Item>

        <Form.Item
          name="amount"
          label="Number of Questions"
          initialValue={5}
          rules={[{ required: true }]}
        >
          <Select>
            {[5, 10, 15, 20, 25, 30].map((num) => (
              <Option key={num} value={num}>
                {num}
              </Option>
            ))}
          </Select>
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" loading={loading} block>
            Start Quiz
          </Button>
        </Form.Item>
      </Form>
    </Card>
  );
};

export default Setup;

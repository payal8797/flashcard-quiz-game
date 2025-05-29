import React from "react";
import { Layout } from "antd";
import { Routes, Route, useNavigate } from "react-router-dom";
import Home from "./pages/Home";
import Setup from "./pages/Setup";
import Quiz from "./pages/Quiz";

const { Header, Content } = Layout;

const App: React.FC = () => {
  const navigate = useNavigate();

  return (
    <Layout>
      <Header style={{ background: "#001529" }}>
        <h1
          style={{
            color: "#fff",
            cursor: "pointer",
            display: "flex",
            justifyContent: "center",
          }}
          onClick={() => navigate("/")}
        >
          Flashcard Quiz App
        </h1>
      </Header>
      <Content style={{ padding: "24px" }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/:categoryName" element={<Setup />} />
          <Route path="/quiz" element={<Quiz />} />
        </Routes>
      </Content>
    </Layout>
  );
};

export default App;

import React, { useEffect, useState } from "react";
import { Card, Row, Col, Typography, Spin, message } from "antd";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const { Title } = Typography;

export interface Category {
  id: number;
  name: string;
}

const Home: React.FC = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCategories = async () => {
      setLoading(true);
      try {
        const res = await axios.get("https://opentdb.com/api_category.php");
        setCategories(res.data.trivia_categories);
      } catch (error) {
        message.error(
          `Failed to fetch categories. ${
            error instanceof Error ? error.message : "Unknown error"
          }`
        );
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  const handleCardClick = (category: Category) => {
    const encoded = encodeURIComponent(
      category.name.toLowerCase().replace(/\s+/g, "-")
    );
    navigate(`/${encoded}`, { state: category });
  };

  if (loading) return <Spin fullscreen />;

  return (
    <div style={{ padding: 24 }}>
      <Title level={2} style={{ textAlign: "center", marginBottom: 32 }}>
        🧠 Choose a Quiz Category
      </Title>
      <Row gutter={[24, 24]} justify="center">
        {categories.map((category) => (
          <Col key={category.id} xs={24} sm={12} md={8} lg={6}>
            <Card
              className="category-card"
              hoverable
              onClick={() => handleCardClick(category)}
            >
              <div className="card-content">
                <span className="emoji">📘</span>
                <h3>{category.name}</h3>
              </div>
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default Home;

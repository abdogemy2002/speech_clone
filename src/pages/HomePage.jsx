import React from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import CustomNavbar from '../components/CustomNavbar'; 
import '../style/HomePage.css';

const HomePage = () => {
  return (
    <div>
      {/* customNavbar */}
      

      {/* Hero Section */}
      <div className="bg-light text-center py-5">
        <Container>
          <h1 className="display-4">مساعدة الأطفال، دعم الآباء، توجيه الأطباء!</h1>
          <p className="lead">
            حل شامل لتصحيح النطق مصمم خصيصًا لاحتياجات طفلك.
          </p>
          <Button variant="primary" className="m-2">ابدأ الآن</Button>
          <Button variant="outline-primary" className="m-2">تعرف على المزيد</Button>
        </Container>
      </div>

      {/* Features Section */}
      <Container className="py-5" id="features">
        <h2 className="text-center mb-4">مميزاتنا</h2>
        <Row>
          <Col md={6} lg={3}>
            <Card className="text-center mb-4 shadow-sm">
              <Card.Body>
                <Card.Title>اختبارات تفاعلية</Card.Title>
                <Card.Text>ألعاب ممتعة لتقييم النطق.</Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col md={6} lg={3}>
            <Card className="text-center mb-4 shadow-sm">
              <Card.Body>
                <Card.Title>خطط علاج شخصية</Card.Title>
                <Card.Text>تمارين مخصصة لكل طفل.</Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col md={6} lg={3}>
            <Card className="text-center mb-4 shadow-sm">
              <Card.Body>
                <Card.Title>متابعة التقدم</Card.Title>
                <Card.Text>تقارير تفصيلية لتحسين الأداء.</Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col md={6} lg={3}>
            <Card className="text-center mb-4 shadow-sm">
              <Card.Body>
                <Card.Title>لوحة تحكم الأطباء</Card.Title>
                <Card.Text>أدوات ورؤى مخصصة للأطباء.</Card.Text>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>

      {/* Testimonials Section */}
      <div className="bg-light py-5">
        <Container>
          <h2 className="text-center mb-4">آراء المستخدمين</h2>
          <Row>
            <Col md={6}>
              <Card className="mb-4 shadow-sm">
                <Card.Body>
                  <blockquote className="blockquote">
                    <p>"تقدم طفلي كان مذهلاً!"</p>
                    <footer className="blockquote-footer">أم أحمد</footer>
                  </blockquote>
                </Card.Body>
              </Card>
            </Col>
            <Col md={6}>
              <Card className="mb-4 shadow-sm">
                <Card.Body>
                  <blockquote className="blockquote">
                    <p>"لوحة التحكم تسهل عملي كثيرًا."</p>
                    <footer className="blockquote-footer">د. خالد</footer>
                  </blockquote>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>

      {/* Footer */}
      <footer className="bg-dark text-light text-center py-4">
        <Container>
          <p>© 2024 مشروع تصحيح النطق - جميع الحقوق محفوظة</p>
        </Container>
      </footer>
    </div>
  );
};

export default HomePage;

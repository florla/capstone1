import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Account from './pages/Account';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import LoginPage from './pages/Login';
import RegisterPage from './pages/Register';
import BudgetTracker from './pages/Budget';
import ContactForm from './pages/Contact';
import Articles from './pages/FinancialArticles';
import Chatbot from './pages/Chatbot';


function App() {
  return (
    <div>
      <Router>
        <Navbar />

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/account" element={<Account />} />
          <Route path="/budget" element={<BudgetTracker />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/contact" element={<ContactForm />} />
          <Route path="/FinancialArticles" element={<Articles />} />
          <Route path="/chatbot" element={<Chatbot />} />
        </Routes>
        <Footer />
      </Router>
    </div>
  );
}

export default App;
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./components/common/Layout";
import Dashboard from "./pages/dashboard/Dashboard";
import Assets from './pages/assets/Assets';
import Analytics from './pages/analytics/Analytics';

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/assets" element={<Assets />} />
          <Route path="/analytics" element={<Analytics />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import DataAnalysisPlatform from "@/pages/DataAnalysisPlatform";
import DataAnalysisCourse from "@/pages/DataAnalysisCourse";
import PythonCourse from "@/pages/PythonCourse";
import FinancialAnalysisCourse from "@/pages/FinancialAnalysisCourse";
import DataCollectionCourse from "@/pages/DataCollectionCourse";
import SupplyChainCourse from "@/pages/SupplyChainCourse";
import DatabaseCourse from "@/pages/DatabaseCourse";

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<DataAnalysisCourse />} />
        <Route path="/data-analysis" element={<DataAnalysisPlatform />} />
        <Route path="/data-analysis-course" element={<DataAnalysisCourse />} />
        <Route path="/python" element={<PythonCourse />} />
        <Route path="/financial-analysis" element={<FinancialAnalysisCourse />} />
        <Route path="/data-collection" element={<DataCollectionCourse />} />
        <Route path="/supply-chain" element={<SupplyChainCourse />} />
        <Route path="/database" element={<DatabaseCourse />} />
        <Route path="/other" element={<div className="text-center text-xl">Other Page - Coming Soon</div>} />
      </Routes>
    </Router>
  );
}

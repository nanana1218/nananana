import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { lazy, Suspense } from "react";

// 懒加载组件 - 只有当路由被访问时才会加载
const Home = lazy(() => import("@/pages/Home"));
const DataAnalysisCourse = lazy(() => import("@/pages/DataAnalysisCourse"));
const PythonCourse = lazy(() => import("@/pages/PythonCourse"));
const FinancialAnalysisCourse = lazy(() => import("@/pages/FinancialAnalysisCourse"));
const DataCollectionCourse = lazy(() => import("@/pages/DataCollectionCourse"));
const SupplyChainCourse = lazy(() => import("@/pages/SupplyChainCourse"));
const DatabaseCourse = lazy(() => import("@/pages/DatabaseCourse"));
const ReportViewer = lazy(() => import("@/pages/ReportViewer"));

// 加载中状态组件
const PageLoader = () => (
  <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900">
    <div className="text-center">
      <div className="inline-block w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mb-4"></div>
      <p className="text-white text-lg">加载中...</p>
    </div>
  </div>
);

export default function App() {
  return (
    <Router>
      <Suspense fallback={<PageLoader />}>
        <Routes>
          <Route path="/" element={<DataAnalysisCourse />} />
          <Route path="/home" element={<Home />} />
          <Route path="/data-analysis" element={<Navigate to="/data-analysis-course" />} />
          <Route path="/data-analysis-course" element={<DataAnalysisCourse />} />
          <Route path="/python" element={<PythonCourse />} />
          <Route path="/financial-analysis" element={<FinancialAnalysisCourse />} />
          <Route path="/data-collection" element={<DataCollectionCourse />} />
          <Route path="/supply-chain" element={<SupplyChainCourse />} />
          <Route path="/database" element={<DatabaseCourse />} />
          <Route path="/other" element={<div className="text-center text-xl">Other Page - Coming Soon</div>} />
          <Route path="/report/:reportId" element={<ReportViewer />} />
        </Routes>
      </Suspense>
    </Router>
  );
}

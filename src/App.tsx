import { Navigate, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import ShareYourStory from "./pages/ShareYourStory";
import ShareLanding from "./pages/ShareLanding";
import About from "./pages/About";
import HowItWorks from "./pages/HowItWorks";
import Stories from "./pages/Stories";
import PrivacyConsent from "./pages/PrivacyConsent";
import Support from "./pages/Support";
import StoryDetail from "./pages/StoryDetail";
import Review from "./pages/Review";
import Consent from "./pages/Consent";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/share" element={<ShareLanding />} />
      <Route path="/share/write" element={<ShareYourStory />} />
      <Route path="/how-it-works" element={<HowItWorks />} />
      <Route path="/stories" element={<Stories />} />
      <Route path="/privacy-consent" element={<PrivacyConsent />} />
      <Route path="/support" element={<Support />} />
      <Route path="/review" element={<Review />} />
      <Route path="/consent" element={<Consent />} />
      <Route path="/story-detail" element={<StoryDetail />} />
      <Route path="/about" element={<About />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

"use client";

import WelcomeModal from "@/components/custom/modal/welcome";
import Login from "./(components)/login";
import Main from "./(components)/main";
import DetailProfile from "./(components)/profile";
import SkillModal from "@/components/custom/modal/skill";
import { Toaster } from "react-hot-toast";
import useScreenWidth from "@/hooks/screen";

const Home: React.FC = () => {

  const screenWidth = useScreenWidth(); // Use the custom hook
  const isMobile = screenWidth <= 768; // 

  return (
    <div className="relative min-h-screen">
      <DetailProfile />
      <Login />
      <Main />
      <WelcomeModal />
      <SkillModal />
      <Toaster position={isMobile ? "top-center" : "top-right"} containerClassName="font-mont" />
    </div>
  );
};

export default Home;

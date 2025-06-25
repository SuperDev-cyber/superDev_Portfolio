"use client";

import { useCurrentDate, useCurrentTime } from "@/hooks/time";
import { useRef, useState } from "react";
import { gsap } from "gsap";
import { useKeyPress } from "@/hooks/key";
import { useClick } from "@/hooks/mouse";
import useAppStore from "@/store/app";
import { Image } from "@heroui/react";
import { ArrowRight } from "lucide-react";

const Login: React.FC = () => {
  const currentTime = useCurrentTime();
  const { date } = useCurrentDate();

  const contentRef = useRef<HTMLDivElement | null>(null);
  const cridentialRef = useRef<HTMLDivElement | null>(null);
  const wrapperRef = useRef<HTMLDivElement | null>(null);

  const [isHide, setIsHide] = useState<boolean>(false);
  const { setAppUser, setOpenModal } = useAppStore();
  const hideDate = () => {
    gsap.to(contentRef.current, {
      duration: 0.2,
      opacity: 0,
      onComplete: () => {
        startCridentialAnimation();
      },
    });
  };

  const hideWrapper = () => {
    gsap.to(wrapperRef.current, {
      duration: 0.5,
      opacity: 0,
      zIndex: 0,
      display: "none"
    });
  };

  const startCridentialAnimation = () => {
    setIsHide(true);
    gsap.to(cridentialRef.current, {
      duration: 0.5,
      opacity: 1,
    });
  };

  const handleEnter = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && isHide) {
      hideWrapper();
      setTimeout(() => setOpenModal(true), 500);
    }
  };

  const changeAppUserValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAppUser(e.currentTarget.value);
  };

  const handleClick = () => {
    hideWrapper();
    setTimeout(() => setOpenModal(true), 500);
  }
  useKeyPress("Enter", hideDate);
  useClick(hideDate);

  return (
    <>
      <div
        ref={wrapperRef}
        className="w-full relative z-50 h-screen bg-cover bg-[url('/assets/images/login.jpg')] flex items-center justify-center"
      >
        <div
          ref={cridentialRef}
          className="absolute z-50 opacity-0 flex flex-col items-center justify-center w-full max-w-[300px] transform -translate-y-[100px]"
        >
          <Image src="/assets/images/me-avatar.png" className="rounded-full mb-10" width={200} height={200} />

          <div className="flex flex-row w-full items-center">
            <input
              type="text"
              placeholder="What's your name ?"
              className="font-mont text-background outline-none h-input pl-3 w-full"
              autoFocus
              onKeyDown={handleEnter} // Change from onChange to onKeyDown
              onChange={(e) => changeAppUserValue(e)}
            />
            <div
              className="bg-gray h-input flex items-center justify-center w-[35px] cursor-pointer"
              onClick={handleClick}
            >
              <ArrowRight />
            </div>
          </div>
        </div>

        <div
          ref={contentRef}
          className={`flex flex-col relative z-20 px-8 py-20 transition-opacity duration-500 w-full h-screen justify-start items-center md:items-start md:justify-end`}
        >
          <span className="text-8xl text-white font-mont font-bold md:text-9xl">{currentTime}</span>
          <span className="text-white text-xl font-mont mb-4 md:text-5xl">{date}</span>
          <span className="text-white text-xs font-mont md:text-base">Please click mouse or press Enter to browse portfolio</span>
        </div>
        <div
          className={`absolute inset-0 z-10 bg-overlay transition-all duration-500 ${isHide ? "backdrop-blur" : ""
            }`}
        />
      </div>
    </>
  );
};

export default Login;

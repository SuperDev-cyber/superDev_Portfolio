// Main.tsx
"use client";

import Image from "next/image";
import TotalFollowers from "./follower";
import PersonalInfo from "./personal";
import ProjectComplete from "./project";
import ExperienceAndSkills from "./experience";
import Testimonial from "./testimonial";
import ContactInfo from "./contact";

import ProjectDrawer from "@/components/custom/drawer/project";
import useAppStore from "@/store/app";
import TestimonialDraw from "@/components/custom/drawer/testimonial";
import { useEffect, useRef } from "react";
import gsap from "gsap";

export default function Main() {

  const { isFinishedOnboarding } = useAppStore();
  const isOnboarding = isFinishedOnboarding ? '' : 'hidden';
  const imageRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (isFinishedOnboarding) {
      animateAvatar();
    }
  }, [isFinishedOnboarding]);

  const animateAvatar = () => {
    gsap.fromTo(imageRef?.current, {
      y: -50, // Slide down effect for the whole section
      opacity: 0,
    }, {
      y: 0,
      opacity: 1,
      ease: "power3.out",
      duration: 1,
    });
  }

  return (
    <main className={`z-10 overflow-hidden bg-black relative min-h-screen min-w-screen gap-4 flex items-center justify-center p-4 ${isOnboarding}`}>
      <div className="relative z-10 grid grid-cols-1 gap-4 sm:grid-cols-1 max-w-[1024px] md:grid-cols-4">
        <div className="flex flex-col gap-4 order-2 md:order-1">
          <ProjectComplete />
          <TotalFollowers />
        </div>
        <div className="flex flex-col gap-4 md:col-span-2 order-1 md:order-2">
          <PersonalInfo />
          <div className="relative flex flex-col items-center bg-card rounded-xl items-center justify-end relative h-[280px] w-full cursor-pointer md:flex-1">
            <div ref={imageRef} className="relative w-full h-full flex flex-col items-center">
            <Image src={'/assets/images/me.png'} alt="Jackson" width={240} height={380}  className="absolute bottom-0 z-10" style={{borderRadius:"5px", bottom:"14px"}} />
            </div>
          </div>
          <ExperienceAndSkills />
        </div>
        <div className="flex flex-col gap-4 order-3 md:order-3">
          <Testimonial />
          <ContactInfo />
        </div>
      </div>
      <div className="absolute right-0 bottom-0 w-[650px] h-[650px] opacity-50 bg-[radial-gradient(rgba(120,40,200,.6),rgba(120,40,200,0))] z-0" />
      <div className="absolute left-0 bottom-0 w-[650px] h-[650px] opacity-50 bg-[radial-gradient(rgba(0,111,238,.6),rgba(0,111,238,0))] z-0" />
      <ProjectDrawer />
      <TestimonialDraw />
    </main>
  );
}

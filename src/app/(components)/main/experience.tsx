import { H1, H5, H6 } from "@/components/basic/heading";
import { EXPERIENCE, SKILLS } from "@/constants/main";
import useAppStore from "@/store/app";
import gsap from "gsap";
import { useEffect, useRef } from "react";

// Define types for EXPERIENCE and SKILLS if not already defined
interface Experience {
    years: number;
    label: string;
}

interface Skills {
    count: number;
}

// Ensure EXPERIENCE and SKILLS are typed
const experience: Experience = EXPERIENCE;
const skills: Skills = SKILLS;

const ExperienceAndSkills: React.FC = () => {
    const { isFinishedOnboarding, setOpenSkillModal, setOpenExperience } = useAppStore();
    const experienceWrapperRef = useRef<HTMLDivElement | null>(null);
    const experienceRef = useRef<HTMLDivElement | null>(null);
    const experienceHeadingRef = useRef<HTMLHeadingElement | null>(null);
    const skillWrapperRef = useRef<HTMLDivElement | null>(null);
    const skillRef = useRef<HTMLDivElement | null>(null);
    const skillHeadingRef = useRef<HTMLHeadingElement | null>(null);

    useEffect(() => {
        if (isFinishedOnboarding) {
            animateComponents();
        }
    }, [isFinishedOnboarding]);

    const animateComponents = () => {
        gsap.from(experienceWrapperRef.current, {
            duration: 1,
            y: -50,
            opacity: 0,
            ease: "power3.out",
        });
        gsap.from([experienceHeadingRef.current, experienceRef.current], {
            duration: 1,
            y: 20,
            opacity: 0,
            stagger: 0.3,
            ease: "power3.out",
            delay: 0.5,
        });

        gsap.from(skillWrapperRef.current, {
            duration: 1,
            y: -50,
            opacity: 0,
        });
        gsap.from([skillHeadingRef.current, skillRef.current], {
            duration: 1,
            y: 20,
            opacity: 0,
            stagger: 0.3,
            ease: "power3.out",
            delay: 0.5,
        });
    };

    return (

        <div className="flex flex-row gap-4 flex-1 max-h-[170px]">
            <div className="flex flex-1" ref={experienceWrapperRef} onClick={() => setOpenExperience(true)}>
                <a target="_blank" href="./pdf/resume.pdf" className="flex flex-col bg-warning p-4 rounded-xl cursor-pointer flex-1 transition-transform duration-500 hover:!scale-105">
                    <H6 className="mb-2" ref={experienceHeadingRef}>Experience</H6>
                    <div className="flex flex-row w-full items-center justify-center flex-1" ref={experienceRef}>
                        <H1>{experience.years}</H1>
                        <H5>{experience.label}</H5>
                    </div>
                </a>
            </div>
            <div className="flex flex-1 relative">
                <div ref={skillWrapperRef} className="flex flex-1" onClick={() => setOpenSkillModal(true)}>
                    <div
                        className={`flex flex-col bg-success p-4 rounded-xl cursor-pointer flex-1 transition-transform duration-500 hover:!scale-105`}
                    >
                        <H6 className="mb-2" ref={skillHeadingRef}>Skills</H6>
                        <div className={`flex flex-col w-full items-center justify-center flex-1`} ref={skillRef}>
                            <H1>{skills.count}</H1>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
};

export default ExperienceAndSkills
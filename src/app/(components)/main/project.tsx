// components/ProjectComplete.tsx
import { PROJECT_COMPLETE } from "@/constants/main";
import { CircularProgressbar } from "react-circular-progressbar";
import useAppStore from "@/store/app";
import { useEffect, useRef } from "react";
import { H4, H6 } from "@/components/basic/heading";
import gsap from "gsap";

const ProjectComplete = () => {
    const { setOpenProjectDrawer, isOpenProjectDrawer, isFinishedOnboarding } = useAppStore();
    const sectionRef = useRef<HTMLDivElement | null>(null);
    const headingRef = useRef<HTMLHeadingElement | null>(null);
    const progressRef = useRef<HTMLDivElement | null>(null);
    const contentRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        if (isFinishedOnboarding) {
            animateProject();
        }
    }, [isFinishedOnboarding]);

    const animateProject = () => {
        gsap.from(sectionRef?.current, {
            duration: 1,
            y: -50, // Slide down effect for the whole section
            opacity: 0,
            ease: "power3.out",
        });

        // Animate each content with stagger
        gsap.from([headingRef?.current, progressRef?.current, contentRef?.current], {
            duration: 1,
            y: 20, // Slight upward motion
            opacity: 0,
            stagger: 0.3, // Stagger the animations with a delay
            ease: "power3.out",
            delay:0.5
        });
    };

    return (
        <div
            ref={sectionRef}
            onClick={() => setOpenProjectDrawer(!isOpenProjectDrawer)}
            className="flex flex-col items-center bg-card p-4 rounded-xl cursor-pointer transition-transform duration-500 hover:!scale-105"
        >
            <H6
                className="mb-5 font-semibold"
                ref={headingRef}
            >
                {PROJECT_COMPLETE?.title}
            </H6>
            <div
                ref={progressRef}
                className="font-mont w-full max-w-[170px] h-full"
            >
                <CircularProgressbar
                    value={PROJECT_COMPLETE?.value}
                    text={`${PROJECT_COMPLETE?.value}%`}
                    styles={{
                        path: {
                            stroke: PROJECT_COMPLETE?.strokeColor,
                        },
                    }}
                />
            </div>
            <div className="flex flex-col items-center pt-5" ref={contentRef}>
                <H4>{PROJECT_COMPLETE?.completedProjects}</H4>
                <span className="font-mont">{PROJECT_COMPLETE?.description}</span>
            </div>
        </div>
    );
};

export default ProjectComplete;

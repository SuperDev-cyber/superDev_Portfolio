// components/PersonalInfo.tsx
import { H5, H6 } from "@/components/basic/heading";
import { PERSONAL_INFO } from "@/constants/main";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import useAppStore from "@/store/app";
import confetti from "canvas-confetti";

const PersonalInfo = () => {
    const { isFinishedOnboarding, setOpenProfileModal } = useAppStore();
    const fullNameWrapperRef = useRef<HTMLDivElement | null>(null);
    const headlineWrapperRef = useRef<HTMLDivElement | null>(null);
    const fullNameRef = useRef<HTMLHeadingElement | null>(null);
    const fullNameHeadingRef = useRef<HTMLHeadingElement | null>(null);
    const headlineHeadingRef = useRef<HTMLHeadingElement | null>(null);
    const headlineRef = useRef<HTMLHeadingElement | null>(null);

    // State for managing headline array and current index
    const [currentHeadlineIndex, setCurrentHeadlineIndex] = useState(0);

    useEffect(() => {
        if (isFinishedOnboarding) {
            animatePersonalInfo();
        }
    }, [isFinishedOnboarding]);

    const animatePersonalInfo = () => {
        // Animate the full name section
        gsap.fromTo(fullNameWrapperRef?.current, {
            y: -50, // Slide down effect for the whole section
            opacity: 0,
        }, {
            y: 0,
            opacity: 1,
            ease: "power3.out",
            duration: 1,
        });

        // Animate content with stagger for full name
        gsap.from([fullNameHeadingRef.current, fullNameRef.current], {
            duration: 1,
            y: 20, // Slight upward motion
            opacity: 0,
            stagger: 0.3, // Stagger the animations with a delay
            ease: "power3.out",
            delay: 0.5
        });

        // Animate the headline section
        gsap.from(headlineWrapperRef.current, {
            duration: 1,
            y: -50, // Slide down effect for the whole section
            opacity: 0,
            ease: "power3.out",
        });

        // Animate content with stagger for headline
        gsap.from([headlineHeadingRef.current, headlineRef.current], {
            duration: 1,
            y: 20, // Slight upward motion
            opacity: 0,
            stagger: 0.3, // Stagger the animations with a delay
            ease: "power3.out",
            delay: 0.5, // Delay for the headline content
        });
    };

    const handleHeadlineClick = () => {
        confetti();
        const nextIndex = (currentHeadlineIndex + 1) % PERSONAL_INFO.headline.length;

        // Fade out the current headline
        gsap.to(headlineRef.current, {
            duration: 0.5,
            opacity: 0,
            y: -20, // Move up
            onComplete: () => {
                // Update the headline index
                setCurrentHeadlineIndex(nextIndex);

                // Fade in the new headline from above
                gsap.fromTo(headlineRef.current, {
                    opacity: 0,
                    y: 20, // Start from above
                }, {
                    duration: 0.5,
                    opacity: 1,
                    y: 0, // Move to original position
                });
            }
        });
    };

    return (
        <div className="flex flex-row gap-4 flex-1 max-h-[170px]">
            <div ref={fullNameWrapperRef} className="flex flex-1">
                <div className="flex flex-col bg-primary p-4 rounded-xl cursor-pointer flex-1 transition-transform duration-500 hover:!scale-105" onClick={() => setOpenProfileModal(true)}>
                    <H6 className="mb-2" ref={fullNameHeadingRef}>Full Name</H6>
                    <H5 ref={fullNameRef}>{PERSONAL_INFO?.fullName}</H5>
                </div>
            </div>
            <div ref={headlineWrapperRef} className="flex flex-1">
                <div className="flex flex-col bg-secondary p-4 rounded-xl cursor-pointer flex-1 transition-transform duration-500 hover:!scale-105" onClick={handleHeadlineClick}>
                    <H6 ref={headlineHeadingRef} className="mb-2">Headline</H6>
                    <H5 ref={headlineRef}>{PERSONAL_INFO.headline[currentHeadlineIndex]}</H5>
                </div>
            </div>
        </div>
    );
};

export default PersonalInfo;

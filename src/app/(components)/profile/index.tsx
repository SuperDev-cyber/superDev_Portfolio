/* eslint-disable  @typescript-eslint/no-explicit-any */

import { H5 } from "@/components/basic/heading";
import { PROFILE_DATA } from "@/constants/profile";
import useAppStore from "@/store/app";
import { Image } from "@heroui/react";
import gsap from "gsap";
import { ExternalLink, X } from "lucide-react";
import { useEffect, useRef } from "react";

const ANIMATION_DURATION = 1;
const STAGGER_DELAY = 0.1;
const INITIAL_OPACITY = 0;
const FINAL_OPACITY = 1;
const INITIAL_Y = 20;
const FINAL_Y = 0;

export default function DetailProfile() {
    const { profileModal, setOpenProfileModal } = useAppStore();
    const leftScreenRef = useRef<HTMLDivElement>(null);
    const rightScreenRef = useRef<HTMLDivElement>(null);
    const imageRef = useRef<HTMLDivElement>(null);
    const nameRef = useRef<HTMLHeadingElement>(null);
    const headlineRef = useRef<HTMLDivElement>(null);
    const infoRefs = useRef<(HTMLDivElement | null)[]>([]);
    const timeline = gsap.timeline();

    useEffect(() => {
        if (profileModal) {
            animateScreen();
        }
    }, [profileModal]);

    const animateScreen = () => {
        timeline.to(leftScreenRef.current, {
            width: "50vw",
            duration: ANIMATION_DURATION,
            ease: "power3.out",
        }, 0);

        timeline.to(rightScreenRef.current, {
            width: "50vw",
            duration: ANIMATION_DURATION,
            ease: "power3.out",
        }, 0);

        timeline.fromTo(imageRef.current, {
            display: "none",
            opacity: INITIAL_OPACITY,
            y: INITIAL_Y
        }, {
            display: "block",
            opacity: FINAL_OPACITY,
            y: FINAL_Y,
            duration: ANIMATION_DURATION,
        });

        timeline.fromTo(nameRef.current, {
            opacity: INITIAL_OPACITY,
            y: INITIAL_Y,
        }, {
            opacity: FINAL_OPACITY,
            y: FINAL_Y,
            duration: 0.5,
        }, "-=0.5");

        timeline.fromTo(headlineRef.current, {
            opacity: INITIAL_OPACITY,
            y: INITIAL_Y,
        }, {
            opacity: FINAL_OPACITY,
            y: FINAL_Y,
            duration: 0.5,
            delay: STAGGER_DELAY, // Slight delay for the headline
        }, "-=0.5");

        infoRefs.current.forEach((ref, index) => {
            if (ref) {
                timeline.fromTo(ref, {
                    opacity: INITIAL_OPACITY,
                    y: INITIAL_Y,
                }, {
                    opacity: FINAL_OPACITY,
                    y: FINAL_Y,
                    duration: 0.5,
                    delay: index * STAGGER_DELAY // Stagger the animations
                }, "-=0.5");
            }
        });
    };

    const closeScreen = () => {
        timeline.reverse().then(() => {
            setOpenProfileModal(false);
        });
    };

    return (
        <div className={`fixed min-h-screen flex flex-col items-center justify-center w-screen z-50 ${profileModal ? '' : 'hidden'}`}>
            <div className="relative font-mont z-10 flex flex-col items-center w-full max-w-[300px]">
                <div ref={imageRef} className="mb-10">
                    <Image src={PROFILE_DATA.avatarSrc} className="rounded-full" width={250} height={250} />
                </div>
                <H5 ref={nameRef}>{PROFILE_DATA.name}</H5>
                <div ref={headlineRef} className="font-mont text-gray flex gap-2 mb-5">
                    {PROFILE_DATA.headline.map((text, index) => (
                        <span key={index}>{text}{index < PROFILE_DATA.headline.length - 1 ? ' |' : ''}</span>
                    ))}
                </div>
                {PROFILE_DATA.info.map((item, index) => (
                    <div key={index} ref={(el: any) => infoRefs.current[index] = el} className="flex justify-between items-center w-full mb-3">
                        {item.icon}
                        <div className="flex items-center gap-2">
                            {item.value}
                            {
                                item.link ?
                                    <a href={item.link} target="_blank">
                                        <ExternalLink className="text-[#686870] cursor-pointer" />
                                    </a>
                                    : null
                            }
                        </div>
                    </div>
                ))}
            </div>
            <div className="absolute top-10 right-10 cursor-pointer text-white z-10" onClick={() => closeScreen()}>
                <X />
            </div>
            <div className="fixed w-[0px] top-0 right-0 bottom-0 bg-card z-0" ref={leftScreenRef} />
            <div className="fixed w-[0px] top-0 left-0 bottom-0 bg-card z-0" ref={rightScreenRef} />
        </div>
    );
}

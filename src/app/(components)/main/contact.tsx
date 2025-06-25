/* eslint-disable  @typescript-eslint/no-explicit-any */

import { H6 } from "@/components/basic/heading";
import { CONTACT_INFO } from "@/constants/main";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import useAppStore from "@/store/app";
import Image from "next/image";

const ContactInfo = () => {
    const { isFinishedOnboarding } = useAppStore();
    const sectionRef = useRef<HTMLDivElement | null>(null);
    const contactRefs = useRef<(HTMLImageElement | null)[]>([]);

    useEffect(() => {
        if (isFinishedOnboarding) {
            animateContactInfo();
        }
    }, [isFinishedOnboarding]);

    const animateContactInfo = () => {
        // Animate the section
        gsap.from(sectionRef.current, {
            duration: 1,
            y: -50,
            opacity: 0,
            ease: "power3.out",
        });

        // Animate all contact images with stagger
        gsap.from(contactRefs.current, {
            duration: 1,
            y: 20,
            opacity: 0,
            stagger: 0.3, // Stagger the animations
            ease: "power3.out",
            delay: 0.5
        });
    };

    return (
        <div ref={sectionRef} className="flex flex-col items-center flex-1 bg-card p-4 rounded-xl cursor-pointer">
            <H6 className="mb-5">Contact Info</H6>
            <div className="grid grid-cols-2 gap-2 pt-5">
                {CONTACT_INFO?.map((contact, index) => (
                    <div className="bg-secondary rounded-3xl" key={contact.alt} ref={(el: any) => (contactRefs.current[index] = el)}>
                        <a href={contact.alt === 'google' ? `mailto:${contact.link}` : contact.link} target={contact.alt === 'google' ? '' : '_blank'}>
                            <Image
                                src={contact.src}
                                className="transition-transform w-full h-auto aspect-square rounded-xl duration-500 hover:!scale-105"
                                alt={contact.alt}
                                width={150}
                                height={150}
                            />
                        </a>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ContactInfo;

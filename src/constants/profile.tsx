// src/constants/profileConstants.ts
import { ProfileData } from "@/types/main";
import { Calendar, Clock, Figma, Github, MapPin } from "lucide-react";

// Create the constant with the defined type
export const PROFILE_DATA: ProfileData = {
    name: "Jackson Franklin",
    headline: ["Root System", "Perazam", "Levenue"],
    avatarSrc: "/assets/images/me-avatar.png",
    info: [
        {
            label: "Location",
            value: "New York, US",
            icon: <MapPin />,
        },
        {
            label: "Birth Date",
            value: "27th, April, 1999",
            icon: <Calendar />,
        },
        {
            label: "Time Zone",
            value: "EST time zone",
            icon: <Clock />,
        },
        {
            label: "GitHub",
            value: "jackson19990427",
            icon: <Github />,
            link : 'https://github.com/SuperDev-cyber'
        },
        {
            label: "Figma",
            value: "jackson19990427",
            icon: <Figma />,
            link : 'https://figma.com/@shinobi8894'
        },
    ],
};

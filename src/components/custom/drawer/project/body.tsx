import { PROJECTS } from "@/constants/project";
import { ProjectDrawerBody } from "@/types/main";
import { DrawerBody, Image } from "@heroui/react";
import { ExternalLink } from "lucide-react";

export default function Body({ currentIndex }: ProjectDrawerBody) {

    const currentProject = PROJECTS[currentIndex];

    return (
        <DrawerBody className="font-mont">
            <a href={currentProject.link} target="_blank" className="relative flex w-full justify-center items-center pt-4">
                <Image
                    isBlurred
                    isZoomed
                    alt="Event image"
                    className="w-full cursor-pointer hover:scale-110"
                    height={300}
                    src={currentProject.image}
                />
            </a>
            <div className="flex flex-col gap-2 py-4">
                <div className="flex justify-between items-center w-full">
                    <div>
                        <h1 className="text-2xl font-bold leading-7">{currentProject.title}</h1>
                        <p className="text-sm text-default-500">{currentProject.description}</p>
                    </div>
                    <a href={currentProject.link} target="_blank">
                        <ExternalLink className="cursor-pointer text-[#686870]" />
                    </a>
                </div>
                <div className="mt-4 flex flex-col gap-3">
                    <div className="flex gap-3 items-center">
                        <Image src={currentProject.client?.profile} width={50} height={50} alt="profile" />
                        <div className="flex flex-col gap-0.5">
                            <p className="text-medium text-foreground font-medium">{currentProject.client?.name}</p>
                            <p className="text-small text-default-500">{currentProject.client?.role}</p>
                        </div>
                    </div>

                    <div className="flex flex-col mt-4 gap-3 items-start">
                        <span className="text-medium font-medium">About the project</span>
                        <div className="text-medium text-default-500 flex flex-col gap-2">
                            {currentProject.detail.map((desc, index) => (
                                <p key={index}>{desc}</p>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </DrawerBody>
    )
}
import { DRAWER } from "@/constants/anime";
import { PROJECTS } from "@/constants/project";
import useAppStore from "@/store/app";
import { Drawer, DrawerContent } from "@heroui/react";
import { useState } from "react";
import Header from "./header";
import Footer from "./footer";
import Body from "./body";

export default function ProjectDrawer() {
    const { setOpenProjectDrawer, isOpenProjectDrawer } = useAppStore();

    const [currentProjectIndex, setCurrentProjectIndex] = useState(0);

    const handleNext = () => {
        if (currentProjectIndex < PROJECTS.length - 1) {
            setCurrentProjectIndex(currentProjectIndex + 1);
        }
    };

    const handlePrev = () => {
        if (currentProjectIndex > 0) {
            setCurrentProjectIndex(currentProjectIndex - 1);
        }
    };

    return (
        <Drawer
            placement="left"
            backdrop="blur"
            classNames={{
                base: "bg-card",
                backdrop: "bg-[rgba(0,0,0,.6)]"
            }}
            isOpen={isOpenProjectDrawer}
            motionProps={DRAWER}
            onOpenChange={() => setOpenProjectDrawer(!isOpenProjectDrawer)}
        >
            <DrawerContent>
                {(onClose) => (
                    <>
                        <Header />
                        <Body currentIndex={currentProjectIndex} />
                        <Footer
                            currentIndex={currentProjectIndex}
                            handleNext={handleNext}
                            handlePrev={handlePrev}
                            onClose={onClose}
                        />
                    </>
                )}
            </DrawerContent>
        </Drawer>
    );
}

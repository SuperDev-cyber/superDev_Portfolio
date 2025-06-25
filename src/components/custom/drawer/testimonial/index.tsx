import { DRAWER_RIGHT } from "@/constants/anime";
import useAppStore from "@/store/app";
import { Drawer, DrawerContent } from "@heroui/react";
import { useState } from "react";
import Header from "./header";
import Footer from "./footer";
import Body from "./body";
import { TESTIMONIAL_DETAIL } from "@/constants/testimonial";

export default function TestimonialDraw() {
    const { setOpenTestimonialDrawer, isOpenTestimonialDrawer } = useAppStore();

    const [currentProjectIndex, setCurrentProjectIndex] = useState(0);

    const handleNext = () => {
        if (currentProjectIndex < TESTIMONIAL_DETAIL.length - 1) {
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
            placement="right"
            backdrop="blur"
            classNames={{
                base: "bg-card",
                backdrop: "bg-[rgba(0,0,0,.6)]"
            }}
            isOpen={isOpenTestimonialDrawer}
            motionProps={DRAWER_RIGHT}
            onOpenChange={() => setOpenTestimonialDrawer(!isOpenTestimonialDrawer)}
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

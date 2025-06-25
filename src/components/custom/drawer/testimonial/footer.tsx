import { TESTIMONIAL_DETAIL } from "@/constants/testimonial";
import { ProjectDrawer } from "@/types/main";
import { DrawerFooter, Button } from "@heroui/react";

export default function Footer({ currentIndex, handleNext, handlePrev, onClose }: ProjectDrawer) {
    return (
        <DrawerFooter>
            <Button className={`h-input font-mont`} variant="light" color="danger" onPress={onClose}>
                Close
            </Button>
            <Button
                className={`h-input font-mont text-white cursor-pointer ${currentIndex === 0 ? 'bg-gray' : 'bg-primary'}`}
                onPress={handlePrev}
                disabled={currentIndex === 0}
            >
                Previous
            </Button>
            <Button
                className={`h-input font-mont text-white ${currentIndex === TESTIMONIAL_DETAIL.length - 1 ? 'bg-gray' : 'bg-primary'}`}
                onPress={handleNext}
                disabled={currentIndex === TESTIMONIAL_DETAIL.length - 1}
            >
                Next
            </Button>
        </DrawerFooter>
    )
}
import { MODAL } from "@/constants/anime";
import useAppStore from "@/store/app";
import {
    Modal,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalFooter,
    Button,
} from "@heroui/react";
import { useEffect } from "react";
import confetti from "canvas-confetti";

export default function WelcomeModal() {
    const { openModal, setOpenModal, appUser, setFinishedOnboarding } = useAppStore();

    useEffect(() => {
        if (openModal) {
            confetti();
        }
    }, [openModal]);


    const handleClose = () => {
        setFinishedOnboarding(true);
        setOpenModal(false);
    }

    return (
        <Modal
            backdrop="opaque"
            isOpen={openModal}
            motionProps={MODAL}
            placement="center"
        >
            <ModalContent className="bg-card">
                {(onClose) => (
                    <>
                        <ModalHeader className="flex flex-col gap-1 font-mont bg-card">
                            👏 Hi {appUser}
                        </ModalHeader>
                        <ModalBody className="font-mont bg-card">
                            <p>
                                Thanks for stopping by! I’m really excited to share my work with you.
                            </p>
                            <p>
                                Just click on any card to dive deeper into the project details and see what I’ve been up to. Take your time, explore, and have fun!
                            </p>
                        </ModalBody>
                        <ModalFooter className="bg-card">
                            <Button onClick={() => handleClose()} className="h-input font-mont" color="danger" variant="light" onPress={onClose}>
                                Close
                            </Button>
                            <Button onClick={() => handleClose()} className="h-input font-mont" color="primary" onPress={onClose}>
                                Play Music
                            </Button>
                        </ModalFooter>
                    </>
                )}
            </ModalContent>
        </Modal>
    );
}
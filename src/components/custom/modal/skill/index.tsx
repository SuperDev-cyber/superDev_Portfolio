import { H6 } from "@/components/basic/heading";
import { MODAL } from "@/constants/anime";
import { SKILLS } from "@/constants/skill";
import useAppStore from "@/store/app";
import {
    Modal,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalFooter,
    Button,
} from "@heroui/react";
import { Badge, Avatar } from "@heroui/react";

export default function SkillModal() {
    const { isOpenSkillModal, setOpenSkillModal } = useAppStore();

    const handleClose = () => {
        setOpenSkillModal(false);
    }

    return (
        <Modal
            backdrop="blur"
            isOpen={isOpenSkillModal}
            motionProps={MODAL}
            placement="center"
            onClose={handleClose}
            classNames={{
                base: "bg-card",
                backdrop: "bg-[rgba(0,0,0,.6)]"
            }}
        >
            <ModalContent className="bg-card">
                {(onClose) => (
                    <>
                        <ModalHeader className="flex flex-col gap-1 font-mont bg-card">
                            Skill set
                        </ModalHeader>
                        <ModalBody className="font-mont bg-card grid grid-cols-5">
                            {SKILLS.map((skill, index) => (
                                <div key={index} className="flex flex-col items-center">
                                    <Badge color={skill.years > 6 ? "danger" : skill.years > 4 ? "primary" : "secondary"} content={skill.years + "y"}>
                                        <Avatar radius="md" size="lg" src={skill.src} />
                                    </Badge>
                                    <H6 className="!text-[13px]">{skill.label}</H6>
                                </div>
                            ))}
                        </ModalBody>
                        <ModalFooter className="bg-card">
                            <Button onClick={handleClose} className="h-input font-mont" color="danger" variant="light" onPress={onClose}>
                                Close
                            </Button>
                        </ModalFooter>
                    </>
                )}
            </ModalContent>
        </Modal>
    );
}

import { TESTIMONIAL_DETAIL } from "@/constants/testimonial";
import { ProjectDrawerBody } from "@/types/main";
import { DrawerBody, Image } from "@heroui/react";

export default function Body({ currentIndex }: ProjectDrawerBody) {

    const currentProject = TESTIMONIAL_DETAIL[currentIndex];

    // Create an array of 5 elements for the stars
    const stars = Array(5).fill(0);

    return (
        <DrawerBody className="font-mont">
            <div className="flex flex-col gap-2 py-4">
                <div className="mt-4 flex flex-col gap-3">
                    <div className="flex w-full justify-between items-center">
                        <div className="flex gap-3 items-center">
                            <Image src={currentProject?.client?.profile} width={50} height={50} alt="profile" />
                            <div className="flex flex-col gap-0.5">
                                <p className="text-medium text-foreground font-medium">{currentProject?.client?.name}</p>
                                <p className="text-small text-default-500">{currentProject?.client?.role}</p>
                            </div>
                        </div>
                    </div>

                    <div className="flex flex-col mt-4 gap-3 items-start mb-5">
                        <span className="text-medium font-medium">Review</span>
                        <div className="text-medium text-default-500 flex flex-col gap-2">
                            {currentProject?.detail?.map((desc, index) => (
                                <p key={index}>{desc}</p>
                            ))}
                        </div>
                    </div>

                    <div className="flex gap-1">
                        {stars.map((_, index) => (
                            <svg key={index} width="20" height="20" viewBox="0 0 50 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M23.2089 1.60489C23.9443 0.124775 26.0557 0.124779 26.7911 1.60489L32.7971 13.6929C33.0883 14.279 33.6479 14.6856 34.2953 14.7814L47.6477 16.7581C49.2826 17.0001 49.935 19.0082 48.7546 20.1649L39.1142 29.6124C38.6467 30.0705 38.433 30.7283 38.5419 31.3736L40.7881 44.6833C41.0632 46.313 39.355 47.554 37.8901 46.7888L25.926 40.5397C25.3458 40.2366 24.6542 40.2366 24.074 40.5396L12.11 46.7888C10.645 47.554 8.93684 46.313 9.21188 44.6833L11.4581 31.3736C11.567 30.7283 11.3533 30.0705 10.8858 29.6124L1.24539 20.1649C0.0649679 19.0081 0.717431 17.0001 2.35235 16.7581L15.7047 14.7814C16.3521 14.6856 16.9117 14.279 17.2029 13.6929L23.2089 1.60489Z" fill="#F5A524" />
                            </svg>
                        ))}
                    </div>

                </div>
            </div>
        </DrawerBody>
    );
}

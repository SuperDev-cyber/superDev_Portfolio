// useScreenWidth.ts
import { useEffect, useState } from 'react';

const useScreenWidth = () => {
    const [screenWidth, setScreenWidth] = useState<number>(0); // Initialize with 0 or a default value

    useEffect(() => {
        const handleResize = () => {
            if (typeof window !== 'undefined') {
                setScreenWidth(window.innerWidth);
            }
        };

        // Set initial width if in the browser
        handleResize();

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return screenWidth;
};

export default useScreenWidth;

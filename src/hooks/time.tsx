import { useEffect, useState } from "react";

export const useCurrentTime = () => {
  const [currentTime, setCurrentTime] = useState("");

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const hours = now.getHours(); // Get hours (0-23)
      const minutes = now.getMinutes(); // Get minutes (0-59)

      // Format time as "H:mm"
      const formattedTime = `${hours}:${minutes < 10 ? "0" : ""}${minutes}`;
      setCurrentTime(formattedTime);
    };

    updateTime(); // Set initial time
    const intervalId = setInterval(updateTime, 1000); // Update every second

    return () => clearInterval(intervalId); // Cleanup on component unmount
  }, []);

  return currentTime;
};

interface CurrentDate {
  date: string;
  day: string;
  month: string;
}

export const useCurrentDate = (): CurrentDate => {
  const [currentDate, setCurrentDate] = useState<CurrentDate>({
    date: "",
    day: "",
    month: "",
  });

  useEffect(() => {
    const updateDate = () => {
      const now = new Date();
      const options: Intl.DateTimeFormatOptions = {
        day: "numeric",
        month: "long",
        weekday: "long",
      };

      const formattedDate = now.toLocaleDateString("en-US", options);
      const day = now.toLocaleString("en-US", { weekday: "long" });
      const month = now.toLocaleString("en-US", { month: "long" });

      setCurrentDate({
        date: formattedDate,
        day: day,
        month: month,
      });
    };

    updateDate(); // Set initial date
    const intervalId = setInterval(updateDate, 1000 * 60 * 60); // Update every hour

    return () => clearInterval(intervalId); // Cleanup on component unmount
  }, []);

  return currentDate;
};

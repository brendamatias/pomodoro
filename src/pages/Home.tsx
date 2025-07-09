import logo from "@/assets/logo.svg";
import play from "@/assets/play.svg";
import pause from "@/assets/pause.svg";
import alarmSound from "@/assets/sounds/alarm.wav";

import { cn } from "@/lib";
import { formatTime } from "@/utils";
import { useEffect, useRef, useState } from "react";

const modes = ["pomodoro", "shortBreak", "longBreak"] as const;

type Mode = (typeof modes)[number];

const modeDurations: Record<Mode, number> = {
  pomodoro: 25 * 60,
  shortBreak: 5 * 60,
  longBreak: 15 * 60,
};

export const Home = () => {
  const [mode, setMode] = useState<Mode>("pomodoro");
  const [timeLeft, setTimeLeft] = useState<number>(modeDurations["pomodoro"]);
  const [isRunning, setIsRunning] = useState(false);
  const [pomodoroCount, setPomodoroCount] = useState(0);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const activeClass =
    "before:content-[''] before:absolute before:left-1/2 before:-translate-x-1/2 before:-bottom-2 before:h-[3px] before:w-12 before:bg-[#F4EDDB]";

  const sendNotification = (title: string, body?: string) => {
    if (Notification.permission === "granted") {
      new Notification(title, { body });
    }
  };

  const playAlarm = () => {
    const audio = new Audio(alarmSound);
    audio.play();
  };

  useEffect(() => {
    setTimeLeft(modeDurations[mode]);
    setIsRunning(false);
    if (intervalRef.current) clearInterval(intervalRef.current);
  }, [mode]);

  useEffect(() => {
    if (!isRunning) return;

    intervalRef.current = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(intervalRef.current!);
          playAlarm();

          if (mode === "pomodoro") {
            const newCount = pomodoroCount + 1;
            setPomodoroCount(newCount);

            if (newCount % 4 === 0) {
              setMode("longBreak");
              sendNotification("Hora do descanso longo!", "Aproveita bem!");
            } else {
              setMode("shortBreak");
              sendNotification("Hora do descanso!", "Faça uma pausa rápida.");
            }
          } else {
            setMode("pomodoro");
            sendNotification(
              "Vamos voltar ao foco!",
              "Novo Pomodoro iniciado."
            );
          }

          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(intervalRef.current!);
  }, [isRunning, mode, pomodoroCount]);

  useEffect(() => {
    if ("Notification" in window && Notification.permission !== "granted") {
      Notification.requestPermission();
    }
  }, []);

  return (
    <div className="flex flex-col justify-center gap-[50px]">
      <img src={logo} alt="Logo" className="mx-auto" />

      <div className="flex justify-center items-center gap-6 sm:gap-10">
        {modes?.map((item) => (
          <button
            key={item}
            onClick={() => {
              setMode(item);
              if (item === "pomodoro") setPomodoroCount(0);
            }}
            className={cn(
              "relative cursor-pointer text-sm sm:text-lg font-bold transition-colors duration-200",
              mode === item && activeClass
            )}
          >
            {
              {
                pomodoro: "Pomodoro",
                shortBreak: "Descanso",
                longBreak: "Longo Descanso",
              }[item]
            }
          </button>
        ))}
      </div>

      <h1 className="text-[90px] sm:text-[200px] font-extrabold text-center">
        {formatTime(timeLeft)}
      </h1>

      <div className="flex justify-center">
        <button
          className="cursor-pointer"
          onClick={() => setIsRunning((prev) => !prev)}
        >
          <img
            src={isRunning ? pause : play}
            alt={isRunning ? "Pause" : "Play"}
            className="w-[54px] h-[54px] sm:w-[78px] sm:h-[78px]"
          />
        </button>
      </div>
    </div>
  );
};

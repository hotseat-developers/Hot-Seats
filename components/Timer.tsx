import React from "react"
import { useTimer } from "react-timer-hook"
import type { FC } from "react"
import { useAudio } from "react-use"
import { useToast } from "use-toast-mui"



type ExpiryTimestamp ={
    expiryTimestamp:Date
}
const Timers: FC<ExpiryTimestamp> = ({expiryTimestamp}) => {
    const {
        seconds,
        minutes,
        hours,
        days,
        isRunning,
        start,
        pause,
        resume,
        restart,
    } = useTimer({
        expiryTimestamp,
        onExpire: () => controls.play()
    })
    const toast = useToast()
    const [audio, state, controls, ref] = useAudio({
        src: "https://www.myinstants.com/media/sounds/wrong-answer-sound-effect.mp3",
        autoPlay: false
      });

    return (

        <div style={{ textAlign: "center" }}>
            {audio}
            <div style={{ fontSize: "100px" }}>
                <span>{hours}</span>:<span>{minutes}</span>:
                <span>{seconds}</span>
            </div>
            <p>{isRunning ? "Running" : "Not running"}</p>
            <button onClick={start}>Start</button>

            <button
                onClick={() => {
                    // Restarts to 5 minutes timer
                    const time = new Date()
                    time.setSeconds(time.getSeconds() + 10)
                    restart(time)
                }}
            >
                Restart
            </button>
        </div>
    )
}

export default function Timer() {
    const time = new Date()
    time.setSeconds(time.getSeconds() + 10) // 10 second timer
    return (
        <div>
            <Timers expiryTimestamp={time} />
        </div>
    )
}

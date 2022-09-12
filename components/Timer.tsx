import React from "react"
import { useTimer } from "react-timer-hook"
import type { FC } from "react"

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
        onExpire: () => console.warn("onExpire called"),
    })

    return (
        <div style={{ textAlign: "center" }}>

            <div style={{ fontSize: "100px" }}>
                <span>{days}</span>:<span>{hours}</span>:<span>{minutes}</span>:
                <span>{seconds}</span>
            </div>
            <p>{isRunning ? "Running" : "Not running"}</p>
            <button onClick={start}>Start</button>

            <button
                onClick={() => {
                    // Restarts to 5 minutes timer
                    const time = new Date()
                    time.setSeconds(time.getSeconds() + 600)
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
    time.setSeconds(time.getSeconds() + 800) // 10 minutes timer
    return (
        <div>
            <Timers expiryTimestamp={time} />
        </div>
    )
}

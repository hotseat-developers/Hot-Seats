import type { FC } from 'react'

type ErrorMessageProps = {
    message?: string
}

const ErrorMessage: FC<ErrorMessageProps> = ({ message }) => {
    return (
        <>
            { message && (
                <p className="shadow-xl rounded-md shadow-hero-yellow mt-2 p-2 bg-black bg-opacity-50">{message}</p>
            )}
        </>
    )
}

export default ErrorMessage

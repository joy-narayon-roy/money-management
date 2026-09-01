import React from 'react'
import style from '../styles/components/input.module.css'
interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
    error?: string | null;
}

export default function Input(props: Props) {
    const { error = undefined, ...attrs } = props
    return (
        <input
            {...attrs}
            className={`${style.input} ${error && style.error}`}
        />
    )
}
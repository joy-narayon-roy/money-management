import React from 'react'
import style from '../styles/components/input.module.css'

interface Props extends React.SelectHTMLAttributes<HTMLSelectElement> {
    error?: string|null;
    options?: { label: string | number, value: string | number }[]
}
export default function SelectInput(props: Props) {
    const {
        error,
        className = "",
        options = [],
        ...attrs } = props
    return (
        <select
            {...attrs}
            className={`${style.input} ${error && style.error} ${className}`}
        >
            {options.map((opt, i) => <option key={i} value={opt.value}>{opt.label}</option>)}
        </select>
    )
}

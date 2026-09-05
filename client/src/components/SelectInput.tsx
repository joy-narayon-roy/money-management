import React from 'react'
import style from './styles/input.module.css'

export interface SelectOption {
    label: string | number,
    value: string | number
}

interface Props extends React.SelectHTMLAttributes<HTMLSelectElement> {
    error?: string | null;
    options?: SelectOption[]
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

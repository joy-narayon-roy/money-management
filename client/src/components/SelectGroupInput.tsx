import React from "react";

import inputStyle from "./styles/input.module.css";
import type { GroupOption, Option } from "../types/select_option";


interface Props extends React.SelectHTMLAttributes<HTMLSelectElement> {
    options?: GroupOption[];
    error?: string | null;
}

function isOption(
    option: Option | GroupOption
): option is Option {
    return typeof option.value !== "object";
}

function isGroupOption(
    option: Option | GroupOption
): option is GroupOption {
    return Array.isArray(option.value);
}

function GroupOption({
    option,
}: {
    option?: GroupOption | Option;
}) {

    if (!option) {
        return null;
    }

    // A normal option
    if (isOption(option)) {
        return (
            <option value={option.value}>
                {option.label}
            </option>
        );
    }

    // A group containing options or nested groups
    if (isGroupOption(option)) {
        return (
            <optgroup label={option.label}>
                {option.value.map((item, index) => (
                    <GroupOption
                        key={`${option.label}-${index}`}
                        option={item}
                    />
                ))}
            </optgroup>
        );
    }

    return null;
}

export default function SelectGroupInput({ options = [], error, ...attrs }: Props) {
    return (
        <select
            {...attrs}
            className={`${inputStyle.input} ${error && inputStyle.error}`}

        >
            {options.map((option, index) => (
                <GroupOption
                    key={`${option.label}-${index}`}
                    option={option}
                />
            ))}
        </select>
    );
}

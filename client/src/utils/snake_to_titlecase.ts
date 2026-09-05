export default function snake_to_titlecase(str: string): string {
    return str
        .toLowerCase()
        .split("_")
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(" ");
}


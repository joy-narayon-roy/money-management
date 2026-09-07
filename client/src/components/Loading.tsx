import { LoaderCircle } from "lucide-react";

interface LoadingProps {
    text?: string;
    fullScreen?: boolean;
    icone_color?: string
}

export function Loading({
    text,
    fullScreen = false,
    icone_color
}: LoadingProps) {
    return (
        <div
            className={[
                "flex items-center justify-center gap-3",
                fullScreen ? "min-h-screen" : "py-10",
            ].join(" ")}
        >
            <LoaderCircle className={`h-5 w-5 animate-spin ${icone_color || "text-primary"}`} />

            {text && <span className="text-sm text-muted-foreground">
                {text}
            </span>
            }        </div>
    );
}
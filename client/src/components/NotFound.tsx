import { ArrowLeft, FileQuestion } from "lucide-react";
import { Link } from "react-router-dom";

interface NotFoundProps {
    title?: string;
    description?: string;
}

export function NotFound({
    title = "Page not found",
    description = "Sorry, we couldn't find the page you're looking for.",
}: NotFoundProps) {
    return (
        <div className="flex min-h-[70vh] flex-col items-center justify-center px-6 text-center">
            <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-muted">
                <FileQuestion className="h-8 w-8 text-muted-foreground" />
            </div>

            <p className="mb-2 text-sm font-medium text-muted-foreground">
                404
            </p>

            <h1 className="text-3xl font-bold tracking-tight">
                {title}
            </h1>

            <p className="mt-3 max-w-md text-sm text-muted-foreground">
                {description}
            </p>

            <Link
                to="../"
                className="mt-6 inline-flex items-center gap-2 rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
            >
                <ArrowLeft className="h-4 w-4" />
                Back to home
            </Link>
        </div>
    );
}

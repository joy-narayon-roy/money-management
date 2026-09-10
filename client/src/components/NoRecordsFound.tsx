import { FileSearch } from "lucide-react";

type NoRecordsFoundProps = {
    message?: string;
};

const NoRecordsFound = ({
    message = "No records found",
}: NoRecordsFoundProps) => {
    return (
        <div className="flex min-h-60 flex-col items-center justify-center px-4 py-8 text-center">
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-background">
                <FileSearch
                    size={24}
                    strokeWidth={1.8}
                    className="text-text-disable"
                />
            </div>

            <h3 className="text-sm font-semibold text-text-primary">
                {message}
            </h3>

            <p className="mt-1 text-sm text-text-secondary">
                There are no records to display.
            </p>
        </div>
    );
};

export default NoRecordsFound;
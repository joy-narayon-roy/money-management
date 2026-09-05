import { Fragment } from "react";
import { Link } from "react-router-dom";
import LinkButton from "../LinkButton";
import { Plus } from "lucide-react";

type BreadcrumbItem = {
    label: string;
    to?: string;
};

type Props = {
    breadcrumbs?: BreadcrumbItem[];
    title?: string;
    description?: string;
    create_button_path?: string
    create_button_text?: string
};

const DEFAULT_BREADCRUMBS: BreadcrumbItem[] = [
    // { label: "Home", to: "/" },
];

export default function PageHeading(props: Props) {
    const title = props.title || "Page Heading";
    const description = props.description || "";
    const breadcrumbs =
        props.breadcrumbs && props.breadcrumbs.length > 0
            ? props.breadcrumbs
            : DEFAULT_BREADCRUMBS;
    const { create_button_path, create_button_text = "" } = props

    return (
        <section className="mb-4 flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
            <div>
                <div className="flex items-center gap-2 text-sm text-gray-500">
                    {breadcrumbs.map((item, i) => {
                        const isLast = i === breadcrumbs.length - 1;
                        return (
                            <Fragment key={`${item.label}-${i}`}>
                                {i > 0 && <span>/</span>}
                                {item.to && !isLast ? (
                                    <Link to={item.to} className="hover:text-gray-700">
                                        {item.label}
                                    </Link>
                                ) : (
                                    <span className={isLast ? "text-gray-700" : ""}>
                                        {item.label}
                                    </span>
                                )}
                            </Fragment>
                        );
                    })}
                </div>

                <h1 className="text-[28px] font-semibold tracking-[-0.03em] text-primary-dark">
                    {title}
                </h1>

                {description && (
                    <p className="text-sm text-primary">{description}</p>
                )}


            </div>
            {create_button_path && <LinkButton to={create_button_path}>
                <Plus
                    className="h-4.5 w-4.5"
                    strokeWidth={2.2}
                />
                {create_button_text}
            </LinkButton>
            }
        </section>
    );
}
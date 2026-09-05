import { Search } from "lucide-react";

type Props = {
    search?: string
    updateSearch?: (search: string) => void
}
export default function SearchBar(props: Props) {
    const {
        search = "",
        updateSearch = () => { }
    } = props
    return (
        <div className="relative flex-1">
            <Search
                className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#94A3B8]"
                size={17}
            />

            <input
                type="text"
                value={search}
                onChange={(event) => updateSearch(event.target.value)}
                placeholder="Search parties..."
                className="h-11 w-full rounded-xl border-0 bg-background pl-10 pr-4 text-sm text-text-primary outline-none ring-1 ring-inset ring-[#E2E8F0] placeholder:text-[#94A3B8] transition-all focus:bg-white focus:ring-2 focus:ring-[#10B981]/30"
            />
        </div>

    )
}

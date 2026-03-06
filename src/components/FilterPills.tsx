

const categories = [
    "TODAS LAS COLECCIONES",
    "NICHO",
    "ÁRABE",
    "DISEÑADOR",
];

interface FilterPillsProps {
    activeCategory: string;
    onCategoryChange: (category: string) => void;
}

export default function FilterPills({ activeCategory, onCategoryChange }: FilterPillsProps) {
    return (
        <div className="flex items-center justify-start md:justify-center gap-2 overflow-x-auto py-2 w-full max-w-2xl px-0 scrollbar-hide">
            {categories.map((category) => (
                <button
                    key={category}
                    onClick={() => onCategoryChange(category)}
                    className={`px-5 py-2 rounded-full text-sm font-medium transition-colors whitespace-nowrap flex-shrink-0 ${activeCategory === category
                        ? "bg-[#065A65] text-white border border-[#065A65]"
                        : "bg-[#E5EBEB] text-[#1D323C] border border-[#CBD5D8] hover:bg-[#d8e0e0]"
                        }`}
                >
                    {category}
                </button>
            ))}
            <button className="flex items-center justify-center w-[38px] h-[38px] rounded-full bg-[#E5EBEB] text-[#1D323C] border border-[#CBD5D8] hover:bg-[#d8e0e0] flex-shrink-0 ml-1">
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="w-5 h-5"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M10.5 6h9.75M10.5 6a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zm0 0H3.75m10.5 6h5.25m-5.25 0a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zm0 0H3.75m10.5 6h5.25m-5.25 0a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zm0 0H3.75"
                    />
                </svg>
            </button>
        </div>
    );
}

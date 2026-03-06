interface SearchProps {
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function Search({ value, onChange }: SearchProps) {
    return (
        <div className="flex items-center w-full max-w-2xl px-4 py-3 bg-white border border-slate-200 rounded-full shadow-sm focus-within:border-blue-500 focus-within:ring-1 focus-within:ring-blue-500">
            <svg
                className="w-5 h-5 text-slate-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
            >
                <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                ></path>
            </svg>
            <input
                type="search"
                value={value}
                onChange={onChange}
                placeholder="Buscar perfume..."
                className="w-full ml-3 text-sm text-slate-700 bg-transparent outline-none placeholder:text-slate-400 placeholder:font-light"
            />
        </div>
    );
}

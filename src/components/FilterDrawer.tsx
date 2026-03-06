import { useState } from 'react';

export interface FilterState {
    sortBy: string;
    minPrice: number | '';
    maxPrice: number | '';
    inStockOnly: boolean;
    gender: string[];
    olfactoryFamily: string[];
    intensity: string[];
    bestTime: string[];
}

interface FilterDrawerProps {
    isOpen: boolean;
    onClose: () => void;
    onApplyFilters: (filters: FilterState) => void;
}

const defaultFilters: FilterState = {
    sortBy: 'news',
    minPrice: '',
    maxPrice: '',
    inStockOnly: false,
    gender: [],
    olfactoryFamily: [],
    intensity: [],
    bestTime: [],
};

export default function FilterDrawer({ isOpen, onClose, onApplyFilters }: FilterDrawerProps) {
    const [filters, setFilters] = useState<FilterState>(defaultFilters);

    if (!isOpen) return null;

    const toggleArrayItem = (array: string[], item: string) => {
        if (array.includes(item)) {
            return array.filter((i) => i !== item);
        }
        return [...array, item];
    };

    const handleApply = () => {
        onApplyFilters(filters);
        onClose();
    };

    const handleClear = () => {
        setFilters(defaultFilters);
    };

    return (
        <div className="fixed inset-0 z-[60] flex justify-end">
            {/* Overlay */}
            <div
                className="absolute inset-0 bg-black/40 backdrop-blur-sm transition-opacity"
                onClick={onClose}
            ></div>

            {/* Drawer */}
            <div className="relative w-full max-w-sm h-full bg-white shadow-2xl flex flex-col transform transition-transform duration-300 ease-in-out">
                {/* Header */}
                <div className="flex items-center justify-between px-6 py-5 border-b border-gray-100">
                    <h2 className="text-xl font-bold text-[#172535]">Filtros</h2>
                    <button
                        onClick={onClose}
                        className="p-2 text-gray-400 hover:text-gray-600 rounded-full hover:bg-gray-100 transition-colors"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>

                {/* Content */}
                <div className="flex-1 overflow-y-auto p-6 space-y-8 scrollbar-hide">

                    {/* Ordenar Por */}
                    <div className="space-y-3">
                        <label className="text-xs font-bold text-gray-400 tracking-wider uppercase">Ordenar Por</label>
                        <div className="relative">
                            <select
                                value={filters.sortBy}
                                onChange={(e) => setFilters({ ...filters, sortBy: e.target.value })}
                                className="w-full appearance-none bg-white border border-gray-200 text-gray-700 py-2.5 px-4 rounded-lg outline-none focus:border-[#065A65] focus:ring-1 focus:ring-[#065A65]"
                            >
                                <option value="news">Lo más nuevo</option>
                                <option value="price_asc">Precio: de menor a mayor</option>
                                <option value="price_desc">Precio: de mayor a menor</option>
                            </select>
                            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-gray-500">
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                            </div>
                        </div>
                    </div>

                    {/* Rango de Precio */}
                    <div className="space-y-4">
                        <label className="text-xs font-bold text-gray-400 tracking-wider uppercase">Rango de Precio</label>

                        <div className="pt-3 pb-3 relative">
                            {/* Track Base */}
                            <div className="absolute w-full h-1.5 bg-gray-200 rounded-full left-0 top-1/2 -translate-y-1/2"></div>

                            {/* Active Track */}
                            <div
                                className="absolute h-1.5 bg-[#065A65] rounded-full top-1/2 -translate-y-1/2"
                                style={{
                                    left: `${Math.min(100, Math.max(0, ((Number(filters.minPrice) || 0) / 500) * 100))}%`,
                                    right: `${100 - Math.min(100, Math.max(0, ((filters.maxPrice === '' ? 500 : Number(filters.maxPrice)) / 500) * 100))}%`
                                }}
                            ></div>

                            {/* Min Slider */}
                            <input
                                type="range"
                                min="0"
                                max="500"
                                value={filters.minPrice || 0}
                                onChange={(e) => {
                                    const value = Math.min(Number(e.target.value), filters.maxPrice === '' ? 500 : Number(filters.maxPrice));
                                    setFilters({ ...filters, minPrice: value });
                                }}
                                className="absolute w-full top-1/2 -translate-y-1/2 h-5 left-0 appearance-none bg-transparent pointer-events-none [&::-webkit-slider-thumb]:pointer-events-auto [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-5 [&::-webkit-slider-thumb]:h-5 [&::-webkit-slider-thumb]:cursor-pointer [&::-webkit-slider-thumb]:bg-[#065A65] [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:shadow-md"
                            />

                            {/* Max Slider */}
                            <input
                                type="range"
                                min="0"
                                max="500"
                                value={filters.maxPrice === '' ? 500 : filters.maxPrice}
                                onChange={(e) => {
                                    const value = Math.max(Number(e.target.value), Number(filters.minPrice) || 0);
                                    setFilters({ ...filters, maxPrice: value });
                                }}
                                className="absolute w-full top-1/2 -translate-y-1/2 h-5 left-0 appearance-none bg-transparent pointer-events-none [&::-webkit-slider-thumb]:pointer-events-auto [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-5 [&::-webkit-slider-thumb]:h-5 [&::-webkit-slider-thumb]:cursor-pointer [&::-webkit-slider-thumb]:bg-[#065A65] [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:shadow-md"
                            />
                        </div>

                        <div className="flex items-center gap-4">
                            <div className="flex-1">
                                <label className="text-[10px] text-gray-400 font-semibold uppercase mb-1 block">Mín</label>
                                <div className="relative">
                                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">$</span>
                                    <input
                                        type="number"
                                        value={filters.minPrice}
                                        onChange={(e) => setFilters({ ...filters, minPrice: e.target.value ? Number(e.target.value) : '' })}
                                        className="w-full border border-gray-200 rounded-lg py-2 pl-7 pr-3 text-sm focus:border-[#065A65] outline-none" placeholder="0"
                                    />
                                </div>
                            </div>
                            <div className="flex-1">
                                <label className="text-[10px] text-gray-400 font-semibold uppercase mb-1 block">Máx</label>
                                <div className="relative">
                                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">$</span>
                                    <input
                                        type="number"
                                        value={filters.maxPrice}
                                        onChange={(e) => setFilters({ ...filters, maxPrice: e.target.value ? Number(e.target.value) : '' })}
                                        className="w-full border border-gray-200 rounded-lg py-2 pl-7 pr-3 text-sm focus:border-[#065A65] outline-none" placeholder="500"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Disponibilidad */}
                    <div className="flex items-center justify-between">
                        <label className="text-xs font-bold text-gray-400 tracking-wider uppercase">Disponibilidad</label>
                        <div className="flex items-center gap-3">
                            <button
                                onClick={() => setFilters({ ...filters, inStockOnly: !filters.inStockOnly })}
                                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${filters.inStockOnly ? 'bg-[#065A65]' : 'bg-gray-200'}`}
                            >
                                <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${filters.inStockOnly ? 'translate-x-6' : 'translate-x-1'}`} />
                            </button>
                            <span className="text-sm text-[#334155]">Solo disponibles</span>
                        </div>
                    </div>

                    {/* Género */}
                    <div className="space-y-3">
                        <label className="text-xs font-bold text-gray-400 tracking-wider uppercase">Género</label>
                        <div className="flex flex-wrap gap-2">
                            {['Mujer', 'Hombre', 'Unisex'].map(g => (
                                <button
                                    key={g}
                                    onClick={() => setFilters({ ...filters, gender: toggleArrayItem(filters.gender, g) })}
                                    className={`px-4 py-1.5 rounded-lg text-sm font-medium transition-colors ${filters.gender.includes(g) ? 'bg-[#065A65] text-white' : 'bg-[#F1F5F9] text-[#475569] hover:bg-gray-200'}`}
                                >
                                    {g}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Familia Olfativa */}
                    <div className="space-y-3">
                        <label className="text-xs font-bold text-gray-400 tracking-wider uppercase">Familia Olfativa</label>
                        <div className="space-y-2.5">
                            {['Floral', 'Dulce', 'Amaderado', 'Especiado', 'Cítrico'].map(family => (
                                <label key={family} className="flex items-center gap-3 cursor-pointer">
                                    <div className={`w-5 h-5 rounded flex items-center justify-center border transition-colors ${filters.olfactoryFamily.includes(family) ? 'bg-[#065A65] border-[#065A65]' : 'border-gray-300 bg-white'}`}>
                                        {filters.olfactoryFamily.includes(family) && (
                                            <svg className="w-3.5 h-3.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                                            </svg>
                                        )}
                                    </div>
                                    <input
                                        type="checkbox"
                                        className="hidden"
                                        checked={filters.olfactoryFamily.includes(family)}
                                        onChange={() => setFilters({ ...filters, olfactoryFamily: toggleArrayItem(filters.olfactoryFamily, family) })}
                                    />
                                    <span className="text-sm text-[#475569]">{family}</span>
                                </label>
                            ))}
                        </div>
                    </div>

                    {/* Intensidad */}
                    <div className="space-y-3">
                        <label className="text-xs font-bold text-gray-400 tracking-wider uppercase">Intensidad</label>
                        <div className="flex flex-wrap gap-2">
                            {['Baja', 'Media', 'Alta'].map(i => (
                                <button
                                    key={i}
                                    onClick={() => setFilters({ ...filters, intensity: toggleArrayItem(filters.intensity, i) })}
                                    className={`px-4 py-1.5 rounded-lg text-sm font-medium transition-colors ${filters.intensity.includes(i) ? 'bg-[#065A65] text-white' : 'bg-[#F1F5F9] text-[#475569] hover:bg-gray-200'}`}
                                >
                                    {i}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Momento de Uso */}
                    <div className="space-y-3">
                        <label className="text-xs font-bold text-gray-400 tracking-wider uppercase">Momento de Uso</label>
                        <div className="flex flex-wrap gap-2">
                            {['Día', 'Noche', 'Día y Noche'].map(time => (
                                <button
                                    key={time}
                                    onClick={() => setFilters({ ...filters, bestTime: toggleArrayItem(filters.bestTime, time) })}
                                    className={`flex items-center gap-1.5 px-4 py-1.5 rounded-lg text-sm font-medium transition-colors ${filters.bestTime.includes(time) ? 'bg-[#065A65] text-white' : 'bg-[#F1F5F9] text-[#475569] hover:bg-gray-200'}`}
                                >
                                    {time === 'Día' && <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" /></svg>}
                                    {time === 'Noche' && <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" /></svg>}
                                    {time === 'Día y Noche' && <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" /></svg>}
                                    {time}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Footer fixed */}
                <div className="p-6 border-t border-gray-100 flex gap-3 bg-white">
                    <button
                        onClick={handleClear}
                        className="flex-1 py-3 px-4 bg-[#F8FAFC] text-[#475569] font-semibold rounded-xl hover:bg-gray-100 transition-colors"
                    >
                        Limpiar
                    </button>
                    <button
                        onClick={handleApply}
                        className="flex-[2] py-3 px-4 bg-[#065A65] text-white font-semibold rounded-xl hover:bg-[#054952] transition-colors shadow-sm"
                    >
                        Aplicar Filtros
                    </button>
                </div>
            </div>
        </div>
    );
}

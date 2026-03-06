interface ProductCardProps {
    image?: string;
    brand?: string;
    name?: string;
    price?: number;
    isAvailable?: boolean;
    onClick?: () => void;
}

export default function ProductCard({
    image = "https://imgs.search.brave.com/fYkD5wfC_-Rme5c7BsUqQrc85GwiSHKVsArtXOFqpBc/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly90My5m/dGNkbi5uZXQvanBn/LzA2LzQzLzk3LzA4/LzM2MF9GXzY0Mzk3/MDg2OV9xWVduenp1/em5iTU83VGF5bVFp/cndNblE1ZmlRSFpi/dS5qcGc",
    brand = "MAISON FRANCIS KURKDJIAN",
    name = "Baccarat Rouge 540",
    price = 120.00,
    isAvailable = true,
    onClick,
}: ProductCardProps) {
    return (
        <div className="flex flex-col h-full w-full max-w-[280px] mx-auto font-sans group cursor-pointer" onClick={onClick}>
            <div className="relative rounded-2xl overflow-hidden aspect-[4/4.5] bg-[#E1D1AA] mb-4 flex-shrink-0">
                <img
                    src={image}
                    alt={name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
            </div>

            <div className="flex flex-col flex-grow px-1">
                {isAvailable ? (
                    <div className="flex items-center gap-1.5 mb-2">
                        <div className="w-1.5 h-1.5 rounded-full bg-[#18A97A]"></div>
                        <span className="text-[#18A97A] text-[10px] font-bold tracking-widest">
                            DISPONIBLE
                        </span>
                    </div>
                ) : (
                    <div className="flex items-center gap-1.5 mb-2">
                        <div className="w-1.5 h-1.5 rounded-full bg-gray-400"></div>
                        <span className="text-gray-500 text-[10px] font-bold tracking-widest uppercase">
                            AGOTADO
                        </span>
                    </div>
                )}

                <h3 className="text-[#205A65] text-[10px] font-bold tracking-widest uppercase mb-1 line-clamp-2">
                    {brand}
                </h3>

                <h2 className="text-[#172535] text-lg font-medium leading-tight mb-1.5 line-clamp-2">
                    {name}
                </h2>

                <p className="text-[#172535] font-semibold text-base mt-auto pt-2">
                    ${price.toFixed(2)}
                </p>
            </div>
        </div>
    );
}

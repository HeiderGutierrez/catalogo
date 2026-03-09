import type { Product } from '../types/product';

interface ProductModalProps {
    isOpen: boolean;
    onClose: () => void;
    product: Product | null;
}

export default function ProductModal({ isOpen, onClose, product }: ProductModalProps) {
    if (!isOpen || !product) return null;

    const handleWhatsAppClick = () => {
        const phoneNumber = "573192032125"; // Adding country code for Colombia
        const message = `Hola, estoy interesado en el perfume ${product.brand} - ${product.name}. ¿Me puedes dar más información?`;
        const encodedMessage = encodeURIComponent(message);
        const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
        window.open(whatsappUrl, '_blank');
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm z-50">
            <div className="relative flex flex-col md:flex-row w-full max-w-4xl bg-white rounded-2xl shadow-xl overflow-hidden max-h-[90vh] overflow-y-auto">

                {/* Botón Cerrar (Mobile, absolute in container) */}
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 z-10 flex items-center justify-center w-8 h-8 rounded-full bg-[#F3F4F6] text-[#4B5563] hover:bg-[#E5E7EB] transition-colors md:hidden"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>

                {/* Sección Izquierda - Imagen */}
                <div className="w-full md:w-1/2 p-8 md:p-12 flex items-center justify-center border-b md:border-b-0 md:border-r border-gray-100">
                    <img
                        src={product.image}
                        alt={product.name}
                        className="w-full max-w-sm aspect-square object-cover shadow-[0_10px_30px_rgba(0,0,0,0.15)] rounded-sm"
                    />
                </div>

                {/* Sección Derecha - Detalles */}
                <div className="w-full md:w-1/2 p-8 md:p-10 flex flex-col">
                    {/* Botón Cerrar (Desktop, absolute in right section) */}
                    <button
                        onClick={onClose}
                        className="hidden md:flex absolute top-6 right-6 items-center justify-center w-8 h-8 rounded-full bg-[#F3F4F6] text-[#4B5563] hover:bg-[#E5E7EB] transition-colors"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>

                    <h3 className="text-[#205A65] text-xs font-bold tracking-widest uppercase mb-2">
                        {product.brand}
                    </h3>
                    <h2 className="text-[#172535] text-3xl font-bold mb-3">
                        {product.name}
                    </h2>

                    <div className="flex items-center gap-4 mb-6">
                        <span className="text-[#205A65] text-2xl font-bold">{new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP', minimumFractionDigits: 0 }).format(product.price)}</span>
                        {product.isAvailable ? (
                            <div className="flex items-center gap-1.5 bg-[#D4F4E4] px-2.5 py-1 rounded-full">
                                <div className="w-1.5 h-1.5 rounded-full bg-[#18A97A]"></div>
                                <span className="text-[#128E66] text-[10px] font-bold tracking-widest">
                                    DISPONIBLE
                                </span>
                            </div>
                        ) : (
                            <div className="flex items-center gap-1.5 bg-gray-100 px-2.5 py-1 rounded-full">
                                <div className="w-1.5 h-1.5 rounded-full bg-gray-400"></div>
                                <span className="text-gray-500 text-[10px] font-bold tracking-widest uppercase">
                                    Agotado
                                </span>
                            </div>
                        )}
                    </div>

                    {/* Cajas de Estadísticas */}
                    <div className="grid grid-cols-3 gap-3 mb-8">
                        <div className="flex flex-col items-center justify-center p-3 rounded-lg bg-[#F8FAFC] border border-gray-100 text-center">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 text-[#205A65] mb-1">
                                <path fillRule="evenodd" d="M7.5 6a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM3.751 20.105a8.25 8.25 0 0116.498 0 .75.75 0 01-.437.695A18.683 18.683 0 0112 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 01-.437-.695z" clipRule="evenodd" />
                            </svg>
                            <span className="text-[10px] text-gray-500 font-semibold uppercase tracking-wider mb-0.5">GÉNERO</span>
                            <span className="text-sm text-[#172535] font-medium">{product.gender}</span>
                        </div>
                        <div className="flex flex-col items-center justify-center p-3 rounded-lg bg-[#F8FAFC] border border-gray-100 text-center">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 text-[#205A65] mb-1">
                                <path fillRule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zM12.75 6a.75.75 0 00-1.5 0v6c0 .414.336.75.75.75h4.5a.75.75 0 000-1.5h-3.75V6z" clipRule="evenodd" />
                            </svg>
                            <span className="text-[10px] text-gray-500 font-semibold uppercase tracking-wider mb-0.5">MEJOR MOMENTO</span>
                            <span className="text-sm text-[#172535] font-medium">{product.bestTime}</span>
                        </div>
                        <div className="flex flex-col items-center justify-center p-3 rounded-lg bg-[#F8FAFC] border border-gray-100 text-center">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 text-[#205A65] mb-1">
                                <path fillRule="evenodd" d="M14.615 1.595a.75.75 0 01.359.852L12.982 9.75h7.268a.75.75 0 01.548 1.262l-10.5 11.25a.75.75 0 01-1.272-.71l1.992-7.302H3.75a.75.75 0 01-.548-1.262l10.5-11.25a.75.75 0 01.913-.143z" clipRule="evenodd" />
                            </svg>
                            <span className="text-[10px] text-gray-500 font-semibold uppercase tracking-wider mb-0.5">INTENSIDAD</span>
                            <span className="text-sm text-[#172535] font-medium">{product.intensity}</span>
                        </div>
                    </div>

                    {/* Información Adicional */}
                    <div className="flex flex-col gap-6 mb-8 flex-1">
                        {/* Família Olfativa */}
                        <div>
                            <div className="flex items-center gap-2 mb-3">
                                <div className="w-4 h-[1px] bg-gray-300"></div>
                                <span className="text-gray-400 text-xs font-semibold tracking-widest uppercase">Familia Olfativa</span>
                            </div>
                            <div className="flex flex-wrap gap-2">
                                {product.olfactoryFamily.map((family, idx) => (
                                    <span key={idx} className="bg-[#F1F5F9] text-[#475569] text-xs font-medium px-4 py-1.5 rounded-full">
                                        {family}
                                    </span>
                                ))}
                            </div>
                        </div>

                        {/* Notas */}
                        <div>
                            <div className="flex items-center gap-2 mb-2">
                                <div className="w-4 h-[1px] bg-gray-300"></div>
                                <span className="text-gray-400 text-xs font-semibold tracking-widest uppercase">Notas</span>
                            </div>
                            <p className="text-[#334155] text-sm">
                                {product.notes}
                            </p>
                        </div>

                        {/* Descripción */}
                        <div>
                            <div className="flex items-center gap-2 mb-2">
                                <div className="w-4 h-[1px] bg-gray-300"></div>
                                <span className="text-gray-400 text-xs font-semibold tracking-widest uppercase">Descripción</span>
                            </div>
                            <p className="text-[#64748B] text-sm italic leading-relaxed">
                                {product.description}
                            </p>
                        </div>
                    </div>

                    {/* Botones de Acción */}
                    <div className="flex gap-3 mt-auto">
                        <button
                            onClick={handleWhatsAppClick}
                            className="flex-1 flex items-center justify-center gap-2 bg-[#065A65] hover:bg-[#054952] transition-colors text-white py-3.5 px-4 rounded-xl font-medium shadow-sm"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                                <path fillRule="evenodd" d="M7.5 6v.75H5.513c-.96 0-1.764.724-1.865 1.679l-1.263 12A1.875 1.875 0 004.25 22.5h15.5a1.875 1.875 0 001.865-2.071l-1.263-12a1.875 1.875 0 00-1.865-1.679H16.5V6a4.5 4.5 0 10-9 0zM12 3a3 3 0 00-3 3v.75h6V6a3 3 0 00-3-3zm-3 8.25a3 3 0 106 0v-.75a.75.75 0 011.5 0v.75a4.5 4.5 0 11-9 0v-.75a.75.75 0 011.5 0v.75z" clipRule="evenodd" />
                            </svg>
                            Pedir por WhatsApp
                        </button>
                        <button className="flex items-center justify-center w-[52px] border border-gray-200 hover:bg-gray-50 transition-colors rounded-xl text-gray-400 hover:text-red-500">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                                <path d="M11.645 20.91l-.007-.003-.022-.012a15.247 15.247 0 01-.383-.218 25.18 25.18 0 01-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0112 5.052 5.5 5.5 0 0116.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 01-4.244 3.17 15.247 15.247 0 01-.383.219l-.022.012-.007.004-.003.001a.752.752 0 01-.704 0l-.003-.001z" />
                            </svg>
                        </button>
                    </div>

                </div>
            </div>
        </div>
    );
}

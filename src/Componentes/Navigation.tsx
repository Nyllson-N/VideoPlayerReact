import { useState, useRef, useEffect } from "react";
import { Search } from "lucide-react";

type Item = {
    name: string;
    img: string;
    year?: number;
    type?: string;
};

const items: Item[] = [
    { name: "Dandadan", img: "https://animesdigital.org/wp-content/uploads/2025/07/Dandadan-2-Dublado.jpg", year: 2024, type: "Legendado" },
    { name: "Black Clover", img: "https://via.placeholder.com/40?text=2", year: 2017, type: "Legendado" },
    { name: "Naruto", img: "https://via.placeholder.com/40?text=3", year: 2002, type: "Legendado" },
];

export function Navigation() {
    const [query, setQuery] = useState("");
    const [showDropdown, setShowDropdown] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (
                containerRef.current &&
                !containerRef.current.contains(event.target as Node)
            ) {
                setShowDropdown(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    const filteredItems = items.filter(item =>
        item.name.toLowerCase().includes(query.toLowerCase())
    );

    return (
        <nav className="bg-zinc-800 text-white px-3 sm:px-6 md:px-12 lg:px-60 py-3 flex flex-col md:flex-row items-center justify-between shadow-sm gap-3 md:gap-4">
            <a className="flex items-center gap-2" href="/">
                <img className="w-8 sm:w-10 md:w-10" src="https://vite.dev/logo.svg" alt="Logo Vite" />
                <span className="font-semibold text-lg sm:text-xl md:text-2xl">Any</span>
            </a>
            <div className="relative w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg" ref={containerRef}>
                <div className="relative">
                    <input
                        type="text"
                        className="w-full py-2 pl-10 pr-3 rounded-lg bg-zinc-700 text-white placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-zinc-500 transition text-base sm:text-lg"
                        placeholder="Buscar..."
                        value={query}
                        onFocus={() => setShowDropdown(true)}
                        onChange={e => {
                            setQuery(e.target.value);
                            setShowDropdown(true);
                        }}
                        aria-label="Buscar anime"
                    />
                    <Search
                        className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400"
                        size={18}
                        aria-hidden="true"
                    />
                </div>
                {showDropdown && query && (
                    <ul className="absolute left-0 right-0 bg-zinc-900 rounded-lg shadow-lg mt-2 z-10 border border-zinc-700 max-h-80 overflow-y-auto w-full flex flex-col py-2">
                        {filteredItems.length > 0 ? (
                            filteredItems.map(item => (
                                <li
                                    key={item.name}
                                    className="flex items-center gap-2 sm:gap-3 px-2 sm:px-4 py-2 hover:bg-zinc-700 rounded transition cursor-pointer"
                                    style={{ fontSize: "1rem" }}
                                >
                                    <img
                                        src={item.img}
                                        alt={`Capa de ${item.name}`}
                                        width={40}
                                        height={55}
                                        className="rounded object-cover min-w-[40px] min-h-[55px] sm:min-w-[48px] sm:min-h-[66px]"
                                    />
                                    <div className="flex flex-col justify-center">
                                        <span className="font-semibold text-sm sm:text-base">{item.name}</span>
                                        <span className="text-xs text-zinc-400">
                                            Ano: {item.year ?? "2024"} • {item.type ?? "Legendado"}
                                        </span>
                                    </div>
                                </li>
                            ))
                        ) : (
                            <li className="px-4 py-2 text-zinc-400 text-base">Nenhum item encontrado</li>
                        )}
                    </ul>
                )}
            </div>
        </nav>
    );
}

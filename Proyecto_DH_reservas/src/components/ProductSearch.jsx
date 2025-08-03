import { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import '../Styles/ProductSearch.css'

export const ProductSearch = ({ onResults, onClearCategory }) => {
    const [searchQuery, setSearchQuery] = useState("");
    const [suggestions, setSuggestions] = useState([]);
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);

    const handleSearchChange = (e) => {
        const value = e.target.value;
        setSearchQuery(value);

        fetch(`http://localhost:8080/product/suggestions?query=${value}`)
            .then((res) => res.json())
            .then((data) => setSuggestions(data));
    };

    const handleSearch = () => {
        const params = new URLSearchParams();
        if (searchQuery) params.append("query", searchQuery);
        if (startDate) params.append("startDate", startDate.toISOString());
        if (endDate) params.append("endDate", endDate.toISOString());

        fetch(`http://localhost:8080/product/search?${params.toString()}`)
            .then((res) => res.json())
            .then((data) => {
                onResults(data);         // Devuelve los resultados al padre
                onClearCategory();       // Limpia categoría si estaba filtrando
            });
    };

    return (
        <section className="search-section">
            <h2>¿A dónde quieres ir?</h2>

            <p>Busca hospedajes disponibles para tus fechas preferidas</p>

            <div className="search-fields">
                <input
                    type="text"
                    placeholder="Buscar ciudad o nombre del hospedaje"
                    value={searchQuery}
                    onChange={handleSearchChange}
                    list="suggestions"
                    className="search-input"
                />
                <datalist id="suggestions">
                    {suggestions.map((s, idx) => (
                        <option key={idx} value={s} />
                    ))}
                </datalist>
                <DatePicker
                    selected={startDate}
                    onChange={(dates) => {
                        const [start, end] = dates;
                        setStartDate(start);
                        setEndDate(end);
                    }}
                    startDate={startDate}
                    endDate={endDate}
                    selectsRange
                    monthsShown={2}
                    placeholderText="Selecciona fechas"
                    className="date-picker"
                />


                <button onClick={handleSearch} className="search-btn">
                    Realizar búsqueda
                </button>
            </div>
        </section>
    );
};

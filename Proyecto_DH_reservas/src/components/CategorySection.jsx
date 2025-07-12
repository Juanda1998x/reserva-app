import { useEffect } from "react";
import { useFetch } from "../Hoocks/UseFetch";
import '../styles/CategorySection.css';

export const CategorySection = ({ onSelectedCategory }) => {

    const { data: categories, isLoading, error, fetchData: fetchCategories } = useFetch();
    const url = 'http://localhost:8080/category/get';

    useEffect(() => {
        fetchCategories(url, 'GET');
    }, []);


    return (

        <div className="category-container">
            {categories?.map((category) => (
                
                <div
                    key={category.id}
                    className="category-card"
                    onClick={() => onSelectedCategory(category.id)}
                >
                    <img
                        className="category-image"
                        src={category.imageUrl}
                        alt={category.name}
                    />
                    <h3 className="category-title ">{category.name}</h3>
                </div>
            ))}


        </div>
    )
}

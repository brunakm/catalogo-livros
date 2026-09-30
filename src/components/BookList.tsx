import { useEffect, useState } from "react";
import axios from "axios";
import type { Book } from "../types/Book";
import BookItem from "./BookItem";

interface BookListProps {
    refresh: number;
    onBookDeleted: () => void;
}

const API_URL = "https://crudcrud.com/api/fb08da6edca8477cbe24ea8591abda31/books";

function BookList({ refresh, onBookDeleted }: BookListProps) {
    const [books, setBooks] = useState<Book[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchBooks = async () => {
            try {
                setLoading(true);

                const response = await axios.get<Book[]>(API_URL);

                setBooks(response.data);
            } catch (error) {
                console.error("Erro ao buscar livros:", error);
                setError("Não foi possível carregar os livros.");
            } finally {
                setLoading(false);
            }
        };

        fetchBooks();
    }, [refresh]);

    if (loading) {
        return <p>Carregando livros...</p>;
    }

    if (error) {
        return <p>{error}</p>;
    }

    return (
        <section>
            <h2>Lista de livros</h2>

            {books.length === 0 ? (
                <p>Nenhum livro cadastrado.</p>
            ) : (
                <ul>
                    {books.map((book) => (
                        <BookItem
                            key={book._id}
                            book={book}
                            onBookDeleted={onBookDeleted}
                        />
                    ))}
                </ul>
            )}
        </section>
    );
}

export default BookList;
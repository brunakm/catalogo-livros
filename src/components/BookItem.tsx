import axios from "axios";
import type { Book } from "../types/Book";

interface BookItemProps {
    book: Book;
    onBookDeleted: () => void;
}

const API_URL = "https://crudcrud.com/api/fb08da6edca8477cbe24ea8591abda31/books";

function BookItem({ book, onBookDeleted }: BookItemProps) {
    const handleDelete = async () => {
        try {
            await axios.delete(`${API_URL}/${book._id}`);

            onBookDeleted();
        } catch (error) {
            console.error("Erro ao ecxluir livro:", error);
        }
    };

    return (
        <li>
            <strong>{book.title}</strong>
            <p>Autor: {book.author}</p>
            <p>Status: {book.status}</p>

            <button onClick={handleDelete}>
                Excluir
            </button>
        </li>
    );
}

export default BookItem;
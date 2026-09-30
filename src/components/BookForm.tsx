import { useState, type FormEvent } from "react";
import axios from "axios";
import type { NewBook } from "../types/Book";

interface BookFormProps {
    onBookAdded: () => void;
}

const API_URL = "https://crudcrud.com/api/fb08da6edca8477cbe24ea8591abda31/books";

function BookForm({ onBookAdded }: BookFormProps) {
    const [title, setTitle] = useState("");
    const [author, setAuthor] = useState("");
    const [status, setStatus] = useState<"Lido" | "Não lido">("Não lido");

    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const newBook: NewBook = {
            title,
            author,
            status,
        };

        try {
            await axios.post(API_URL, newBook);

            setTitle("");
            setAuthor("");
            setStatus("Não lido");

            onBookAdded();
        } catch (error) {
            console.error("Erro ao adicionar livro:", error);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <h2>Adicionar livro</h2>

            <div>
                <label htmlFor="title">Título</label>
                <input
                    id="title"
                    type="text"
                    value={title}
                    onChange={(event) => setTitle(event.target.value)}
                    required
                />
            </div>

            <div>
                <label htmlFor="author">Autor</label>
                <input
                    id="author"
                    type="text"
                    value={author}
                    onChange={(event) => setAuthor(event.target.value)}
                    required
                />
            </div>

            <div>
                <label htmlFor="status">Status</label>
                <select
                    id="status"
                    value={status}
                    onChange={(event) =>
                        setStatus(event.target.value as "Lido" | "Não lido")
                    }
                >
                    <option value="Não lido">Não lido</option>
                    <option value="Lido">Lido</option>
                </select>
            </div>

            <button type="submit">Adicionar livro</button>
        </form>
    );
}

export default BookForm;
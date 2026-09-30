import { useState } from "react";
import BookForm from "./components/BookForm";
import BookList from "./components/BookList";

function App() {
    const [refresh, setRefresh] = useState(0);

    const handleRefresh = () => {
        setRefresh((current) => current + 1);
    };

    return (
        <main className="container">
            <header className="header">
                <h1>📚 Catálogo de Livros 📚</h1>
                <p>Cadastre e organize seus livros de forma simples.</p>
            </header>

            <div className="content">
                <section className="form-card">
                    <BookForm onBookAdded={handleRefresh} />
                </section>

                <section className="list-card">
                    <BookList
                        refresh={refresh}
                        onBookDeleted={handleRefresh}
                    />
                </section>
            </div>
        </main>
    );
}

export default App;
import './style.css';

function ErrorPage() {
    return (
        <main className="main bg-dark">
            <section className="error-page">
                <h1>
                    Oops<span className="error-page_exclamation">!</span>
                </h1>
                <h2>404 - PAGE NOT FOUND</h2>
                <p>The page you are looking for might have been removed</p>
                <p>had its name changed or is temporarily unavailable</p>
            </section>
        </main>
    );
}

export default ErrorPage;

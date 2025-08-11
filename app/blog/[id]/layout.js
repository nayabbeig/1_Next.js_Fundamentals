export default function BlogLayout({ children }) {
    return (
        <section>
            <header>
                <h1>Blog</h1>
            </header>
            <main>{children}</main>
        </section>
    );
}
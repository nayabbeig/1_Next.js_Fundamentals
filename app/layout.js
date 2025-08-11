export const metadata = {
  title: 'MyApp',
  description: 'A Next.js App Router Demo',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <div className="app-wrapper" style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
          {/* Navbar */}
          <nav style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1rem', background: '#f5f5f5' }}>
            {/* Logo Section */}
            <div className="navbar-logo" style={{ fontWeight: 'bold', fontSize: '1.5rem' }}>
              MyAppLogo
            </div>
            {/* Profile Section */}
            <div className="navbar-profile" style={{ display: 'flex', alignItems: 'center' }}>
              <img
                src="/profile-placeholder.png"
                alt="Profile"
                style={{ width: 32, height: 32, borderRadius: '50%', marginRight: 8 }}
              />
              <span>User</span>
            </div>
          </nav>

          {/* Main Content */}
          <main style={{ flex: 1, padding: '2rem' }}>
            {children}
          </main>

          {/* Footer */}
          <footer style={{ padding: '1rem', background: '#f5f5f5', textAlign: 'center' }}>
            &copy; {new Date().getFullYear()} MyApp. All rights reserved.
          </footer>
        </div>
      </body>
    </html>
  );
}
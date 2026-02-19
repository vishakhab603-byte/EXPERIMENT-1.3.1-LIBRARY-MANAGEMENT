import { useState, useEffect } from "react";

export default function App() {
  const [dark, setDark] = useState(true);
  const [collapsed, setCollapsed] = useState(false);
  const [books, setBooks] = useState([]);
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [search, setSearch] = useState("");

  useEffect(() => {
    const saved = localStorage.getItem("books");
    if (saved) setBooks(JSON.parse(saved));
  }, []);

  useEffect(() => {
    localStorage.setItem("books", JSON.stringify(books));
  }, [books]);

  const addBook = (e) => {
    e.preventDefault();
    if (!title || !author) return;
    const newBook = {
      id: Date.now(),
      title,
      author,
      status: "Available"
    };
    setBooks([newBook, ...books]);
    setTitle("");
    setAuthor("");
  };

  const toggleStatus = (id) => {
    setBooks(
      books.map((b) =>
        b.id === id
          ? { ...b, status: b.status === "Available" ? "Issued" : "Available" }
          : b
      )
    );
  };

  const removeBook = (id) => {
    setBooks(books.filter((b) => b.id !== id));
  };

  const filtered = books.filter((b) =>
    b.title.toLowerCase().includes(search.toLowerCase())
  );

  const stats = [
    { label: "Total Books", value: books.length },
    { label: "Available", value: books.filter(b => b.status === "Available").length },
    { label: "Issued", value: books.filter(b => b.status === "Issued").length }
  ];

  return (
    <div style={container(dark)}>

      {/* SIDEBAR */}
      <div style={sidebar(dark, collapsed)}>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          {!collapsed && <h2>📚 NovaLib</h2>}
          <button onClick={() => setCollapsed(!collapsed)} style={iconBtn}>
            ☰
          </button>
        </div>

        {!collapsed && (
          <div style={{ marginTop: 50 }}>
            <NavItem text="Dashboard" />
            <NavItem text="Inventory" />
            <NavItem text="Members" />
            <NavItem text="Analytics" />
          </div>
        )}
      </div>

      {/* MAIN */}
      <div style={{ flex: 1, padding: 60 }}>

        {/* HEADER */}
        <div style={header}>
          <div>
            <h1 style={{ margin: 0 }}>Library Intelligence</h1>
            <p style={{ opacity: 0.6 }}>Next-generation control system</p>
          </div>
          <button onClick={() => setDark(!dark)} style={primaryBtn}>
            Toggle Theme
          </button>
        </div>

        {/* STATS */}
        <div style={statGrid}>
          {stats.map((s, i) => (
            <div key={i} style={statCard(dark)}>
              <p style={{ opacity: 0.6 }}>{s.label}</p>
              <h2 style={{ margin: "8px 0" }}>{s.value}</h2>
              <div style={{ fontSize: 12, color: "#22c55e" }}>
                ↑ 12% this week
              </div>
            </div>
          ))}
        </div>

        {/* ADD FORM */}
        <form onSubmit={addBook} style={formRow}>
          <input
            placeholder="Book Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            style={input}
          />
          <input
            placeholder="Author"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            style={input}
          />
          <button type="submit" style={primaryBtn}>
            Add Book
          </button>
        </form>

        {/* SEARCH */}
        <input
          placeholder="Search library..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{ ...input, width: 350, marginTop: 20 }}
        />

        {/* TABLE */}
        <div style={tableCard(dark)}>
          <table style={{ width: "100%" }}>
            <thead>
              <tr>
                <th align="left">Title</th>
                <th align="left">Author</th>
                <th align="left">Status</th>
                <th align="left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((book) => (
                <tr key={book.id} style={rowHover}>
                  <td>{book.title}</td>
                  <td>{book.author}</td>
                  <td>
                    <span style={{
                      padding: "6px 14px",
                      borderRadius: 20,
                      background:
                        book.status === "Available"
                          ? "linear-gradient(135deg,#22c55e,#16a34a)"
                          : "linear-gradient(135deg,#ef4444,#dc2626)",
                      color: "white",
                      fontSize: 12
                    }}>
                      {book.status}
                    </span>
                  </td>
                  <td>
                    <button onClick={() => toggleStatus(book.id)} style={ghostBtn}>
                      Toggle
                    </button>
                    <button onClick={() => removeBook(book.id)} style={dangerBtn}>
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {filtered.length === 0 && (
            <p style={{ opacity: 0.6 }}>No records found.</p>
          )}
        </div>

      </div>
    </div>
  );
}

/* ---------- Components ---------- */

function NavItem({ text }) {
  return (
    <div style={{
      marginBottom: 20,
      cursor: "pointer",
      opacity: 0.8,
      transition: "0.3s"
    }}>
      {text}
    </div>
  );
}

/* ---------- Styles ---------- */

const container = (dark) => ({
  display: "flex",
  minHeight: "100vh",
  background: dark
    ? "linear-gradient(135deg,#0f172a,#1e293b)"
    : "linear-gradient(135deg,#eef2ff,#f8fafc)",
  color: dark ? "white" : "#111",
  fontFamily: "Inter, Segoe UI",
  transition: "0.4s",
  animation: "fadeIn 0.6s ease"
});

const sidebar = (dark, collapsed) => ({
  width: collapsed ? 80 : 260,
  padding: 40,
  background: dark
    ? "rgba(255,255,255,0.05)"
    : "rgba(255,255,255,0.7)",
  backdropFilter: "blur(15px)",
  transition: "0.4s"
});

const header = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  marginBottom: 50
};

const statGrid = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit,minmax(240px,1fr))",
  gap: 30,
  marginBottom: 50
};

const statCard = (dark) => ({
  padding: 30,
  borderRadius: 20,
  background: dark
    ? "rgba(255,255,255,0.07)"
    : "rgba(255,255,255,0.95)",
  backdropFilter: "blur(20px)",
  boxShadow: "0 20px 40px rgba(0,0,0,0.15)",
  transition: "transform 0.3s ease",
});

const tableCard = (dark) => ({
  marginTop: 50,
  padding: 40,
  borderRadius: 25,
  background: dark
    ? "rgba(255,255,255,0.07)"
    : "rgba(255,255,255,0.95)",
  backdropFilter: "blur(20px)",
  boxShadow: "0 25px 50px rgba(0,0,0,0.15)"
});

const formRow = {
  display: "flex",
  gap: 15
};

const input = {
  padding: "12px 16px",
  borderRadius: 12,
  border: "1px solid rgba(255,255,255,0.2)"
};

const primaryBtn = {
  padding: "12px 20px",
  borderRadius: 12,
  border: "none",
  background: "linear-gradient(135deg,#6366f1,#3b82f6)",
  color: "white",
  cursor: "pointer",
  transition: "0.3s"
};

const ghostBtn = {
  padding: "8px 14px",
  marginRight: 10,
  borderRadius: 10,
  border: "1px solid #ccc",
  background: "transparent",
  cursor: "pointer"
};

const dangerBtn = {
  padding: "8px 14px",
  borderRadius: 10,
  border: "none",
  background: "linear-gradient(135deg,#ef4444,#dc2626)",
  color: "white",
  cursor: "pointer"
};

const iconBtn = {
  background: "transparent",
  border: "none",
  cursor: "pointer",
  fontSize: 20
};

const rowHover = {
  height: 55,
  transition: "0.3s"
};

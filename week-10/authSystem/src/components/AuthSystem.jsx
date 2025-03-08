

export default function AuthSystem({setIsLoggedIn, username}) {

  return (
    <div style={{ minHeight: "100vh", backgroundColor: "#f3f4f6", padding: "20px" }}>
      <nav style={{ backgroundColor: "#3b82f6", color: "white", padding: "15px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <h1 style={{ margin: 0 }}>Auth System Demo</h1>
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <span>Welcome, {username}!</span>
          <button style={{ backgroundColor: "white", color: "#3b82f6", padding: "5px 10px", borderRadius: "5px", border: "none", cursor: "pointer" }} onClick={() => setIsLoggedIn(false)}>Logout</button>
        </div>
      </nav>
      <div style={{ backgroundColor: "white", padding: "20px", borderRadius: "10px", boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)", marginTop: "20px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <input
            type="checkbox"
          />
          <span>Use Context API: </span>
        </div>
        <h2 style={{ marginTop: "20px" }}>Welcome to the Auth System Demo</h2>
        <p>
          This demo showcases two approaches to managing authentication state in React:
        </p>
        <ul style={{ paddingLeft: "20px" }}>
          <li>State Lifting</li>
          <li>Context API</li>
        </ul>
        <p>Use the toggle above to switch between the two approaches.</p>
      </div>
    </div>
  );
}

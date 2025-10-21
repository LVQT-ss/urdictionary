import { Link } from "react-router-dom";

const Header = () => {
  return (
    <>
      <header style={{ padding: "20px", background: "#333", color: "white" }}>
        <nav>
          <Link to="/" style={{ margin: "0 10px", color: "white" }}>
            Home
          </Link>
          <Link to="/about" style={{ margin: "0 10px", color: "white" }}>
            About
          </Link>
          <Link to="/todos" style={{ margin: "0 10px", color: "white" }}>
            Todos
          </Link>
        </nav>
      </header>
    </>
  );
};
export default Header;

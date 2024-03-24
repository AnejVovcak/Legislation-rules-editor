import {Link} from "react-router-dom";

function Header() {
  return (
    <header style={{ padding: '3rem', backgroundColor: '#f0f0f0' }}>
        <Link to={'/'}>
            <h1>Legislation rules editor</h1>
        </Link>
    </header>
  );
}

export default Header;
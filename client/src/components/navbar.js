export const Navbar = () => {
    return (<nav className = "nav">
        <a href="/" className="site-title">Nitrackeer</a>
        <ul>
            <li>
                <a href="/player">Player</a>
            </li>
            <li>
                <a href="/auction">Auction</a>
            </li>
            <li>
                <a href="/bazaar">Bazaar</a>
            </li>
            <li>
                {
                    !localStorage.username ?
                    <a href="/login">Login</a> :
                    <a href="/logout">{ localStorage.username }</a>
                }
            </li>
        </ul>
    </nav>);
}

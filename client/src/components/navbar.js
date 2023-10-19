import { useCookies } from 'react-cookie';

export const Navbar = () => {
    const [cookies] = useCookies(['username']);
    
    return (<nav className = 'nav'>
        <a href='/' className='site-title'>Nitrackeer</a>
        <ul>
            <li>
                <a href='/player'>Player</a>
            </li>
            <li>
                <a href='/auction'>Auction</a>
            </li>
            <li>
                <a href='/bazaar'>Bazaar</a>
            </li>
            <li>
                {
                    !cookies.username ?
                    <a href='/login'>Login</a> :
                    <a href='/logout'>{ cookies.username }</a>
                }
            </li>
        </ul>
    </nav>);
}

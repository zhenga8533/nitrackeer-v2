import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import toast from 'react-hot-toast';

export const Logout = () => {
    const [_, setCookies] = useCookies(["access_token"]);
    const navigate = useNavigate();
    
    const logout = () => {
        setCookies("username", "");
        window.localStorage.removeItem("token");
        
        toast.success('Successfully signed out!');
        navigate("/login");
    }

    return (
        <div className = "center">
            <h1>Logout</h1>
            <form onSubmit = { logout }>
                <div className = "txt">
                    <strong>Oh no! You're leaving... Are you sure?</strong>
                </div>
                <button type="submit">Logout</button>
            </form>
        </div>);
};

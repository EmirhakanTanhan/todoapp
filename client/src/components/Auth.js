import {useState} from "react";
import {useCookies} from "react-cookie";

function Auth() {
    const [cookies, setCookie, removeCookie] = useCookies(null);
    const [isLogin, setIsLogin] = useState(true);
    const [email, setEmail] = useState(null);
    const [password, setPassword] = useState(null);
    const [confirmPassword, setConfirmPassword] = useState(null);
    const [error, setError] = useState(null);

    const viewLogin = (status) => {
        setError(null);
        setIsLogin(status);
    };

    const handleSubmit = async (e, endpoint) => {
        e.preventDefault();

        if (!isLogin && password !== confirmPassword) {
            setError('Passwords are must be the same');
        }

        const response = await fetch(`http://localhost:8000/${endpoint} `, {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({email, password})
        });

        const data = await response.json();

        if (data.statusDetail) {
            setError(data.statusDetail);
        } else {
            setCookie('Email', data.email);
            setCookie('RefreshToken', data.refreshToken);
            window.location.reload();
        }
    };

    return (
        <div className='authContainer'>
            <div className='authContainerBox'>
                <form>
                    <h2>{isLogin ? 'Please log in' : 'Please sign up'}</h2>
                    <input type="email" placeholder='email' onChange={(e) => setEmail(e.target.value)}/>
                    <input type="password" placeholder='password' onChange={(e) => setPassword(e.target.value)}/>
                    {!isLogin && <input type="password" placeholder='confirm password' onChange={(e) => setConfirmPassword(e.target.value)}/>}
                    <input type="submit" className='create' onClick={(e) => handleSubmit(e, isLogin ? 'login' : 'signup')}/>
                    {error && <p>{error}</p>}
                </form>

                <div className='authOptions'>
                    <button onClick={() => viewLogin(false)}>Sign Up</button>
                    <button onClick={() => viewLogin(true)}>Login</button>
                </div>
            </div>
        </div>
    );
}

export default Auth;

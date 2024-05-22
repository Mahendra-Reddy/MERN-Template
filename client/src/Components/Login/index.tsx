import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from '../../hooks/reduxHook'
import { login } from '../../Store/reducers/authReducer'
import { isValidEmail, isValidPassword } from "../../utils/validators";
import './index.css'


const LoginPage: React.FC = () => {
    const dispatch = useAppDispatch();
    const { loading, error, accessToken } = useAppSelector((state) => state.auth);
    const [username, setUsername] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const navigate = useNavigate()

    useEffect(() => {
        if (accessToken) {
            navigate('/')
        }
    }, [accessToken])

    const handleLogin = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        dispatch(login({ username, password }))
    }


    const isDisabled = loading || !(isValidEmail(username) && isValidPassword(password))

    console.log("loding", loading)
    return (
        <form onSubmit={handleLogin}>
            <div className="container">
                <div>
                    <h1 className="heading"> Welcome!</h1>
                    <div className="sigin">Sign in to continue.</div>
                </div>

                <p className="style">Email</p>
                <input className="inputSt" type="text" name="email" value={username} onChange={(e) => setUsername(e.target.value)} />

                <p className="style">Password</p>
                <input className="inputSt" type="password" name="password" value={password} onChange={(e) => setPassword(e.target.value)} />

                <button type="submit" disabled={isDisabled}
                    className={`login ${isDisabled ? 'disablecl' : ''}`}>{loading ? 'Logging in...' : 'Login'}</button>
                {error && <p>{error}</p>}
                <p className="style">Don't have an account? </p> <Link to={'/signup'} className="style"> Sign up</Link>
            </div>
        </form>

    )
}

export default LoginPage;
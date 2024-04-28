import { Link } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { userDetails, login } from "../../Store/reducers/userReducer";

interface Istate {
    user: any
}

const LoginPage = () => {
    const userState = useSelector((state: Istate) => state.user)
    const dispatch = useDispatch();
    return (<div>
        <h1> Welcome!</h1>
        <div>Sign in to continue.</div>
        <p>Email</p>
        <input type="text" name="email" onChange={(e) => dispatch(userDetails({name: e.target.name, value:e.target.value} as any))}/>
        <p>Password</p>
        <input type="password" name="password" onChange={(e) => dispatch(userDetails({name: e.target.name, value:e.target.value} as any))}/>
        <button onClick={() => dispatch(login({email: userState.email, password: userState.password}) as any)}>Log in</button>
        <p>Don't have an account? </p> <Link to={'/signup'}> Sign up</Link>
    </div>)
}

export default LoginPage;
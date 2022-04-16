import { useMutation } from "react-query"
import { loginPost } from "./api/requests";
import { useFormik } from "formik";
import { Navigate } from "react-router-dom";

const Login = ({refetchUser}) => {

    const { mutate: loginUser } = useMutation(loginPost, {
        onSuccess: (response) => {
            console.log(response)
            refetchUser()
        },
    });

    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
        },
        onSubmit: (values) => {
            loginUser(values);
        },
    });

    return (
        <div>
            <h2>Login</h2>
            <form onSubmit={formik.handleSubmit}>
                <label>Login </label>
                <input
                    type="email"
                    value={formik.values.email}
                    onChange={formik.handleChange}
                    name="email"></input>
                <label>Password </label>
                <input
                    name="password"
                    value={formik.values.password}
                    onChange={formik.handleChange}
                    type="password"></input>
                <button type="submit">Login</button>
            </form>
        </div>
    )

}


export default Login

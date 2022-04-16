import { useMutation } from "react-query"
import { registerPost } from "./api/requests";
import { useFormik } from "formik";

const Register = ({refetchUser}) => {

    const { mutate: registerUser } = useMutation(registerPost, {
        onSuccess: (response) => {
            console.log(response)
        },
    });

    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
        },
        onSubmit: (values) => {
            registerUser(values);
            refetchUser()
        },
    });


    // Implement Create and Edit Form in your app. Preferably both cases should be handled by the same component.
    return (
        <div>
            <h2>Register</h2>
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
                <button type="submit">Register</button>
            </form>
        </div>
    )

}


export default Register

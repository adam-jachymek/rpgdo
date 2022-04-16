import { useQuery } from "react-query";
import { fetchProfile } from "./api/requests";
import CircularProgress from '@mui/material/CircularProgress';
import { useFormik, FieldArray } from "formik";
import { useState, } from "react";

const Profile = () => {
    const [showEdit, setShowEdit] = useState(false)
    const [showAddForm, setShowAddForm] = useState(false)

    const { isLoading, data: profiles } = useQuery(['profile'], fetchProfile);

    const profile = profiles?.[0] || []

    const formik = useFormik({
        enableReinitialize: true,
        initialValues: {
            adresses: profile?.adresses
        },
        onSubmit: (values) => {
        },
    });

    const values = formik.values

    console.log(values)

    const addNewAddressForm = (
        <form onSubmit={formik.handleSubmit}>
            <label>name </label>
            <input
                value={formik.values.name}
                onChange={formik.handleChange}
                name="name"></input>
            <label>street </label>
            <input
                name="street"
                value={formik.values.street}
                onChange={formik.handleChange}
                type="text"></input>
            <label>zipcode </label>
            <input
                name="zipcode"
                value={formik.values.zipcode}
                onChange={formik.handleChange}
                type="text"></input>
            <label>city </label>
            <input
                name="city"
                value={formik.values.city}
                onChange={formik.handleChange}
                type="text"></input>
            <button type="submit">Add new address</button>
        </form>
    )

    if (isLoading || !profile) {
        return <CircularProgress />
    }

    return (
        <div>
            <p>Name: {profile?.name}</p>
            <p>Points: {profile?.points}</p>
            <p style={{ marginTop: "40px" }}>Adresses:</p>
            <form onSubmit={formik.handleSubmit}>
                {values?.adresses?.map((address, index) => (
                    <div style={{ width: "300px", margin: "30px auto", display: "block" }}>
                        <p style={{ backgroundColor: "lightgray" }}>{address.name}
                            <button style={{ marginLeft: "10px" }} onClick={() => { setShowEdit(true) }}>Edit</button>
                            <button style={{ marginLeft: "10px" }} onClick={() => { setShowEdit(true) }}>Remove</button>
                        </p>
                        <label>name </label>
                        <input
                            value={address.name}
                            onChange={formik.handleChange}
                            name={`addresses.${index}.name`}></input>
                        <label>street </label>
                        <input
                            name={`addresses.${index}.street`}
                            value={address.street}
                            onChange={formik.handleChange}
                            type="text"></input>
                        <label>zipcode </label>
                        <input
                            name={`addresses.${index}.zipcode`}
                            value={address.zipcode}
                            onChange={formik.handleChange}
                            type="text"></input>
                        <label>city </label>
                        <input
                            name={`addresses.${index}.city`}
                            value={address.city}
                            onChange={formik.handleChange}
                            type="text"></input>
                    </div>
                ))}
                <button onClick={() => { setShowAddForm(true) }}>Add new address</button>
                <button type="submit">Save</button>
            </form>
            {!showAddForm ? <button onClick={() => { setShowAddForm(true) }}>Add new address</button> : addNewAddressForm}
        </div>
    )
}

export default Profile
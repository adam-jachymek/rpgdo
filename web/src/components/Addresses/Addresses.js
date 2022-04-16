import React, { useEffect, useMemo } from 'react';
import { Formik, Form, Field, FieldArray } from 'formik';
import { useQuery, useMutation } from 'react-query';
import { fetchAddresses, postAddresses } from '../../api/requests';
import { object, string, number, date, InferType } from 'yup';
import Example from './Example';

const Addresses = () => {

  const { isLoading: addressesLoading, data: addressesData, refetch } = useQuery(['addresses'], fetchAddresses);

  const { mutate: addAddress } = useMutation(postAddresses, {
    onSuccess: (response) => {
      console.log("response", response)
      refetch()
    },
  });

  let userSchema = object({
    name: string().required(),
    street: string().required(),
    zipcode: number().required().positive().integer(),
    city: string().required(),
  });

  if (addressesLoading) {
    return "Loading..."
  }

  return (
    <>
      <div>
        <h1>Addresses</h1>
        <Formik
          initialValues={{ addresses: addressesData }}
          onSubmit={values => {
            console.log("values", values)
            addAddress(values.addresses)
          }}
          render={({ values }) => (
            <Form>
              <FieldArray
                name="addresses"
                render={arrayHelpers => (
                  <div>
                    {
                      values.addresses?.map((addresses, index) => (
                        <div key={index}>
                          <Field name={`addresses.${index}.name`} />
                          <Field name={`addresses.${index}.street`} />
                          <Field name={`addresses.${index}.zipcode`} />
                          <Field name={`addresses.${index}.city`} />
                          <button
                            type="button"
                            onClick={() => arrayHelpers.remove(index)} // remove a friend from the list
                          >
                            -
                          </button>
                        </div>
                      ))
                    }

                    <button type="button" onClick={() => arrayHelpers.push({
                      name: "",
                      street: "",
                      zipcode: "",
                      city: ""
                    })}>
                      {/* show this when user has removed all friends from the list */}
                      Add new address
                    </button>
                    <div>
                      <button type="submit">Save</button>
                    </div>
                  </div>
                )}
              />
            </Form>
          )}
        />
      </div>
      <Example />
    </>

  )


}

export default Addresses

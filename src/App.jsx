import React from 'react';
import { Formik, Field, FieldArray, Form } from 'formik';

const FormD = () => {
  return (
    <Formik
      initialValues={{ fields: [{ id: 1, name: '', value: '', image: null }] }}
      onSubmit={(values) => {
        const formDataArray = values.fields.map((field) => ({
          name: field.value,
          image: field.image,
        }));

        console.log("Form Data Array:", formDataArray);

        const formData = new FormData();
        // formData.append("data", formDataArray);
      }}
    >
      {({ values, setFieldValue }) => (
        <Form>
          <FieldArray
            name="fields"
            render={(arrayHelpers) => (
              <div>
                {values.fields.map((field, index) => (
                  <div key={field.id}>
                    <label htmlFor={`fields.${index}.name`}>{field.name}</label>
                    <Field
                      type="text"
                      name={`fields.${index}.value`}
                      placeholder={`Enter ${field.name}`}
                    />
                    <label htmlFor={`fields.${index}.image`}>Image</label>
                    <input
                      type="file"
                      name={`fields.${index}.image`}
                      onChange={(event) => {
                        setFieldValue(`fields.${index}.image`, event.currentTarget.files[0]);
                      }}
                    />
                   
                    <button
                      type="button"
                      onClick={() =>
                        arrayHelpers.push({
                          id: values.fields.length + 1,
                          name: `field${values.fields.length + 1}`,
                          value: '',
                          image: null,
                        })
                      }
                    >
                      +
                    </button>
                    <button
                      type="button"
                      onClick={() => arrayHelpers.remove(index)}
                    >
                      -
                    </button>
                  </div>
                ))}
              </div>
            )}
          />
          <button type="submit">Submit</button>
        </Form>
      )}
    </Formik>
  );
};

export default FormD;



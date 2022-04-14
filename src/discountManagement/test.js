import React from "react";
import { useForm, useFieldArray, Controller } from "react-hook-form";

const TestDemo = () =>{
  const { register, control, handleSubmit } = useForm({
    defaultValues: {
      test: [{ firstName: "", lastName: "" }]
    }
  });
  const {
    fields,
    append,
    remove
  } = useFieldArray({
    control,
    name: "test"
  });

  const onSubmit = (data) => console.log("data", data);

    return(
        <>
        <h1>Test</h1>
          <form onSubmit={handleSubmit(onSubmit)}>
            <h1>Field Array </h1>
              <ul>
                {fields.map((item, index) => {
                  return (
                    <li key={item.id}>
                      <input {...register(`test.${index}.firstName`)} />
                      <Controller render={({ field }) => <input {...field} />} name={`test.${index}.lastName`} control={control} />
                      <button type="button" onClick={() => { append(); }}> + </button>
                      <button type="button" onClick={() => remove(index)}> - </button>
                    </li>
                  );
                })}
              </ul>
            <input type="submit" />
          </form>
        </>
    )

}
export default TestDemo;
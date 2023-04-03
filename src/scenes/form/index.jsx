import { Box, Button, TextField } from "@mui/material";
import { Formik } from "formik";
import * as yup from "yup";
import useMediaQuery from "@mui/material/useMediaQuery";
import Header from "../../components/Header/Header";
import { useAppDispatch } from "../../hooks/useHook";
import { addNewProduct } from "../../store/Slice/ProductsSlice";


const Form = () => {
  // const isNonMobile = useMediaQuery("(min-width:600px)");

  const  dispatch = useAppDispatch();

  const handleFormSubmit = (values, {resetForm}) => {
    dispatch(addNewProduct(JSON.stringify(values)))
    resetForm()
  };  

  return (
    <Box m="20px">
      <Header title="CREATE PRODUCT" subtitle="Create a New PRODUCT for Sale" />

      <Formik
        onSubmit={handleFormSubmit}
        initialValues={initialValues}
        validationSchema={checkoutSchema}
      >
        {({
          values,
          errors,
          touched,
          handleBlur,
          handleChange,
          handleSubmit,
        }) => (
          <form onSubmit={handleSubmit}>
            <Box
              display="flex"
              gap="30px"
              flexDirection={'column'}
              maxWidth={500}
            >
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Title"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.title}
                name="title"
                error={!!touched.title && !!errors.title}
                helperText={touched.title && errors.title}
                sx={{ gridColumn: "span 2" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Author"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.author}
                name="author"
                error={!!touched.author && !!errors.author}
                helperText={touched.author && errors.author}
                sx={{ gridColumn: "span 2" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="number"
                label="Rating"
                inputProps={{
                  min: 0,
                  max: 5,
                  step: 0.5
                }}
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.rating}
                name="rating"
                error={!!touched.rating && !!errors.rating}
                helperText={touched.rating && errors.rating}
                sx={{ gridColumn: "span 4" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Year"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.year}
                name="year"
                error={!!touched.year && !!errors.year}
                helperText={touched.year && errors.year}
                sx={{ gridColumn: "span 4" }}
              />

              <Button type="submit" color="secondary" variant="contained">
                Create New User
              </Button>
            </Box>



          </form>
        )}
      </Formik>
    </Box>
  );
};



const checkoutSchema = yup.object().shape({
  title: yup.string().required("required"),
  author: yup.string().required("required"),
  rating: yup.number().required("required"),
  year: yup.string().required("required"),
});
const initialValues = {
  title: "",
  author: "",
  rating: "",
  year: ""
};

export default Form;
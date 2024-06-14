// import { Box, Button, TextField, Autocomplete, Snackbar, Alert } from "@mui/material";
// import { Formik } from "formik";
// import useMediaQuery from "@mui/material/useMediaQuery";
// import Header from "../../components/Header";
// import { useState, useEffect } from "react";
// import axios from 'axios';

// const token = localStorage.getItem('authToken');
// const UPLOAD_BOOKS_API_URL = 'http://127.0.0.1:8000/create-book/';
// const POST_DONOR_API_URL = 'http://127.0.0.1:8000/gayson-donatenen/';

// const Form = () => {
//   const isNonMobile = useMediaQuery("(min-width:600px)");
//   const [title, setTitle] = useState('');
//   const [subtitle, setSubtitle] = useState('');
//   const [description, setDescription] = useState('');
//   const [price, setPrice] = useState(0);
//   const [bookImg, setBookImg] = useState(null);
//   const [author, setAuthor] = useState('');
//   const [genreOptions, setGenreOptions] = useState([]); // State to hold genre options
//   const [selectedGenre, setSelectedGenre] = useState(null);
//   const [name, setName] = useState('');
//   const [id, setId] = useState(0);
//   const [openSnackbar, setOpenSnackbar] = useState(false); // Snackbar state
//   const [snackbarMessage, setSnackbarMessage] = useState(''); // Snackbar message state
//   const [snackbarSeverity, setSnackbarSeverity] = useState('success'); // Snackbar severity state

//   const handleNameChange = (event) => {
//     setName(event.target.value);
//   };
//   const handleTitleChange = (event) => {
//     setTitle(event.target.value);
//   };
//   const handleSubtitleChange = (event) => {
//     setSubtitle(event.target.value);
//   };
//   const handleDescriptionChange = (event) => {
//     setDescription(event.target.value);
//   };
//   const handleAuthorChange = (event) => {
//     setAuthor(event.target.value);
//   };
//   const handlePriceChange = (event) => {
//     setPrice(event.target.value);
//   };

//   const handleSubmit = async (event) => {
//     event.preventDefault();
//     const formData = new FormData();
//     formData.append('title', title);
//     formData.append('subtitle', subtitle);
//     formData.append('price', price);
//     formData.append('book_img', bookImg);
//     formData.append('description', description);
//     formData.append('author', author);
//     formData.append('genre', selectedGenre);

//     try {
//       const response = await axios.post(UPLOAD_BOOKS_API_URL, formData, {
//         headers: {
//           'Content-Type': 'multipart/form-data',
//           Authorization: `Bearer ${token}`,
//         },
//       });
//       console.log('Upload successful:', response.data);
//       setId(response.data.id);

//       try {
//         const res = await axios.post(POST_DONOR_API_URL, { 'name': name, 'book': response.data.id }, {
//           headers: {
//             'Authorization': `Bearer ${token}`,
//           },
//         });
//         console.log('Donor name posted:', res);
//         setSnackbarSeverity('success');
//         setSnackbarMessage('Donation created successfully!');
//         setOpenSnackbar(true);
//       } catch (error) {
//         console.error('Failed to post donor name:', error);
//         setSnackbarSeverity('error');
//         setSnackbarMessage('Failed to create donation. Please try again.');
//         setOpenSnackbar(true);
//       }
//     } catch (error) {
//       console.error('Upload failed:', error);
//       setSnackbarSeverity('error');
//       setSnackbarMessage('Failed to upload book. Please try again.');
//       setOpenSnackbar(true);
//     }
//   };

//   useEffect(() => {
//     const fetchGenreOptions = async () => {
//       try {
//         const response = await axios.get('http://127.0.0.1:8000/view-genre/');
//         setGenreOptions(response.data); // Set genre options from API response
//       } catch (error) {
//         console.error('Failed to fetch genre options:', error);
//       }
//     };

//     fetchGenreOptions(); // Fetch genre options when component mounts
//   }, []);

//   const handleGenreChange = (event, value) => {
//     setSelectedGenre(value?.id || null); // Update selected genre ID
//   };
//   const handleFileChange = (event) => {
//     if (event.target.files && event.target.files[0]) {
//       setBookImg(event.target.files[0]);
//     }
//   };

//   return (
//     <Box m="20px">
//       <Header title="DONATE BOOK" subtitle="Create a New Donation" />

//       <Snackbar
//         open={openSnackbar}
//         autoHideDuration={6000}
//         onClose={() => setOpenSnackbar(false)}
//         anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
//       >
//         <Alert onClose={() => setOpenSnackbar(false)} severity={snackbarSeverity} sx={{ width: '100%' }}>
//           {snackbarMessage}
//         </Alert>
//       </Snackbar>

//       <Formik
//         onSubmit={handleSubmit}
//       >
//         {({
//           errors,
//           touched,
//           handleBlur,
//         }) => (
//           <form onSubmit={handleSubmit}>
//             <Box
//               display="grid"
//               gap="30px"
//               gridTemplateColumns="repeat(4, minmax(0, 1fr))"
//               sx={{
//                 "& > div": { gridColumn: isNonMobile ? undefined : "span 4" },
//               }}
//             >
//               <TextField
//                 fullWidth
//                 variant="filled"
//                 type="text"
//                 label="Donor's Name"
//                 onBlur={handleBlur}
//                 onChange={handleNameChange}
//                 value={name}
//                 name="name"
//                 sx={{ gridColumn: "span 4" }}
//               />
//               <TextField
//                 fullWidth
//                 variant="filled"
//                 type="text"
//                 label="Title"
//                 onBlur={handleBlur}
//                 onChange={handleTitleChange}
//                 value={title}
//                 name="title"
//                 sx={{ gridColumn: "span 2" }}
//               />
//               <TextField
//                 fullWidth
//                 variant="filled"
//                 type="text"
//                 label="Subtitle"
//                 onBlur={handleBlur}
//                 onChange={handleSubtitleChange}
//                 value={subtitle}
//                 name="subtitle"
//                 sx={{ gridColumn: "span 2" }}
//               />
//               <TextField
//                 fullWidth
//                 variant="filled"
//                 type="text"
//                 label="Author"
//                 onBlur={handleBlur}
//                 onChange={handleAuthorChange}
//                 value={author}
//                 name="author"
//                 sx={{ gridColumn: "span 2" }}
//               />
//               <Autocomplete
//                 onBlur={handleBlur}
//                 onChange={handleGenreChange}
//                 options={genreOptions}
//                 value={genreOptions.find((option) => option.id === selectedGenre) || null}
//                 getOptionLabel={(option) => option.genre_name || ''}  // Display label in dropdown
//                 renderInput={(params) => (
//                   <TextField {...params} label="Genre" variant="filled" />
//                 )}
//                 fullWidth
//                 sx={{ gridColumn: "span 2" }}
//               />
//               <TextField
//                 fullWidth
//                 variant="filled"
//                 type="number"
//                 label="Price"
//                 onBlur={handleBlur}
//                 onChange={handlePriceChange}
//                 value={price}
//                 name="price"
//                 sx={{ gridColumn: "span 2" }}
//               />
//               <TextField
//                 type="file"
//                 fullWidth
//                 sx={{ gridColumn: "span 2" }}
//                 onChange={handleFileChange}
//               />
//               <TextField
//                 fullWidth
//                 variant="filled"
//                 type="text"
//                 label="Description"
//                 onBlur={handleBlur}
//                 onChange={handleDescriptionChange}
//                 value={description}
//                 name="description"
//                 sx={{ gridColumn: "span 2" }}
//               />
//             </Box>
//             <Box display="flex" justifyContent="end" mt="20px">
//               <Button type="submit" color="secondary" variant="contained">
//                 Create Donation
//               </Button>
//             </Box>
//           </form>
//         )}
//       </Formik>
//     </Box>
//   );
// };

// export default Form;





import { Box, Button, TextField, Autocomplete, Snackbar, Alert } from "@mui/material";
import { Formik } from "formik";
import * as yup from "yup";
import useMediaQuery from "@mui/material/useMediaQuery";
import Header from "../../components/Header";

import { useState, useEffect } from "react";
import axios from 'axios';

const token = localStorage.getItem('authToken');
const UPLOAD_BOOKS_API_URL = 'http://127.0.0.1:8000/create-book/';
const POST_DONOR_API_URL = 'http://127.0.0.1:8000/gayson-donatenen/';
// const genres = [
//   { label: 'Science Fiction' },
//   { label: 'Fantasy' },
//   { label: 'Mystery' },
//   { label: 'Thriller' },
//   { label: 'Romance' },
//   { label: 'Horror' },
// ];


const Form = () => {
  const isNonMobile = useMediaQuery("(min-width:600px)");

  // const [openUpload, setOpenUpload] = useState(false);
  const [title, setTitle] = useState('');
  const [subtitle, setSubtitle] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState(0);
  const [bookImg, setBookImg] = useState(null);
  // const [error, setError] = useState('');
  // const [input, setInput] = useState([]);
  // const [update, setUpdate] = useState(false);
  const [author, setAuthor] = useState('');
  // const [genre, setGenre] = useState(null)
  const [genreOptions, setGenreOptions] = useState([]); // State to hold genre options
  const [selectedGenre, setSelectedGenre] = useState(null);
  const [name, setName] = useState('');
  const [id, setId] = useState(0)
  const [openSnackbar, setOpenSnackbar] = useState(false); // Snackbar state
  const [snackbarMessage, setSnackbarMessage] = useState(''); // Snackbar message state
  const [snackbarSeverity, setSnackbarSeverity] = useState('success'); // Snackbar severity state


  const handleNameChange = (event) => {
    setName(event.target.value);
  };
  const handleTitleChange = (event) => {
    setTitle(event.target.value);
  };

  const handleSubtitleChange = (event) => {
    setSubtitle(event.target.value);
  };
  const handleDescriptionChange = (event) => {
    setDescription(event.target.value);
  };
  const handleAuthorChange = (event) => {
    setAuthor(event.target.value);
  };

  const handlePriceChange = (event) => {
    setPrice(event.target.value);
  };

  // const handleFormSubmit = (values) => {
  //   console.log(values);
  // };


  const handlePost = async () => {
    try {
      const res = await axios.post(POST_DONOR_API_URL, { 'name': name, 'book': id }, {
        headers: {
          'Authorization': `Bearer ${token}`,
          // 'Content-Type': 'multipart/form-data',
        },
      })
      console.log('donors name posted:', res)
      setSnackbarSeverity('success');
      setSnackbarMessage('Donation created successfully!');
      setOpenSnackbar(true);
    } catch (error) {
      console.error('failed to post donors name', error)
      setSnackbarSeverity('error');
      setSnackbarMessage('Failed to create donation. Please try again.');
      setOpenSnackbar(true);
    }


  };
  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append('title', title);
    formData.append('subtitle', subtitle);
    formData.append('price', price);
    formData.append('book_img', bookImg);
    formData.append('description', description);
    formData.append('author', author);
    formData.append('genre', selectedGenre);


    try {
      const response = await axios.post(UPLOAD_BOOKS_API_URL, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${token}`,
        },
      });
      console.log('Upload successful:', response.data);
      console.log('id passed: ', response.data.id)
      setId(response.data.id)
      // setUpdate(true)
    } catch (error) {
      // setError('Failed to upload book. Please try again.');
      console.error('Upload failed:', error);
    }

    handlePost()

  };

  useEffect(() => {
    const fetchGenreOptions = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:8000/view-genre/');
        setGenreOptions(response.data); // Set genre options from API response
        // console.log('genre data: ', response.data)
      } catch (error) {
        console.error('Failed to fetch genre options:', error);
      }
    };

    fetchGenreOptions(); // Fetch genre options when component mounts
  }, []);

  const handleGenreChange = (event, value) => {
    setSelectedGenre(value?.id || null); // Update selected genre ID
  };
  const handleFileChange = (event) => {
    if (event.target.files && event.target.files[0]) {
      setBookImg(event.target.files[0]);
    }
  };


  return (
    <Box m="20px">
      <Header title="DONATE BOOK" subtitle="Create a New Donation" />
      <Snackbar
        open={openSnackbar}
        autoHideDuration={6000}
        onClose={() => setOpenSnackbar(false)}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        <Alert onClose={() => setOpenSnackbar(false)} severity={snackbarSeverity} sx={{ width: '100%' }}>
          {snackbarMessage}
        </Alert>
      </Snackbar>

      <Formik
        onSubmit={handleSubmit}
      // initialValues={initialValues}
      // validationSchema={checkoutSchema}
      >
        {({
          // values,
          errors,
          touched,
          handleBlur,
          // handleChange,
          // handleSubmit,
        }) => (
          <form onSubmit={handleSubmit}>
            <Box
              display="grid"
              gap="30px"
              gridTemplateColumns="repeat(4, minmax(0, 1fr))"
              sx={{
                "& > div": { gridColumn: isNonMobile ? undefined : "span 4" },
              }}
            >
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Donor's Name"
                onBlur={handleBlur}
                onChange={handleNameChange}
                value={name}
                name="name"
                // error={!!touched.name && !!errors.name}
                // helperText={touched.name && errors.name}
                sx={{ gridColumn: "span 4" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Title"
                onBlur={handleBlur}
                onChange={handleTitleChange}
                value={title}
                name="title"
                // error={!!touched.title && !!errors.title}
                // helperText={touched.title && errors.title}
                sx={{ gridColumn: "span 2" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Subtitle"
                onBlur={handleBlur}
                onChange={handleSubtitleChange}
                value={subtitle}
                name="subtitle"
                // error={!!touched.subtitle && !!errors.subtitle}
                // helperText={touched.subtitle && errors.subtitle}
                sx={{ gridColumn: "span 2" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Author"
                onBlur={handleBlur}
                onChange={handleAuthorChange}
                value={author}
                name="author"
                // error={!!touched.author && !!errors.author}
                // helperText={touched.author && errors.author}
                sx={{ gridColumn: "span 2" }}
              />
              <Autocomplete
                onBlur={handleBlur}
                onChange={handleGenreChange}
                options={genreOptions}
                value={genreOptions.find((option) => option.id === selectedGenre) || null}
                getOptionLabel={(option) => option.genre_name || ''}  // Display label in dropdown
                renderInput={(params) => (
                  <TextField {...params} label="Genre" variant="filled" />
                )}
                fullWidth
                // error={!!touched.genre && !!errors.genre}
                // helperText={touched.genre && errors.genre}
                sx={{ gridColumn: "span 2" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="number"
                label="Price"
                onBlur={handleBlur}
                onChange={handlePriceChange}
                value={price}
                name="price"
                // error={!!touched.price && !!errors.price}
                // helperText={touched.price && errors.price}
                sx={{ gridColumn: "span 2" }}
              />
              <TextField
                type="file"
                fullWidth
                sx={{ gridColumn: "span 2" }}
                onChange={handleFileChange}
              // style={{ marginTop: '20px', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: 'secondary' }}
              />

              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Description"
                onBlur={handleBlur}
                onChange={handleDescriptionChange}
                value={description}
                name="description"
                // error={!!touched.description && !!errors.description}
                // helperText={touched.description && errors.description}
                sx={{ gridColumn: "span 2" }}
              />
              {/* <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Email"
                onBlur={handleBlur}
                // onChange={ }
                value={values.email}

                name="email"
                error={!!touched.email && !!errors.email}
                helperText={touched.email && errors.email}
                sx={{ gridColumn: "span 2" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Contact Number"
                onBlur={handleBlur}
                // onChange={ }
                value={values.contact}
                name="contact"
                error={!!touched.contact && !!errors.contact}
                helperText={touched.contact && errors.contact}
                sx={{ gridColumn: "span 4" }}
              /> */}
              {/* <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Address 1"
                onBlur={handleBlur}
                // onChange={}
                value={values.address1}
                name="address1"
                error={!!touched.address1 && !!errors.address1}
                helperText={touched.address1 && errors.address1}
                sx={{ gridColumn: "span 4" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Address 2"
                onBlur={handleBlur}
                // onChange={}
                value={values.address2}
                name="address2"
                error={!!touched.address2 && !!errors.address2}
                helperText={touched.address2 && errors.address2}
                sx={{ gridColumn: "span 4" }}
              /> */}
            </Box>
            <Box display="flex" justifyContent="end" mt="20px">
              <Button type="submit" color="secondary" variant="contained">
                Create Donation
              </Button>
            </Box>
          </form>
        )}
      </Formik>
    </Box>
  );
};

const phoneRegExp =
  /^((\+[1-9]{1,4}[ -]?)|(\([0-9]{2,3}\)[ -]?)|([0-9]{2,4})[ -]?)*?[0-9]{3,4}[ -]?[0-9]{3,4}$/;

// const checkoutSchema = yup.object().shape({
//   name: yup.string().required("required"),
//   title: yup.string().required("required"),
//   subtitle: yup.string().required("required"),
//   author: yup.string().required("required"),
//   description: yup.string().required("required"),
//   genre: yup.string().required("required"),
//   price: yup.number().required("required"),
//   email: yup.string().email("invalid email").required("required"),
//   contact: yup
//     .string()
//     .matches(phoneRegExp, "Phone number is not valid")
//     .required("required"),
//   address1: yup.string().required("required"),
//   address2: yup.string().required("required"),
// });
// const initialValues = {
//   name: "",
//   title: "",
//   subtitle: "",
//   author: "",
//   description: "",
//   price: 0,
//   genre: "",
//   // email: "",
//   // contact: "",
//   // address1: "",
//   // address2: "",
// };

export default Form;

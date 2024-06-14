import { Box, Button, TextField, Autocomplete, Typography, Snackbar, Alert } from "@mui/material";
import { Formik } from "formik";
import useMediaQuery from "@mui/material/useMediaQuery";
import Header from "../../components/Header";
import { useState, useEffect } from "react";
import axios from 'axios';

const token = localStorage.getItem('authToken');
const REGISTER_ADMIN_API_URL = 'http://127.0.0.1:8000/register/';
const COLLEGES_API_URL = 'http://127.0.0.1:8000/view-college/';
const COURSES_API_URL = 'http://127.0.0.1:8000/view-course/';

const CreateAdmin = () => {
    const isNonMobile = useMediaQuery("(min-width:600px)");
    const [collegeOptions, setCollegeOptions] = useState([]);
    const [courseOptions, setCourseOptions] = useState([]);
    const [img, setImg] = useState(null); // Added state for book image
    const [passwordError, setPasswordError] = useState('');
    const [openSnackbar, setOpenSnackbar] = useState(false); // Snackbar state
    const [snackbarMessage, setSnackbarMessage] = useState(''); // Snackbar message state
    const [snackbarSeverity, setSnackbarSeverity] = useState('success'); // Snackbar severity state

    useEffect(() => {
        const fetchColleges = async () => {
            try {
                const response = await axios.get(COLLEGES_API_URL);
                setCollegeOptions(response.data);
            } catch (error) {
                console.error('Error fetching colleges:', error);
            }
        };
        fetchColleges();
    }, []);

    const fetchCourses = async (college) => {
        try {
            const response = await axios.get(COURSES_API_URL, {
                params: { college },
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            setCourseOptions(response.data);
        } catch (error) {
            console.error('Error fetching courses:', error.message);
        }
    };

    const handleFileChange = (event) => {
        if (event.target.files && event.target.files[0]) {
            setImg(event.target.files[0]);
        }
    };

    const handleSubmit = async (values, { setSubmitting, resetForm }) => {
        if (values.password !== values.confirmPassword) {
            setPasswordError('Passwords must match');
            setSubmitting(false);
            return;
        }

        setPasswordError('');

        setSubmitting(true);
        const formData = new FormData();
        formData.append('username', values.username);
        formData.append('password', values.password);
        formData.append('first_name', values.firstName);
        formData.append('last_name', values.lastName);
        formData.append('email', values.email);
        formData.append('college', values.college);
        formData.append('course', values.course);
        formData.append('is_staff', true);
        formData.append('is_verified', true);

        try {
            const response = await axios.post(REGISTER_ADMIN_API_URL, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    Authorization: `Bearer ${token}`,
                },
            });
            console.log('Admin has been created:', response.data);
            setSubmitting(false);
            setSnackbarSeverity('success'); // Set Snackbar severity to success
            setSnackbarMessage('Admin account created successfully!'); // Set success message
            setOpenSnackbar(true); // Show Snackbar
            resetForm(); // Reset form fields
        } catch (error) {
            console.error('Failed to create admin:', error);
            setSubmitting(false);
            setSnackbarSeverity('error'); // Set Snackbar severity to error
            setSnackbarMessage('Failed to create admin account. Please try again.'); // Set error message
            setOpenSnackbar(true); // Show Snackbar
        }
    };

    return (
        <Box m="20px">
            <Header title="Create Hub-Admin" subtitle="Create a new College Hub Admin" />

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
                initialValues={{
                    username: '',
                    password: '',
                    confirmPassword: '',
                    firstName: '',
                    lastName: '',
                    email: '',
                    college: '',
                    course: '',
                }}
                onSubmit={handleSubmit}
            >
                {({
                    errors,
                    touched,
                    handleBlur,
                    handleChange,
                    handleSubmit,
                    values,
                    setFieldValue,
                    isSubmitting,
                }) => (
                    <form onSubmit={handleSubmit}>
                        <Box
                            display="grid"
                            gap="30px"
                            gridTemplateColumns="repeat(4, minmax(0, 1fr))"
                            sx={{
                                "& > div": { gridColumn: isNonMobile ? undefined : "span 4" },
                                "& > *:not(:last-child)": { mb: -2 }
                            }}
                        >
                            <Typography sx={{ mb: -4 }}>LOGIN CREDENTIALS</Typography>
                            <TextField
                                fullWidth
                                variant="filled"
                                type="text"
                                label="Username"
                                onBlur={handleBlur}
                                onChange={handleChange}
                                value={values.username}
                                name="username"
                                sx={{ gridColumn: "span 4" }}
                            />
                            <TextField
                                fullWidth
                                variant="filled"
                                type="password"
                                label="Password"
                                onBlur={handleBlur}
                                onChange={handleChange}
                                value={values.password}
                                name="password"
                                sx={{ gridColumn: "span 4" }}
                            />
                            <TextField
                                fullWidth
                                variant="filled"
                                type="password"
                                label="Confirm Password"
                                onBlur={handleBlur}
                                onChange={handleChange}
                                value={values.confirmPassword}
                                name="confirmPassword"
                                sx={{ gridColumn: "span 4" }}
                                error={passwordError ? true : false}
                                helperText={passwordError}
                            />
                            <Typography sx={{ mt: 2, mb: -4 }}>PERSONAL INFORMATION</Typography>
                            <TextField
                                fullWidth
                                variant="filled"
                                type="text"
                                label="First Name"
                                onBlur={handleBlur}
                                onChange={handleChange}
                                value={values.firstName}
                                name="firstName"
                                sx={{ gridColumn: "span 4" }}
                            />
                            <TextField
                                fullWidth
                                variant="filled"
                                type="text"
                                label="Last Name"
                                onBlur={handleBlur}
                                onChange={handleChange}
                                value={values.lastName}
                                name="lastName"
                                sx={{ gridColumn: "span 4" }}
                            />
                            <TextField
                                fullWidth
                                variant="filled"
                                type="email"
                                label="Email"
                                onBlur={handleBlur}
                                onChange={handleChange}
                                value={values.email}
                                name="email"
                                sx={{ gridColumn: "span 4" }}
                            />
                            <Autocomplete
                                onBlur={handleBlur}
                                onChange={(event, value) => {
                                    setFieldValue('college', value?.id || '');
                                    fetchCourses(value?.id || '');
                                }}
                                options={collegeOptions}
                                value={collegeOptions.find((option) => option.id === values.college) || null}
                                getOptionLabel={(option) => option.college_name || ''}
                                renderInput={(params) => (
                                    <TextField {...params} label="College" variant="filled" />
                                )}
                                fullWidth
                                sx={{ gridColumn: "span 4" }}
                            />
                            <Autocomplete
                                onBlur={handleBlur}
                                onChange={(event, value) => setFieldValue('course', value?.id || '')}
                                options={courseOptions}
                                value={courseOptions.find((option) => option.id === values.course) || null}
                                getOptionLabel={(option) => option.Course || ''}
                                renderInput={(params) => (
                                    <TextField {...params} label="Course" variant="filled" />
                                )}
                                fullWidth
                                sx={{ gridColumn: "span 4" }}
                            />
                        </Box>
                        <Box display="flex" justifyContent="end" mt="25px" mb={6}>
                            <Button type="submit" color="secondary" variant="contained" disabled={isSubmitting} sx={{ gridColumn: "span 4", py: 2 }} fullWidth>
                                Create Admin
                            </Button>
                        </Box>
                        <hr />
                    </form>
                )}
            </Formik>
        </Box>
    );
};

export default CreateAdmin;






// import { Box, Button, TextField, Select, MenuItem, InputLabel, Typography, Autocomplete } from "@mui/material";
// import { Formik } from "formik";
// import useMediaQuery from "@mui/material/useMediaQuery";
// import Header from "../../components/Header";
// import { useState, useEffect } from "react";
// import axios from 'axios';

// const token = localStorage.getItem('authToken');
// const REGISTER_ADMIN_API_URL = 'http://127.0.0.1:8000/register/';
// const COLLEGES_API_URL = 'http://127.0.0.1:8000/view-college/';
// const COURSES_API_URL = 'http://127.0.0.1:8000/view-course/';

// const CreateAdmin = () => {
//     const isNonMobile = useMediaQuery("(min-width:600px)");
//     const [collegeOptions, setCollegeOptions] = useState([]);
//     const [courseOptions, setCourseOptions] = useState([]);
//     const [img, setImg] = useState(null); // Added state for book image
//     const [passwordError, setPasswordError] = useState('');

//     useEffect(() => {
//         const fetchColleges = async () => {
//             try {
//                 const response = await axios.get(COLLEGES_API_URL);
//                 setCollegeOptions(response.data);
//                 console.log(response.data);
//             } catch (error) {
//                 console.error('Error fetching colleges:', error);
//             }
//         };
//         fetchColleges();
//     }, []);

//     const fetchCourses = async (college) => {
//         try {
//             const response = await axios.get(COURSES_API_URL, {
//                 params: { college },
//                 headers: {
//                     'Content-Type': 'application/json'
//                 }
//             });
//             setCourseOptions(response.data);
//             console.log(response.data);
//         } catch (error) {
//             console.error('Error fetching courses:', error.message);
//         }
//     };

//     const handleFileChange = (event) => {
//         if (event.target.files && event.target.files[0]) {
//             setImg(event.target.files[0]);
//         }
//     };

//     const handleSubmit = async (values, { setSubmitting }) => {
//         if (values.password !== values.confirmPassword) {
//             setPasswordError('Passwords must match');
//             setSubmitting(false);
//             return;
//         }

//         setPasswordError('');

//         setSubmitting(true);
//         const formData = new FormData();
//         formData.append('username', values.username);
//         formData.append('password', values.password);
//         formData.append('first_name', values.firstName);
//         formData.append('last_name', values.lastName);
//         formData.append('email', values.email);
//         formData.append('college', values.college);
//         formData.append('course', values.course);
//         formData.append('is_staff', true);
//         formData.append('is_verified', true);
//         // if (img) {
//         //     formData.append('img', img);
//         // }

//         try {
//             const response = await axios.post(REGISTER_ADMIN_API_URL, formData, {
//                 headers: {
//                     'Content-Type': 'multipart/form-data',
//                     Authorization: `Bearer ${token}`,
//                 },
//             });
//             console.log('Admin has been created:', response.data);
//             setSubmitting(false);
//         } catch (error) {
//             console.error('Failed to create admin:', error);
//             setSubmitting(false);
//         }
//     };

//     return (
//         <Box m="20px">
//             <Header title="Create Hub-Admin" subtitle="Create a new College Hub Admin" />

//             <Formik
//                 initialValues={{
//                     username: '',
//                     password: '',
//                     confirmPassword: '',
//                     firstName: '',
//                     lastName: '',
//                     email: '',
//                     college: '',
//                     course: '',
//                 }}
//                 onSubmit={handleSubmit}
//             >
//                 {({
//                     errors,
//                     touched,
//                     handleBlur,
//                     handleChange,
//                     handleSubmit,
//                     values,
//                     setFieldValue,
//                     isSubmitting,
//                 }) => (
//                     <form onSubmit={handleSubmit}>
//                         <Box
//                             display="grid"
//                             gap="30px"
//                             gridTemplateColumns="repeat(4, minmax(0, 1fr))"
//                             sx={{
//                                 "& > div": { gridColumn: isNonMobile ? undefined : "span 4" },
//                                 "& > *:not(:last-child)": { mb: -2 }
//                             }}
//                         >
//                             <Typography sx={{ mb: -4 }}>LOGIN CREDENTIALS</Typography>
//                             <TextField
//                                 fullWidth
//                                 variant="filled"
//                                 type="text"
//                                 label="Username"
//                                 onBlur={handleBlur}
//                                 onChange={handleChange}
//                                 value={values.username}
//                                 name="username"
//                                 sx={{ gridColumn: "span 4" }}
//                             />
//                             <TextField
//                                 fullWidth
//                                 variant="filled"
//                                 type="password"
//                                 label="Password"
//                                 onBlur={handleBlur}
//                                 onChange={handleChange}
//                                 value={values.password}
//                                 name="password"
//                                 sx={{ gridColumn: "span 4" }}
//                             />
//                             <TextField
//                                 fullWidth
//                                 variant="filled"
//                                 type="password"
//                                 label="Confirm Password"
//                                 onBlur={handleBlur}
//                                 onChange={handleChange}
//                                 value={values.confirmPassword}
//                                 name="confirmPassword"
//                                 sx={{ gridColumn: "span 4" }}
//                                 error={passwordError ? true : false}
//                                 helperText={passwordError}
//                             />
//                             <Typography sx={{ mt: 2, mb: -4 }}>PERSONAL INFORMATION</Typography>
//                             <TextField
//                                 fullWidth
//                                 variant="filled"
//                                 type="text"
//                                 label="First Name"
//                                 onBlur={handleBlur}
//                                 onChange={handleChange}
//                                 value={values.firstName}
//                                 name="firstName"
//                                 sx={{ gridColumn: "span 4" }}
//                             />
//                             <TextField
//                                 fullWidth
//                                 variant="filled"
//                                 type="text"
//                                 label="Last Name"
//                                 onBlur={handleBlur}
//                                 onChange={handleChange}
//                                 value={values.lastName}
//                                 name="lastName"
//                                 sx={{ gridColumn: "span 4" }}
//                             />
//                             <TextField
//                                 fullWidth
//                                 variant="filled"
//                                 type="email"
//                                 label="Email"
//                                 onBlur={handleBlur}
//                                 onChange={handleChange}
//                                 value={values.email}
//                                 name="email"
//                                 sx={{ gridColumn: "span 4" }}
//                             />
//                             <Autocomplete
//                                 onBlur={handleBlur}
//                                 onChange={(event, value) => {
//                                     setFieldValue('college', value?.id || '');
//                                     fetchCourses(value?.id || '');
//                                 }}
//                                 options={collegeOptions}
//                                 value={collegeOptions.find((option) => option.id === values.college) || null}
//                                 getOptionLabel={(option) => option.college_name || ''}
//                                 renderInput={(params) => (
//                                     <TextField {...params} label="College" variant="filled" />
//                                 )}
//                                 fullWidth
//                                 sx={{ gridColumn: "span 4" }}
//                             />
//                             <Autocomplete
//                                 onBlur={handleBlur}
//                                 onChange={(event, value) => setFieldValue('course', value?.id || '')}
//                                 options={courseOptions}
//                                 value={courseOptions.find((option) => option.id === values.course) || null}
//                                 getOptionLabel={(option) => option.Course || ''}
//                                 renderInput={(params) => (
//                                     <TextField {...params} label="Course" variant="filled" />
//                                 )}
//                                 fullWidth
//                                 sx={{ gridColumn: "span 4" }}
//                             />
//                             {/* <InputLabel id="college-label">Select College</InputLabel>
//                             <Select
//                                 labelId='college-label'
//                                 id="college-label"
//                                 value={values.college}
//                                 onChange={(e) => {
//                                     setFieldValue('college', e.target.value);
//                                     fetchCourses(e.target.value);
//                                 }}
//                                 name="college"
//                                 sx={{ mb: 2, mt: 1, gridColumn: "span 4" }}
//                             >
//                                 <MenuItem value="">None</MenuItem>
//                                 {collegeOptions.map(college => (
//                                     <MenuItem key={college.id} value={college.id}>{college.college_name}</MenuItem>
//                                 ))}
//                             </Select>
//                             <InputLabel id="course-label">Select Course</InputLabel>
//                             <Select
//                                 labelId='course-label'
//                                 id="course-label"
//                                 value={values.course}
//                                 onChange={(e) => setFieldValue('course', e.target.value)}
//                                 name="course"
//                                 sx={{ mb: 2, mt: 1, gridColumn: "span 4" }}
//                             >
//                                 <MenuItem value="">None</MenuItem>
//                                 {courseOptions.map(course => (
//                                     <MenuItem key={course.id} value={course.id}>{course.Course}</MenuItem>
//                                 ))}
//                             </Select> */}
//                             {/* <TextField
//                                 type="file"
//                                 fullWidth
//                                 sx={{ gridColumn: "span 2" }}
//                                 onChange={handleFileChange}
//                             /> */}
//                         </Box>
//                         <Box display="flex" justifyContent="end" mt="25px" mb={6}>
//                             <Button type="submit" color="secondary" variant="contained" disabled={isSubmitting} sx={{ gridColumn: "span 4", py: 2 }} fullWidth>
//                                 Create Admin
//                             </Button>
//                         </Box>
//                         <hr />
//                     </form>
//                 )}
//             </Formik>
//         </Box>
//     );
// };

// export default CreateAdmin;

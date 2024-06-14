// import { Box, Button } from "@mui/material";
// import { DataGrid, GridToolbar } from "@mui/x-data-grid";
// import { tokens } from "../../theme";
// // import { mockDataContacts } from "../../data/mockData";
// import Header from "../../components/Header";
// import { useTheme } from "@mui/material";
// import { useState, useEffect } from "react";
// import axios from 'axios'

// const VIEW_USERS_API_URL = 'http://127.0.0.1:8000/view-users/';
// const VIEW_PROFILE_API_URL = 'http://127.0.0.1:8000/view-profile/';

// const Contacts = () => {
//   const theme = useTheme();
//   const colors = tokens(theme.palette.mode);
//   // eslint-disable-next-line 
//   const [data, setData] = useState([{
//     id: 1,
//     first_name: "John",
//     last_name: "Doe",
//     username: 'johnDoe',
//     email: "johndoe_69@gmail.com",
//     college: "CCIS",
//     course: "BSCS",
//   },]);

//   const [user, setUser] = useState([])
//   const [suuper, setSuper] = useState(false)



//   const token = localStorage.getItem('authToken');
//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const response = await axios.get(VIEW_PROFILE_API_URL, {
//           headers: {
//             'Authorization': `Bearer ${token}`,
//             'Content-Type': 'multipart/form-data',
//           },
//         });
//         setUser(response.data.college);
//         setSuper(response.data.is_superuser)
//       } catch (err) {
//         console.error('Failed to view profile information', err);
//         alert('Failed to view profile information');
//       }
//     };

//     if (token) {
//       fetchData();
//     } else {
//       alert('You are not logged in!')
//     }
//   }, [token]);


//   useEffect(() => {
//     const fetchData = async () => {
//       const token = localStorage.getItem('authToken');
//       try {
//         const response = await axios.get(VIEW_USERS_API_URL, {
//           headers: {
//             'Authorization': `Bearer ${token}`,
//             // 'Content-Type': 'application/json'
//           }
//         });
//         const users = response.data;
//         if (suuper) {
//           setData(users);
//           console.log('users: ', users)
//         } else if (!suuper && user) {
//           const filteredUsers = users.filter(i => i.college === user);
//           setData(filteredUsers);
//           console.log('filtered college: ', user)
//         }
//         // else {
//         //   alert('Unknown error!')
//         // }
//       } catch (error) {
//         console.error('Failed to fetch data:', error);
//       }
//     };

//     fetchData();
//     // eslint-disable-next-line
//   }, [user]);


//   const handleEdit = (id) => {
//     // Add your edit logic here
//     console.log('Edit clicked for', id);
//   };

//   const handleDelete = (id) => {
//     // Add your delete logic here
//     console.log('Delete clicked for', id);
//   };

//   const ActionCellRenderer = (params) => {
//     return (
//       <Box display="flex" gap="8px">
//         <Button
//           variant="contained"
//           size="small"
//           onClick={() => handleDelete(params.row.id)}
//           sx={{ color: 'white', bgcolor: colors.redAccent[400], '&:hover': { bgcolor: colors.redAccent[700] } }}
//         >
//           Delete
//         </Button>
//         <Button
//           variant="contained"
//           size="small"
//           onClick={() => handleEdit(params.row.id)}
//           sx={{ color: 'white', bgcolor: colors.blueAccent[400], '&:hover': { bgcolor: colors.blueAccent[700] } }}
//         >
//           Edit
//         </Button>

//       </Box>
//     );
//   };

//   const columns = [
//     { field: "id", headerName: "ID", flex: 0.5 },
//     { field: "username", headerName: "Username" },
//     {
//       field: "first_name",
//       headerName: "First name",
//       flex: 1,
//       cellClassName: "name-column--cell",
//     },
//     {
//       field: "last_name",
//       headerName: "Last name",
//       flex: 1,
//       cellClassName: "name-column--cell",
//     },
//     {
//       field: "college",
//       headerName: "College",
//       type: "number",
//       headerAlign: "left",
//       align: "left",
//       flex: 0.5,
//     },
//     {
//       field: "course",
//       headerName: "Course",
//       flex: 1,
//     },
//     {
//       field: "email",
//       headerName: "Email",
//       flex: 1,
//     },
//     {
//       field: "status",
//       headerName: "Status",
//       flex: 0.5,
//       renderCell: (params) => {
//         // let color = 'white';
//         let color;

//         if (params.row.is_flag) {
//           color = colors.redAccent[500];
//         } else if (params.row.is_verified) {
//           color = colors.greenAccent[500];
//         } else {
//           color = colors.grey[500];
//         }

//         return (
//           <Box
//             sx={{
//               color: color,
//               px: 1,
//               py: 0.5,
//               borderRadius: 1,
//               textAlign: 'center'
//             }}
//           >
//             {params.row.is_flag ? 'flagged' : params.row.is_verified ? 'verified' : 'unverified'}
//           </Box>
//         );
//       }
//     },
//     {
//       field: "action",
//       headerName: "Action",
//       flex: 1,
//       renderCell: (params) => <ActionCellRenderer {...params} />
//     },
//   ];




//   return (
//     <Box m="20px">
//       <Header
//         title="Users"
//         subtitle="List of Users for Future Reference"
//       />
//       <Box
//         m="40px 0 0 0"
//         height="70vh"
//         sx={{
//           "& .MuiDataGrid-root": {
//             border: "none",
//           },
//           "& .MuiDataGrid-cell": {
//             borderBottom: "none",
//           },
//           "& .name-column--cell": {
//             color: colors.greenAccent[300],
//           },
//           "& .MuiDataGrid-columnHeaders": {
//             backgroundColor: colors.blueAccent[700],
//             borderBottom: "none",
//           },
//           "& .MuiDataGrid-virtualScroller": {
//             backgroundColor: colors.primary[400],
//           },
//           "& .MuiDataGrid-footerContainer": {
//             borderTop: "none",
//             backgroundColor: colors.blueAccent[700],
//           },
//           "& .MuiCheckbox-root": {
//             color: `${colors.greenAccent[200]} !important`,
//           },
//           "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
//             color: `${colors.grey[100]} !important`,
//           },
//         }}
//       >
//         <DataGrid
//           rows={data}
//           columns={columns}
//           components={{ Toolbar: GridToolbar }}
//         />
//       </Box>
//     </Box>
//   );
// };

// export default Contacts;
// import { Box, Button } from "@mui/material";
// import { DataGrid, GridToolbar } from "@mui/x-data-grid";
// import { tokens } from "../../theme";
// import Header from "../../components/Header";
// import { useTheme } from "@mui/material";
// import { useState, useEffect } from "react";
// import axios from 'axios';

// const VIEW_USERS_API_URL = 'http://127.0.0.1:8000/view-users/';
// const VIEW_PROFILE_API_URL = 'http://127.0.0.1:8000/view-profile/';
// const DELETE_USER_API_URL = 'http://127.0.0.1:8000/delete-user/'; // Update with your actual delete API endpoint

// const Contacts = () => {
//   const theme = useTheme();
//   const colors = tokens(theme.palette.mode);
//   const [data, setData] = useState([]);
//   const [user, setUser] = useState([]);
//   const [suuper, setSuper] = useState(false);
//   const token = localStorage.getItem('authToken');

//   useEffect(() => {
//     const fetchProfile = async () => {
//       try {
//         const response = await axios.get(VIEW_PROFILE_API_URL, {
//           headers: {
//             'Authorization': `Bearer ${token}`,
//             'Content-Type': 'multipart/form-data',
//           },
//         });
//         setUser(response.data.college);
//         setSuper(response.data.is_superuser);
//       } catch (err) {
//         console.error('Failed to view profile information', err);
//         alert('Failed to view profile information');
//       }
//     };

//     if (token) {
//       fetchProfile();
//     } else {
//       alert('You are not logged in!');
//     }
//   }, [token]);

//   useEffect(() => {
//     const fetchUsers = async () => {
//       try {
//         const response = await axios.get(VIEW_USERS_API_URL, {
//           headers: {
//             'Authorization': `Bearer ${token}`,
//           },
//         });
//         const users = response.data;
//         if (suuper) {
//           setData(users);
//         } else if (user) {
//           const filteredUsers = users.filter(i => i.college === user);
//           setData(filteredUsers);
//         }
//       } catch (error) {
//         console.error('Failed to fetch data:', error);
//       }
//     };

//     fetchUsers();
//   }, [user, suuper, token]);

//   const handleEdit = (id) => {
//     // Add your edit logic here, such as navigating to an edit form
//     console.log('Edit clicked for', id);
//   };

//   const handleDelete = async (id) => {
//     try {
//       await axios.delete(`${DELETE_USER_API_URL}${id}/`, {
//         headers: {
//           'Authorization': `Bearer ${token}`,
//         },
//       });
//       setData((prevData) => prevData.filter((item) => item.id !== id));
//       console.log('Deleted user with ID:', id);
//     } catch (error) {
//       console.error('Failed to delete user:', error);
//     }
//   };

//   const ActionCellRenderer = (params) => {
//     return (
//       <Box display="flex" gap="8px">
//         <Button
//           variant="contained"
//           size="small"
//           onClick={() => handleEdit(params.row.id)}
//           sx={{ color: 'white', bgcolor: colors.blueAccent[400], '&:hover': { bgcolor: colors.blueAccent[700] } }}
//         >
//           Edit
//         </Button>
//         <Button
//           variant="contained"
//           size="small"
//           onClick={() => handleDelete(params.row.id)}
//           sx={{ color: 'white', bgcolor: colors.redAccent[400], '&:hover': { bgcolor: colors.redAccent[700] } }}
//         >
//           Delete
//         </Button>
//       </Box>
//     );
//   };

//   const columns = [
//     { field: "id", headerName: "ID", flex: 0.5 },
//     { field: "username", headerName: "Username" },
//     {
//       field: "first_name",
//       headerName: "First name",
//       flex: 1,
//       cellClassName: "name-column--cell",
//     },
//     {
//       field: "last_name",
//       headerName: "Last name",
//       flex: 1,
//       cellClassName: "name-column--cell",
//     },
//     {
//       field: "college",
//       headerName: "College",
//       type: "number",
//       headerAlign: "left",
//       align: "left",
//       flex: 0.5,
//     },
//     {
//       field: "course",
//       headerName: "Course",
//       flex: 1,
//     },
//     {
//       field: "email",
//       headerName: "Email",
//       flex: 1,
//     },
//     {
//       field: "status",
//       headerName: "Status",
//       flex: 0.5,
//       renderCell: (params) => {
//         let color;
//         if (params.row.is_flag) {
//           color = colors.redAccent[500];
//         } else if (params.row.is_verified) {
//           color = colors.greenAccent[500];
//         } else {
//           color = colors.grey[500];
//         }

//         return (
//           <Box
//             sx={{
//               color: color,
//               px: 1,
//               py: 0.5,
//               borderRadius: 1,
//               textAlign: 'center'
//             }}
//           >
//             {params.row.is_flag ? 'flagged' : params.row.is_verified ? 'verified' : 'unverified'}
//           </Box>
//         );
//       }
//     },
//     {
//       field: "action",
//       headerName: "Action",
//       flex: 1,
//       renderCell: (params) => <ActionCellRenderer {...params} />
//     },
//   ];

//   return (
//     <Box m="20px">
//       <Header title="Users" subtitle="List of Users for Future Reference" />
//       <Box
//         m="40px 0 0 0"
//         height="70vh"
//         sx={{
//           "& .MuiDataGrid-root": {
//             border: "none",
//           },
//           "& .MuiDataGrid-cell": {
//             borderBottom: "none",
//           },
//           "& .name-column--cell": {
//             color: colors.greenAccent[300],
//           },
//           "& .MuiDataGrid-columnHeaders": {
//             backgroundColor: colors.blueAccent[700],
//             borderBottom: "none",
//           },
//           "& .MuiDataGrid-virtualScroller": {
//             backgroundColor: colors.primary[400],
//           },
//           "& .MuiDataGrid-footerContainer": {
//             borderTop: "none",
//             backgroundColor: colors.blueAccent[700],
//           },
//           "& .MuiCheckbox-root": {
//             color: `${colors.greenAccent[200]} !important`,
//           },
//           "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
//             color: `${colors.grey[100]} !important`,
//           },
//         }}
//       >
//         <DataGrid
//           rows={data}
//           columns={columns}
//           components={{ Toolbar: GridToolbar }}
//         />
//       </Box>
//     </Box>
//   );
// };

// export default Contacts;
// import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from "@mui/material";
// import { DataGrid, GridToolbar } from "@mui/x-data-grid";
// import { tokens } from "../../theme";
// import Header from "../../components/Header";
// import { useTheme } from "@mui/material";
// import { useState, useEffect } from "react";
// import axios from 'axios';

// const VIEW_USERS_API_URL = 'http://127.0.0.1:8000/view-users/';
// const VIEW_PROFILE_API_URL = 'http://127.0.0.1:8000/view-profile/';
// const UPDATE_USER_API_URL = 'http://127.0.0.1:8000/update-user/'; // Update with your actual update API endpoint
// const DELETE_USER_API_URL = 'http://127.0.0.1:8000/delete-user/'; // Update with your actual delete API endpoint

// const Contacts = () => {
//   const theme = useTheme();
//   const colors = tokens(theme.palette.mode);
//   const [data, setData] = useState([]);
//   const [user, setUser] = useState([]);
//   const [suuper, setSuper] = useState(false);
//   const [open, setOpen] = useState(false);
//   const [currentUser, setCurrentUser] = useState(null);
//   const token = localStorage.getItem('authToken');

//   useEffect(() => {
//     const fetchProfile = async () => {
//       try {
//         const response = await axios.get(VIEW_PROFILE_API_URL, {
//           headers: {
//             'Authorization': `Bearer ${token}`,
//             'Content-Type': 'multipart/form-data',
//           },
//         });
//         setUser(response.data.college);
//         setSuper(response.data.is_superuser);
//       } catch (err) {
//         console.error('Failed to view profile information', err);
//         alert('Failed to view profile information');
//       }
//     };

//     if (token) {
//       fetchProfile();
//     } else {
//       alert('You are not logged in!');
//     }
//   }, [token]);

//   useEffect(() => {
//     const fetchUsers = async () => {
//       try {
//         const response = await axios.get(VIEW_USERS_API_URL, {
//           headers: {
//             'Authorization': `Bearer ${token}`,
//           },
//         });
//         const users = response.data;
//         if (suuper) {
//           setData(users);
//         } else if (user) {
//           const filteredUsers = users.filter(i => i.college === user);
//           setData(filteredUsers);
//         }
//       } catch (error) {
//         console.error('Failed to fetch data:', error);
//       }
//     };

//     fetchUsers();
//   }, [user, suuper, token]);

//   const handleEditOpen = (user) => {
//     setCurrentUser(user);
//     setOpen(true);
//   };

//   const handleEditClose = () => {
//     setOpen(false);
//     setCurrentUser(null);
//   };

//   const handleEditSave = async () => {
//     try {
//       await axios.put(`${UPDATE_USER_API_URL}`, currentUser, {
//         headers: {
//           // 'Content-Type': 'multipart/form-data',
//           'Authorization': `Bearer ${token}`,
//         },
//       });
//       setData((prevData) =>
//         prevData.map((item) => (item.id === currentUser.id ? currentUser : item))
//       );
//       setOpen(false);
//       setCurrentUser(null);
//       console.log('Updated user with ID:', currentUser.id);
//     } catch (error) {
//       console.error('Failed to update user:', error);
//     }
//   };

//   const handleDelete = async (id) => {
//     try {
//       await axios.delete(`${DELETE_USER_API_URL}${id}/`, {
//         headers: {
//           'Authorization': `Bearer ${token}`,
//         },
//       });
//       setData((prevData) => prevData.filter((item) => item.id !== id));
//       console.log('Deleted user with ID:', id);
//     } catch (error) {
//       console.error('Failed to delete user:', error);
//     }
//   };

//   const handleChange = (e) => {
//     setCurrentUser({ ...currentUser, [e.target.name]: e.target.value });
//   };

//   const ActionCellRenderer = (params) => {
//     return (
//       <Box display="flex" gap="8px">
//         <Button
//           variant="contained"
//           size="small"
//           onClick={() => handleEditOpen(params.row)}
//           sx={{ color: 'white', bgcolor: colors.blueAccent[400], '&:hover': { bgcolor: colors.blueAccent[700] } }}
//         >
//           Edit
//         </Button>
//         <Button
//           variant="contained"
//           size="small"
//           onClick={() => handleDelete(params.row.id)}
//           sx={{ color: 'white', bgcolor: colors.redAccent[400], '&:hover': { bgcolor: colors.redAccent[700] } }}
//         >
//           Delete
//         </Button>
//       </Box>
//     );
//   };

//   const columns = [
//     { field: "id", headerName: "ID", flex: 0.5 },
//     { field: "username", headerName: "Username" },
//     {
//       field: "first_name",
//       headerName: "First name",
//       flex: 1,
//       cellClassName: "name-column--cell",
//     },
//     {
//       field: "last_name",
//       headerName: "Last name",
//       flex: 1,
//       cellClassName: "name-column--cell",
//     },
//     {
//       field: "college",
//       headerName: "College",
//       type: "number",
//       headerAlign: "left",
//       align: "left",
//       flex: 0.5,
//     },
//     {
//       field: "course",
//       headerName: "Course",
//       flex: 1,
//     },
//     {
//       field: "email",
//       headerName: "Email",
//       flex: 1,
//     },
//     {
//       field: "status",
//       headerName: "Status",
//       flex: 0.5,
//       renderCell: (params) => {
//         let color;
//         if (params.row.is_flag) {
//           color = colors.redAccent[500];
//         } else if (params.row.is_verified) {
//           color = colors.greenAccent[500];
//         } else {
//           color = colors.grey[500];
//         }

//         return (
//           <Box
//             sx={{
//               color: color,
//               px: 1,
//               py: 0.5,
//               borderRadius: 1,
//               textAlign: 'center'
//             }}
//           >
//             {params.row.is_flag ? 'flagged' : params.row.is_verified ? 'verified' : 'unverified'}
//           </Box>
//         );
//       }
//     },
//     {
//       field: "action",
//       headerName: "Action",
//       flex: 1,
//       renderCell: (params) => <ActionCellRenderer {...params} />
//     },
//   ];

//   return (
//     <Box m="20px">
//       <Header
//         title="Users"
//         subtitle="List of Users for Future Reference"
//       />
//       <Box
//         m="40px 0 0 0"
//         height="70vh"
//         sx={{
//           "& .MuiDataGrid-root": {
//             border: "none",
//           },
//           "& .MuiDataGrid-cell": {
//             borderBottom: "none",
//           },
//           "& .name-column--cell": {
//             color: colors.greenAccent[300],
//           },
//           "& .MuiDataGrid-columnHeaders": {
//             backgroundColor: colors.blueAccent[700],
//             borderBottom: "none",
//           },
//           "& .MuiDataGrid-virtualScroller": {
//             backgroundColor: colors.primary[400],
//           },
//           "& .MuiDataGrid-footerContainer": {
//             borderTop: "none",
//             backgroundColor: colors.blueAccent[700],
//           },
//           "& .MuiCheckbox-root": {
//             color: `${colors.greenAccent[200]} !important`,
//           },
//           "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
//             color: `${colors.grey[100]} !important`,
//           },
//         }}
//       >
//         <DataGrid
//           rows={data}
//           columns={columns}
//           components={{ Toolbar: GridToolbar }}
//         />
//       </Box>

//       <Dialog open={open} onClose={handleEditClose}>
//         <DialogTitle>Edit User</DialogTitle>
//         <DialogContent>
//           <TextField
//             margin="dense"
//             label="First Name"
//             type="text"
//             fullWidth
//             name="first_name"
//             value={currentUser?.first_name || ''}
//             onChange={handleChange}
//           />
//           <TextField
//             margin="dense"
//             label="Last Name"
//             type="text"
//             fullWidth
//             name="last_name"
//             value={currentUser?.last_name || ''}
//             onChange={handleChange}
//           />
//           <TextField
//             margin="dense"
//             label="Email"
//             type="email"
//             fullWidth
//             name="email"
//             value={currentUser?.email || ''}
//             onChange={handleChange}
//           />
//           <TextField
//             margin="dense"
//             label="Username"
//             type="text"
//             fullWidth
//             name="username"
//             value={currentUser?.username || ''}
//             onChange={handleChange}
//           />
//         </DialogContent>
//         <DialogActions>
//           <Button onClick={handleEditClose} color="primary">
//             Cancel
//           </Button>
//           <Button onClick={handleEditSave} color="primary">
//             Save
//           </Button>
//         </DialogActions>
//       </Dialog>
//     </Box>
//   );
// };

// export default Contacts;


import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField, Typography } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import Header from "../../components/Header";
import { useTheme } from "@mui/material";
import { useState, useEffect } from "react";
import axios from 'axios';

const VIEW_USERS_API_URL = 'http://127.0.0.1:8000/view-users/';
const VIEW_PROFILE_API_URL = 'http://127.0.0.1:8000/view-profile/';
const CHANGE_PASSWORD_API_URL = 'http://127.0.0.1:8000/change-password/'; // Update with your actual change password API endpoint
const DELETE_USER_API_URL = 'http://127.0.0.1:8000/delete-user/'; // Update with your actual delete API endpoint

const Contacts = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [data, setData] = useState([]);
  const [user, setUser] = useState([]);
  const [suuper, setSuper] = useState(false);
  const [open, setOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [newPassword, setNewPassword] = useState('');
  const token = localStorage.getItem('authToken');

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await axios.get(VIEW_PROFILE_API_URL, {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'multipart/form-data',
          },
        });
        setUser(response.data.college);
        setSuper(response.data.is_superuser);
      } catch (err) {
        console.error('Failed to view profile information', err);
        alert('Failed to view profile information');
      }
    };

    if (token) {
      fetchProfile();
    } else {
      alert('You are not logged in!');
    }
  }, [token]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get(VIEW_USERS_API_URL, {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });
        const users = response.data;
        if (suuper) {
          setData(users);
        } else if (user) {
          const filteredUsers = users.filter(i => i.college === user);
          setData(filteredUsers);
        }
      } catch (error) {
        console.error('Failed to fetch data:', error);
      }
    };

    fetchUsers();
  }, [user, suuper, token]);

  const handleEditOpen = (user) => {
    setCurrentUser(user);
    setOpen(true);
  };

  const handleEditClose = () => {
    setOpen(false);
    setCurrentUser(null);
    setNewPassword('');
  };

  const handleEditSave = async () => {
    try {
      await axios.patch(`${CHANGE_PASSWORD_API_URL}`, { username: currentUser.username, password: newPassword }, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
      setOpen(false);
      setCurrentUser(null);
      setNewPassword('');
      console.log('Password updated for user:', currentUser.username);
    } catch (error) {
      console.error('Failed to update password:', error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${DELETE_USER_API_URL}${id}/`, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
      setData((prevData) => prevData.filter((item) => item.id !== id));
      console.log('Deleted user with ID:', id);
    } catch (error) {
      console.error('Failed to delete user:', error);
    }
  };

  const handleChange = (e) => {
    setNewPassword(e.target.value);
  };

  const ActionCellRenderer = (params) => {
    return (
      <Box display="flex" gap="8px">
        <Button
          variant="contained"
          size="small"
          onClick={() => handleEditOpen(params.row)}
          sx={{ color: 'white', bgcolor: colors.primary[300], '&:hover': { bgcolor: colors.primary[400] } }}
        >
          Change Password
        </Button>
        <Button
          variant="contained"
          size="small"
          onClick={() => handleDelete(params.row.id)}
          sx={{ color: 'white', bgcolor: colors.redAccent[400], '&:hover': { bgcolor: colors.redAccent[700] } }}
        >
          Delete
        </Button>
      </Box>
    );
  };

  const columns = [
    { field: "id", headerName: "ID", flex: 0.5 },
    { field: "username", headerName: "Username" },
    {
      field: "first_name",
      headerName: "First name",
      flex: 1,
      cellClassName: "name-column--cell",
    },
    {
      field: "last_name",
      headerName: "Last name",
      flex: 1,
      cellClassName: "name-column--cell",
    },
    {
      field: "college",
      headerName: "College",
      type: "number",
      headerAlign: "left",
      align: "left",
      flex: 0.5,
    },
    {
      field: "course",
      headerName: "Course",
      flex: 1,
    },
    {
      field: "email",
      headerName: "Email",
      flex: 1,
    },
    {
      field: "status",
      headerName: "Status",
      flex: 0.5,
      renderCell: (params) => {
        let color;
        if (params.row.is_flag) {
          color = colors.redAccent[500];
        } else if (params.row.is_verified) {
          color = colors.greenAccent[500];
        } else {
          color = colors.grey[500];
        }

        return (
          <Box
            sx={{
              color: color,
              px: 1,
              py: 0.5,
              borderRadius: 1,
              textAlign: 'center'
            }}
          >
            {params.row.is_flag ? 'flagged' : params.row.is_verified ? 'verified' : 'unverified'}
          </Box>
        );
      }
    },
    {
      field: "action",
      headerName: "Action",
      flex: 1.5,
      renderCell: (params) => <ActionCellRenderer {...params} />
    },
  ];

  return (
    <Box m="20px">
      <Header
        title="Users"
        subtitle="List of Users for Future Reference"
      />
      <Box
        m="40px 0 0 0"
        height="70vh"
        sx={{
          "& .MuiDataGrid-root": {
            border: "none",
          },
          "& .MuiDataGrid-cell": {
            borderBottom: "none",
          },
          "& .name-column--cell": {
            color: colors.greenAccent[300],
          },
          "& .MuiDataGrid-columnHeaders": {
            backgroundColor: colors.blueAccent[700],
            borderBottom: "none",
          },
          "& .MuiDataGrid-virtualScroller": {
            backgroundColor: colors.primary[400],
          },
          "& .MuiDataGrid-footerContainer": {
            borderTop: "none",
            backgroundColor: colors.blueAccent[700],
          },
          "& .MuiCheckbox-root": {
            color: `${colors.greenAccent[200]} !important`,
          },
          "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
            color: `${colors.grey[100]} !important`,
          },
        }}
      >
        <DataGrid
          rows={data}
          columns={columns}
          components={{ Toolbar: GridToolbar }}
        />
      </Box>

      <Dialog open={open} onClose={handleEditClose} sx={{ whiteSpace: 'pre-wrap' }}>
        <DialogTitle>Change Password for {'\n'}
          <Typography component="span" sx={{ fontWeight: 'bold', color: colors.blueAccent[400] }}>
            @{currentUser?.username}
          </Typography></DialogTitle>
        <DialogContent>
          <TextField
            margin="dense"
            label="New Password"
            type="password"
            fullWidth
            value={newPassword}
            onChange={handleChange}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleEditClose} sx={{ color: 'white', bgcolor: colors.primary[300], '&:hover': { bgcolor: colors.primary[400] } }}>
            Cancel
          </Button>
          <Button onClick={handleEditSave} sx={{ color: 'white', bgcolor: colors.redAccent[400], '&:hover': { bgcolor: colors.redAccent[500] } }}>
            confirm
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Contacts;

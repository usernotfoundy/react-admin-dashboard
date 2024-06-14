import { Box } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { tokens } from "../../theme";
// import { mockDataContacts } from "../../data/mockData";
import Header from "../../components/Header";
import { useTheme } from "@mui/material";
import { useState, useEffect } from "react";
import axios from 'axios'
import { MultilineChart } from "@mui/icons-material";

const VIEW_USERS_API_URL = 'http://127.0.0.1:8000/view-ratings/';

const Contacts = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  // eslint-disable-next-line 
  const [data, setData] = useState([{
    id: 1,
    first_name: "John",
    last_name: "Doe",
    username: 'johnDoe',
    email: "johndoe_69@gmail.com",
    college: "CCIS",
    course: "BSCS",
  },]);




  const fetchData = async () => {
    const token = localStorage.getItem('authToken');
    try {
      const response = await axios.get(VIEW_USERS_API_URL, {
        headers: {
          'Authorization': `Bearer ${token}`,
          // 'Content-Type': 'application/json'
        }
      });
      const users = response.data;
      setData(users);
    } catch (error) {
      console.error('Failed to fetch data:', error);
    }
  };

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line
  }, []);

  const columns = [
    { field: "id", headerName: "ID", flex: 0.5 },
    { field: "user", headerName: "Username", flex: 0.5 },
    { field: "ratings", headerName: "Ratings", flex: 0.5 },
    {
      field: "comment",
      headerName: "Feedbacks",
      flex: 2,
      cellClassName: "name-column--cell",
    },
    // {
    //   field: "first_name",
    //   headerName: "First name",
    //   flex: 1,
    //   cellClassName: "name-column--cell",
    // },
    // {
    //   field: "last_name",
    //   headerName: "Last name",
    //   flex: 1,
    //   cellClassName: "name-column--cell",
    // },
    // {
    //   field: "college",
    //   headerName: "College",
    //   type: "number",
    //   headerAlign: "left",
    //   align: "left",
    // },
    // {
    //   field: "course",
    //   headerName: "Course",
    //   flex: 1,
    // },
    // {
    //   field: "email",
    //   headerName: "Email",
    //   flex: 1,
    // },
  ];



  return (
    <Box m="20px">
      <Header
        title="Users' Feedbacks"
        subtitle="List of Users' Feedbacks and Ratings"
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
    </Box>
  );
};

export default Contacts;

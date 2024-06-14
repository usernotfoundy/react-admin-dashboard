// import {
//     Box, Button,
//     //  IconButton,
//     Typography, useTheme
// } from "@mui/material";
// import { tokens } from "../../theme";
// import Header from "../../components/Header";
// import { useState, useEffect } from "react";
// import axios from 'axios'
// import { DataGrid, GridToolbar } from "@mui/x-data-grid";

// const VIEW_TRANSACTIONS_API_URL = 'http://127.0.0.1:8000/view-transactions/';
// const VERIFY_USER_API_URL = 'http://127.0.0.1:8000/verify-user/';
// const VIEW_DATAS_API_URL = 'http://127.0.0.1:8000/view-data-stats/';
// const TO_VERIFY_LIST_API_URL = 'http://127.0.0.1:8000/to-verify-list/';

// const Verification = () => {
//     const theme = useTheme();
//     const colors = tokens(theme.palette.mode);
//     const [data, setData] = useState([]);
//     const [datas, setDatas] = useState([])
//     // const [colors, setColors] = useState({
//     //   primary: { 500: '#123456' }, // Example color
//     //   greenAccent: { 500: '#65a30d' },
//     //   grey: { 100: '#e5e7eb' }
//     // });
//     useEffect(() => {
//         fetchVerifyList();
//     }, []);


//     const fetchVerifyList = async () => {
//         const token = localStorage.getItem('authToken');
//         try {
//             const response = await axios.get(TO_VERIFY_LIST_API_URL, {
//                 headers: {
//                     'Authorization': `Bearer ${token}`,
//                     'Content-Type': 'application/json'
//                 }
//             });
//             setData(response.data);
//             console.log('list to verify: ', response.data);
//         } catch (error) {
//             console.error('Failed to fetch verification list:', error);
//         }
//     };




//     // const verifyUser = async (id) => {
//     //     const token = localStorage.getItem('authToken');
//     //     try {
//     //         const response = await axios.put(VERIFY_USER_API_URL, {
//     //             user: id,
//     //             is_verified: true,
//     //         }, {
//     //             headers: {
//     //                 'Authorization': `Bearer ${token}`,
//     //                 'Content-Type': 'application/json'
//     //             }
//     //         });
//     //         console.log('Verification Approved:', response.data);
//     //         fetchVerifyList();
//     //     } catch (error) {
//     //         console.error('Error verifying user:', error);
//     //     }
//     // };

//     const fetchDatas = async () => {
//         const token = localStorage.getItem('authToken');
//         try {
//             const response = await axios.get(TO_VERIFY_LIST_API_URL, {
//                 headers: {
//                     'Authorization': `Bearer ${token}`,
//                     // 'Content-Type': 'application/json'
//                 }
//             });
//             const stats = response.data;
//             setDatas(stats);
//         } catch (error) {
//             console.error('Failed to fetch data:', error);
//         }
//     };

//     useEffect(() => {
//         fetchDatas();
//     })

//     const ActionCellRenderer = (params) => {
//         const handleApprove = async (id) => {
//             const token = localStorage.getItem('authToken');
//             try {
//                 const response = await axios.put(VERIFY_USER_API_URL, {
//                     user: id,
//                     is_verified: true,
//                 }, {
//                     headers: {
//                         'Authorization': `Bearer ${token}`,
//                         'Content-Type': 'application/json'
//                     }
//                 });
//                 console.log('Verification Approved:', response.data);
//                 fetchVerifyList();
//             } catch (error) {
//                 console.error('Error verifying user:', error);
//             }
//             console.log('Approve clicked for', params.row.id);
//         };

//         const handleReject = async (id) => {
//             const token = localStorage.getItem('authToken');
//             try {
//                 const response = await axios.put(VERIFY_USER_API_URL, {
//                     user: id,
//                     is_verified: false,
//                 }, {
//                     headers: {
//                         'Authorization': `Bearer ${token}`,
//                         'Content-Type': 'application/json'
//                     }
//                 });
//                 console.log('User has been Flagged:', response.data);
//                 fetchVerifyList();
//             } catch (error) {
//                 console.error('Error rejecting user:', error);
//             }
//             console.log('Reject clicked for', params.row.id);
//         };

//         return (
//             <Box>
//                 <Button
//                     variant="contained"
//                     color="secondary"
//                     size="small"
//                     onClick={() => handleReject(params.row.id)}
//                     sx={{ color: 'white', bgcolor: colors.redAccent[400], '&:hover': { bgcolor: colors.redAccent[700] }, mx: '5px' }}
//                 >
//                     Reject
//                 </Button>
//                 <Button
//                     sx={{ color: 'white', bgcolor: colors.greenAccent[500], '&:hover': { bgcolor: colors.greenAccent[700] }, mx: '5px' }}
//                     variant="contained"
//                     // color="primary"
//                     size="small"
//                     onClick={() => handleApprove(params.row.id)}
//                 // sx={{ ml: 1 }}
//                 >
//                     verify
//                 </Button>
//             </Box>
//         );
//     };

//     const columns = [
//         { field: "id", headerName: "ID", flex: 0.5 },
//         { field: "user", headerName: "Username" },
//         {
//             field: "first_name",
//             headerName: "First name",
//             flex: 1,
//             cellClassName: "name-column--cell",
//         },
//         {
//             field: "middle_name",
//             headerName: "Middle name",
//             flex: 1,
//             cellClassName: "name-column--cell",
//         },
//         {
//             field: "last_name",
//             headerName: "Last name",
//             flex: 1,
//             cellClassName: "name-column--cell",
//         },
//         {
//             field: "action",
//             headerName: "Action",
//             flex: 1,
//             renderCell: (params) => <ActionCellRenderer {...params} />,
//         },
//     ];


//     return (
//         <Box m="20px">
//             {/* HEADER */}
//             <Box display="flex" justifyContent="space-between" alignItems="center">
//                 <Header title="Verifications" subtitle="Welcome to your Verification dashboard" />
//             </Box>

//             <Box
//                 m="20px 0 0 0"
//                 height="70vh"
//                 sx={{
//                     "& .MuiDataGrid-root": {
//                         border: "none",
//                     },
//                     "& .MuiDataGrid-cell": {
//                         borderBottom: "none",
//                     },
//                     "& .name-column--cell": {
//                         color: colors.greenAccent[300],
//                     },
//                     "& .MuiDataGrid-columnHeaders": {
//                         backgroundColor: colors.blueAccent[700],
//                         borderBottom: "none",
//                     },
//                     "& .MuiDataGrid-virtualScroller": {
//                         backgroundColor: colors.primary[400],
//                     },
//                     "& .MuiDataGrid-footerContainer": {
//                         borderTop: "none",
//                         backgroundColor: colors.blueAccent[700],
//                     },
//                     "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
//                         color: `${colors.grey[100]} !important`,
//                     }, "& .MuiCheckbox-root": {
//                         color: `${colors.greenAccent[200]} !important`,
//                     },
//                 }}
//             >
//                 <DataGrid
//                     rows={data}
//                     columns={columns}
//                     components={{ Toolbar: GridToolbar }}
//                 />
//             </Box>


//         </Box>
//     );
// };

// export default Verification;


// // {/* GRID & CHARTS */ }
// //  <Box
// //  display="grid"
// //  gridTemplateColumns="repeat(12, 1fr)"
// //  gridAutoRows="140px"
// //  gap="20px"
// // >
// //  {/* ROW 1 */}
// //  <Box
// //      gridColumn="span 12"
// //      gridRow="span 3"
// //      backgroundColor={colors.primary[400]}
// //      overflow="auto"
// //  >
// //      <Box
// //          display="flex"
// //          justifyContent="space-between"
// //          alignItems="center"
// //          borderBottom={`4px solid ${colors.primary[500]}`}
// //          colors={colors.grey[100]}
// //          p="15px"
// //      >
// //          <Typography color={colors.grey[100]} variant="h5" fontWeight="600">
// //              List of users to verify
// //          </Typography>
// //      </Box>
// //      {data.map((item, i) => (
// //          <Box
// //              key={`${item.id}-${i}`}
// //              display="flex"
// //              justifyContent="space-between"
// //              alignItems="center"
// //              borderBottom={`4px solid ${colors.primary[500]}`}
// //              p="15px"
// //          >
// //              {/* <Box>
// //                  <Typography
// //                      color={colors.greenAccent[500]}
// //                      variant="h5"
// //                      fontWeight="600"
// //                      style={{
// //                          maxWidth: '200px', // Set a max width that fits your layout
// //                          overflow: 'hidden',
// //                          textOverflow: 'ellipsis',
// //                          whiteSpace: 'nowrap'
// //                      }}
// //                  >
// //                      {item.transaction_hash}
// //                  </Typography>
// //              </Box> */}
// //              <Typography color={colors.grey[100]}>
// //                  {item.user}
// //              </Typography>
// //              <Box color={colors.grey[100]}>{item.first_name}</Box>
// //              <Box color={colors.grey[100]}>{item.middle_name}</Box>
// //              <Box color={colors.grey[100]}>{item.last_name}</Box>
// //              <Box
// //                  // backgroundColor={colors.greenAccent[500]}
// //                  // p="5px 10px"
// //                  borderRadius="4px"
// //              >
// //                  <Button sx={{ color: 'white', bgcolor: colors.redAccent[400], '&:hover': { bgcolor: colors.redAccent[700] }, mx: '5px' }}>
// //                      reject
// //                  </Button>
// //                  <Button sx={{ color: 'white', bgcolor: colors.greenAccent[500], '&:hover': { bgcolor: colors.greenAccent[700] }, mx: '5px' }} onClick={() => verifyUser(item.id)}>
// //                      approve
// //                  </Button>
// //              </Box>
// //          </Box>
// //      ))}
// //  </Box>
// // </Box>



import {
    Box, Button,
    Typography, useTheme
} from "@mui/material";
import { tokens } from "../../theme";
import Header from "../../components/Header";
import { useState, useEffect } from "react";
import axios from 'axios';
import { DataGrid, GridToolbar } from "@mui/x-data-grid";

const VIEW_TRANSACTIONS_API_URL = 'http://127.0.0.1:8000/view-transactions/';
const VERIFY_USER_API_URL = 'http://127.0.0.1:8000/verify-user/';
const VIEW_DATAS_API_URL = 'http://127.0.0.1:8000/view-data-stats/';
const TO_VERIFY_LIST_API_URL = 'http://127.0.0.1:8000/to-verify-list/';
const VIEW_PROFILE_API_URL = 'http://127.0.0.1:8000/view-profile/';

const Verification = () => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const [data, setData] = useState([]);
    const [datas, setDatas] = useState([]);
    const [userCollege, setUserCollege] = useState([]);
    const [suuper, setSuper] = useState()


    useEffect(() => {
        fetchProfile();
    }, []);

    const fetchProfile = async () => {
        const token = localStorage.getItem('authToken');
        try {
            const response = await axios.get(VIEW_PROFILE_API_URL, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'multipart/form-data',
                },
            });
            setUserCollege(response.data.college);
            setSuper(response.data.is_superuser)
            console.log('user college: ', response.data.college);
        } catch (err) {
            console.error('Failed to view profile information', err);
            alert('Failed to view profile information');
        }
    };

    const fetchDatas = async () => {
        const token = localStorage.getItem('authToken');
        try {
            const response = await axios.get(TO_VERIFY_LIST_API_URL, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                }
            });
            const stats = response.data;
            if (suuper)
                setData(stats);
            else if (!suuper && userCollege) {
                const filteredData = response.data.filter(item => item.college_abbr === userCollege);
                setData(filteredData);
            }
            // setDatas(stats);
            // setData(stats);
        } catch (error) {
            console.error('Failed to fetch data:', error);
        }
    };

    useEffect(() => {
        if (userCollege || suuper)
            fetchDatas();
    }, [userCollege, suuper]);

    const ActionCellRenderer = (params) => {
        const handleApprove = async (id) => {
            const token = localStorage.getItem('authToken');
            try {
                const response = await axios.put(VERIFY_USER_API_URL, {
                    user: id,
                    is_verified: true,
                }, {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json'
                    }
                });
                console.log('Verification Approved:', response.data);
                fetchDatas();
            } catch (error) {
                console.error('Error verifying user:', error);
            }
            console.log('Approve clicked for', params.row.id);
        };

        const handleReject = async (id) => {
            const token = localStorage.getItem('authToken');
            try {
                const response = await axios.put(VERIFY_USER_API_URL, {
                    user: id,
                    is_verified: false,
                }, {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json'
                    }
                });
                console.log('User has been Flagged:', response.data);
                fetchDatas();
            } catch (error) {
                console.error('Error rejecting user:', error);
            }
            console.log('Reject clicked for', params.row.id);
        };

        return (
            <Box display="flex" gap="8px">
                <Button
                    variant="contained"
                    size="small"
                    onClick={() => handleReject(params.row.id)}
                    sx={{ color: 'white', bgcolor: colors.redAccent[400], '&:hover': { bgcolor: colors.redAccent[700] } }}
                >
                    Reject
                </Button>
                <Button
                    variant="contained"
                    size="small"
                    onClick={() => handleApprove(params.row.id)}
                    sx={{ color: 'white', bgcolor: colors.greenAccent[500], '&:hover': { bgcolor: colors.greenAccent[700] } }}
                >
                    Verify
                </Button>
            </Box>
        );
    };

    const columns = [
        { field: "id", headerName: "ID", flex: 0.5 },
        { field: "user", headerName: "Username" },
        {
            field: "first_name",
            headerName: "First name",
            flex: 1,
            cellClassName: "name-column--cell",
        },
        {
            field: "middle_name",
            headerName: "Middle name",
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
            field: "action",
            headerName: "Action",
            flex: 1,
            renderCell: (params) => <ActionCellRenderer {...params} />,
        },
    ];

    return (
        <Box m="20px">
            {/* HEADER */}
            <Box display="flex" justifyContent="space-between" alignItems="center">
                <Header title="Verifications" subtitle="Welcome to your Verification dashboard" />
            </Box>

            <Box
                m="20px 0 0 0"
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
                    "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
                        color: `${colors.grey[100]} !important`,
                    },
                    "& .MuiCheckbox-root": {
                        color: `${colors.greenAccent[200]} !important`,
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

export default Verification;

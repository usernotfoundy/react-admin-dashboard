import {
  Box, Button,
  //  IconButton,
  Typography, useTheme
} from "@mui/material";
import { tokens } from "../../theme";
import DownloadOutlinedIcon from "@mui/icons-material/DownloadOutlined";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import LibraryBooksIcon from '@mui/icons-material/LibraryBooks';
import ReceiptLongIcon from '@mui/icons-material/ReceiptLong';
import DoneAllIcon from '@mui/icons-material/DoneAll';
import Header from "../../components/Header";
import StatBox from "../../components/StatBox";
// import { mockTransactions } from "../../data/mockData";
// import TrafficIcon from "@mui/icons-material/Traffic";
// import PointOfSaleIcon from "@mui/icons-material/PointOfSale";
// import EmailIcon from "@mui/icons-material/Email";
// import LineChart from "../../components/LineChart";
// import GeographyChart from "../../components/GeographyChart";
// import BarChart from "../../components/BarChart";
// import ProgressCircle from "../../components/ProgressCircle";
import { useState, useEffect } from "react";
import axios from 'axios'
import { format } from 'date-fns';

const VIEW_TRANSACTIONS_API_URL = 'http://127.0.0.1:8000/view-transactions/';
const APPROVE_TRANSACTIONS_API_URL = 'http://127.0.0.1:8000/approve-transaction/';
const DECLINE_TRANSACTIONS_API_URL = 'http://127.0.0.1:8000/decline-transaction/';
const VIEW_DATAS_API_URL = 'http://127.0.0.1:8000/view-data-stats/';
const VIEW_PROFILE_API_URL = 'http://127.0.0.1:8000/view-profile/';

const Dashboard = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [data, setData] = useState([]);
  const [datas, setDatas] = useState([]);
  const [userCollege, setUserCollege] = useState([]);
  // const [colors, setColors] = useState({
  //   primary: { 500: '#123456' }, // Example color
  //   greenAccent: { 500: '#65a30d' },
  //   grey: { 100: '#e5e7eb' }
  // });
  useEffect(() => {
    // fetchTransactions();
    fetchDatas();
    fetchData();
  }, []);


  const fetchTransactions = async () => {
    const token = localStorage.getItem('authToken');
    try {
      const response = await axios.get(VIEW_TRANSACTIONS_API_URL, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
      const filteredTransactions = response.data.filter(item => item.claim_hub === userCollege);
      setData(filteredTransactions);
      console.log('Filtered transaction list: ', filteredTransactions);
    } catch (error) {
      console.error('Failed to fetch transactions:', error);
    }
  };

  useEffect(() => {
    if (userCollege) {
      fetchTransactions();
    }
  }, [userCollege]);


  // const fetchTransactions = async () => {
  //   const token = localStorage.getItem('authToken');
  //   try {
  //     const response = await axios.get(VIEW_TRANSACTIONS_API_URL, {
  //       headers: {
  //         'Authorization': `Bearer ${token}`,
  //         'Content-Type': 'application/json'
  //       }
  //     });
  //     console.log('user college: ', userCollege);
  //     const transactions = response.data
  //     console.log('transactions : ', transactions);
  //     const filteredTransactions = transactions.filter(transaction => transaction.claim_hub === userCollege);
  //     console.log('filtered transactions: ', filteredTransactions);
  //     setData(filteredTransactions);
  //     // const collegeTrans = response.data;
  //     // console.log('user college: ', userCollege);
  //     // console.log('transaction college : ', collegeTrans);
  //     // if (userCollege === collegeTrans) {
  //     //   console.log('transaction list: ', response.data);
  //     //   setData(response.data);
  //     // }
  //   } catch (error) {
  //     console.error('Failed to fetch transactions:', error);
  //   }
  // };

  const approveTransaction = async (transactionId) => {
    const token = localStorage.getItem('authToken');
    try {
      const response = await axios.put(APPROVE_TRANSACTIONS_API_URL, {
        book_id: transactionId
      }, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
      console.log('Transaction Approved:', response.data);
      fetchTransactions();
    } catch (error) {
      console.error('Error approving transaction:', error);
    }
  };
  const declineTransaction = async (purchaseId) => {
    const token = localStorage.getItem('authToken');
    try {
      const response = await axios.delete(`${DECLINE_TRANSACTIONS_API_URL}${purchaseId}`, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
      console.log('Transaction Declined:', response.data);
      fetchTransactions();
    } catch (error) {
      console.error('Error declining transaction:', error);
    }
  };

  const fetchDatas = async () => {
    const token = localStorage.getItem('authToken');
    try {
      const response = await axios.get(VIEW_DATAS_API_URL, {
        headers: {
          'Authorization': `Bearer ${token}`,
          // 'Content-Type': 'application/json'
        }
      });
      const stats = response.data;
      setDatas(stats);
    } catch (error) {
      console.error('Failed to fetch data:', error);
    }
  };

  // useEffect(() => {
  //   fetchDatas();
  //   fetchData();
  // }, []);

  const formatDate = (dateString) => {
    const at = 'at'
    return format(new Date(dateString), `yyyy-MM-dd | hh:mm aa`);
  };

  const fetchData = async () => {
    const token = localStorage.getItem('authToken');
    try {
      const response = await axios.get(VIEW_PROFILE_API_URL, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'multipart/form-data',
        },
      });
      setUserCollege(response.data.college);
      console.log('user info: ', response.data.college);
    } catch (err) {
      console.error('Failed to view profile information', err);
      alert('Failed to view profile information');
    }
  };

  return (
    <Box m="20px">
      {/* HEADER */}
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Header title="DASHBOARD" subtitle="Welcome to your dashboard" />

        {/* <Box>
          <Button
            sx={{
              backgroundColor: colors.blueAccent[700],
              color: colors.grey[100],
              fontSize: "14px",
              fontWeight: "bold",
              padding: "10px 20px",
            }}
          >
            <DownloadOutlinedIcon sx={{ mr: "10px" }} />
            Download Reports
          </Button>
        </Box> */}
      </Box>

      {/* GRID & CHARTS */}
      <Box
        display="grid"
        gridTemplateColumns="repeat(12, 1fr)"
        gridAutoRows="140px"
        gap="20px"
      >
        {/* ROW 1 */}
        <Box
          gridColumn="span 3"
          backgroundColor={colors.primary[400]}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <StatBox
            title={datas.users_count}
            subtitle="Users"
            progress="0.75"
            increase="coming soon..."
            icon={
              <PersonAddIcon
                sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
              />
            }
          />
        </Box>
        <Box
          gridColumn="span 3"
          backgroundColor={colors.primary[400]}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <StatBox
            title={datas.books_count}
            subtitle="Book Uploads"
            progress="0.50"
            increase="coming soon..."
            icon={
              <LibraryBooksIcon
                sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
              />
            }
          />
        </Box>
        <Box
          gridColumn="span 3"
          backgroundColor={colors.primary[400]}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <StatBox
            title={datas.pre_purchased}
            subtitle="Pre-purchases"
            progress="0.30"
            increase="coming soon..."
            icon={
              <ReceiptLongIcon
                sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
              />
            }
          />
        </Box>
        <Box
          gridColumn="span 3"
          backgroundColor={colors.primary[400]}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <StatBox
            title={datas.purchased}
            subtitle="Purchases"
            progress="0.80"
            increase="coming soon..."
            icon={
              <DoneAllIcon
                sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
              />
            }
          />
        </Box>

        {/* ROW 2 */}
        {/* <Box
          gridColumn="span 8"
          gridRow="span 2"
          backgroundColor={colors.primary[400]}
        >
          <Box
            mt="25px"
            p="0 30px"
            display="flex "
            justifyContent="space-between"
            alignItems="center"
          >
            <Box>
              <Typography
                variant="h5"
                fontWeight="600"
                color={colors.grey[100]}
              >
                Revenue Generated
              </Typography>
              <Typography
                variant="h3"
                fontWeight="bold"
                color={colors.greenAccent[500]}
              >
                $59,342.32
              </Typography>
            </Box>
            <Box>
              <IconButton>
                <DownloadOutlinedIcon
                  sx={{ fontSize: "26px", color: colors.greenAccent[500] }}
                />
              </IconButton>
            </Box>
          </Box>
          <Box height="250px" m="-20px 0 0 0">
            <LineChart isDashboard={true} />
          </Box>
        </Box> */}
        <Box
          gridColumn="span 12"
          gridRow="span 2"
          backgroundColor={colors.primary[400]}
          overflow="auto"
        >
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            borderBottom={`4px solid ${colors.primary[500]}`}
            colors={colors.grey[100]}
            p="15px"
          >
            <Typography color={colors.grey[100]} variant="h5" fontWeight="600">
              Recent Transactions
            </Typography>
          </Box>
          {data.map((item, i) => (
            <Box
              key={`${item.id}-${i}`}
              display="flex"
              justifyContent="space-between"
              alignItems="center"
              borderBottom={`4px solid ${colors.primary[500]}`}
              p="15px"
            >
              <Box>
                <Typography
                  color={colors.greenAccent[500]}
                  variant="h5"
                  fontWeight="600"
                  style={{
                    maxWidth: '200px', // Set a max width that fits your layout
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    whiteSpace: 'nowrap'
                  }}
                >
                  {item.transaction_hash}
                </Typography>
                <Typography color={colors.grey[100]}>
                  {item.user}
                </Typography>
              </Box>
              <Box color={colors.grey[100]}>{item.seller}</Box>
              <Box color={colors.grey[100]}>{item.purchase_book}</Box>
              <Box color={colors.grey[100]}>{formatDate(item.created_at)}</Box>
              <Box
                // backgroundColor={colors.greenAccent[500]}
                // p="5px 10px"
                borderRadius="4px"
              >
                <Button sx={{ color: 'white', bgcolor: colors.redAccent[400], '&:hover': { bgcolor: colors.redAccent[700] }, mx: '5px' }} onClick={() => declineTransaction(item.id)}>
                  decline
                </Button>
                <Button sx={{ color: 'white', bgcolor: colors.greenAccent[500], '&:hover': { bgcolor: colors.greenAccent[700] }, mx: '5px' }} onClick={() => approveTransaction(item.book_id)}>
                  confirm
                </Button>
              </Box>
            </Box>
          ))}
        </Box>

        {/* ROW 3 */}
        {/* <Box
          gridColumn="span 4"
          gridRow="span 2"
          backgroundColor={colors.primary[400]}
          p="30px"
        >
          <Typography variant="h5" fontWeight="600">
            Campaign
          </Typography>
          <Box
            display="flex"
            flexDirection="column"
            alignItems="center"
            mt="25px"
          >
            <ProgressCircle size="125" />
            <Typography
              variant="h5"
              color={colors.greenAccent[500]}
              sx={{ mt: "15px" }}
            >
              $48,352 revenue generated
            </Typography>
            <Typography>Includes extra misc expenditures and costs</Typography>
          </Box>
        </Box> */}
        {/* <Box
          gridColumn="span 4"
          gridRow="span 2"
          backgroundColor={colors.primary[400]}
        >
          <Typography
            variant="h5"
            fontWeight="600"
            sx={{ padding: "30px 30px 0 30px" }}
          >
            Sales Quantity
          </Typography>
          <Box height="250px" mt="-20px">
            <BarChart isDashboard={true} />
          </Box>
        </Box> */}
        {/* <Box
          gridColumn="span 4"
          gridRow="span 2"
          backgroundColor={colors.primary[400]}
          padding="30px"
        >
          <Typography
            variant="h5"
            fontWeight="600"
            sx={{ marginBottom: "15px" }}
          >
            Geography Based Traffic
          </Typography>
          <Box height="200px">
            <GeographyChart isDashboard={true} />
          </Box>
        </Box> */}
      </Box>
    </Box>
  );
};

export default Dashboard;

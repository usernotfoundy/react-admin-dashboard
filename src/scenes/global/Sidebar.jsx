import { useState, useEffect } from "react";
import { ProSidebar, Menu, MenuItem } from "react-pro-sidebar";
import { Box, IconButton, Typography, useTheme } from "@mui/material";
import { Link } from "react-router-dom";
import "react-pro-sidebar/dist/css/styles.css";
import { tokens } from "../../theme";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import GroupIcon from '@mui/icons-material/Group';
import CalendarTodayOutlinedIcon from "@mui/icons-material/CalendarTodayOutlined";
import StarRoundedIcon from '@mui/icons-material/StarRounded';
import FactCheckRoundedIcon from '@mui/icons-material/FactCheckRounded';
import AdminPanelSettingsRoundedIcon from '@mui/icons-material/AdminPanelSettingsRounded';
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import TableViewIcon from '@mui/icons-material/TableView';
import axios from 'axios'
// import { useLocation } from 'react-router-dom';

// import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
// import PeopleOutlinedIcon from "@mui/icons-material/PeopleOutlined";
// import ContactsOutlinedIcon from "@mui/icons-material/ContactsOutlined";
// import ReceiptOutlinedIcon from "@mui/icons-material/ReceiptOutlined";
// import HelpOutlineOutlinedIcon from "@mui/icons-material/HelpOutlineOutlined";
// import PieChartOutlineOutlinedIcon from "@mui/icons-material/PieChartOutlineOutlined";
// import MapOutlinedIcon from "@mui/icons-material/MapOutlined";

const Item = ({ title, to, icon, selected, setSelected }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  return (
    <MenuItem
      active={selected === title}
      style={{
        color: colors.grey[100],
      }}
      onClick={() => setSelected(title)}
      icon={icon}
    >
      <Typography>{title}</Typography>
      <Link to={to} />
    </MenuItem>
  );
};
const VIEW_PROFILE_API_URL = 'http://127.0.0.1:8000/view-profile/';

const Sidebar = ({ token }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [selected, setSelected] = useState("Dashboard");
  const [img, setImg] = useState('');
  const [username, setUsername] = useState('E-Man Well');
  const [name, setName] = useState('E-Man WEll');
  const [profile, setProfile] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(VIEW_PROFILE_API_URL, {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'multipart/form-data',
          },
        });
        setImg(response.data.profile_img);
        setUsername(response.data.email);
        setName(response.data.username);
        setProfile(response.data)
        // console.log(response.data)
      } catch (err) {
        console.error('Failed to view profile information', err);
        alert('Failed to view profile information');
      }
    };

    if (token) {
      fetchData();
    } else {
      alert('You are not logged in!')
    }
  }, [token]);

  // if (location.pathname === '/') {
  //   window.location.reload();
  // }
  // console.log('img url', img)
  return (
    <Box
      sx={{
        "& .pro-sidebar-inner": {
          background: `${colors.primary[400]} !important`,
        },
        "& .pro-icon-wrapper": {
          backgroundColor: "transparent !important",
        },
        "& .pro-inner-item": {
          padding: "5px 35px 5px 20px !important",
        },
        "& .pro-inner-item:hover": {
          color: "#868dfb !important",
        },
        "& .pro-menu-item.active": {
          color: "#6870fa !important",
        },
      }}
    >
      <ProSidebar collapsed={isCollapsed}>
        <Menu iconShape="square">
          {/* LOGO AND MENU ICON */}
          <MenuItem
            onClick={() => setIsCollapsed(!isCollapsed)}
            icon={isCollapsed ? <MenuOutlinedIcon /> : undefined}
            style={{
              margin: "10px 0 20px 0",
              color: colors.grey[100],
            }}
          >
            {!isCollapsed && (
              <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                ml="15px"
              >
                <Typography variant="h3" color={colors.grey[100]}>
                  ADMIN
                </Typography>
                <IconButton onClick={() => setIsCollapsed(!isCollapsed)}>
                  <MenuOutlinedIcon />
                </IconButton>
              </Box>
            )}
          </MenuItem>

          {!isCollapsed && (
            <Box mb="25px">
              <Box display="flex" justifyContent="center" alignItems="center">
                <img
                  alt="profile-user"
                  width="100px"
                  height="100px"
                  // src={`../../assets/user.png`}
                  src={img ? `${img}` : `../../assets/user.png`}
                  style={{ cursor: "pointer", borderRadius: "50%" }}
                />
              </Box>
              <Box textAlign="center">
                <Typography
                  variant="h2"
                  color={colors.grey[100]}
                  fontWeight="bold"
                  sx={{ m: "10px 0 0 0" }}
                >
                  {/* E-Man Well */}
                  {name}
                </Typography>
                <Typography variant="h5" color={colors.greenAccent[500]}>
                  {/* Admin/Project Champion */}
                  {username}
                </Typography>
              </Box>
            </Box>
          )}

          <Box paddingLeft={isCollapsed ? undefined : "10%"}>
            <Item
              title="Dashboard"
              to="/"
              icon={<HomeOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />

            <Typography
              variant="h6"
              color={colors.grey[300]}
              sx={{ m: "15px 0 5px 20px" }}
            >
              Data
            </Typography>
            {/* <Item
              title="Manage Team"
              to="/team"
              icon={<PeopleOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            /> */}
            <Item
              title="Manage Users"
              to="/contacts"
              icon={<GroupIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            {profile.is_superuser && (
              <Item
                title="Ratings and Feedbacks"
                to="/feedbacks"
                icon={<StarRoundedIcon />}
                selected={selected}
                setSelected={setSelected}
              />
            )}
            <Item
              title="Verifications"
              to="/verify"
              icon={<FactCheckRoundedIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            {/* <Item
              title="Invoices Balances"
              to="/invoices"
              icon={<ReceiptOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            /> */}

            <Typography
              variant="h6"
              color={colors.grey[300]}
              sx={{ m: "15px 0 5px 20px" }}
            >
              Forms
            </Typography>
            <Item
              title="Donation Form"
              to="/form"
              icon={<TableViewIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            {profile.is_superuser && (
              <Item
                title="Create Admin"
                to="/create-admin"
                icon={<AdminPanelSettingsRoundedIcon />}
                selected={selected}
                setSelected={setSelected}
              />
            )}
            <Item
              title="Announcement"
              to="/calendar"
              icon={<CalendarTodayOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />
          </Box>
        </Menu>
      </ProSidebar>
    </Box>
  );
};

export default Sidebar;

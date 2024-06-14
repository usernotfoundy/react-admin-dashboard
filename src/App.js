// import { useState } from "react";
// import { Routes, Route } from "react-router-dom";
// import Topbar from "./scenes/global/Topbar";
// import Sidebar from "./scenes/global/Sidebar";
// import Dashboard from "./scenes/dashboard";
// import Team from "./scenes/team";
// import Invoices from "./scenes/invoices";
// import Contacts from "./scenes/contacts";
// import Bar from "./scenes/bar";
// import Form from "./scenes/form";
// import Line from "./scenes/line";
// import Login from "./scenes/login";
// import { CssBaseline, ThemeProvider } from "@mui/material";
// import { ColorModeContext, useMode } from "./theme";
// import Calendar from "./scenes/calendar/calendar";

// // import Pie from "./scenes/pie";
// // import FAQ from "./scenes/faq";
// // import Geography from "./scenes/geography";

// function App() {
//   const [theme, colorMode] = useMode();
//   const [isSidebar, setIsSidebar] = useState(true);

//   return (
//     <ColorModeContext.Provider value={colorMode}>
//       <ThemeProvider theme={theme}>
//         <CssBaseline />
//         <div className="app">
//           <Sidebar isSidebar={isSidebar} />
//           <main className="content">
//             <Topbar setIsSidebar={setIsSidebar} />
//             <Routes>
//               <Route path="/" element={<Dashboard />} />
//               <Route path="/team" element={<Team />} />
//               <Route path="/contacts" element={<Contacts />} />
//               <Route path="/invoices" element={<Invoices />} />
//               <Route path="/form" element={<Form />} />
//               <Route path="/bar" element={<Bar />} />
//               <Route path="/calendar" element={<Calendar />} />
//               <Route path="/line" element={<Line />} />
//               <Route path="/login" element={<Login />} />


//               {/* <Route path="/pie" element={<Pie />} /> */}
//               {/* <Route path="/faq" element={<FAQ />} /> */}
//               {/* <Route path="/geography" element={<Geography />} /> */}
//             </Routes>
//           </main>
//         </div>
//       </ThemeProvider>
//     </ColorModeContext.Provider>
//   );
// }

// export default App;
import { useState } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import Topbar from "./scenes/global/Topbar";
import Sidebar from "./scenes/global/Sidebar";
import Dashboard from "./scenes/dashboard";
import Team from "./scenes/team";
import Invoices from "./scenes/invoices";
import Contacts from "./scenes/contacts";
import Feedbacks from "./scenes/feedbacks";
import Bar from "./scenes/bar";
import Form from "./scenes/form";
import Line from "./scenes/line";
import Login from "./scenes/login";
import Verification from './scenes/verification'
import { CssBaseline, ThemeProvider } from "@mui/material";
import { ColorModeContext, useMode } from "./theme";
import Calendar from "./scenes/calendar/calendar";
import CreateAdmin from "./scenes/createAdmin";

function App() {
  const [theme, colorMode] = useMode();
  const [isSidebar, setIsSidebar] = useState(true);
  const location = useLocation();

  // Check if the current location is not the login page
  const showLayout = location.pathname !== "/login";

  const [token, setToken] = useState(localStorage.getItem('authToken'));

  const handleLogin = (newToken) => {
    localStorage.setItem('authToken', newToken);
    setToken(newToken);
  };

  const handleLogout = () => {
    localStorage.removeItem('authToken');
    setToken(null);
  };


  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <div className="app">
          {showLayout && <Sidebar isSidebar={isSidebar} token={token} />}
          <main className={showLayout ? "content" : "content full"}>
            {showLayout && <Topbar setIsSidebar={setIsSidebar} handleLogout={handleLogout} />}
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/team" element={<Team />} />
              <Route path="/contacts" element={<Contacts />} />
              <Route path="/feedbacks" element={<Feedbacks />} />
              <Route path="/invoices" element={<Invoices />} />
              <Route path="/form" element={<Form />} />
              <Route path="/calendar" element={<Calendar />} />
              <Route path="/bar" element={<Bar />} />
              <Route path="/line" element={<Line />} />
              <Route path="/login" element={<Login handleLogin={handleLogin} />} />
              <Route path="/verify" element={<Verification />} />
              <Route path="/create-admin" element={<CreateAdmin />} />
            </Routes>
          </main>
        </div>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default App;

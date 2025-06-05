import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProfile } from "../../redux/action/authAction";
import {
  Box,
  createTheme,
  CssBaseline,
  Grid,
  ThemeProvider,
} from "@mui/material";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import NewTweetForm from "../components/NewTweetForm";
import Feed from "../components/Feed";
import { fetchPosting, storePosting } from "../../redux/action/postAction";

const WEBSOCKET_URL = "ws://127.0.0.1:3002/";

const theme = createTheme({
  palette: {
    primary: {
      main: "#1DA1F2", // Warna biru Twitter
    },
    background: {
      default: "#f5f8fa", // Latar belakang abu-abu muda
    },
  },
  typography: {
    fontFamily: '"Helvetica Neue", Arial, sans-serif',
  },
});

const Home = () => {
  const profile = useSelector((root) => root?.auth);
  const posting = useSelector((root) => root?.post);
  const dispatch = useDispatch();

  // useEffect(() => {
  //   dispatch(fetchProfile(profile?.token));
  //   dispatch(fetchPosting(profile?.token));
  //   const socket = new WebSocket(WEBSOCKET_URL);

  //   socket.onopen = () => console.log(`CONNECT TO SERVER`);
  //   socket.onmessage = (event) => {
  //     console.log(`ON MESSAGE: ${JSON.stringify(event)}`);
  //   };
  //   socket.onerror = (event) => console.log(`ON ERR: ${JSON.stringify(event)}`);
  //   socket.onclose = (event) =>
  //     console.log(`ON CLOSE: ${JSON.stringify(event)}`);
  // }, [dispatch, profile?.token]);

  const [drawerOpen, setDrawerOpen] = useState(false);

  const handleDrawerToggle = () => {
    setDrawerOpen(!drawerOpen);
  };

  const handleAddTweet = (newTweetContent) => {
    if (newTweetContent.trim() === "") return;

    dispatch(
      storePosting(profile?.token, {
        content_text: newTweetContent,
      })
    );

    // const newTweet = {
    //   id: Date.now(), // ID unik sederhana
    //   user: { // Data pengguna statis untuk contoh ini
    //     name: 'Saya',
    //     username: 'me_dev',
    //     avatar: 'https://mui.com/static/images/avatar/3.jpg',
    //   },
    //   content: newTweetContent,
    //   timestamp: 'Baru saja',
    //   stats: { likes: 0, retweets: 0, replies: 0 },
    // };
    // setTweets([newTweet, ...tweets]);
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box sx={{ display: "flex" }}>
        <Navbar onMenuClick={handleDrawerToggle} />
        <Sidebar open={drawerOpen} onClose={handleDrawerToggle} />
        <Box
          component="main"
          sx={{
            flexGrow: 1,
            p: 3,
            width: { sm: `calc(100% - 240px)` },
            marginLeft: { sm: "240px" },
            marginTop: "64px",
          }}
        >
          <Grid container spacing={3} justifyContent="center">
            <Grid item xs={12} md={8} lg={6}>
              <NewTweetForm onAddTweet={handleAddTweet} />
              <Feed tweets={posting?.data} />
            </Grid>
          </Grid>
        </Box>
      </Box>
    </ThemeProvider>
  );
};

export default Home;

import React, { useState } from "react";
import {
  Box,
  TextField,
  Button,
  Avatar,
  Paper,
  Stack,
  Typography,
} from "@mui/material";

const NewTweetForm = ({ onAddTweet }) => {
  const [tweetContent, setTweetContent] = useState("");
  const MAX_CHARS = 280;

  const handleChange = (event) => {
    if (event.target.value.length <= MAX_CHARS) {
      setTweetContent(event.target.value);
    }
  };

  const handleSubmit = () => {
    onAddTweet(tweetContent);
    setTweetContent(""); // Kosongkan input setelah submit
  };

  return (
    <Paper elevation={1} sx={{ p: 2, mb: 2, borderTop: "1px solid #e0e0e0" }}>
      <Typography variant="h6" sx={{ mb: 2, fontWeight: "bold" }}>
        Beranda
      </Typography>
      <Stack direction="row" spacing={2}>
        <Avatar
          alt="User Avatar"
          src="https://mui.com/static/images/avatar/3.jpg" // Ganti dengan avatar pengguna yang login
          sx={{ width: 50, height: 50, mt: 1 }}
        />
        <Box sx={{ flexGrow: 1 }}>
          <TextField
            fullWidth
            multiline
            rows={3}
            variant="outlined"
            placeholder="Apa yang sedang terjadi?"
            value={tweetContent}
            onChange={handleChange}
            sx={{
              "& .MuiOutlinedInput-root": {
                borderRadius: "16px",
                "& fieldset": {
                  border: "none", // Hapus border default
                },
                "&:hover fieldset": {
                  border: "none",
                },
                "&.Mui-focused fieldset": {
                  border: "none",
                },
              },
              backgroundColor: "action.hover", // Warna latar sedikit berbeda
              mb: 1,
            }}
          />
          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="center"
          >
            {/* Ikon untuk lampiran (opsional) */}
            <Box>
              {/* <IconButton><ImageIcon color="primary"/></IconButton>
                <IconButton><GifBoxIcon color="primary"/></IconButton>
                <IconButton><PollIcon color="primary"/></IconButton>
                <IconButton><SentimentSatisfiedAltIcon color="primary"/></IconButton>
                <IconButton><CalendarTodayIcon color="primary"/></IconButton>
                <IconButton><LocationOnIcon color="primary"/></IconButton> */}
            </Box>
            <Box display="flex" alignItems="center">
              <Typography
                variant="caption"
                sx={{
                  mr: 1,
                  color:
                    tweetContent.length > MAX_CHARS - 20
                      ? "red"
                      : "text.secondary",
                }}
              >
                {MAX_CHARS - tweetContent.length}
              </Typography>
              <Button
                variant="contained"
                color="primary"
                onClick={handleSubmit}
                disabled={
                  tweetContent.trim() === "" || tweetContent.length > MAX_CHARS
                }
                sx={{
                  borderRadius: "20px",
                  textTransform: "none",
                  fontWeight: "bold",
                  px: 3,
                }}
              >
                Tweet
              </Button>
            </Box>
          </Stack>
        </Box>
      </Stack>
    </Paper>
  );
};

export default NewTweetForm;

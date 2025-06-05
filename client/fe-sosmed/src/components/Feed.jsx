import { Box, Typography } from "@mui/material";
import TweetCard from "./TweetCard";

const Feed = ({ tweets }) => {
  if (!tweets || tweets.length === 0) {
    return (
      <Typography sx={{ textAlign: "center", mt: 3 }}>
        Tidak ada tweet untuk ditampilkan.
      </Typography>
    );
  }

  return (
    <Box sx={{ marginTop: 2 }}>
      {tweets.map((tweet) => (
        <TweetCard key={tweet.id} tweet={tweet} />
      ))}
    </Box>
  );
};

export default Feed;

import React from "react";
import {
  Card,
  CardHeader,
  Avatar,
  IconButton,
  CardContent,
  Typography,
  CardActions,
  Box,
  Stack,
} from "@mui/material";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import RepeatIcon from "@mui/icons-material/Repeat"; // Retweet
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder"; // Like
import FavoriteIcon from "@mui/icons-material/Favorite"; // Liked
import ShareIcon from "@mui/icons-material/Share"; // Share
// import BarChartIcon from '@mui/icons-material/BarChart'; // View count (new Twitter feature)

const TweetCard = ({ tweet }) => {
  const [liked, setLiked] = React.useState(false); // Contoh state sederhana untuk like

  if (!tweet || !tweet.user) {
    return null; // Atau tampilkan placeholder jika data tidak lengkap
  }

  return (
    <Card
      sx={{
        mb: 2,
        borderRadius: 0,
        borderBottom: "1px solid #e0e0e0",
        boxShadow: "none",
        "&:hover": { backgroundColor: "action.hover" },
      }}
    >
      <CardHeader
        avatar={<Avatar src={tweet.user.avatar} alt={tweet.user.name} />}
        action={
          <IconButton aria-label="settings">
            <MoreHorizIcon />
          </IconButton>
        }
        title={
          <Stack direction="row" spacing={0.5} alignItems="center">
            <Typography variant="subtitle1" component="span" fontWeight="bold">
              {tweet.user.name}
            </Typography>
            <Typography variant="body2" color="text.secondary" component="span">
              @{tweet.user.username} · {tweet.timestamp}
            </Typography>
          </Stack>
        }
        sx={{ pb: 0 }}
      />
      <CardContent sx={{ pt: 0.5 }}>
        <Typography
          variant="body1"
          color="text.primary"
          sx={{ whiteSpace: "pre-wrap" }}
        >
          {tweet.content_text}
        </Typography>
      </CardContent>
      <CardActions
        disableSpacing
        sx={{
          justifyContent: "space-around",
          pt: 0,
          pb: 1.5,
          color: "text.secondary",
        }}
      >
        <IconButton aria-label="reply" size="small">
          <Stack direction="row" alignItems="center" spacing={0.5}>
            <ChatBubbleOutlineIcon fontSize="small" />
            <Typography variant="caption">
              {tweet?.stats?.replies > 0 ? tweet?.stats?.replies : ""}
            </Typography>
          </Stack>
        </IconButton>
        <IconButton aria-label="retweet" size="small">
          <Stack direction="row" alignItems="center" spacing={0.5}>
            <RepeatIcon fontSize="small" />
            <Typography variant="caption">
              {tweet?.stats?.retweets > 0 ? tweet?.stats?.retweets : ""}
            </Typography>
          </Stack>
        </IconButton>
        <IconButton
          aria-label="like"
          size="small"
          onClick={() => setLiked(!liked)}
        >
          <Stack direction="row" alignItems="center" spacing={0.5}>
            {liked ? (
              <FavoriteIcon fontSize="small" color="error" />
            ) : (
              <FavoriteBorderIcon fontSize="small" />
            )}
            <Typography
              variant="caption"
              sx={{ color: liked ? "error.main" : "inherit" }}
            >
              {liked
                ? tweet?.stats?.likes > 0
                  ? tweet.stats?.likes + 1
                  : 1
                : tweet.stats?.likes > 0
                ? tweet.stats?.likes
                : ""}
            </Typography>
          </Stack>
        </IconButton>
        {/* <IconButton aria-label="view count" size="small">
            <Stack direction="row" alignItems="center" spacing={0.5}>
                <BarChartIcon fontSize="small" />
                <Typography variant="caption">10K</Typography>
            </Stack>
        </IconButton> */}
        <IconButton aria-label="share" size="small">
          <ShareIcon fontSize="small" />
        </IconButton>
      </CardActions>
    </Card>
  );
};

export default TweetCard;

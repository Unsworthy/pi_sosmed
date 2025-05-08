import { styled } from "@mui/material/styles";
import MuiCard from "@mui/material/Card";
import Stack from "@mui/material/Stack";
import CssBaseline from "@mui/material/CssBaseline";
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Grid,
  InputLabel,
  Link,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";

const Card = styled(MuiCard)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  alignSelf: "center",
  width: "100%",
  padding: theme.spacing(4),
  gap: theme.spacing(2),
  margin: "auto",
  boxShadow:
    "hsla(220, 30%, 5%, 0.05) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.05) 0px 15px 35px -5px",
  [theme.breakpoints.up("sm")]: {
    width: "800px",
  },
  ...theme.applyStyles("dark", {
    boxShadow:
      "hsla(220, 30%, 5%, 0.5) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.08) 0px 15px 35px -5px",
  }),
}));

const SignUpContainer = styled(Stack)(({ theme }) => ({
  height: "calc((1 - var(--template-frame-height, 0)) * 100dvh)",
  minHeight: "100%",
  padding: theme.spacing(2),
  [theme.breakpoints.up("sm")]: {
    padding: theme.spacing(4),
  },
  "&::before": {
    content: '""',
    display: "block",
    position: "absolute",
    zIndex: -1,
    inset: 0,
    backgroundImage:
      "radial-gradient(ellipse at 50% 50%, hsl(210, 100%, 97%), hsl(0, 0%, 100%))",
    backgroundRepeat: "no-repeat",
    ...theme.applyStyles("dark", {
      backgroundImage:
        "radial-gradient(at 50% 50%, hsla(210, 100%, 16%, 0.5), hsl(220, 30%, 5%))",
    }),
  },
}));

const Register = () => {
  return (
    <>
      <CssBaseline enableColorScheme />
      <SignUpContainer direction="column" justifyContent="space-between">
        <Card variant="outlined">
          <Typography
            component="h1"
            variant="h4"
            sx={{ width: "100%", fontSize: "clamp(2rem, 10vw, 2.15rem)" }}
          >
            Sign up
          </Typography>
          <Box
            component="form"
            // onSubmit={handleSubmit}
            sx={{ display: "flex", flexDirection: "column", gap: 2 }}
          >
            <Grid container spacing={2}>
              <Grid item size={6}>
                <FormControl fullWidth>
                  <FormLabel htmlFor="name">Username</FormLabel>
                  <TextField
                    autoComplete="username"
                    name="username"
                    required
                    fullWidth
                    id="username"
                    placeholder="username"
                    // error={nameError}
                    // helperText={nameErrorMessage}
                    // color={nameError ? 'error' : 'primary'}
                  />
                </FormControl>
              </Grid>
              <Grid item size={6}>
                <FormControl fullWidth>
                  <FormLabel htmlFor="email">Email</FormLabel>
                  <TextField
                    required
                    fullWidth
                    id="email"
                    placeholder="your@email.com"
                    name="email"
                    autoComplete="email"
                    variant="outlined"
                    // error={emailError}
                    // helperText={emailErrorMessage}
                    // color={passwordError ? 'error' : 'primary'}
                  />
                </FormControl>
              </Grid>

              <Grid item size={6}>
                <FormControl fullWidth>
                  <FormLabel htmlFor="password">Password</FormLabel>
                  <TextField
                    required
                    fullWidth
                    name="password"
                    placeholder="••••••"
                    type="password"
                    id="password"
                    autoComplete="new-password"
                    variant="outlined"
                    // error={passwordError}
                    // helperText={passwordErrorMessage}
                    // color={passwordError ? 'error' : 'primary'}
                  />
                </FormControl>
              </Grid>
              <Grid item size={6}>
                <FormControl fullWidth>
                  <FormLabel htmlFor="firstName">FirstName</FormLabel>
                  <TextField
                    required
                    fullWidth
                    name="firstName"
                    placeholder="firstName"
                    id="firstName"
                    autoComplete="new-firstName"
                    variant="outlined"
                    // error={passwordError}
                    // helperText={passwordErrorMessage}
                    // color={passwordError ? 'error' : 'primary'}
                  />
                </FormControl>
              </Grid>
              <Grid item size={6}>
                <FormControl fullWidth>
                  <FormLabel htmlFor="lastName">lastName</FormLabel>
                  <TextField
                    required
                    fullWidth
                    name="lastName"
                    placeholder="lastName"
                    id="lastName"
                    autoComplete="new-lastName"
                    variant="outlined"
                    // error={passwordError}
                    // helperText={passwordErrorMessage}
                    // color={passwordError ? 'error' : 'primary'}
                  />
                </FormControl>
              </Grid>
              <Grid item size={6}>
                <FormControl fullWidth style={{ marginTop: 24 }}>
                  <InputLabel id="demo-simple-select-label" htmlFor="Classes">
                    Classes
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    // value={classes}
                    label="classes"
                    // onChange={handleChange}
                  >
                    <MenuItem value={10}>X</MenuItem>
                    <MenuItem value={20}>XI</MenuItem>
                    <MenuItem value={30}>XII</MenuItem>
                    <MenuItem value={40}>XIII</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item size={6}>
                <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-label">Major</InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    // value={classes}
                    label="classes"
                    // onChange={handleChange}
                  >
                    <MenuItem value={10}>
                      Pengembangan Perangkat Lunak & Game
                    </MenuItem>
                    <MenuItem value={20}></MenuItem>
                    <MenuItem value={30}>XII</MenuItem>
                    <MenuItem value={40}>XIII</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item size={6}>
                <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-label">Classes</InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    // value={classes}
                    label="classes"
                    // onChange={handleChange}
                  >
                    <MenuItem value={10}>X</MenuItem>
                    <MenuItem value={20}>XI</MenuItem>
                    <MenuItem value={30}>XII</MenuItem>
                    <MenuItem value={40}>XIII</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
            </Grid>

            <Button
              type="submit"
              fullWidth
              variant="contained"
              //   onClick={validateInputs}
            >
              Sign up
            </Button>
          </Box>
        </Card>
      </SignUpContainer>
    </>
  );
};

export default Register;

// src/App.jsx
import { Container, Box, Typography, Link, CssBaseline } from "@mui/material";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import DiamondCalculator from "./components/DiamondCalculator";
import SimilarDialog from "./components/SimilarDialog";
import { DiamondProvider, useDiamond } from "./context/DiamondContext";
import "./styles/app.scss";

const theme = createTheme({
  palette: {
    mode: "light",
    primary: { main: "#0f172a" },      // deep navy
    secondary: { main: "#14b8a6" },    // teal
    background: {
      default: "#020617",
      paper: "#ffffff",
    },
  },
  typography: {
    fontFamily: "Inter, system-ui, -apple-system, BlinkMacSystemFont, sans-serif",
    h3: { fontWeight: 800 },
    h4: { fontWeight: 800 },
    button: { textTransform: "none", fontWeight: 600 },
  },
  shape: { borderRadius: 18 },
});

function AppContent() {
  const { similarState, closeSimilar } = useDiamond();

  return (
    <>
      <Container maxWidth="lg">
        <Box className="hero-shell">
          <Box className="hero-text">
            <Typography variant="h3" className="hero-title">
              Worthy – Diamond Pricing
            </Typography>
            <Typography variant="body1" color="rgba(248,250,252,0.85)">
              A live preview of our pricing engine: estimate a diamond’s value
              and browse similar stones in seconds.
            </Typography>
          </Box>

          <Box className="hero-card-wrapper">
            <DiamondCalculator />
          </Box>
        </Box>

        <Box mt={3} textAlign="center">
          <Typography variant="caption" color="rgba(148,163,184,1)">
            Demo only. Not financial advice. © {new Date().getFullYear()} Worthy
          </Typography>
        </Box>

        <Box mt={1} textAlign="center">
          <Typography variant="caption" color="rgba(148,163,184,1)">
            Built with{" "}
            <Link href="https://react.dev" target="_blank" color="secondary">
              React
            </Link>
            ,{" "}
            <Link href="https://mui.com" target="_blank" color="secondary">
              MUI
            </Link>{" "}
            &{" "}
            <Link href="https://vitejs.dev" target="_blank" color="secondary">
              Vite
            </Link>
            .
          </Typography>
        </Box>
      </Container>

      <SimilarDialog
        open={similarState.open}
        onClose={closeSimilar}
        payload={{ target: similarState.target, similars: similarState.items }}
        loading={similarState.loading}
        error={similarState.error}
      />
    </>
  );
}

export default function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <DiamondProvider>
        <AppContent />
      </DiamondProvider>
    </ThemeProvider>
  );
}

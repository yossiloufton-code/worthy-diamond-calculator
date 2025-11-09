// src/components/SimilarDialog.jsx
import {
    Dialog,
    DialogTitle,
    DialogContent,
    Card,
    CardMedia,
    CardContent,
    Typography,
    Box,
    CircularProgress,
    IconButton,
} from "@mui/material";
import Grid from "@mui/material/Grid";
import CloseIcon from "@mui/icons-material/Close";

export default function SimilarDialog({ open, onClose, payload, loading, error }) {
    const target = payload?.target;
    const similars = payload?.similars || [];

    return (
        <Dialog open={open} onClose={onClose} fullWidth maxWidth="md">
            {/* Dialog Title with Close button */}
            <DialogTitle
                component="div" // avoid nested heading (<h*> inside <h2>)
                sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    pr: 2,
                }}
            >
                <Typography
                    variant="h6"
                    component="h2"
                    sx={{ fontWeight: 600, mr: 1 }}
                >
                    {target
                        ? `Similar to ${target.carat.toFixed(2)}ct / ${target.cut} / ${target.color} / ${target.clarity}`
                        : "Similar diamonds"}
                </Typography>

                <IconButton
                    aria-label="close"
                    onClick={onClose}
                    sx={{ color: (theme) => theme.palette.grey[500] }}
                >
                    <CloseIcon />
                </IconButton>
            </DialogTitle>

            <DialogContent dividers>
                {loading && (
                    <Box py={4} display="flex" justifyContent="center">
                        <CircularProgress size={28} />
                    </Box>
                )}

                {!loading && error && (
                    <Typography variant="body2" color="error">
                        {error}
                    </Typography>
                )}

                {!loading && !error && similars.length === 0 && (
                    <Typography variant="body2" color="text.secondary">
                        No close matches found in the inventory.
                    </Typography>
                )}

                {!loading && !error && similars.length > 0 && (
                    <Grid container spacing={2}>
                        {similars.map((item) => (
                            <Grid key={item.id} size={{ xs: 12, sm: 6, md: 3 }}>
                                <Card sx={{ borderRadius: 3, height: "100%" }}>
                                    <CardMedia
                                        component="img"
                                        height="140"
                                        image={item.img}
                                        alt={item.id}
                                    />
                                    <CardContent>
                                        <Typography variant="subtitle2" fontWeight={700} gutterBottom>
                                            {item.carat.toFixed(2)}ct · {item.cut}
                                        </Typography>
                                        <Box display="flex" gap={1} flexWrap="wrap" mb={1}>
                                            <Typography variant="caption">Color {item.color}</Typography>
                                            <Typography variant="caption">Clarity {item.clarity}</Typography>
                                        </Box>
                                        <Typography variant="h6">
                                            ${item.price.toLocaleString()}
                                        </Typography>
                                    </CardContent>
                                </Card>
                            </Grid>
                        ))}
                    </Grid>
                )}
            </DialogContent>
        </Dialog>
    );
}

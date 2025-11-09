import {
    Box,
    Card,
    CardContent,
    Typography,
    TextField,
    MenuItem,
    Button,
    Tooltip,
    Divider,
    Chip,
    LinearProgress,
} from "@mui/material";
import Grid from "@mui/material/Grid";
import DiamondIcon from "@mui/icons-material/Diamond";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import { useDiamond } from "../context/DiamondContext";
import { useState } from "react";
import { useEffect } from "react";

const FALLBACK_COLORS = ["D", "E", "F", "G", "H", "I", "J"];
const FALLBACK_CLARITIES = ["IF", "VVS1", "VVS2", "VS1", "VS2", "SI1", "SI2", "I1"];
const FALLBACK_CUTS = ["Poor", "Fair", "Good", "Very Good", "Excellent"];

export default function DiamondCalculator() {
    const {
        form,
        updateField,
        price,
        priceLoading,
        priceError,
        openSimilar,
        meta,
    } = useDiamond();

    // const handleCaratChange = (e) => {
    //     const raw = Number(e.target.value);
    //     if (Number.isNaN(raw)) return;
    //     updateField("carat", raw);
    //     setCaratInput
    // };

    const cuts = meta?.cuts?.length ? meta.cuts : FALLBACK_CUTS;
    const colors = meta?.colors?.length ? meta.colors : FALLBACK_COLORS;
    const clarities = meta?.clarities?.length ? meta.clarities : FALLBACK_CLARITIES;

    const safeCut = cuts.includes(form.cut) ? form.cut : "";
    const safeColor = colors.includes(form.color) ? form.color : "";
    const safeClar = clarities.includes(form.clarity) ? form.clarity : "";

    const [caratInput, setCaratInput] = useState(form.carat);

    const handleCaratChange = (e) => {
        const raw = e.target.value === "" ? "" : Number(e.target.value);
        if (raw === "") {
            setCaratInput("");
            return;
        }
        if (Number.isNaN(raw)) return;
        setCaratInput(raw);
    };

    useEffect(() => {
        const timer = setTimeout(() => {
            if (caratInput === "" || caratInput === form.carat) return;
            updateField("carat", Number(caratInput));
        }, 400);

        return () => clearTimeout(timer);
    }, [caratInput, form.carat, updateField]);
    return (
        <Card
            className="pricing-card"
            elevation={6}
            sx={{ position: "relative", overflow: "hidden" }}
        >
            {priceLoading && (
                <LinearProgress
                    sx={{
                        position: "absolute",
                        insetInline: 0,
                        top: 0,
                        zIndex: 2,
                    }}
                />
            )}

            <CardContent sx={{ p: { xs: 3, sm: 4 } }}>
                <Grid container spacing={3}>
                    <Grid size={12}>
                        <Box display="flex" alignItems="center" gap={1.5}>
                            <Box className="icon-pill">
                                <DiamondIcon fontSize="small" />
                            </Box>
                            <Box>
                                <Typography variant="h5" fontWeight={700}>
                                    Diamond Pricing
                                    <Chip
                                        label="MVP"
                                        size="small"
                                        color="secondary"
                                        sx={{ ml: 1, fontWeight: 600 }}
                                    />
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    Tune the 4Cs to see a live price estimate and explore similar stones.
                                </Typography>
                            </Box>
                        </Box>
                    </Grid>

                    <Grid size={{ xs: 12, md: 7 }}>
                        <Grid container spacing={2}>
                            <Grid size={{ xs: 12, sm: 6 }}>
                                <TextField
                                    id="diamond-carat"
                                    name="carat"
                                    label="Carat"
                                    type="number"
                                    fullWidth
                                    size="small"
                                    value={caratInput}
                                    onChange={handleCaratChange}
                                    slotProps={{
                                        htmlInput: {
                                            step: 0.01,
                                            min: 0.1,
                                            max: 5,
                                        },
                                    }}
                                    helperText="Typical range 0.25–3.0ct"
                                />
                            </Grid>

                            <Grid size={{ xs: 12, sm: 6 }}>
                                <TextField
                                    id="diamond-cut"
                                    name="cut"
                                    label="Cut"
                                    select
                                    fullWidth
                                    size="small"
                                    value={safeCut}
                                    onChange={(e) => updateField("cut", e.target.value)}
                                >
                                    {cuts.map((c) => (
                                        <MenuItem key={c} value={c}>
                                            {c}
                                        </MenuItem>
                                    ))}
                                </TextField>
                            </Grid>

                            <Grid size={{ xs: 12, sm: 6 }}>
                                <TextField
                                    id="diamond-color"
                                    name="color"
                                    label="Color"
                                    select
                                    fullWidth
                                    size="small"
                                    value={safeColor}
                                    onChange={(e) => updateField("color", e.target.value)}
                                >
                                    {colors.map((c) => (
                                        <MenuItem key={c} value={c}>
                                            {c}
                                        </MenuItem>
                                    ))}
                                </TextField>
                            </Grid>

                            <Grid size={{ xs: 12, sm: 6 }}>
                                <TextField
                                    id="diamond-clarity"
                                    name="clarity"
                                    label="Clarity"
                                    select
                                    fullWidth
                                    size="small"
                                    value={safeClar}
                                    onChange={(e) => updateField("clarity", e.target.value)}
                                >
                                    {clarities.map((c) => (
                                        <MenuItem key={c} value={c}>
                                            {c}
                                        </MenuItem>
                                    ))}
                                </TextField>
                            </Grid>
                        </Grid>
                    </Grid>

                    <Grid size={{ xs: 12, md: 5 }}>
                        <Box
                            className="price-panel"
                            display="flex"
                            flexDirection="column"
                            justifyContent="space-between"
                            sx={{ minHeight: 190 }}
                        >
                            <Box mb={2}>
                                <Typography
                                    variant="overline"
                                    sx={{
                                        letterSpacing: 0.8,
                                        color: "#f9fafb",
                                    }}
                                >
                                    Estimated Price
                                </Typography>

                                <Typography
                                    variant="h3"
                                    className="price-value"
                                    sx={{ minWidth: "9ch" }}
                                >
                                    {price != null ? `$${price.toLocaleString()}` : "--"}
                                </Typography>

                                <Typography variant="body2" color="text.secondary">
                                    Formula: basePerCarat × carat × cut × color × clarity
                                </Typography>

                                {priceError && (
                                    <Typography
                                        variant="caption"
                                        color="error"
                                        sx={{ display: "block", mt: 1 }}
                                    >
                                        {priceError}
                                    </Typography>
                                )}
                            </Box>

                            <Tooltip title="Show up to 4 similar diamonds (photo + price)">
                                <span>
                                    <Button
                                        fullWidth
                                        variant="contained"
                                        color="secondary"
                                        endIcon={<OpenInNewIcon />}
                                        onClick={(e) => {
                                            e.currentTarget.blur();
                                            openSimilar();
                                        }}
                                        disabled={priceLoading || price == null}
                                    >
                                        View Similar
                                    </Button>
                                </span>
                            </Tooltip>
                        </Box>
                    </Grid>

                    <Grid size={12}>
                        <Divider sx={{ mt: 1 }} />
                        <Typography variant="caption" color="text.secondary">
                            Prices are illustrative and for demo only.
                        </Typography>
                    </Grid>
                </Grid>
            </CardContent>
        </Card>
    );
}

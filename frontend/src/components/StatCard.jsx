import { Card, CardContent, Typography } from "@mui/material";

export default function StatCard({ title, value }) {
  return (
    <Card
      elevation={3}
      sx={{
        height: "100%",
        borderRadius: 2,
        transition: "transform 0.2s ease",
        "&:hover": {
          transform: "translateY(-4px)"
        }
      }}
    >
      <CardContent>
        <Typography variant="subtitle2" color="text.secondary" gutterBottom>
          {title}
        </Typography>

        <Typography variant="h5" fontWeight="bold">
          {value}
        </Typography>
      </CardContent>
    </Card>
  );
}

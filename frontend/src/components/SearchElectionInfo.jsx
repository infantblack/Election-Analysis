import { useEffect, useState } from "react";
import { Box, CircularProgress, Typography } from "@mui/material";
import { fetchElectionInfo } from "../services/election.service";

export default function SearchElectionInfo({ query }) {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!query) return;

    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);

        const res = await fetchElectionInfo(query);
        setData(res);
      } catch (err) {
        setError("Failed to fetch election data");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [query]);

  if (!query) return null;

  if (loading) {
    return (
      <Box mt={4} textAlign="center">
        <CircularProgress />
        <Typography variant="body2" mt={1}>
          Fetching election data...
        </Typography>
      </Box>
    );
  }

  if (error) {
    return (
      <Box mt={4}>
        <Typography color="error">{error}</Typography>
      </Box>
    );
  }

  if (!data) return null;

  return (
    <Box mt={4}>
      <Typography variant="h6" gutterBottom>
        Search Result
      </Typography>

      <pre>{JSON.stringify(data, null, 2)}</pre>
    </Box>
  );
}

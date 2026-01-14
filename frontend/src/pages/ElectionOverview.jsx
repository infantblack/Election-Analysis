import { useState } from "react";
import {
  Box,
  Typography,
  Grid,
  TextField,
  Button
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

import StatCard from "../components/StatCard";
import SearchElectionInfo from "../components/SearchElectionInfo";
import "./ElectionOverview.scss";

export default function ElectionOverview() {
  const [searchValue, setSearchValue] = useState("");
  const [submittedQuery, setSubmittedQuery] = useState("");

  const electionStats = {
    assemblies: 234,
    booths: 90000,
    cm: "M. K. Stalin",
    deputyCm: "Udhayanidhi Stalin"
  };

  const handleSearch = () => {
    setSubmittedQuery(searchValue.trim());
  };

  return (
    <Box className="election-overview">
      <Typography variant="h4" gutterBottom>
        Tamil Nadu Assembly Election Overview
      </Typography>

      <Typography variant="subtitle1" color="text.secondary" gutterBottom>
        2021 Assembly Election Snapshot
      </Typography>

      {/* 🔍 Search Bar */}
      <Box className="search-bar">
        <TextField
          label="Search by District / Assembly"
          size="small"
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
        />

        <Button
          variant="contained"
          startIcon={<SearchIcon />}
          onClick={handleSearch}
          disabled={!searchValue.trim()}
        >
          Search
        </Button>
      </Box>

      {/* 📊 Stats */}
      <Grid container spacing={3} className="stats-grid">
        <Grid item xs={12} sm={6} md={3}>
          <StatCard title="Total Assemblies" value={electionStats.assemblies} />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard title="Total Booths" value={electionStats.booths.toLocaleString()} />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard title="Chief Minister" value={electionStats.cm} />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard title="Deputy Chief Minister" value={electionStats.deputyCm} />
        </Grid>
      </Grid>

      {/* 🧠 Data Orchestrator */}
      {submittedQuery !== '' && <SearchElectionInfo query={submittedQuery} />}
    </Box>
  );
}

import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  Box
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

import "./SchemaViewer.scss";

export default function SchemaViewer({ schema, data }) {
  return (
    <Box className="schema-viewer">
      
      {/* ===== Schema Section ===== */}
      <Accordion defaultExpanded>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography variant="h6">Generated Schema</Typography>
        </AccordionSummary>

        <AccordionDetails>
          <Box className="content-box">
            {schema ? (
              <pre>{JSON.stringify(schema, null, 2)}</pre>
            ) : (
              <Typography className="empty-text">
                No schema generated yet
              </Typography>
            )}
          </Box>
        </AccordionDetails>
      </Accordion>

      {/* ===== Data Section ===== */}
      <Accordion className="accordion-spacing">
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography variant="h6">
            Uploaded Data ({data?.length || 0} records)
          </Typography>
        </AccordionSummary>

        <AccordionDetails>
          <Box className="content-box">
            {data ? (
              <pre>{JSON.stringify(data, null, 2)}</pre>
            ) : (
              <Typography className="empty-text">
                No data uploaded yet
              </Typography>
            )}
          </Box>
        </AccordionDetails>
      </Accordion>

    </Box>
  );
}

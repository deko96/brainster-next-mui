import SurveyForm from "@/components/SurveyForm/SurveyForm";
import { Box, Typography } from "@mui/material";

export default function SurveyCreatePage() {
  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 5 }}>
      <Typography variant="h6">Create a Survey</Typography>
      <SurveyForm />
    </Box>
  );
}

# Election-Analysis

User clicks Search
   ↓
Frontend → /api/election/search?q=ariyalur
   ↓
Controller reads req.query.q
   ↓
Service queries MongoDB
   ↓
Controller returns JSON
   ↓
SearchElectionInfo renders UI

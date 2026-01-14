import axios from "axios";

export const fetchElectionInfo = async (query) => {
  const res = await axios.get(
    `http://localhost:5000/api/election/search`,
    { params: { q: query } }
  );

  return res.data;
};

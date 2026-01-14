import { getElectionInfoByQuery } from "../services/election.service.js";

export const searchElectionInfo = async (req, res) => {
  try {
    const { q } = req.query;

    if (!q) {
      return res.status(400).json({
        success: false,
        message: "Search query is required"
      });
    }

    const data = await getElectionInfoByQuery(q);

    if (!data) {
      return res.status(404).json({
        success: false,
        message: "No election data found"
      });
    }

    res.status(200).json({
      success: true,
      data
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

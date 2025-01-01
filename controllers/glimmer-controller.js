import initKnex from "knex";
import configuration from "../knexfile.js";
const knex = initKnex(configuration);

const index = async (req, res) => {
  const { date } = req.query;

  try {
    const query = knex("glimmers")
    .select(
      "id",
      "entry",
      "stars_earned",
      knex.raw("DATE_FORMAT(created_at, '%Y-%m-%d') as entry_date")  // Format date as YYYY-MM-DD
    )
    .orderBy("created_at", "desc");

    if (date) {
      // Search by specific date
      query.whereRaw("DATE(created_at) = ?", [date]);
    }

    const data = await query;
    res.status(200).json(data);
  } catch (error) {
    console.error("Error retrieving glimmers:", error); // Add error logging
    res.status(500).json({
      message: "Error retrieving glimmers",
      error: error.message,
    });
  }
};

export { index };

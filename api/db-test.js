import { neon } from "@neondatabase/serverless";

export default async function handler(req, res) {
try {
if (!process.env.DATABASE_URL) {
return res.status(500).json({
success: false,
error: "DATABASE_URL is not configured"
});
}

const sql = neon(process.env.DATABASE_URL);

const result = await sql`SELECT NOW() AS time`;

res.status(200).json({
  success: true,
  message: "Neon database connected",
  time: result[0].time
});

} catch (error) {
console.error(error);

res.status(500).json({
  success: false,
  error: "Neon database connection failed"
});

}
              }

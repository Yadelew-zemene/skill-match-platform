import jwt from "jsonwebtoken";

export const generateToken = (user) => {
  return jwt.sign(
    { id: user.id, role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: "1d" }
  );
};
// {
//   "name": "surafel",
//   "email": "surafel@skillmatch.com",
//   "password": "111111",
//   "role": "candidate"
// {
//     "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6Niwicm9sZSI6ImNhbmRpZGF0ZSIsImlhdCI6MTc2NzE2OTU3OSwiZXhwIjoxNzY3MjU1OTc5fQ.RINq5s_d2S6wqofreMw6dLw9a-mt_v_iuLlCyAmD5YM"
// }
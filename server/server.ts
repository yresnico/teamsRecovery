import dotenv from "dotenv";
import app from "./app";

dotenv.config({ path: `${__dirname}/src/env/.env` });


const PORT = process.env.PORT || 3100;

app.listen(PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});


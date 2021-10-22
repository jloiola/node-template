const { GoogleAuth } = require("google-auth-library");
const { google } = require("googleapis");
const knex = require("knex");
const env = require("../env");
const withPreferenceSheet = require("../sheets/with-preference");

exports.handler = async (event, context) => {
  let ebdb;
  const spreadsheetId = "1JLGHHzmgGdzE6DcafOhh3qOxWa2szTYxAgVfaxsuhBE";

  try {
    ebdb = await knex({
      client: "mysql",
      connection: {
        host: env.MYSQL_HOST,
        port: 3306,
        user: env.MYSQL_USER,
        password: env.MYSQL_PASS,
        database: env.MYSQL_DB,
      },
    });

    const authProvider = new GoogleAuth({
      keyFile: "dev-domo-private-key.json",
      scopes: "https://www.googleapis.com/auth/spreadsheets",
    });

    const auth = await authProvider.getClient();

    const api = google.sheets({
      version: "v4",
      auth,
    });

    const values = await withPreferenceSheet(ebdb);

    await api.spreadsheets.values.batchUpdate({
      spreadsheetId,
      resource: {
        valueInputOption: "RAW",
        data: [
          {
            range: `A1:J${values.length + 1}`,
            majorDimension: "ROWS",
            values,
          },
        ],
      },
    });
  } catch (err) {
    console.error(err);
    return false;
  } finally {
    ebdb.destroy();
  }
  return true;
};

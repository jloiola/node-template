const env = require("../env");
const cols = [
  "username",
  "occupation",
  "preference",
  "timestamp",
  "name_filename",
  "time_spent",
  "user_key_id",
  "user_id",
  "device_id",
  "created",
];

const withPreference = async (db) => {
  const dataSet = await db.raw(
    `select
              u.username,
              o.name as occupation,
              op.preference,
              op.timestamp,
              concat('${env.S3_BUCKET_CAREER_URL}', u.name_filename) as name_filename,
              st.time_spent,
              u.id as user_key_id,
              u.user_id,
              op.device_id,
              u.created 
          from users u 
              inner join occupation_preferences op on op.student_id = u.id 
              inner join occupations o on o.id = op.occupation_id 
              left join simulation_timespent st on st.user_id = op.student_id and st.simulation_id = o.simulation_mapping 
          where
              o.active = 1
              and op.timestamp between :startDate and :endDate
              and u.is_career = true    
      `,
    {
      startDate: "2020-05-01",
      endDate: "2020-10-01",
    }
  );

  return [cols, ...dataSet[0].map((row) => cols.map((col) => row[col]))];
};

module.exports = withPreference;

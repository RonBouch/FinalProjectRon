using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DALproj
{
    public static class DBServices
    {
        static string conStr = ConfigurationManager.ConnectionStrings["LIVEDNS"].ConnectionString;
        static SqlConnection con = null;
        static SqlCommand comm = null;

        static DBServices()
        {
            con = new SqlConnection(conStr);
            comm = new SqlCommand();
            comm.Connection = con;
        }


        public static User Login(string email, string password)
        {

            User u = null;
            try
            {
                comm.CommandText = $"SELECT * " + " " +
                              "FROM UserTB " + "" +
                              $"WHERE Email='{email}' AND Password='{password}' ";
                comm.Connection.Open();
                SqlDataReader reader = comm.ExecuteReader();
                if (reader.Read())
                {
                    u = new User()
                    {
                        ID = int.Parse(reader["ID"].ToString()),
                        FirstName = reader["FirstName"].ToString(),
                        LastName = reader["LastName"].ToString(),
                        Email = reader["Email"].ToString(),
                        Password = reader["Password"].ToString(),
                        Gender = reader["Gender"].ToString(),
                        Birthday = reader["Birthday"].ToString()

                    };
                }

                comm.Connection.Close();

                return u;
            }
            catch (Exception e)
            {
                Console.WriteLine(e.Message);
            }
            finally
            {
                if (comm.Connection.State != ConnectionState.Closed)
                {
                    comm.Connection.Close();
                }
            }
            return u;

        }
    }
}

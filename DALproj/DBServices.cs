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

        public static User Register(string firstName, string lastName, string email, string password, string gender, string birthday)
        {
            User u = null;
            SqlDataReader reader = null;
            SqlDataReader reader2 = null;
            try
            {
                comm.CommandText = $"SELECT * FROM UserTB WHERE Email ='{email}'";
                comm.Connection.Open();
                reader = comm.ExecuteReader();
                if (reader.Read())
                {
                    return u;
                }
                else
                {
                    if (!reader.IsClosed)
                        reader.Close();
                    comm.CommandText = $"INSERT INTO UserTB(FirstName, LastName, Email, Password, Gender, Birthday) VALUES('{firstName}', '{lastName}', '{email}', '{password}', '{gender}' , '{birthday.ToString()}')";
                    int res = comm.ExecuteNonQuery();
                    if (res == 1)
                    {
                        comm.CommandText = "SELECT max(ID) as maxID FROM UserTB";
                        reader2 = comm.ExecuteReader();
                        if (reader2.Read())
                        {
                            u = new User()
                            {
                                ID = (int)reader2["maxID"],
                                FirstName = firstName,
                                LastName = lastName,
                                Email = email,
                                Password = password,
                                Gender = gender,
                                Birthday = birthday
                            };
                        }
                        return u;
                    }

                }
            }
            catch (Exception e)
            {
                Console.WriteLine(e.Message);
            }
            finally
            {
                if (!reader2.IsClosed)
                    reader2.Close();
                if (comm.Connection.State != ConnectionState.Closed)
                {
                    comm.Connection.Close();
                }

            }

            return u;
        }

        public static User RegisterWithGoogle(string firstName, string lastName, string email, string password)
        {
            User u = null;
            SqlDataReader reader = null;
            SqlDataReader reader2 = null;
            string Google = "Google";
            try
            {
                comm.CommandText = $"SELECT * FROM UserTB WHERE Email ='{email}'and Password = '{Google}'";
                comm.Connection.Open();
                reader = comm.ExecuteReader();
                if (reader.Read())
                {

                    u = new User()
                    {
                        ID = (int)reader["ID"],
                        FirstName = firstName,
                        LastName = lastName,
                        Email = email,
                        Password = password,

                    };

                    return u;

                }

                else
                {


                    if (email == null || email == "")
                    {
                        return u;
                    }
                    if (!reader.IsClosed)
                        reader.Close();
                    comm.CommandText = $"INSERT INTO UserTB(FirstName, LastName, Email, Password) VALUES('{firstName}', '{lastName}', '{email}', '{password}')";
                    int res = comm.ExecuteNonQuery();
                    if (res == 1)
                    {
                        comm.CommandText = "SELECT max(ID) as maxID FROM UserTB";
                        reader2 = comm.ExecuteReader();
                        if (reader2.Read())
                        {
                            u = new User()
                            {
                                ID = (int)reader2["maxID"],
                                FirstName = firstName,
                                LastName = lastName,
                                Email = email,
                                Password = password,

                            };
                        }
                        return u;
                    }
                }

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

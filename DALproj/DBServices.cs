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


        public static Item InsertItem(string userId, string userName, string userPhone, string itemType, string itemName, string city, string itemAbout, string itemImg)
        {
            string itemDate = string.Format("{0:HH:mm:ss tt}", DateTime.Now);
            Item p = null;
            SqlDataReader reader = null;
            SqlDataReader reader2 = null;

            try
            {


                    comm.CommandText = $"INSERT INTO Items(UserID,UserName,Userphone,ItemType,ItemName,City,ItemAbout,ItemImg,ItemDate) VALUES('{int.Parse(userId)}','{userName}','{userPhone}','{itemType}','{itemName}','{city}','{itemAbout}','{itemImg}','{itemDate}')";
                    comm.Connection.Open();
                    int res = comm.ExecuteNonQuery();
                    if (res == 1)
                    {
                        comm.CommandText = "SELECT max(ItemID) as maxID FROM Items";
                        reader2 = comm.ExecuteReader();
                        if (reader2.Read())
                        {
                        p = new Item()
                        {
                            ItemID = (int)reader2["maxID"],
                            UserID = userId,
                            UserName=userName,
                            UserPhone=userPhone,
                            ItemType=itemType,
                            City=city,
                            ItemAbout=itemAbout,
                            ItemImg=itemImg,
                            ItemDate=itemDate,
                        };
                        }
                        return p;
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

            return p;


        }


        public static List<Item> GetItems()
        {
            List<Item> items = new List<Item>();
            comm.CommandText = $"SELECT * from Items";
            comm.Connection.Open();
            SqlDataReader reader = comm.ExecuteReader();
            while (reader.Read())
            {
                Item p = new Item()
                {
                    ItemID = int.Parse(reader["ItemID"].ToString()),
                    UserID = reader["UserID"].ToString(),
                    UserName = reader["UserName"].ToString(),
                    UserPhone = reader["UserPhone"].ToString(),
                    ItemType = reader["ItemType"].ToString(),
                    ItemName=reader["ItemName"].ToString(),
                    City = reader["City"].ToString(),
                    ItemAbout = reader["ItemAbout"].ToString(),
                    ItemImg = reader["ItemImg"].ToString(),
                    ItemDate = reader["ItemDate"].ToString(),

                };
                items.Add(p);
            }

            comm.Connection.Close();

            return items;
        }


        public static List<Association> GetAssociations()
        {
            List<Association> associations = new List<Association>();
            comm.CommandText = $"SELECT * from Associations";
            comm.Connection.Open();
            SqlDataReader reader = comm.ExecuteReader();
            while (reader.Read())
            {
                Association a = new Association()
                {
                    AssociationID = int.Parse(reader["AssociationID"].ToString()),
                    AssociationName = reader["AssociationName"].ToString(),
                    AssociationType = reader["AssociationType"].ToString(),
                    AssociationEmail = reader["AssociationEmail"].ToString(),
                    AssociationPhone = reader["AssociationPhone"].ToString(),
                    AssociationAdditionalPhone = reader["AssociationAdditionalPhone"].ToString(),
                    AssociationDetails = reader["AssociationDetails"].ToString(),
                    AssociationFax = reader["AssociationFax"].ToString(),
                    AssociationWebsite = reader["AssociationWebsite"].ToString(),
                    AssociationAdress = reader["AssociationAdress"].ToString(),
                    AssociationImage = reader["AssociationImage"].ToString(),
                };
                associations.Add(a);
            }

            comm.Connection.Close();

            return associations;
        }
    }
}

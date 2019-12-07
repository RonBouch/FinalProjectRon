﻿using System;
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
                              "FROM Users " + "" +
                              $"WHERE Email='{email}' AND Password='{password}' ";
                comm.Connection.Open();
                SqlDataReader reader = comm.ExecuteReader();
                if (reader.Read())
                {
                    u = new User()
                    {
                        UserID = int.Parse(reader["UserID"].ToString()),
                        isAdmin = bool.Parse(reader["isAdmin"].ToString()),
                        FirstName = reader["FirstName"].ToString(),
                        LastName = reader["LastName"].ToString(),
                        City = reader["City"].ToString(),
                        Gender = reader["Gender"].ToString(),
                        Email = reader["Email"].ToString(),
                        Password = reader["Password"].ToString(),
                        Birthday = reader["Birthday"].ToString(),
                        Image=reader["Image"].ToString()
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

        public static User Register(string firstName, string lastName,  string gender,string email, string password, string birthday)
        {
            User u = null;
            SqlDataReader reader = null;
            SqlDataReader reader2 = null;
            try
            {
                comm.CommandText = $"SELECT * FROM Users WHERE Email ='{email}'";
                comm.Connection.Open();
                reader = comm.ExecuteReader();
                if (reader.Read())
                {
                    return u;
                }
                else
                {
                    comm.Connection.Close();
                    if (!reader.IsClosed)
                        reader.Close();
                    comm.CommandText = $"INSERT INTO Users(isAdmin,FirstName, LastName,Gender, Email, Password, , Birthday,Image) VALUES('{false}', '{firstName}', '{lastName}', '{gender}', '{email}' , '{password}', '{birthday.ToString()}','{null}')";
                    comm.Connection.Open();
                    int res = comm.ExecuteNonQuery();
                    if (res == 1)
                    {
                        comm.CommandText = "SELECT max(UserID) as maxID FROM Users";
                        reader2 = comm.ExecuteReader();
                        if (reader2.Read())
                        {
                            u = new User()
                            {
                                UserID = (int)reader2["maxUserID"],
                                isAdmin = false,
                                FirstName = firstName,
                                LastName = lastName,
                                Gender = gender,
                                Email = email,
                                Password = password,
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
                        UserID = (int)reader["UserID"],
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
                                UserID = (int)reader2["maxUserID"],
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
            string itemDate = string.Format("{0:HH:mm}", DateTime.Now);
            Item p = null;
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
                    AssociationTypeID = int.Parse(reader["AssociationTypeID"].ToString()),
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

        public static List<AssociationType> GetAssociationTypes()
        {
            List<AssociationType> associationTypes = new List<AssociationType>();
            comm.CommandText = $"SELECT * from AssociationType";
            comm.Connection.Open();
            SqlDataReader reader = comm.ExecuteReader();
            while (reader.Read())
            {
                AssociationType at = new AssociationType()
                {
                    AssociationTypeID = reader["AssociationTypeID"].ToString(),
                    AssociationTypeName = reader["AssociationTypeName"].ToString(),
      
                };
                associationTypes.Add(at);
            }

            comm.Connection.Close();

            return associationTypes;
        }


        public static int InsertFavorite(int userid, int itemid)
        {
            int check = 1;
            SqlDataReader reader = null;
            try
            {
                comm.CommandText = $"SELECT * FROM Favorite WHERE UserID={userid} and ItemID={itemid}";
                comm.Connection.Open();
                reader = comm.ExecuteReader();
                if (reader.Read())
                {
                    comm.Connection.Close();
                    comm.CommandText = $"DELETE  FROM Favorite WHERE UserID={userid} and ItemID={itemid}";
                    comm.Connection.Open();
                    int delete = comm.ExecuteNonQuery();
              
                    check = -1;
                    return check;
                }
                else
                {
                    comm.Connection.Close();
                }
                comm.CommandText = $"INSERT INTO Favorite(UserID,ItemID) VALUES({userid}, {itemid})";
                comm.Connection.Open();

                int res = comm.ExecuteNonQuery();
                if (res == 1)
                {
                    check = 1;

                    return check;

                }
                else
                {
                    check = 0;
                    return check;
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
            return check;
        }

        public static List<Item> GetItemsFromFavorite(int userid)
        {
            List<Item> items= null;
            try
            {


                items = new List<Item>();
                comm.CommandText = $"SELECT * from Favorite Where UserID={userid}";
                comm.Connection.Open();
                SqlDataReader reader = comm.ExecuteReader();
                List<Favorite> f = new List<Favorite>();
                while (reader.Read())
                {
                    Favorite ff = new Favorite()
                    {
                        ID = int.Parse(reader["ID"].ToString()),
                        UserID = int.Parse(reader["UserID"].ToString()),
                        ItemID = int.Parse(reader["ItemID"].ToString()),
                    };
                    f.Add(ff);
                }
                if (!reader.IsClosed)
                    reader.Close();

                foreach (Favorite fav in f)
                {

                    comm.CommandText = $"SELECT * from Items Where ItemID={fav.ItemID}";

                    SqlDataReader reader2 = comm.ExecuteReader();

                    if (reader2.Read())
                    {
                       
                       
                        Item i = new Item()
                        {
                            ItemID = int.Parse(reader2["ItemID"].ToString()),
                            UserID = reader2["UserID"].ToString(),
                            UserName = reader2["UserName"].ToString(),
                            UserPhone = reader2["UserPhone"].ToString(),
                            ItemType = reader2["ItemType"].ToString(),
                            ItemName = reader2["ItemName"].ToString(),
                            City = reader2["City"].ToString(),
                            ItemAbout = reader2["ItemAbout"].ToString(),
                            ItemImg = reader2["ItemImg"].ToString(),
                            ItemDate = reader2["ItemDate"].ToString(),
                        };

                        items.Add(i);

                    }
                    if (!reader2.IsClosed)
                    {
                        reader2.Close();
                    }


                }
                comm.Connection.Close();

                return items;
            }
            catch (Exception m)
            {
                Console.WriteLine(m.Message);
            }
            finally
            {

                if (comm.Connection.State != ConnectionState.Closed)
                {
                    comm.Connection.Close();

                }


            }
            return items;
        }

        public static List<Item> GetItemsByID(int userid)
        {
            List<Item> items = new List<Item>();
            comm.CommandText = $"SELECT * from Items WHERE UserID={userid}";
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
                    ItemName = reader["ItemName"].ToString(),
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


        public static int DeleteItem(int userid, int itemid)
        {
            int check = 1;
            SqlDataReader reader = null;
            try
            {
                comm.CommandText = $"SELECT * FROM Items WHERE UserID={userid} and ItemID={itemid}";
                comm.Connection.Open();
                reader = comm.ExecuteReader();
                if (reader.Read())
                {
                    comm.Connection.Close();
                    comm.CommandText = $"DELETE  FROM Items WHERE UserID={userid} and ItemID={itemid}";
                    comm.Connection.Open();
                    int delete = comm.ExecuteNonQuery();

                    check = -1;
                    return check;
                }
                else
                {
                    return 0;
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
            return check;
        }


    }
}

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
            User u = null; //יצירת אובייקט ריק
            try
            {
                comm.CommandText = $"SELECT * " + " " +
                              "FROM Users " + "" +
                              $"WHERE Email='{email}' AND Password='{password}' "; //יצירת שאילתא לSQL
                comm.Connection.Open(); //פתיחת החיבור של השרת עם הSQL 
                SqlDataReader reader = comm.ExecuteReader(); //ביצוע השאילתא שיצרנו בSQL
                if (reader.Read()) // במידה וקיים משתמש כזה קבלת המידע עליו והזנתו באובייקט שיצרנו
                {
                    u = new User()
                    {
                        UserID = int.Parse(reader["UserID"].ToString()),
                        isAdmin = bool.Parse(reader["isAdmin"].ToString()),
                        FirstName = reader["FirstName"].ToString(),
                        LastName = reader["LastName"].ToString(),
                        Gender = reader["Gender"].ToString(),
                        Email = reader["Email"].ToString(),
                        Password = reader["Password"].ToString(),
                        Birthday = reader["Birthday"].ToString(),
                        Image=reader["Image"].ToString(),
                        Token=reader["Token"].ToString()
                    };
                }

                comm.Connection.Close(); //סגירת החיבור של השרת עם הSQL 

                return u;  //החזרת האובייקט עם כל המידע שקיבלנו 
            }
            catch (Exception e)
            {
                Console.WriteLine(e.Message); //קבלת הודעת שגיאה במידה וקיימת בעיה בפונקציה
            }
            finally
            {
                if (comm.Connection.State != ConnectionState.Closed)
                {
                    comm.Connection.Close(); // וידוא סיגרת החיבור לSQL
                }
            }
            return u; //החזרת האובייקט ריק במידה ולא קיים משתמש כזה

        }
        public static User Register(string firstName, string lastName,  string gender,string email, string password, string birthday,string token)
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
                    comm.CommandText = $"INSERT INTO Users(isAdmin,FirstName, LastName,Gender, Email, Password, Birthday,Image,Token) VALUES('{0}','{firstName}', '{lastName}', '{gender}', '{email}' , '{password}', '{birthday.ToString()}','{null}','{token}')";
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
                                UserID = (int)reader2["maxID"],
                                isAdmin = false,
                                FirstName = firstName,
                                LastName = lastName,
                                Gender = gender,
                                Email = email,
                                Password = password,
                                Birthday = birthday,
                                Image=null,
                                Token=token,
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
        public static User RegisterWithGoogle(string firstName, string lastName, string email, string password, string image, string token)
        {
            User u = null;
            SqlDataReader reader = null;
            SqlDataReader reader2 = null;
            string Google = "Google";
            try
            {
                comm.CommandText = $"SELECT * FROM Users WHERE Email ='{email}'and Password = '{Google}'";
                comm.Connection.Open();
                reader = comm.ExecuteReader();
                if (reader.Read())
                {

                    u = new User()
                    {
                        UserID = (int)reader["UserID"],
                        FirstName = reader["FirstName"].ToString(),
                        LastName = reader["LastName"].ToString(),
                        Email = email,
                        Password = null,
                        Image = reader["Image"].ToString(),
                        Token = reader["Token"].ToString()

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
                    comm.CommandText = $"INSERT INTO Users(FirstName, LastName, Email, Password,Image,Token) VALUES('{firstName}', '{lastName}', '{email}', '{password}','{image}','{token}')";
                    int res = comm.ExecuteNonQuery();
                    if (res == 1)
                    {
                        comm.CommandText = "SELECT max(UserID) as maxID FROM Users";
                        reader2 = comm.ExecuteReader();
                        if (reader2.Read())
                        {
                            u = new User()
                            {
                                UserID = (int)reader2["maxID"],
                                FirstName = firstName,
                                LastName = lastName,
                                Email = email,
                                Password = password,
                                Image = image,
                                Token = token

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

        public static User EditProfile(string firstName, string lastName, string gender, string birthday,int id)
        {
            User u = null;
            SqlDataReader reader2 = null;
            try
            {

                comm.CommandText = $"UPDATE  Users   SET FirstName = '{firstName}',LastName =  '{lastName}', Gender = '{gender}', Birthday ='{birthday.ToString()}'  where UserID ='{id}'";
                comm.Connection.Open();
                int res = comm.ExecuteNonQuery();
                if (res == 1)
                {
                    comm.CommandText = $"SELECT * FROM Users where UserID ='{id}'";
                    reader2 = comm.ExecuteReader();
                    if (reader2.Read())
                    {
                        u = new User()
                        {
                            UserID = (int)reader2["UserID"],
                            FirstName = firstName,
                            LastName = lastName,
                            Gender = gender,
                            Birthday = birthday,
                            Email = reader2["Email"].ToString(),
                            Password = reader2["Password"].ToString()
                        };
                    }
                    return u;
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
        
        public static Item InsertItem(string userId, string userName, string userPhone, string itemType, string itemName, string city, string region , string itemAbout, string itemImg)
        {
            string itemDate = DateTime.Now.ToString("dd/MM/yyyy");
            Item p = null;
            SqlDataReader reader2 = null;

            try
            {


                    comm.CommandText = $"INSERT INTO Items(UserID,UserName,Userphone,ItemType,ItemName,City,Region,ItemAbout,ItemImg,ItemDate) VALUES('{int.Parse(userId)}','{userName}','{userPhone}','{itemType}','{itemName}','{city}','{region}','{itemAbout}','{itemImg}','{itemDate}')";
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
                            ItemName=itemName,
                            City=city,
                            Region=region,
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
            comm.CommandText = $"SELECT  * from Items ORDER BY ItemID DESC";
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
                    Region = reader["Region"].ToString(),
                    ItemAbout = reader["ItemAbout"].ToString(),
                    ItemImg = reader["ItemImg"].ToString(),
                    ItemDate = reader["ItemDate"].ToString(),
                    Reminder = reader["Reminder"].ToString(),

                };
                items.Add(p);
            }

            comm.Connection.Close();
            if(items[0].Reminder=="" )
            {
                comm.CommandText = $"UPDATE  Items   SET Reminder = '{1}' where ItemID ='{items[0].ItemID}'";
                comm.Connection.Open();
                int res = comm.ExecuteNonQuery();
                comm.Connection.Close();
                
            }


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
        public static List<ItemTypes> GetItemTypes()
        {
            List<ItemTypes> itemTypes = new List<ItemTypes>();
            comm.CommandText = $"SELECT * from ItemTypes";
            comm.Connection.Open();
            SqlDataReader reader = comm.ExecuteReader();
            while (reader.Read())
            {
                ItemTypes it = new ItemTypes()
                {
                    ItemTypeID = reader["ItemTypeID"].ToString(),
                    ItemType = reader["ItemType"].ToString(),

                };
                itemTypes.Add(it);
            }

            comm.Connection.Close();

            return itemTypes;
        }
        public static int InsertFavorite(int userid, int itemid)
        {
            int check = 1;// יצירת משתנה והתחלתו ב1
            SqlDataReader reader = null;
            try
            {
                //של המשתמש Favorite שתבדוק אם הפריט קיים בטבלת  Sql יצירת שאילתא ל 
                comm.CommandText = $"SELECT * FROM Favorite WHERE UserID={userid} and ItemID={itemid}";
                comm.Connection.Open();//פתיחת החיבור של השרת עם הSQL 
                reader = comm.ExecuteReader();
                if (reader.Read()) // אם קיים הפריט
                {
                    comm.Connection.Close();//סגירת החיבור של השרת עם הSQL
                    //Favorite יצירת שאילתא שתמחק את הפריט מטבלת ה 
                    comm.CommandText = $"DELETE  FROM Favorite WHERE UserID={userid} and ItemID={itemid}";
                    comm.Connection.Open();//פתיחת החיבור של השרת עם הSQL
                    int delete = comm.ExecuteNonQuery();//מחיקת הפריט מהטבלה 
               
                    check = -1; // הכנסת הערך -1 למשתה
                    return check; // מחזיר את המשתנה עם הערך המוחזר
                }
                else
                {
                    comm.Connection.Close();//סגירת החיבור של השרת עם הSQL 
                }
                //את מספר זהות הפריט ואת מספר זהות המשתמש Favorite יצירת שאילתא שתכניס לטבלת 
                comm.CommandText = $"INSERT INTO Favorite(UserID,ItemID) VALUES({userid}, {itemid})";
                comm.Connection.Open();//פתיחת החיבור של השרת עם הSQL 

                int res = comm.ExecuteNonQuery(); // שם במשתנה 1 אם נוצר שורה חדשה בטבלה   
                if (res == 1)// בדיקה אם נוצר בטבלה שורה חדשה
                {
                    check = 1;

                    return check; // מחזיר את המשתנה שהערך שלו 1

                }
                else //אם לא נוצר שורה חדשה
                {
                    check = 0;
                    return check; // החזרת המשתנה שהערך שלו 0
                }
            }
            catch (Exception e)
            {
                Console.WriteLine(e.Message);//קבלת הודעת שגיאה במידה וקיימת בעיה בפונקציה
            }
            finally
            {

                if (comm.Connection.State != ConnectionState.Closed)
                {
                    comm.Connection.Close();// וידוא סיגרת החיבור לSQL
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
                            Region = reader2["Region"].ToString(),
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
                    Region = reader["Region"].ToString(),
                    ItemAbout = reader["ItemAbout"].ToString(),
                    ItemImg = reader["ItemImg"].ToString(),
                    ItemDate = reader["ItemDate"].ToString(),

                };
                items.Add(p);
            }

            comm.Connection.Close();

            return items;
        }
        public static User RegisterWithFacebook(string firstName, string lastName, string email, string password,string birthday,string gender, string image,string token)
        {
            User u = null;
            SqlDataReader reader = null;
            SqlDataReader reader2 = null;
            string Facebook = "Facebook";
            try
            {
                comm.CommandText = $"SELECT * FROM Users WHERE Email ='{email}'and Password = '{Facebook}'";
                comm.Connection.Open();
                reader = comm.ExecuteReader();
                if (reader.Read())
                {

                    u = new User()
                    {
                        UserID = (int)reader["UserID"],
                        FirstName = reader["FirstName"].ToString(),
                        LastName = reader["LastName"].ToString(),
                        Email = email,
                        Password = null,
                        Birthday = reader["Birthday"].ToString(),
                        Gender = reader["Gender"].ToString(),
                        Image = reader["Image"].ToString(),
                        Token = reader["Token"].ToString(),

                    };

                    return u;

                }

                else
                {


               
                    if (!reader.IsClosed)
                        reader.Close();
                    comm.CommandText = $"INSERT INTO Users(FirstName, LastName, Email, Password,Birthday,Gender,Image,Token) VALUES('{firstName}', '{lastName}', '{email}', '{password}','{birthday}','{gender}','{image}','{token}')";
                    int res = comm.ExecuteNonQuery();
                    if (res == 1)
                    {
                        comm.CommandText = "SELECT max(UserID) as maxID FROM Users";
                        reader2 = comm.ExecuteReader();
                        if (reader2.Read())
                        {
                            u = new User()
                            {
                                UserID = (int)reader2["maxID"],
                                FirstName = firstName,
                                LastName = lastName,
                                Email = email,
                                Password = password,
                                Birthday = birthday,
                                Gender = gender,
                                Image = image,
                                Token=token,

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
        public static int DeleteReminder(int userid, string itemName)
        {
            int check = 1;
            SqlDataReader reader = null;
            try
            {
                comm.CommandText = $"SELECT * FROM Reminders WHERE UserID={userid} and ItemName='{itemName}'";
                comm.Connection.Open();
                reader = comm.ExecuteReader();
                if (reader.Read())
                {
                    comm.Connection.Close();
                    comm.CommandText = $"DELETE  FROM Reminders WHERE UserID={userid} and ItemName='{itemName}'";
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
        public static int AddReminder(string itemName,int userid, string token)
        {
            int check = 1;// יצירת משתנה והתחלתו ב1
            SqlDataReader reader = null;
            try
            {
                //של המשתמש Favorite שתבדוק אם הפריט קיים בטבלת  Sql יצירת שאילתא ל 
                comm.CommandText = $"SELECT * FROM Reminders WHERE UserID='{userid}' and ItemName='{itemName}'";
                comm.Connection.Open();//פתיחת החיבור של השרת עם הSQL 
                reader = comm.ExecuteReader();
                if (reader.Read()) // אם קיים הפריט
                {
                    check = -1; // הכנסת הערך -1 למשתה
                    return check; // מחזיר את המשתנה עם הערך המוחזר
                }
                else
                {
                    comm.Connection.Close();//סגירת החיבור של השרת עם הSQL 
                }
                //את מספר זהות הפריט ואת מספר זהות המשתמש Favorite יצירת שאילתא שתכניס לטבלת 
                comm.CommandText = $"INSERT INTO Reminders(ItemName,UserID,Token) VALUES( '{itemName}','{userid}', '{token}')";
                comm.Connection.Open();//פתיחת החיבור של השרת עם הSQL 

                int res = comm.ExecuteNonQuery(); // שם במשתנה 1 אם נוצר שורה חדשה בטבלה   
                if (res == 1)// בדיקה אם נוצר בטבלה שורה חדשה
                {
                    check = 1;

                    return check; // מחזיר את המשתנה שהערך שלו 1

                }
                else //אם לא נוצר שורה חדשה
                {
                    check = 0;
                    return check; // החזרת המשתנה שהערך שלו 0
                }
            }
            catch (Exception e)
            {
                Console.WriteLine(e.Message);//קבלת הודעת שגיאה במידה וקיימת בעיה בפונקציה
            }
            finally
            {

                if (comm.Connection.State != ConnectionState.Closed)
                {
                    comm.Connection.Close();// וידוא סיגרת החיבור לSQL
                }

            }
            return check;
        }
        public static List<Reminder> GetReminders()
        {
            List<Reminder> items = new List<Reminder>();
            comm.CommandText = $"SELECT  * from Reminders ORDER BY ItemName DESC";
            comm.Connection.Open();
            SqlDataReader reader = comm.ExecuteReader();
            while (reader.Read())
            {
                Reminder p = new Reminder()
                {
                    ReminderID = int.Parse(reader["ReminderID"].ToString()),
                     ItemName=reader["ItemName"].ToString(),
                     UserID=reader["UserID"].ToString(),
                     Token=reader["Token"].ToString(),
                };
                items.Add(p);
            }

            comm.Connection.Close();

            return items;
        }

        public static string UploadImage(string base64, string imageName,int userid)
        {
            try
            {

                comm.CommandText = $"UPDATE Users SET Image = '{imageName}' where UserID ='{userid}'  ";
                comm.Connection.Open();
                int res = comm.ExecuteNonQuery();
                if (res == 1)
                {
                    return "yes";
                }
                else
                {
                  return  null;
                }

            }
            catch (Exception e)
            {
                Console.WriteLine(e.Message);
                return null;
            }
            finally
            {
                if (comm.Connection.State != ConnectionState.Closed)
                {
                    comm.Connection.Close();
                }
            }

        }
    }
}

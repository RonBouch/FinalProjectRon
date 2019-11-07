using DALproj;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Web.Script.Serialization;
//using System.Collections.Generic;


namespace BALproj
{
    public static class BALServices
    {
        public static string Login(string email, string password)
        {
         
            User u = DBServices.Login(email, password);
            if (u != null)
            {

            }
            else
            {

            }

            return new JavaScriptSerializer().Serialize(u);
        }

        public static string Register(string firstName, string lastName, string email, string password, string gender, string birthday)
        {
            User u = DBServices.Register(firstName, lastName, email, password, gender, birthday);
            if (u != null)
            {

            }
            else
            {

            }

            return new JavaScriptSerializer().Serialize(u);
        }

        public static string RegisterWithGoogle(string firstName, string lastName, string email, string password)
        {
            User u = DBServices.RegisterWithGoogle(firstName, lastName, email, password);
            if (u != null)
            {

            }
            else
            {

            }

            return new JavaScriptSerializer().Serialize(u);
        }

        public static string InsertItem(string userId, string userName, string userPhone, string itemType, string itemName, string city, string itemAbout, string itemImg)
        {
            Item p = DBServices.InsertItem(userId, userName, userPhone, itemType, itemName, city, itemAbout, itemImg);
            if (p != null)
            {

            }
            else
            {

            }
            return new JavaScriptSerializer().Serialize(p);
        }
    }


}

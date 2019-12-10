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

        public static string Register(string firstName, string lastName, string gender, string email, string password, string birthday)
        {
            User u = DBServices.Register(firstName, lastName, gender, email, password, birthday);
            if (u != null)
            {

            }
            else
            {

            }

            return new JavaScriptSerializer().Serialize(u);
        }

        public static string RegisterWithGoogle(string firstName, string lastName, string email, string password,string image)
        {
            User u = DBServices.RegisterWithGoogle(firstName, lastName, email, password,image);
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

        public static string GetItems()
        {
            List<Item> p = DBServices.GetItems();

            if (p != null)
            {
                return new JavaScriptSerializer().Serialize(p);
            }
            else
            {
                return new JavaScriptSerializer().Serialize("No Items");
            }


        }



        public static string GetAssociations()
        {
            List<Association> associations = DBServices.GetAssociations();

            if (associations != null)
            {
                return new JavaScriptSerializer().Serialize(associations);
            }
            else
            {
                return new JavaScriptSerializer().Serialize("No Associations");
            }
        }

        public static string GetAssociationTypes()
        {
            List<AssociationType> associationTypes = DBServices.GetAssociationTypes();

            if (associationTypes != null)
            {
                return new JavaScriptSerializer().Serialize(associationTypes);
            }
            else
            {
                return new JavaScriptSerializer().Serialize("No AssociationTypes");
            }
        }

        public static int InsertFavorite(int userid, int itemid)
        {
            int check = DBServices.InsertFavorite(userid, itemid);
            if (check == 1)
            {

            }
            else
            {

            }

            return check;
        }

        public static string GetItemsFromFavorite(int userid)
        {
            List<Item> p = DBServices.GetItemsFromFavorite(userid);

            if (p != null)
            {
                return new JavaScriptSerializer().Serialize(p);
            }
            else
            {
                return new JavaScriptSerializer().Serialize("No Items");
            }


        }


        public static string GetItemsByID(int userid)
        {
            List<Item> p = DBServices.GetItemsByID(userid);

            if (p != null)
            {
                return new JavaScriptSerializer().Serialize(p);
            }
            else
            {
                return new JavaScriptSerializer().Serialize("No Items");
            }


        }


        public static int DeleteItem(int userid, int itemid)
        {
            int check = DBServices.DeleteItem(userid, itemid);
            if (check == 0)
            {

            }
            else
            {

            }

            return check;
        }


        public static string UploadImage(string base64, string imageName, int userid)
        {
            string check = DBServices.UploadImage(base64, imageName,userid);
            if (check!=null)
            {


            }
            else
            {
                

            }

            return new JavaScriptSerializer().Serialize(check);

        }
    }


}

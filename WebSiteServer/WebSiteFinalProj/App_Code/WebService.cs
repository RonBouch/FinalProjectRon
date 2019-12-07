using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Web;
using System.Web.Services;
using System.Web.Script.Serialization;
using BALproj;

/// <summary>
/// Summary description for WebService
/// </summary>
[WebService(Namespace = "http://tempuri.org/")]
[WebServiceBinding(ConformsTo = WsiProfiles.BasicProfile1_1)]
// To allow this Web Service to be called from script, using ASP.NET AJAX, uncomment the following line. 
[System.Web.Script.Services.ScriptService]
public class WebService : System.Web.Services.WebService
{

    public WebService()
    {

        //Uncomment the following line if using designed components 
        //InitializeComponent(); 
    }
    
    [WebMethod]
    public string Login(string email, string password)
    {
        return BALServices.Login(email, password);
    }

    [WebMethod]
    public string Register(string firstName, string lastName, string gender, string email, string password, string birthday)
    {
        return BALServices.Register(firstName, lastName, gender, email, password, birthday);
    }


    [WebMethod]
    public string RegisterWithGoogle(string firstName, string lastName, string email, string password)
    {
        return BALServices.RegisterWithGoogle(firstName, lastName, email, password);
    }

    [WebMethod]
    public string InsertItem(string userId, string userName, string userPhone, string itemType, string itemName, string city, string itemAbout, string itemImg)
    {
        return BALServices.InsertItem(userId, userName, userPhone, itemType, itemName, city, itemAbout, itemImg);
    }
    [WebMethod]
    public string GetItems()
    {
        return BALServices.GetItems();

    }
    [WebMethod]
    public string GetAssociations()
    {
        return BALServices.GetAssociations();

    }
    [WebMethod]
    public string GetAssociationTypes()
    {
        return BALServices.GetAssociationTypes();

    }

    [WebMethod]
    public int InsertFavorite(int userid, int itemid)
    {
        return BALServices.InsertFavorite(userid, itemid);
    }
    [WebMethod]
    public string GetItemsFromFavorite(int userid)
    {
        return BALServices.GetItemsFromFavorite(userid);
    }

    [WebMethod]
    public string GetItemsByID(int userid)
    {
        return BALServices.GetItemsByID(userid);

    }
    [WebMethod]
    public int DeleteItem(int userid, int itemid)
    {
        return BALServices.DeleteItem(userid, itemid);
    }


    [WebMethod]
    public string UploadImage(string base64, string imageName) {

        return new JavaScriptSerializer().Serialize(SaveImage(base64, imageName));
    }

    public bool SaveImage(string base64, string imageName)
    {
        try
        {
            string path = HttpContext.Current.Server.MapPath("~/ImageStorage"); //Path

            //Check if directory exist
            if (!System.IO.Directory.Exists(path))
            {
                System.IO.Directory.CreateDirectory(path); //Create directory if it doesn't exist
            }

            //set the image path
            string imgPath = Path.Combine(path, imageName);

            byte[] imageBytes = Convert.FromBase64String(base64.Replace(' ', '+'));

            File.WriteAllBytes(imgPath, imageBytes);

            return true;
        }
        catch (Exception)
        {
            return false;
        }
        
    }
}

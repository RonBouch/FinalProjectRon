using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Services;
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
    public string Register(string firstName, string lastName, string email, string password, string gender, string birthday)
    {
        return BALServices.Register(firstName, lastName, email, password, gender, birthday);
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
}

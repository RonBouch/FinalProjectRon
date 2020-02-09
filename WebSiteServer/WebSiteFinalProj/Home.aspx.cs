using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;

public partial class Home : System.Web.UI.Page
{
    protected void Page_Load(object sender, EventArgs e)
    {
        if(Session["username"] == null)
        {
            Response.Redirect("login.aspx");
        }
        lblUserDetails.Text = "Hello " + Session["username"]; 

    }

    protected void btnLogout_Click(object sender, EventArgs e)
    {
        Session.Abandon();
        Response.Redirect("Login.aspx");
    }


    protected void Button1_Click(object sender, EventArgs e)
    {
        Response.Redirect("Users.aspx");
    }

    protected void btnAssociations_Click(object sender, EventArgs e)
    {
        Response.Redirect("Associations.aspx");
    }

    protected void btnPosts_Click(object sender, EventArgs e)
    {
        Response.Redirect("Posts.aspx");
    }
}
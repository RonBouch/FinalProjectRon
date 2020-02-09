using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using System.Data.SqlClient;
using System.Data;
using System.Configuration;

public partial class _Default : System.Web.UI.Page
{

    protected void Page_Load(object sender, EventArgs e)
    {
        lblErrorMassage.Visible = false;
    }

    protected void btnLogin_Click(object sender, EventArgs e)
    {
        
        using (SqlConnection sqlCon = new SqlConnection(ConfigurationManager.ConnectionStrings["LIVEDNS"].ConnectionString))
        {
            sqlCon.Open();
            string query = "SELECT COUNT(1) FROM Users WHERE Email=@username AND Password=@password AND isAdmin='True'";
            SqlCommand sqlCmd = new SqlCommand(query, sqlCon);
            sqlCmd.Parameters.AddWithValue("@username",txtUserName.Text.Trim());
            sqlCmd.Parameters.AddWithValue("@password",txtPassword.Text.Trim());
            int count = Convert.ToInt32(sqlCmd.ExecuteScalar());

            if(count == 1)
            {
                Session["username"] = txtUserName.Text.Trim();
                Response.Redirect("Home.aspx");
            }
            else
            {
                lblErrorMassage.Visible = true;
            }

        }
    }
}
<%@ Page Language="C#" AutoEventWireup="true" CodeFile="Login.aspx.cs" Inherits="_Default" %>

<!DOCTYPE html>

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <title></title>
</head>
<body>
    <form id="form1" runat="server">
        <div>            
            <table style="margin:auto;border:5px solid">

                <tr>
                    <td><asp:Label ID="Label1" runat="server" Text="UserName"></asp:Label></td>
                    <td><asp:TextBox ID="txtUserName" runat="server"></asp:TextBox></td>
                </tr>
                <tr>
                   
                    <td><asp:Label ID="Label2" runat="server" Text="Password"></asp:Label></td>
                    <td><asp:TextBox ID="txtPassword" runat="server" TextMode="Password"></asp:TextBox></td>
                </tr>
                <tr>
                    <td></td>
                    <td><asp:Button ID="btnLogin" runat="server" Text="Login" OnClick="btnLogin_Click" /></td>
                </tr>
                <tr>
                    <td></td>
                    <td><asp:Label ID="lblErrorMassage" runat="server" Text="Wrong UserName or Password" ForeColor="Red"></asp:Label></td>
                </tr>
            </table>
            
        </div>
    </form>
</body>
</html>

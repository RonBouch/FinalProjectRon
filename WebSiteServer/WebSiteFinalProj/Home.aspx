<%@ Page Language="C#" AutoEventWireup="true" CodeFile="Home.aspx.cs" Inherits="Home" %>

<!DOCTYPE html>

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <title></title>
</head>
<body>
    <form id="form1" runat="server">
        <div>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            <br />
            <asp:Label ID="lblUserDetails" runat="server" Text=""></asp:Label>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            <br />
            &nbsp;
            <asp:Button ID="btnUsers" runat="server" OnClick="Button1_Click" Text="Users" />
&nbsp;
            <asp:Button ID="btnPosts" runat="server" OnClick="btnPosts_Click" Text="Posts" />
&nbsp;
            <asp:Button ID="btnAssociations" runat="server" OnClick="btnAssociations_Click" Text="Associations" />
&nbsp;
            <asp:Button ID="btnLogout" runat="server" Text="Logout" OnClick="btnLogout_Click" />
            &nbsp;&nbsp;
            <br />
            <br />
        </div>
        <p>&nbsp;</p>
    </form>
    </body>
</html>

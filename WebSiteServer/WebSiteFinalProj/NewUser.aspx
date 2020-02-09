<%@ Page Language="C#" AutoEventWireup="true" CodeFile="NewUser.aspx.cs" Inherits="NewUser" %>

<!DOCTYPE html>

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <title></title>
    <style type="text/css">
        .auto-style1 {
            width: 133px;
        }
        .auto-style2 {
            width: 133px;
            height: 27px;
        }
        .auto-style4 {
            width: 133px;
            height: 29px;
        }
        .auto-style6 {
            width: 38%;
            position: fixed;
            left: 10px;
            top: 15px;
            height: 346px;
        }
        .auto-style7 {
            width: 88px;
            height: 29px;
        }
        .auto-style9 {
            width: 88px;
            height: 27px;
        }
        .auto-style10 {
            width: 88px;
        }
    </style>
</head>
<body>
    <form id="form1" runat="server">
        <div>
            <table style="border: thick solid #0066FF; font-family: Arial; font-size: small; background-color: #C0C0C0; border-spacing: 10px;" class="auto-style6">
                <tr>
                    <td class="auto-style4">First Name:</td>
                    <td class="auto-style7"><asp:TextBox ID="TextBox1" runat="server"></asp:TextBox></td>
                </tr>
                <tr>
                    <td class="auto-style1">Last Name:</td>
                    <td class="auto-style10"><asp:TextBox ID="TextBox2" runat="server"></asp:TextBox></td>
                </tr>
                <tr>
                    <td class="auto-style1">Email:</td>
                    <td class="auto-style10"><asp:TextBox ID="TextBox3" runat="server"></asp:TextBox></td>
                </tr>
                <tr>
                    <td class="auto-style1">Password:</td>
                    <td class="auto-style10"><asp:TextBox ID="TextBox4" runat="server"></asp:TextBox></td>
                </tr>
                <tr>
                    <td class="auto-style1">Birthday:</td>
                    <td class="auto-style10"><asp:TextBox ID="TextBox5" runat="server"></asp:TextBox></td>
                </tr>
                <tr>
                    <td class="auto-style2">Gender:</td>
                    <td class="auto-style9">
                        <asp:RadioButtonList ID="RadioButtonList2" runat="server" RepeatDirection="Horizontal">
                            <asp:ListItem>Male</asp:ListItem>
                            <asp:ListItem>Female</asp:ListItem>
                        </asp:RadioButtonList>
                    </td>
                </tr>
                <tr>
                    <td class="auto-style1">Admin Permission:</td>
                    <td class="auto-style10">
                        <asp:RadioButtonList ID="RadioButtonList1" runat="server" RepeatDirection="Horizontal">
                            <asp:ListItem>Yes</asp:ListItem>
                            <asp:ListItem>No</asp:ListItem>
                        </asp:RadioButtonList>
                    </td>
                </tr>
                                <tr>
                    <td class="auto-style1"><asp:Button ID="btnAddUser" runat="server" Text="Done" /></td>
                    <td></td>
                </tr>

            </table>
        </div>
    </form>
</body>
</html>

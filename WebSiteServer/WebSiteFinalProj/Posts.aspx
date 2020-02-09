<%@ Page Language="C#" AutoEventWireup="true" CodeFile="Posts.aspx.cs" Inherits="Posts" %>

<!DOCTYPE html>

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <title></title>
</head>
<body>
    <form id="form1" runat="server">
        <div>
            <asp:GridView ID="GridView1" runat="server" AllowPaging="True" BackColor="White" BorderColor="#999999" BorderStyle="None" BorderWidth="1px" CellPadding="3" DataSourceID="SqlDataSource1" GridLines="Vertical">
                <AlternatingRowStyle BackColor="#DCDCDC" />
                <Columns>
                    <asp:CommandField ShowDeleteButton="True" ShowEditButton="True" />
                </Columns>
                <FooterStyle BackColor="#CCCCCC" ForeColor="Black" />
                <HeaderStyle BackColor="#000084" Font-Bold="True" ForeColor="White" />
                <PagerStyle BackColor="#999999" ForeColor="Black" HorizontalAlign="Center" />
                <RowStyle BackColor="#EEEEEE" ForeColor="Black" />
                <SelectedRowStyle BackColor="#008A8C" Font-Bold="True" ForeColor="White" />
                <SortedAscendingCellStyle BackColor="#F1F1F1" />
                <SortedAscendingHeaderStyle BackColor="#0000A9" />
                <SortedDescendingCellStyle BackColor="#CAC9C9" />
                <SortedDescendingHeaderStyle BackColor="#000065" />
            </asp:GridView>
            <asp:SqlDataSource ID="SqlDataSource1" runat="server" ConnectionString="<%$ ConnectionStrings:LIVEDNS %>" DeleteCommand="DELETE FROM [Items] WHERE [ItemID] = @ItemID" InsertCommand="INSERT INTO [Items] ([UserID], [UserName], [UserPhone], [ItemType], [ItemName], [City], [Region], [ItemAbout], [ItemDate]) VALUES (@UserID, @UserName, @UserPhone, @ItemType, @ItemName, @City, @Region, @ItemAbout, @ItemDate)" SelectCommand="SELECT [ItemID], [UserID], [UserName], [UserPhone], [ItemType], [ItemName], [City], [Region], [ItemAbout], [ItemDate] FROM [Items]" UpdateCommand="UPDATE [Items] SET [UserID] = @UserID, [UserName] = @UserName, [UserPhone] = @UserPhone, [ItemType] = @ItemType, [ItemName] = @ItemName, [City] = @City, [Region] = @Region, [ItemAbout] = @ItemAbout, [ItemDate] = @ItemDate WHERE [ItemID] = @ItemID">
                <DeleteParameters>
                    <asp:Parameter Name="ItemID" Type="Int32" />
                </DeleteParameters>
                <InsertParameters>
                    <asp:Parameter Name="UserID" Type="Int32" />
                    <asp:Parameter Name="UserName" Type="String" />
                    <asp:Parameter Name="UserPhone" Type="String" />
                    <asp:Parameter Name="ItemType" Type="String" />
                    <asp:Parameter Name="ItemName" Type="String" />
                    <asp:Parameter Name="City" Type="String" />
                    <asp:Parameter Name="Region" Type="String" />
                    <asp:Parameter Name="ItemAbout" Type="String" />
                    <asp:Parameter Name="ItemDate" Type="String" />
                </InsertParameters>
                <UpdateParameters>
                    <asp:Parameter Name="UserID" Type="Int32" />
                    <asp:Parameter Name="UserName" Type="String" />
                    <asp:Parameter Name="UserPhone" Type="String" />
                    <asp:Parameter Name="ItemType" Type="String" />
                    <asp:Parameter Name="ItemName" Type="String" />
                    <asp:Parameter Name="City" Type="String" />
                    <asp:Parameter Name="Region" Type="String" />
                    <asp:Parameter Name="ItemAbout" Type="String" />
                    <asp:Parameter Name="ItemDate" Type="String" />
                    <asp:Parameter Name="ItemID" Type="Int32" />
                </UpdateParameters>
            </asp:SqlDataSource>
        </div>
    </form>
</body>
</html>

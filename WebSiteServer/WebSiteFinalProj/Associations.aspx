<%@ Page Language="C#" AutoEventWireup="true" CodeFile="Associations.aspx.cs" Inherits="Associations" %>

<!DOCTYPE html>

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <title></title>
</head>
<body>
    <form id="form1" runat="server">
        <div>
            <asp:GridView ID="GridView1" runat="server" AllowPaging="True" AutoGenerateColumns="False" BackColor="White" BorderColor="#999999" BorderStyle="None" BorderWidth="1px" CellPadding="3" DataKeyNames="AssociationID" DataSourceID="SqlDataSource1" GridLines="Vertical">
                <AlternatingRowStyle BackColor="#DCDCDC" />
                <Columns>
                    <asp:CommandField ShowDeleteButton="True" ShowEditButton="True" />
                    <asp:BoundField DataField="AssociationID" HeaderText="AssociationID" InsertVisible="False" ReadOnly="True" SortExpression="AssociationID" />
                    <asp:BoundField DataField="AssociationName" HeaderText="AssociationName" SortExpression="AssociationName" />
                    <asp:BoundField DataField="AssociationTypeID" HeaderText="AssociationTypeID" SortExpression="AssociationTypeID" />
                    <asp:BoundField DataField="AssociationEmail" HeaderText="AssociationEmail" SortExpression="AssociationEmail" />
                    <asp:BoundField DataField="AssociationPhone" HeaderText="AssociationPhone" SortExpression="AssociationPhone" />
                    <asp:BoundField DataField="AssociationAdditionalPhone" HeaderText="AssociationAdditionalPhone" SortExpression="AssociationAdditionalPhone" />
                    <asp:BoundField DataField="AssociationDetails" HeaderText="AssociationDetails" SortExpression="AssociationDetails" />
                    <asp:BoundField DataField="AssociationWebsite" HeaderText="AssociationWebsite" SortExpression="AssociationWebsite" />
                    <asp:BoundField DataField="AssociationAdress" HeaderText="AssociationAdress" SortExpression="AssociationAdress" />
                    <asp:BoundField DataField="AssociationFax" HeaderText="AssociationFax" SortExpression="AssociationFax" />
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
            <asp:SqlDataSource ID="SqlDataSource1" runat="server" ConnectionString="<%$ ConnectionStrings:LIVEDNS %>" DeleteCommand="DELETE FROM [Associations] WHERE [AssociationID] = @AssociationID" InsertCommand="INSERT INTO [Associations] ([AssociationName], [AssociationTypeID], [AssociationEmail], [AssociationPhone], [AssociationAdditionalPhone], [AssociationDetails], [AssociationWebsite], [AssociationAdress], [AssociationFax]) VALUES (@AssociationName, @AssociationTypeID, @AssociationEmail, @AssociationPhone, @AssociationAdditionalPhone, @AssociationDetails, @AssociationWebsite, @AssociationAdress, @AssociationFax)" SelectCommand="SELECT [AssociationID], [AssociationName], [AssociationTypeID], [AssociationEmail], [AssociationPhone], [AssociationAdditionalPhone], [AssociationDetails], [AssociationWebsite], [AssociationAdress], [AssociationFax] FROM [Associations]" UpdateCommand="UPDATE [Associations] SET [AssociationName] = @AssociationName, [AssociationTypeID] = @AssociationTypeID, [AssociationEmail] = @AssociationEmail, [AssociationPhone] = @AssociationPhone, [AssociationAdditionalPhone] = @AssociationAdditionalPhone, [AssociationDetails] = @AssociationDetails, [AssociationWebsite] = @AssociationWebsite, [AssociationAdress] = @AssociationAdress, [AssociationFax] = @AssociationFax WHERE [AssociationID] = @AssociationID">
                <DeleteParameters>
                    <asp:Parameter Name="AssociationID" Type="Int32" />
                </DeleteParameters>
                <InsertParameters>
                    <asp:Parameter Name="AssociationName" Type="String" />
                    <asp:Parameter Name="AssociationTypeID" Type="Int32" />
                    <asp:Parameter Name="AssociationEmail" Type="String" />
                    <asp:Parameter Name="AssociationPhone" Type="String" />
                    <asp:Parameter Name="AssociationAdditionalPhone" Type="String" />
                    <asp:Parameter Name="AssociationDetails" Type="String" />
                    <asp:Parameter Name="AssociationWebsite" Type="String" />
                    <asp:Parameter Name="AssociationAdress" Type="String" />
                    <asp:Parameter Name="AssociationFax" Type="String" />
                </InsertParameters>
                <UpdateParameters>
                    <asp:Parameter Name="AssociationName" Type="String" />
                    <asp:Parameter Name="AssociationTypeID" Type="Int32" />
                    <asp:Parameter Name="AssociationEmail" Type="String" />
                    <asp:Parameter Name="AssociationPhone" Type="String" />
                    <asp:Parameter Name="AssociationAdditionalPhone" Type="String" />
                    <asp:Parameter Name="AssociationDetails" Type="String" />
                    <asp:Parameter Name="AssociationWebsite" Type="String" />
                    <asp:Parameter Name="AssociationAdress" Type="String" />
                    <asp:Parameter Name="AssociationFax" Type="String" />
                    <asp:Parameter Name="AssociationID" Type="Int32" />
                </UpdateParameters>
            </asp:SqlDataSource>
        </div>
    </form>
</body>
</html>

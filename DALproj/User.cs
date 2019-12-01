namespace DALproj
{
    public class User
    {
        public int UserID { get; set; }
        public bool isAdmin{ get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string City { get; set; }
        public string Gender { get; set; }
        public string Email { get; set; }
        public string Password { get; set; }
        public string Birthday { get; set; }
        public string Image { get; set; }
    }
}
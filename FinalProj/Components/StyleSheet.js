import { StyleSheet } from "react-native";

export default StyleSheet.create({
  //Publish Screen
  autocompletesContainer: {
    paddingTop: 30,
    zIndex: 1,
    width: "100%",
    paddingHorizontal: 8
  },
  inputA: { maxHeight: 40 },
  inputContainer: {
    display: "flex",
    flexShrink: 0,
    flexGrow: 0,
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: "center",
    borderBottomWidth: 1,
    borderColor: "#c7c6c1",
    paddingVertical: 13,
    paddingLeft: 12,
    paddingRight: "5%",
    width: "100%",
    justifyContent: "flex-start"
  },
 
  plus: {
    position: "absolute",
    left: 15,
    top: 10
  },
  //contribution screen
  view: {
    flex: 1,
    // justifyContent:'center',
    alignItems: "center",
    backgroundColor: "white",
    padding: "2%"
  },
  line: {
    width: "90%",
    alignSelf: "center",
    height: 1,
    backgroundColor: "gray",
    // margin: 10
  },
  searchButton: {
    backgroundColor: "rgba(0,0,255,.7)",
    flexDirection: "row",
    height: 35,
    width: 80,
    alignItems: "center",
    justifyContent: "center",
    borderColor: "white",
    borderWidth: 2,
    marginTop: 10
  },
  //Basic Design

  backgroundImage: {
    flex: 1,
    resizeMode: "cover"
  },
  touchableHighlight: {
    marginTop: 35,
    width: 60,
    height: 60,
    justifyContent: "center",
    position: "absolute",
    left: 5
  },
  open: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold"
  },
  topBar: {
    backgroundColor: "#6495ed",
    width: "100%",
    alignItems: "flex-end"
  },
  logo: {
    width: 60,
    height: 60,
    marginTop: 35
  },
  container: {
    flex: 1,
    flexDirection: "column",
    width: "100%",
    height: "100%"
  },
  main: {
    alignItems: "center",
    width: "100%",
    height: "100%"
  },

  //Login Page Style

  loginForm: {
    alignItems: "center",
    width: "100%"
  },
  input: {
    flexDirection: "row",
    backgroundColor: "rgba(255,255,255,.5)",
    borderRadius: 50,
    width: 250,
    height: 40,
    textAlign: "center",
    borderColor: "gray",
    borderWidth: 2,
    margin: 5
  },
  loginButton: {
    backgroundColor: "rgba(100,100,100,.5)",
    borderRadius: 200,
    height: 30,
    width: 80,
    alignItems: "center",
    justifyContent: "center",
    borderColor: "gray",
    borderWidth: 2,
    marginRight: "55%",
    marginTop: 5
  },
  textMessage: {
    margin: 10,
    color: "red"
  },
  registerButton: {
    backgroundColor: "rgba(255,255,0,.9)",
    flexDirection: "row",
    height: 45,
    width: 200,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 20,
    borderColor: "white",
    borderWidth: 2
  },

  faceBookButton: {
    flexDirection: "row",
    backgroundColor: "rgba(0,0,255,.9)",
    height: 45,
    width: 200,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 20,
    borderColor: "white",
    borderWidth: 2
  },
  googleButton: {
    flexDirection: "row",
    backgroundColor: "red",
    height: 45,
    width: 200,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 20,
    borderColor: "white",
    borderWidth: 2
  },
  buttonText: {
    color: "white"
  },

  //Register Page Style
  radioGender: {
    flexDirection: "row",
    margin: 10,
    justifyContent: "center"
  },
  registerButton2: {
    backgroundColor: "rgba(255,255,0,.9)",
    flexDirection: "row",
    height: 45,
    width: 200,
    marginTop: 10,
    alignItems: "center",
    justifyContent: "center",
    borderColor: "white",
    borderWidth: 2
  },

  //Home Page Style

  iconsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 25
  },
  icon: {
    width: 70,
    height: 70
  },
  buttonContainer: {
    alignItems: "center",
    justifyContent: "center",
    margin: "9%",
    marginTop: 25
  },
  textIcon: {
    fontWeight: "bold"
  },

  //Publish Page Style
  publishButton: {
    backgroundColor: "rgba(0,0,255,.7)",
    flexDirection: "row",
    height: 45,
    width: 200,
    alignItems: "center",
    justifyContent: "center",
    borderColor: "white",
    borderWidth: 2
  },
  radioPublish: {
    flexDirection: "row",
    margin: 10,
    justifyContent: "center"
  },
  addImage: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center"
  },
  uploadIcon: {
    marginLeft: 20,
    marginRight: 20,
    marginBottom: 5,
    marginTop: 5
  },

  //Favorite Page Style

  scrollview: {
    flexGrow: 1
  },
  card: {
    backgroundColor: "rgba(255,255,255,.4)",
    // shadowColor: "#000",

    height: "100%",
    width: "100%",
    //  backgroundColor:'gray',
    position: "relative",
    // bottom: -40,
    // marginTop:13
    borderWidth: 2
  },
  phoneCard: {
    backgroundColor: "rgba(255,255,255,.9)",
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
    padding: 4,
    borderWidth: 1,
    width: 100,
    borderRadius: 50,
    flexDirection: "row"
  },
  textCard: {
    fontSize: 14,
    fontWeight: "bold"
  },

  textCard2: {
    fontSize: 14,
    fontWeight: "bold",
    marginTop: "3%"
  },

  // search page

  buttonContainerS: {
    marginTop: 5,
    flexDirection: "row",
    backgroundColor: "rgba(0,0,200,.3)",
    width: 70,
    height: 40,
    alignItems: "center",
    justifyContent: "center",
    borderColor: "black",
    borderWidth: 1
  },
  radioRentBuy: {
    flexDirection: "row",
    marginTop: 10,
    justifyContent: "center"
  },
  containerMap: {
    flex: 4,
    flexDirection: "column",
    alignItems: "center",
    width: "100%",
    height: "100%"
  },
  cardInfo: {
    height: 100,
    width: "100%",
    marginBottom: 10,
    borderWidth: 1,
    position: "absolute",
    bottom: 0
  },
  cardInfo2: {
    height: "100%",
    width: "100%",
    marginBottom: 10,
    position: "absolute",
    bottom: 0
  }
});

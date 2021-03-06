import { StyleSheet } from "react-native";

export default StyleSheet.create({
  //All Screen
  imageBackground: {
    width: "100%",
    height: "100%"
  },
  container: {
    flex: 1,
    flexDirection: "column",
    width: "100%",
    height: "100%",
    alignItems: "center"
  },
  main: {
    flex: 1,
    alignItems: "center",
    width: "100%",
    height: "100%"
  },
  topBar: {
    backgroundColor: "#6495ed",
    borderColor: "white",
    borderBottomWidth: 0.5,
    width: "100%",
    height: "12%",
    flexDirection: "row",
    justifyContent: "space-between"
  },
  textTopBar:{
    marginTop: 35,
    justifyContent: "center"
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
      justifyContent: "center"
    },
    open: {
      color: "white",
      fontSize: 16,
      fontWeight: "bold",
      
    },
  
    logo: {
      width: 60,
      height: 60,
      marginTop: 35
    },
    firstPageContainer: {
      flex: 1,
      flexDirection: "column",
      width: "100%",
      height: "100%",
      alignItems: "center"
    },
    bigText:{
      color: "rgba(255,255,255,.9)",
      fontWeight: "bold",
      fontSize: 25,
      fontFamily: "serif",
      textShadowColor: "black",
      textShadowOffset: { width: 1, height: 4 },
      textShadowRadius: 5
    },
    scrollview: {
      flex: 1,
      flexGrow: 1,
      height: "100%",
      width: "100%"
    },
    // publishInput: {
    //   flexDirection: "row",
    //   marginTop: 20,
    //   width: "70%",
    //   borderBottomWidth: 0.5,
    //   borderColor: "black"
    // },
  
    //Cotnribution and Favorite and profilePost
     contributionView:{
      backgroundColor: "white",
      width: "95%",
      height: 210,
      margin: 10,
      borderWidth: 1,
      borderColor: "#e6e6fa",
      elevation: 10
     },
     heartIconStyle:{
      position: "absolute",
      zIndex: 1,
      margin: 5,
      left: 2
     },
     imageStyle:{
      width: "100%",
      height: "100%",
      borderTopLeftRadius: 100,
      borderBottomRightRadius: 100
     },
     viewImageStyle:{
      height: "70%"
     },
     viewDetails:{
      justifyContent: "space-around",
      flexDirection: "row-reverse",
      height: "30%",
      marginTop: 15
     },
     viewTitle:{
      flexDirection: "column",
      alignItems: "center"
     },
     txtTitle:{
      fontSize: 10, 
      color: "gray"
     },
     txtDetails:{
      color: "#6495ed",
      fontSize: 16
     },
     viewItems:{
      flex: 1, 
      alignItems: "center"
     },
     viewNoItems:{
      flex: 1,
       alignItems: "center",
      justifyContent: "center"
    },

  //Login Page Style

  LoginRegisterSelected: {
    margin: 20,
    color: "rgb(196, 58, 37)",
    fontWeight: "bold",
    fontSize: 26,
    fontFamily: "serif",
    textShadowColor: "rgb(0, 0, 0)",
    textShadowOffset: { width: 1, height: 2 },
    textShadowRadius: 1
  },
  LoginRegisterNotSelected: {
    margin: 20,
    color: "rgba(255,255,255,.9)",
    fontWeight: "bold",
    fontSize: 25,
    fontFamily: "serif",
    textShadowColor: "gray",
    textShadowOffset: { width: 1, height: 4 },
    textShadowRadius: 5
  },
  form: {
    alignItems: "center",
    textAlign: "center",
    width: "90%",
    height: "85%",
    margin: 75
  },
 
  input: {
    flexDirection: "row",
    width: 200,
    height: 40,
    alignItems: "center",
    borderColor: "white",
    borderBottomWidth: 1,
    marginTop: 5
  },
  loginButton: {
    flexDirection: "row",
    elevation: 10,
    backgroundColor: "rgba(67, 204, 29,.9)",
    borderRadius: 20,
    height: 35,
    width: 150,
    alignItems: "center",
    justifyContent: "center",
    borderColor: "white",
    borderWidth: 1,
    marginTop: 50
  },
  textMessage: {
    margin: 10,
    color: "red",
    textAlign: "center"
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
  registerButton: {
    flexDirection: "row",
    elevation: 10,
    backgroundColor: "rgba(208, 222, 9,.9)",
    borderRadius: 20,
    height: 35,
    width: 150,
    alignItems: "center",
    justifyContent: "center",
    borderColor: "white",
    borderWidth: 1,
    marginTop: 10
  },
  //Publish Screen
  // autocompletesContainer: {
  //   paddingTop: 0,
  //   zIndex: 1,
  //   width: "100%",
  //   paddingHorizontal: 8
  // },
  // inputa: { maxHeight: 40 },
  // inputContainer: {
  //   display: "flex",
  //   flexShrink: 0,
  //   flexGrow: 0,
  //   flexDirection: "row",
  //   flexWrap: "wrap",
  //   alignItems: "center",
  //   borderBottomWidth: 1,
  //   borderColor: "#c7c6c1",
  //   paddingVertical: 13,
  //   paddingLeft: 12,
  //   paddingRight: "5%",
  //   width: "100%",
  //   justifyContent: "flex-start"
  // },
  // plus: {
  //   position: "absolute",
  //   left: 15,
  //   top: 10
  // },

  // titleView:{
  //   marginTop: 10, 
  //   padding: 5
  // },
  // textInputStyle:{
  //   marginLeft: "8%", 
  //   fontSize: 14
  // },
  // aboutView:{
  //   color: "rgba(255,255,255,.9)",
  //   fontWeight: "bold",
  //   fontSize: 25,
  //   fontFamily: "serif",
  //   textShadowColor: "black",
  //   textShadowOffset: { width: 1, height: 4 },
  //   textShadowRadius: 5,
  //   borderWidth:2
  // },
  // uploadImageView:{
  //   marginTop: 30,
  //    padding: 5, 
  //    borderRadius: 40 
  // },
  // uploadImage:{
  //   height: 120,
  //   width: 100,
  //   borderRadius: 10
  // },
  // uploadImageTouch:{
  //   margin: 5,
  //   elevation: 5,
  //   borderRadius: 10,
  //   backgroundColor: "white"
  // },
  //contribution screen
  // view: {
  //   flex: 1,
  //   alignItems: "center",
  //   padding: "2%"
  // },
  // line: {
  //   width: "100%",
  //   alignSelf: "center",
  //   height: 1,
  //   backgroundColor: "black"
  //   // margin: 10
  // },
  // searchButton: {
  //   backgroundColor: "rgba(0,0,255,.7)",
  //   flexDirection: "row",
  //   height: 35,
  //   width: 80,
  //   alignItems: "center",
  //   justifyContent: "center",
  //   borderColor: "white",
  //   borderWidth: 2,
  //   marginTop: 10
  // },





  //Home Page Style

  // iconsContainer: {
  //   flexDirection: "row",
  //   flexWrap: "wrap",
  //   alignItems: "center",
  //   justifyContent: "center",
  //   marginTop: 25
  // },
  // icon: {
  //   width: 70,
  //   height: 70
  // },
  // buttonContainer: {
  //   alignItems: "center",
  //   justifyContent: "center",
  //   margin: "9%",
  //   marginTop: 25
  // },
  // textIcon: {
  //   fontWeight: "bold"
  // },

  //Publish Page Style
  // publishButton: {
  //   backgroundColor: "#6495ed",
  //   flexDirection: "row",
  //   height: 45,
  //   marginTop: 30,
  //   width: 180,
  //   borderRadius: 20,
  //   alignItems: "center",
  //   justifyContent: "center",
  //   borderColor: "white",
  //   borderWidth: 1
  // },
  // radioPublish: {
  //   flexDirection: "row",
  //   margin: 10,
  //   justifyContent: "center"
  // },
  // addImage: {
  //   flexDirection: "row",
  //   alignItems: "center",
  //   justifyContent: "center"
  // },
  // uploadIcon: {
  //   marginLeft: 20,
  //   marginRight: 20,
  //   marginBottom: 5,
  //   marginTop: 5
  // },

  //Favorite Page Style


  // card: {
  //   backgroundColor: "rgba(255,255,255,.4)",
  //   // shadowColor: "#000",

  //   height: "100%",
  //   width: "100%",
  //   //  backgroundColor:'gray',
  //   position: "relative",
  //   // bottom: -40,
  //   // marginTop:13
  //   borderWidth: 2
  // },
  // phoneCard: {
  //   backgroundColor: "rgba(255,255,255,.9)",
  //   justifyContent: "center",
  //   alignItems: "center",
  //   textAlign: "center",
  //   padding: 4,
  //   borderWidth: 1,
  //   width: 100,
  //   borderRadius: 50,
  //   flexDirection: "row"
  // },
  // textCard: {
  //   fontSize: 14,
  //   fontWeight: "bold"
  // },

  // textCard2: {
  //   fontSize: 14,
  //   fontWeight: "bold",
  //   marginTop: "3%"
  // },

  // search page

  // buttonContainerS: {
  //   marginTop: 5,
  //   flexDirection: "row",
  //   backgroundColor: "rgba(0,0,200,.3)",
  //   width: 70,
  //   height: 40,
  //   alignItems: "center",
  //   justifyContent: "center",
  //   borderColor: "black",
  //   borderWidth: 1
  // },
  // radioRentBuy: {
  //   flexDirection: "row",
  //   marginTop: 10,
  //   justifyContent: "center"
  // },
  // containerMap: {
  //   flex: 4,
  //   flexDirection: "column",
  //   alignItems: "center",
  //   width: "100%",
  //   height: "100%"
  // },
  // cardInfo: {
  //   height: 100,
  //   width: "100%",
  //   marginBottom: 10,
  //   borderWidth: 1,
  //   position: "absolute",
  //   bottom: 0
  // },
  // cardInfo2: {
  //   height: "100%",
  //   width: "100%",
  //   marginBottom: 10,
  //   position: "absolute",
  //   bottom: 0
  // },
  
  // inputUpdate: {
  //   flexDirection: "row",
  //   width: 200,
  //   height: 40,
  //   alignItems: "center",
  //   borderColor: "black",
  //   borderBottomWidth: 1,
  //   marginTop: 5
  // }
});

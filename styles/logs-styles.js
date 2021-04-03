import { StyleSheet } from "react-native";

export default styles = StyleSheet.create({
  header: {
    flex: 1,
    paddingLeft: 10,
    backgroundColor: "#EFF1F3"
  },
  image: {
    marginTop: 25,
    height: 100,
    width: 100,
  },
  title: {
    fontSize: 60,
    fontFamily: "Philosopher",
    color: "#223843",
    marginLeft: 100,
    marginTop: -85
  },
  body: {
    flex: 1,
    backgroundColor: "#D8B4A0",
    marginTop: 15,
    marginRight: 0,
    marginLeft: -10,
  },
  listTitle: {
    fontSize: 30,
    fontFamily: "Philosopher",
    color: "#223843",
  },
  listContainer: {
    marginTop: 10,
    marginLeft: 15,
    marginRight: 15,
    paddingBottom: 10,
    marginBottom: 120,
    backgroundColor: "#EFF1F3",
    borderRadius: 5,
    borderColor: "#223843",
    borderWidth: 2,
    alignItems: "center",
  },
  add: {
    backgroundColor: "#223843",
    marginBottom: -62,
    marginLeft: 300,
    paddingRight: 10,
    paddingLeft: 10,
    paddingTop: -10,
    height: 60,
    width: 60,
    alignItems: "center",
    borderTopLeftRadius: 5,
    borderBottomRightRadius: 5
  },
  plus: {
    color: "#EFF1F3",
    fontSize: 50,
    marginTop: -5
  },
  imageArrow: {
    height: 60,
    width: 60,
  },
  logImages: {
    height: 40,
    width: 40,
    margin: -2
  },
  idArea: {
    backgroundColor: "#D77A61",
    marginRight: 0,
    alignItems: "center",
    marginTop: -36.5,
    marginBottom: -3.2,
    paddingLeft: 6,
    paddingTop: 2.5,
    paddingRight: 6,
    paddingBottom: 3.5,
    marginLeft: 300
  },
  log: {
      borderColor: "#D77A61",
      borderWidth: 2,
      marginTop: 2,
      borderRadius: 5,
      marginLeft: 10,
      marginRight: 10,
      marginBottom: 2,
  },
  idText: {
    fontSize: 20,
    color: "#EFF1F3",
    fontFamily: "NotoSans"
  },
  nameText: {
    paddingLeft: 45,
    marginTop: -30,
    marginBottom: 4,
    fontFamily: "NotoSans",
    color: "#223843",
    fontSize: 20
  },
  back: {
    height: 60,
    width: 60,
    backgroundColor: "#223843",
    marginBottom: -10,
    marginRight: 0,
    marginRight: 299,
    borderTopRightRadius: 5,
    borderBottomLeftRadius: 2
  }
});

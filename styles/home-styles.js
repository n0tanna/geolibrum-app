import { StyleSheet } from "react-native";

export default styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    paddingTop: 50,
  },
  bottomHalf: {
    flex: 2,
    backgroundColor: "#D8B4A0",
    paddingLeft: 165,
    paddingRight: 165,
    marginTop: 300,
  },
  image: {
    marginTop: -230,
    height: 300,
    width: 300,
  },
  text: {
    fontSize: 50,
    marginTop: 0,
    fontFamily: "Philosopher",
    color: "#223843"
  },
  button: {
    backgroundColor: "#D77A61",
    paddingLeft: 70,
    paddingRight: 70,
    paddingTop: 10,
    paddingBottom: 10,
    marginBottom: 5,
    borderRadius: 5,
    alignItems: "center"
  },
  buttonText: {
    color: "#EFF1F3",
    fontSize: 20,
    fontFamily: "NotoSans"
  },
  box: {
    flex: 1,
    backgroundColor: "#EFF1F3",
    marginTop: 0,
    paddingTop: 20,
    paddingLeft: 15,
    paddingRight: 15,
    marginBottom: 100,
    alignItems: "center",
    borderRadius: 10,
  },
});

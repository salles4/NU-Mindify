import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  buttonOpacity: {
    width: "80%",
  },
  button: {
    backgroundColor: "#FDB813",
    padding: 12,
    borderRadius: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center'
  },
  buttonText: {
    // color:'white',
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
  },
  entryBackground: {
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    gap: 8,
    backgroundColor: "#2C519F",
    padding: 24,
    marginVertical: 24,
    borderRadius: 24,
    boxShadow: "0px 2px 12px #EDE09480",
    borderWidth: 2,
    borderColor: "#FDD116",
  },
  entryTitle: {
    color: "white",
    fontWeight: "900",
    fontSize: 24,
    textAlign: "center",
  },
  entryBody: {
    color: "white",
    textAlign: "center",
    fontSize: 16,
  },

  homeRoundedIcon:{
    borderRadius: 99,
    backgroundColor: "white",
    padding: 12,
    borderColor: "black",
    borderWidth: 4,
  }
});

export default styles;

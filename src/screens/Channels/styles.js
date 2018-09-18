const React = require("react-native");
const { Dimensions, Platform } = React;

const primary = require("../../theme/variables/commonColor").brandPrimary;
// const commonColor = require("../../theme/variables/commonColor");
const deviceHeight = Dimensions.get("window").height;
const deviceWidth = Dimensions.get("window").width;

export default {
  container: {
    flex: 1,
    width: null,
    height: null
  },
  bgHead: {
    backgroundColor: primary,
    flex: 1
  },
  imageHeader: {
    height: 25,
    width: 95,
    resizeMode: "contain"
  },
  channelBtn1: {
    borderWidth: 1,
    borderColor: Platform.OS === "android" ? "#ddd" : "rgba(255,255,255,0.5)"
  },
  na: {},
  channelImg: {
    height: deviceHeight / 8 + 10,
    width: deviceWidth / 3 + 2
  },
  ioschannelImgText: {
    fontSize: 12,
    fontWeight: "900",
    padding: 20,
    paddingLeft: 0,
    paddingBottom: 0,
    marginBottom: 0,
    marginLeft: 20,
    marginTop: deviceHeight / 6 + 10
  },
  achannelImgText: {
    fontSize: 12,
    fontWeight: "900",
    marginLeft: 20,
    marginTop: deviceHeight / 4 - 20
  },

    emailBtn: {
    height: 30,
    marginTop: 10,
    borderWidth: 1,
     backgroundColor: primary,
    borderColor: "#ddd"
  },

  // inputGrp: {
  //   flexDirection: "row",
  //   borderRadius: 25,
  //   backgroundColor: "rgba(255,255,255,0.2)",
  //   marginBottom: 10,
  //   borderWidth: 0,
  //   borderColor: "transparent"
  // },
  formErrorText1: {
    fontSize: Platform.OS === "android" ? 12 : 15,
    color: "rgba(255,255,255,0.2)",
    textAlign: "right",
    top: -10
  },
  formErrorText2: {
    fontSize: Platform.OS === "android" ? 12 : 15,
    color: "transparent",
    textAlign: "right",
    top: -10
  }
};

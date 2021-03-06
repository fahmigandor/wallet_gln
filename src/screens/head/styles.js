const React = require("react-native");
const { Platform, Dimensions } = React;

const deviceWidth = Dimensions.get("window").width;
const deviceHeight = Dimensions.get("window").height;
const primary = require("../../theme/variables/commonColor").brandPrimary;

export default {
  container: {
    flex: 1,
    width: null,
    height: null,
    backgroundColor: primary
  },
  Content: {
    backgroundColor: primary
  },
  profileInfoContainer: {
    backgroundColor: primary,
    paddingTop: 10
  },
  profileUser: {
    alignSelf: "center",
    fontSize: 22,
    fontWeight: "bold",
    paddingBottom: 5
  },
  profileUserInfo: {
    alignSelf: "center",
    opacity: 0.8,
    fontWeight: "bold",
    color: "#FFF"
  },
  profilePic: {
    width: 80,
    height: 80,
    borderRadius: 40
  },
  profileInfo: {
    alignSelf: "center",
    paddingTop: 5,
    paddingBottom: 10
  },
  linkTabs: {
    backgroundColor: "#fff"
  },
  linkTabs_header: {
    padding: 15,
    alignSelf: "center"
  },
  linkTabs_tabCounts: {
    fontSize: 22,
    fontWeight: "bold",
    color: primary,
    alignSelf: "center",
    paddingBottom: Platform.OS === "android" ? 3 : 0
  },
  linkTabs_tabName: {
    color: "#444",
    fontWeight: "bold",
    fontSize: deviceWidth < 330 ? 13 : 15
  },
  newsImage: {
    width: 40,
    height: 40,
    marginLeft: 10
  },
  newsContent: {
    flexDirection: "column",
    paddingTop: 10,
    paddingLeft: 20,
    paddingRight: 20,
    flex: 1,
    borderTopWidth: 1,
    borderTopColor: "#ddd"
  },
  newsHeader: {
    color: "#ffbf00",
    fontWeight: "bold"
  },

  newsCoin: {
    color: "#FFF",
    marginTop:5,
    marginBottom:5,
    alignSelf: "flex-end"  },

  newsLink: {
    color: "#666",
    fontSize: 12,
    alignSelf: "flex-start",
    fontWeight: "bold"
  },
  newsTypeView: {
    borderBottomWidth: 1,
    borderBottomColor: "#666",
    alignSelf: "flex-end"
  },
  newsTypeText: {
    color: "#666",
    fontSize: 12,
    fontWeight: "bold",
    paddingBottom: 5
  },
  textNote: {
    color: "#777",
    fontSize: 12
  },
  textNoteHeader: {
    color: "#ffbf00",
     alignSelf: "center",
    fontSize: 12
  },
  swipeBtn: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  },
  channelImg: {
    height: deviceHeight / 8 + 10,
    width: deviceWidth / 3 + 2
  }
};

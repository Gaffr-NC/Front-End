import React, { Component } from "react";
import { getUserById } from "../utils";
import { Match, User } from "../utils/interfaces";
import { View, Text, TouchableOpacity } from "react-native";
import { NavigationScreenProp, withNavigation } from "react-navigation";

interface States {
  user: User | null;
}
interface Props {
  userType: string;
  match: Match;
  navigation?: NavigationScreenProp<any, any>;
}

class MatchItem extends Component<any, States> {
  state = {
    user: null
  };

  async componentDidMount() {
    const { userType, match } = this.props;
    const user =
      userType === "landlords"
        ? await getUserById(match.tenantId, "tenants")
        : await getUserById(match.landlordId, "landlords");
    if (user) this.setState({ user });
  }
  render() {
    const { user } = this.state;
    const { navigation, match, userType } = this.props;
    if (user) {
      const matchedUser: User = user;
      return (
        <View>
          {user ? (
            <TouchableOpacity
              style={{ height: 80 }}
              onPress={() =>
                navigation.navigate("Chat", {
                  match: JSON.stringify(match),
                  userType,
                  name: matchedUser.name
                })
              }
            >
              {/* navigate to relevant match chat / profile?  */}
              <Text>{matchedUser.name}</Text>
            </TouchableOpacity>
          ) : null}
        </View>
      );
    }
    return <Text>Loading user...</Text>;
  }
}

export default withNavigation(MatchItem)

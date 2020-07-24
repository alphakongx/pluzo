import React, { Component } from "react";
import {
  View,
  TextInput as RNTextInput,
  FlatList,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import { Image, BackButton, Text, Touchable, BorderButton } from "@components";
import LinearGradient from "react-native-linear-gradient";
import { GRADIENT, COLOR } from "@config";
import styles from "./search.style";
import SearchPeopleItem from "./search-people-item";
import SearchChatItem from "./search-chat-item";
import { SafeAreaView } from "react-navigation";

const FilterTypes = [
  { id: 1, name: "ALL" },
  { id: 2, name: "Friends" },
  { id: 3, name: "Chat" },
  { id: 4, name: "People" },
  { id: 5, name: "Live" },
];

class SearchScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentFilter: 1,
      searchKeyword: "",
      addingUsers: [],
    };
    this.searchInput = React.createRef();
  }

  componentDidMount() {
    setTimeout(() => {
      this.searchInput.focus();
    }, 500);
  }

  componentWillUnmount() {
    this.props.initSearch();
  }

  onBack = () => {
    this.props.navigation.goBack();
  };

  onSearch = text => {
    clearTimeout(this.searchTimeout);
    this.props.initSearch();
    if (text !== "") {
      this.searchTimeout = setTimeout(() => {
        this.setState({ searchKeyword: text, addingUsers: [] });
        this.props.search(text, this.props.token);
      }, 1000);
    }
  };

  render() {
    const { currentFilter, addingUsers } = this.state;
    const { isSearching, friends, chat, people } = this.props;
    return (
      <LinearGradient
        colors={GRADIENT.SCREEN_BACKGROUND}
        start={{ x: 0, y: 0 }}
        end={{ x: 0, y: 1 }}
        style={styles.container}
      >
        <SafeAreaView style={styles.contentContainer}>
          <View style={styles.headerContainer}>
            <BackButton
              onPress={() => {
                this.onBack();
              }}
            />
            <View style={styles.searchContainer}>
              <View style={styles.iconContainer}>
                <Image source={require("@assets/images/search.png")} />
              </View>
              <RNTextInput
                ref={ref => {
                  this.searchInput = ref;
                }}
                style={styles.inputField}
                returnKeyType={"search"}
                autoFocus={true}
                autoCapitalize={"none"}
                clearButtonMode={"always"}
                onChangeText={text => this.onSearch(text)}
              />
            </View>
          </View>

          <View style={styles.filterContainer}>
            <FlatList
              horizontal
              data={FilterTypes}
              keyExtractor={(item, index) => `filter-type-${item.id}`}
              ItemSeparatorComponent={() => <View style={styles.separator} />}
              renderItem={({ item: item, index }) => {
                return (
                  <Touchable onPress={() => this.setState({ currentFilter: item.id })}>
                    <View
                      style={[
                        styles.filterButtonContainer,
                        item.id === currentFilter ? styles.activeButton : {},
                      ]}
                    >
                      <Text style={styles.filterText}>{item.name}</Text>
                    </View>
                  </Touchable>
                );
              }}
            />
          </View>

          {isSearching === true ? (
            <ActivityIndicator size={"large"} color={"white"} />
          ) : (
            <ScrollView>
              {(currentFilter === 1 || currentFilter === 2) && friends.length > 0 && (
                <View style={styles.sectionContainer}>
                  <Text style={styles.sectionText}>Friends</Text>
                  {friends.map((item, index) => {
                    if (index > 1 && currentFilter === 1) {
                      return;
                    }
                    return (
                      <SearchPeopleItem friend item={item} key={`friend-${index}`} />
                    );
                  })}
                  {friends.length > 2 && currentFilter === 1 && (
                    <View style={styles.showAllContainer}>
                      <BorderButton
                        text={"Show all results"}
                        color={COLOR.TEXT_SECONDARY_4}
                        textStyle={styles.showAllText}
                        onPress={() => this.setState({ currentFilter: 2 })}
                      />
                    </View>
                  )}
                </View>
              )}
              {(currentFilter === 1 || currentFilter === 3) && chat.length > 0 && (
                <View style={styles.sectionContainer}>
                  <Text style={styles.sectionText}>Chat</Text>
                  {chat.map((item, index) => {
                    if (index > 1 && currentFilter === 1) {
                      return;
                    }
                    return (
                      <SearchChatItem
                        item={item}
                        key={`chat-${index}`}
                        searchKeyword={this.state.searchKeyword}
                      />
                    );
                  })}
                  {chat.length > 2 && currentFilter === 1 && (
                    <View style={styles.showAllContainer}>
                      <BorderButton
                        text={"Show all results"}
                        color={COLOR.TEXT_SECONDARY_4}
                        textStyle={styles.showAllText}
                        onPress={() => this.setState({ currentFilter: 3 })}
                      />
                    </View>
                  )}
                </View>
              )}
              {(currentFilter === 1 || currentFilter === 4) && people.length > 0 && (
                <View style={styles.sectionContainer}>
                  <Text style={styles.sectionText}>People</Text>
                  {people.map((item, index) => {
                    if (index > 1 && currentFilter === 1) {
                      return;
                    }
                    return <SearchPeopleItem item={item} key={`people-${index}`} />;
                  })}
                  {people.length > 2 && currentFilter === 1 && (
                    <View style={styles.showAllContainer}>
                      <BorderButton
                        text={"Show all results"}
                        color={COLOR.TEXT_SECONDARY_4}
                        textStyle={styles.showAllText}
                        onPress={() => this.setState({ currentFilter: 4 })}
                      />
                    </View>
                  )}
                </View>
              )}
            </ScrollView>
          )}
        </SafeAreaView>
      </LinearGradient>
    );
  }
}

export default SearchScreen;

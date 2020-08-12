import React, { useState } from "react";
import { View } from "react-native";
import LeftElement from "./left-element";
import RightElement from "./right-element";
import { Notification } from "@helpers";

import styles from "./header.style";

const Header: () => React$Node = props => {
  const [isSearchActive, setSearchActive] = useState(false);

  const onSearchPress = () => {
    setSearchActive(!isSearchActive);
  }

  const onFilterPress = () => {
    Notification.alert("coming soon");
  }

  return (
    <View style={styles.header}>
      <LeftElement 
        isSearchActive={isSearchActive} />
      <RightElement
        isSearchActive={isSearchActive}
        onSearchPress={onSearchPress}
        onFilterPress={onFilterPress} />
    </View>
  );
};

export default Header;

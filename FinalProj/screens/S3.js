
import React, {Component} from "react";
import {StyleSheet, View, SafeAreaView,Text,TextInput} from "react-native";
import {Ionicons} from "@expo/vector-icons";
import shortid from "shortid";
import {Autocomplete, withKeyboardAwareScrollView} from "react-native-dropdown-autocomplete";




 import cities from '../city_list'
import Slider from '../Components/Slider'
class S3 extends Component {
  handleSelectItem(item, index) {
    const {onDropdownClose} = this.props;
    onDropdownClose();
    console.log(item,);
  }
 
  render() {
    const autocompletes = [...Array(1).keys()];

    const data = cities;
 
    // const apiUrl = "https://5b927fd14c818e001456e967.mockapi.io/branches";
 
    const {scrollToInput, onDropdownClose, onDropdownShow} = this.props;
 
    return (
      <View style={styles.autocompletesContainer}>
        <SafeAreaView>
          {autocompletes.map(() => (
            <Autocomplete
              key={shortid.generate()}
              data={data}
              style={styles.input}
              scrollToInput={ev => scrollToInput(ev)}
              handleSelectItem={(item, id) => this.handleSelectItem(item, id)}
              onDropdownClose={() => onDropdownClose()}
              onDropdownShow={() => onDropdownShow()}
              placeholder="חפש"
              renderIcon={() => (
                <Ionicons name="md-search" size={20} color="#c7c6c1" style={styles.plus} />
              )}
              // fetchDataUrl={apiUrl}
              
              minimumCharactersCount={0}
              highlightText
              valueExtractor={item => item.name}
              rightContent
              rightTextExtractor={item => item.id}
            />
          ))}
        </SafeAreaView>
        <Text>hi</Text>
        <View style={{flex:1}}>
            <Slider/>
          </View>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  autocompletesContainer: {
    paddingTop: 30,
    zIndex: 1,
    width: "100%",
    paddingHorizontal: 8,
  },
  input: {maxHeight: 40},
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
    justifyContent: "flex-start",
  },
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
  },
  plus: {
    position: "absolute",
    left: 15,
    top: 10,
  },
});
 
export default withKeyboardAwareScrollView(S3);
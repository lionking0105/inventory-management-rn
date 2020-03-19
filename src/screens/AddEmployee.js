import React, {Component} from 'react';
import {
  Button,
  Body,
  Input,
  Container,
  Content,
  Header,
  Item,
  Label,
} from 'native-base';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  TouchableOpacity,
  KeyboardAvoidingView,
  Dimensions,
  Picker,
  Alert,
} from 'react-native';
import Axios from 'axios';
import AsyncStorage from '@react-native-community/async-storage';

export default class AddEmployee extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fname: '',
      email: '',
      lname: '',
      password: '',
      confpass: '',
      gender: 'M',
      age: '',
      inval_email: false,
      inval_pass: false,
      inval_confpass: false,
    };
  }
  async keyy() {
    console.log(await AsyncStorage.getItem('auth_key'));
    return await AsyncStorage.getItem('auth_key');
  }

  sendUser = () => {
    console.log(this.keyy());

    Axios.post('http://chouhanaryan.pythonanywhere.com/auth/users/', {
      headers: {
        Authorization: `Token ${this.keyy()}`,
      },
      data: {
        email: this.state.email,
        password: this.state.password,
        first_name: this.state.fname,
        last_name: this.state.lname,
        is_staff: true,
        age: this.state.age,
        gender: this.state.gender,
      },
    })
      .then(response => {
        console.log(response);
      })
      .catch(error => {
        console.log(error);
      });
  };
  render() {
    return (
      <Container style={{backgroundColor: '#F3F9FB'}}>
        <Content>
          <ScrollView>
            <Body>
              <Text style={styles.heading}>Account</Text>

              <Item floatingLabel style={styles.inputBox}>
                <Label style={styles.label}>First Name</Label>
                <Input
                  style={styles.inputArea}
                  onChangeText={value => {
                    this.setState({fname: value});
                  }}
                />
              </Item>
              <Item floatingLabel style={styles.inputBox}>
                <Label style={styles.label}>Last Name</Label>
                <Input
                  style={styles.inputArea}
                  onChangeText={value => {
                    this.setState({lname: value});
                  }}
                />
              </Item>

              <Item floatingLabel style={styles.inputBox}>
                <Label style={styles.label}>Email ID</Label>
                <Input
                  style={styles.inputArea}
                  keyboardType="email-address"
                  autoCapitalize="none"
                  onChangeText={value => {
                    var mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
                    this.setState({email: value});
                    if (value.match(mailformat)) {
                      this.setState({inval_email: false});
                    } else {
                      this.setState({inval_email: true});
                    }
                  }}
                />
              </Item>
              {this.state.inval_email && this.state.email !== '' && (
                <Text
                  style={{
                    color: 'red',
                    alignSelf: 'flex-start',
                    marginLeft: 40,
                  }}>
                  Invalid Email
                </Text>
              )}

              <Item floatingLabel style={styles.inputBox}>
                <Label style={styles.label}>Password</Label>
                <Input
                  style={styles.inputArea}
                  secureTextEntry
                  onChangeText={value => {
                    this.setState({password: value});
                    var passw = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/;
                    if (value.match(passw)) {
                      this.setState({inval_pass: false});
                    } else {
                      this.setState({inval_pass: true});
                    }
                  }}
                />
              </Item>
              {this.state.inval_pass && this.state.password !== '' && (
                <Text
                  style={{
                    color: 'red',
                    alignSelf: 'flex-start',
                    marginLeft: 40,
                  }}>
                  Password should contain only characters, numeric digits,
                  underscore starting with a letter and length from 6-15
                </Text>
              )}

              <Item floatingLabel style={styles.inputBox}>
                <Label style={styles.label}>Confirm Password</Label>
                <Input
                  style={styles.inputArea}
                  secureTextEntry
                  onChangeText={value => {
                    this.setState({confpass: value});
                  }}
                />
              </Item>
              {this.state.inval_confpass && (
                <Text
                  style={{
                    color: 'red',
                    alignSelf: 'flex-start',
                    marginLeft: 40,
                  }}>
                  Password not matching!
                </Text>
              )}

              <Item floatingLabel style={styles.inputBox}>
                <Label style={styles.label}>Age</Label>
                <Input
                  style={styles.inputArea}
                  onChangeText={value => {
                    this.setState({age: value});
                  }}
                />
              </Item>

              <Item style={styles.inputBox}>
                <Label style={{marginLeft: 28}}>Gender</Label>
                <Picker
                  style={{width: 247, height: 25, marginLeft: 25}}
                  selectedValue={this.state.gender}
                  onValueChange={value => {
                    this.setState({gender: value});
                  }}>
                  <Picker.Item label="Male" value="M" />
                  <Picker.Item label="Female" value="F" />
                  <Picker.Item label="Others" value="others" />
                </Picker>
              </Item>

              {/* <Text style={{color: 'red'}}>HEY</Text> */}

              <TouchableOpacity
                rounded
                style={styles.regButton}
                onPress={() => {
                  if (
                    this.state.email !== '' &&
                    this.state.password !== '' &&
                    this.state.age !== '' &&
                    this.state.lname !== ''
                  ) {
                    if (
                      this.state.fname !== '' &&
                      this.state.password === this.state.confpass
                    ) {
                      this.sendUser();
                      this.props.navigation.navigate('EmployeeList');
                    } else {
                      this.setState({inval_confpass: true});
                    }
                  } else {
                    Alert.alert('Alert', 'Please enter all the fields');
                  }
                }}>
                <Text style={styles.buttonText}>Register</Text>
              </TouchableOpacity>
            </Body>
          </ScrollView>
        </Content>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  regButton: {
    width: 280,
    height: 40,
    backgroundColor: '#4796BD',
    borderRadius: 20,
    justifyContent: 'center',
    marginTop: 25,
  },
  buttonText: {
    color: '#fff',
    fontSize: 20,
    alignSelf: 'center',
    alignContent: 'flex-start',
    textAlign: 'center',
  },
  heading: {
    fontSize: 30,
    color: '#122E40',
    fontWeight: 'bold',
    marginTop: 25,
    marginBottom: 10,
    alignSelf: 'flex-start',
    marginLeft: 27,
  },
  subHeading: {
    fontSize: 22,
    color: '#122E40',
    alignSelf: 'flex-start',
    marginTop: 10,
    marginLeft: 20,
  },
  inputBox: {
    backgroundColor: '#E0E0E0',
    borderRadius: 10,
    marginRight: 28,
    marginLeft: 28,
    textAlign: 'left',
    marginVertical: 10,
    height: 55,
  },

  label: {
    paddingLeft: 30,
    color: '#828282',
    fontSize: 15,
  },
  inputArea: {
    paddingLeft: 20,
  },
});

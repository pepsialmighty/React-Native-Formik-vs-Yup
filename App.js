import React from "react";
import {
  StyleSheet,
  SafeAreaView,
  ActivityIndicator,
  TextInput,
  Button,
  Text,
  View,
  Switch,
} from "react-native";
import { Formik } from "formik";
import * as yup from "yup";

//khung của khung
const FieldWrapper = ({ label, formikProps, formikKey, children }) => (
  <View style={{ marginHorizontal: 20, marginVertical: 5 }}>
    <Text style={{ marginBottom: 3 }}>{label}</Text>
    {children}
    <Text style={styles.errorHandler}>
      {formikProps.touched[formikKey] && formikProps.errors[formikKey]}
    </Text>
  </View>
);

//kiểu như tạo một interface(bộ xương)
//để có thể xài lại mà ko cần phải khai báo nhiều lần
const StyleInput = ({ label, formikProps, formikKey, ...rest }) => {
  const inputStyle = {
    borderColor: "black",
    borderWidth: 1,
    padding: 10,
    marginBottom: 3,
  };

  if (formikProps.touched[formikKey] && formikProps.errors[formikKey]) {
    inputStyle.borderColor = "red";
    inputStyle.borderWidth = 2;
  }

  return (
    <FieldWrapper label={label} formikProps={formikProps} formikKey={formikKey}>
      <TextInput
        style={inputStyle}
        onChangeText={formikProps.handleChange(formikKey)}
        onBlur={formikProps.handleBlur(formikKey)}
        {...rest}
      />
    </FieldWrapper>
  );
};

//khung chính của Switch
const StyleSwitch = ({ label, formikProps, formikKey, ...rest }) => {
  return (
    <FieldWrapper label={label} formikProps={formikProps} formikKey={formikKey}>
      <Switch
        value={formikProps.values[formikKey]}
        // setFieldValue(thingWeWantToChange, theValueOfThatThing)
        onValueChange={(value) => {
          formikProps.setFieldValue(formikKey, value);
        }}
        {...rest}
      />
    </FieldWrapper>
  );
};

//validation requirements
const validationSchema = yup.object().shape({
  email: yup.string().label("Email").email().required(),
  password: yup
    .string()
    .label("Password")
    .required()
    .min(2, "At least 2 characters")
    .max(15, "At most 15 characters"),
  agreeToTerm: yup
    .boolean()
    .label("Term")
    .test(
      "is-true",
      "Must agree to Term to continue",
      (value) => value === true
    ),
});

export default function App() {
  return (
    <SafeAreaView style={styles.container}>
      <Formik
        initialValues={{ email: "", password: "", agreeToTerm: false }}
        onSubmit={(values, actions) => {
          alert(JSON.stringify(values));
          setTimeout(() => actions.setSubmitting(false), 1000);
        }}
        validationSchema={validationSchema}
      >
        {(formikProps) => (
          <React.Fragment>
            {/* Ô nhập email dùng khung có sẵn */}
            <StyleInput
              label='Email'
              formikProps={formikProps}
              formikKey='email'
              placeholder='example@gmail.com'
              autoFocus
              keyboardType='email-address'
            />

            {/* Ô nhập password dùng khung có sẵn */}
            <StyleInput
              lable='Password'
              formikProps={formikProps}
              formikKey='password'
              placeholder='password'
              secureTextEntry
            />

            {/* Ô Switch */}
            <StyleSwitch
              label='Agree to Term'
              formikProps={formikProps}
              formikKey='agreeToTerm'
            />

            {formikProps.isSubmitting ? (
              <ActivityIndicator />
            ) : (
              <Button title='Submit' onPress={formikProps.handleSubmit} />
            )}
          </React.Fragment>
        )}
      </Formik>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 90,
  },
  input: {
    borderColor: "black",
    borderWidth: 1,
    padding: 10,
    marginBottom: 3,
  },
  errorHandler: { color: "red" },
});

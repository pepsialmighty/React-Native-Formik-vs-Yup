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

  //khung chính của input
  return (
    <View style={{ marginHorizontal: 20, marginVertical: 5 }}>
      <Text style={{ marginBottom: 3 }}>{label}</Text>
      <View style={inputStyle}>
        <TextInput
          onChangeText={formikProps.handleChange(formikKey)}
          onBlur={formikProps.handleBlur(formikKey)}
          {...rest}
        />
      </View>
      <Text style={styles.errorHandler}>
        {/* use [formikKey] instead of .formikKey becasue we not accessing
      it directly but we want to looking for the formikKey on the 
      "touched" object or the "errors" object */}
        {formikProps.touched[formikKey] && formikProps.errors[formikKey]}
      </Text>
    </View>
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
});

export default function App() {
  return (
    <SafeAreaView style={styles.container}>
      <Formik
        initialValues={{ email: "", password: "" }}
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
            />

            {/* Ô nhập password dùng khung có sẵn */}
            <StyleInput
              lable='Password'
              formikProps={formikProps}
              formikKey='password'
              placeholder='password'
              secureTextEntry
            />

            {/* Khung nhập email original */}
            {/* <View style={{ marginHorizontal: 20, marginVertical: 5 }}>
              <Text style={{ marginBottom: 3 }}>Email</Text>
              <View style={styles.input}>
                <TextInput
                  placeholder='example@gmail.com'
                  onChangeText={formikProps.handleChange("email")}
                  onBlur={formikProps.handleBlur("email")}
                  autoFocus
                />
              </View>
              <Text style={styles.errorHandler}>
                {formikProps.touched.email && formikProps.errors.email}
              </Text>
            </View> */}

            {/* Khung nhập password original */}
            {/* <View style={{ marginHorizontal: 20, marginVertical: 5 }}>
              <Text style={{ marginBottom: 3 }}>Password</Text>
              <View style={styles.input}>
                <TextInput
                  placeholder='password'
                  onChangeText={formikProps.handleChange("password")}
                  onBlur={formikProps.handleBlur("password")}
                  secureTextEntry
                />
              </View>
              <Text style={styles.errorHandler}>
                {formikProps.touched.password && formikProps.errors.password}
              </Text>
            </View> */}

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

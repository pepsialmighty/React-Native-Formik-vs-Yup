import React from "react";
import {
  StyleSheet,
  SafeAreaView,
  ActivityIndicator,
  TextInput,
  Button,
  Text,
  View,
} from "react-native";
import { Formik } from "formik";
import * as yup from "yup";

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
            <View style={{ marginHorizontal: 20, marginVertical: 5 }}>
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
            </View>

            <View style={{ marginHorizontal: 20, marginVertical: 5 }}>
              <Text style={{ marginBottom: 3 }}>Password</Text>
              <View style={styles.input}>
                <TextInput
                  placeholder='password'
                  onChangeText={formikProps.handleChange("password")}
                  onBlur={formikProps.handleBlur("password")}
                />
              </View>
              <Text style={styles.errorHandler}>
                {formikProps.touched.password && formikProps.errors.password}
              </Text>
            </View>

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

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
  name: yup
    .string()
    .required()
    .label("Name")
    .min(2, "At least 2 characters")
    .max(15, "At mosr 15 characters"),
});

export default function App() {
  return (
    <SafeAreaView style={styles.container}>
      <Formik
        initialValues={{ name: "" }}
        onSubmit={(values, actions) => {
          alert(JSON.stringify(values));
          setTimeout(() => actions.setSubmitting(false), 1000);
        }}
        validationSchema={validationSchema}
      >
        {(formikProps) => (
          <React.Fragment>
            <View style={styles.input}>
              <TextInput
                placeholder='Type here'
                onChangeText={formikProps.handleChange("name")}
              />
            </View>
            <Text style={styles.errorHandler}>{formikProps.errors.name}</Text>
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

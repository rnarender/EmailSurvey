// SueveyForm showsa form for a user to add input
import _ from "lodash";
import React, { Component } from "react";
import { reduxForm, Field } from "redux-form";
import { Link } from "react-router-dom";
import SurveyField from "./SurveyField";
import validateEmails from "../../Utils/validateEmails";
import formFields from "./formFields";

class SurveyForm extends Component {
  renerFields() {
    return _.map(formFields, ({ lable, name }) => {
      return (
        <Field
          key={name}
          component={SurveyField}
          type="text"
          lable={lable}
          name={name}
        />
      );
    });
  }

  render() {
    return (
      <div>
        <form onSubmit={this.props.handleSubmit(this.props.onSurveySubmit)}>
          {this.renerFields()}
          <Link to="/surveys" className="red btn-flat white-text">
            Cancel
          </Link>
          <button className="teal btn-flat right white-text" type="submit">
            Next
            <i className="material-icons right">done</i>
          </button>
        </form>
      </div>
    );
  }
}

function validate(values) {
  const error = {};

  error.recipients = validateEmails(values.recipients || "");

  _.each(formFields, ({ name }) => {
    if (!values[name]) {
      error[name] = "You must provide a value";
    }
  });

  return error;
}
export default reduxForm({
  validate,
  form: "surveyForm",
  destroyOnUnmount: false
})(SurveyForm);

import React from 'react';
import { connect } from 'react-redux';
import { useLocation } from 'react-router-dom';
import TITLES from '../../constants/addFieldsTitles';
import EXAMPLES from '../../constants/fieldExamples';
import './AddFields.css';

import AddFieldForm from '../general/AddFieldForm';
import Field from '../general/Field';

import { addCategory } from '../../store/actions/categories';
import { addLocation } from '../../store/actions/locations';
import { addSource } from '../../store/actions/sources';

const AddFields = props => {
  const { pathname } = useLocation();

  let field = {
    type: '',
    label: '',
    addField: () => {}
  };

  if (pathname.includes('categories'))
    field = { type: 'category', label: 'categories', addField: field => props.addCategory(field) };
  else if (pathname.includes('locations'))
    field = { type: 'location', label: 'locations', addField: field => props.addLocation(field) };
  else if (pathname.includes('sources'))
    field = { type: 'source', label: 'sources', addField: field => props.addSource(field) };

  const fieldsList = props[field.label].map(object => (
    <Field type={object.name} object={object} handleFieldClick={() => {}} key={`${object.name}-${object.id}`} />
  ));

  return (
    <section id="add-fields">
      <h2 className="sub-title">{TITLES[field.label.toUpperCase()]}</h2>
      <p className="field-examples">Examples: {EXAMPLES[field.label.toUpperCase()]}, etc.</p>

      <AddFieldForm
        type={field.type}
        handleAddField={(type, name, color) => field.addField({ name, color })}
        closeOverlay={() => {}}
      />

      <ul id="fields-list">{fieldsList}</ul>
    </section>
  );
};

const mapStateToProps = state => ({
  categories: state.categories,
  locations: state.locations,
  sources: state.sources
});

const mapDispatchToProps = {
  addCategory,
  addLocation,
  addSource
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AddFields);

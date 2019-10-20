import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { Route } from 'react-router-dom';
import './Fields.css';

import { addCategory } from '../../../store/actions/categories';
import { addLocation } from '../../../store/actions/locations';
import { addSource } from '../../../store/actions/sources';

import Toggle from './Toggle';
import FieldsRemoveGroup from './FieldsRemoveGroup';
import Overlay from '../../general/Overlay';
import AddFieldForm from '../../general/AddFieldForm';
import ConfirmDeleteModal from './ConfirmDeleteModal';

export class Fields extends Component {
  constructor(props) {
    super(props);

    this.state = {
      categories: [],
      locations: [],
      sources: [],
      fieldToAdd: null
    };
  }

  handleFieldClick = (type, object) => {
    const fields = document.getElementById(`${type}-${object.id}`);

    if (fields.classList.contains('selected')) {
      const currentStateArray = [...this.state[type]];
      const indexToRemove = currentStateArray.indexOf(object.id);

      currentStateArray.splice(indexToRemove, 1);

      this.setState({ [type]: currentStateArray });
    } else {
      this.setState({ [type]: [...this.state[type], object.id] });
    }

    fields.classList.toggle('selected');
  };

  handleAddFieldButton = fieldToAdd => {
    const { history } = this.props;

    this.setState(
      {
        fieldToAdd
      },
      () => {
        history.push('/settings/add-field');
      }
    );
  };

  handleAddField = (type, name, color) => {
    switch (type) {
      case 'category':
        this.props.addCategory({ name, color });
        break;
      case 'location':
        this.props.addLocation({ name, color });
        break;
      case 'source':
        this.props.addSource({ name, color });
        break;
      default:
        break;
    }
  };

  handleDelete = () => {
    const { categories, locations, sources } = this.state;
    const { history } = this.props;

    categories.forEach(id => this.props.deleteCategory(id));
    locations.forEach(id => this.props.deleteLocation(id));
    sources.forEach(id => this.props.deleteSource(id));

    this.setState(
      {
        categories: [],
        locations: [],
        sources: []
      },
      () => {
        history.goBack();
      }
    );
  };

  render() {
    const { fieldToAdd } = this.state;
    const { history, categories, locations, sources, showCategories, showLocations, showSources } = this.props;

    const buttonEnabled = this.state.categories.length || this.state.locations.length || this.state.sources.length;

    return (
      <section id="fields">
        <h2 className="sub-title">Remove or Disable Fields</h2>

        <div className={`field-header ${showCategories ? '' : 'disabled'}`}>
          <button type="button" className="add-field-button" onClick={() => this.handleAddFieldButton('category')}>
            +
          </button>
          <h2 className="field-title">Categories</h2>
          <Toggle handleChange={() => this.props.toggleField('showCategories')} toggled={showCategories} />
        </div>

        {categories.length > 0 && (
          <FieldsRemoveGroup
            objects={categories}
            type="categories"
            dim={!showCategories}
            handleFieldClick={(type, object) => this.handleFieldClick(type, object)}
          />
        )}

        <div className={`field-header ${showLocations ? '' : 'disabled'}`}>
          <button type="button" className="add-field-button" onClick={() => this.handleAddFieldButton('location')}>
            +
          </button>
          <h2 className="field-title">Locations</h2>
          <Toggle handleChange={() => this.props.toggleField('showLocations')} toggled={showLocations} />
        </div>

        {locations.length > 0 && (
          <FieldsRemoveGroup
            objects={locations}
            type="locations"
            dim={!showLocations}
            handleFieldClick={(type, object) => this.handleFieldClick(type, object)}
          />
        )}

        <div className={`field-header ${showSources ? '' : 'disabled'}`}>
          <button type="button" className="add-field-button" onClick={() => this.handleAddFieldButton('source')}>
            +
          </button>
          <h2 className="field-title">Sources</h2>
          <Toggle handleChange={() => this.props.toggleField('showSources')} toggled={showSources} />
        </div>

        {sources.length > 0 && (
          <FieldsRemoveGroup
            objects={sources}
            type="sources"
            dim={!showSources}
            handleFieldClick={(type, object) => this.handleFieldClick(type, object)}
          />
        )}

        <button
          onClick={() => history.push('/settings/confirm-delete')}
          id="delete-fields-btn"
          className={buttonEnabled ? '' : 'disabled'}>
          Delete Selected
        </button>

        <Route path="/settings/confirm-delete">
          <Overlay closeOverlay={history.goBack}>
            <ConfirmDeleteModal closeOverlay={history.goBack} handleDelete={() => this.handleDelete()} />
          </Overlay>
        </Route>

        <Route path="/settings/add-field">
          <Overlay closeOverlay={history.goBack}>
            <AddFieldForm
              type={fieldToAdd}
              handleAddField={(type, name, color) => this.handleAddField(type, name, color)}
              closeOverlay={history.goBack}
            />
          </Overlay>
        </Route>
      </section>
    );
  }
}

export default connect(
  null,
  {
    addCategory,
    addLocation,
    addSource
  }
)(withRouter(Fields));

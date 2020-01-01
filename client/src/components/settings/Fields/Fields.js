import React, { Component } from 'react';
import ICONS from '../../../constants/icons';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { Route } from 'react-router-dom';
import './Fields.css';

import { addCategory, editCategory } from '../../../store/actions/categories';
import { addLocation, editLocation } from '../../../store/actions/locations';
import { addSource, editSource } from '../../../store/actions/sources';

import Icon from '../../general/Icon';
import Toggle from '../Toggle';
import FieldsRemoveGroup from './FieldsRemoveGroup';
import Overlay from '../../general/Overlay';
import FieldForm from '../../general/FieldForm';
import ConfirmDeleteModal from './ConfirmDeleteModal';

export class Fields extends Component {
  constructor(props) {
    super(props);

    this.state = {
      fieldsToRemove: {
        categories: [],
        locations: [],
        sources: []
      },
      fieldToAdd: null,
      fieldToEdit: null,
      editMode: true
    };
  }

  handleFieldClick = (type, object) => {
    if (this.state.editMode) {
      this.handleEditField(type, object);
    } else {
      this.handleRemoveFields(type, object);
    }
  };

  handleRemoveFields = (type, object) => {
    const { fieldsToRemove } = this.state;

    const domFields = document.getElementById(`${type}-${object.id}`);

    if (domFields.classList.contains('selected')) {
      const currentStateArray = [...fieldsToRemove[type]];
      const indexToRemove = currentStateArray.indexOf(object.id);

      currentStateArray.splice(indexToRemove, 1);

      const updatedFields = { ...fieldsToRemove, [type]: currentStateArray };
      this.setState({ fieldsToRemove: updatedFields });
    } else {
      const updatedFields = { ...fieldsToRemove, [type]: [...fieldsToRemove[type], object.id] };
      this.setState({ fieldsToRemove: updatedFields });
    }

    domFields.classList.toggle('selected');
  };

  handleEditField = (type, object) => {
    const { history } = this.props;

    this.setState(
      {
        fieldToEdit: {
          type,
          object
        }
      },
      () => {
        history.push('/settings/edit-field');
      }
    );
  };

  editField = field => {
    switch (field.type) {
      case 'categories':
        this.props.editCategory(field);
        break;
      case 'locations':
        this.props.editLocation(field);
        break;
      case 'sources':
        this.props.editSource(field);
        break;
      default:
        break;
    }
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

  handleAddField = field => {
    switch (field.type) {
      case 'category':
        this.props.addCategory(field);
        break;
      case 'location':
        this.props.addLocation(field);
        break;
      case 'source':
        this.props.addSource(field);
        break;
      default:
        break;
    }
  };

  handleDelete = () => {
    const { categories, locations, sources } = this.state.fieldsToRemove;
    const { history } = this.props;

    categories.forEach(id => this.props.deleteCategory(id));
    locations.forEach(id => this.props.deleteLocation(id));
    sources.forEach(id => this.props.deleteSource(id));

    this.setState(
      {
        fieldsToRemove: {
          categories: [],
          locations: [],
          sources: []
        }
      },
      () => {
        history.goBack();
      }
    );
  };

  render() {
    const { fieldToAdd, fieldToEdit, fieldsToRemove, editMode } = this.state;
    const { history, categories, locations, sources, showCategories, showLocations, showSources } = this.props;

    const buttonEnabled =
      fieldsToRemove.categories.length || fieldsToRemove.locations.length || fieldsToRemove.sources.length;

    return (
      <section id="fields">
        <h2 className="sub-title">
          Fields
          {editMode ? (
            <button
              type="button"
              className="action-button edit-fields-button"
              title="Edit Mode"
              onClick={() => this.setState({ editMode: !editMode })}>
              <Icon size={16} fill="#fff" icon={ICONS.EDIT} className="icon" />
            </button>
          ) : (
            <button
              type="button"
              className="action-button remove-fields-button"
              title="Remove Mode"
              onClick={() => this.setState({ editMode: !editMode })}>
              <Icon size={16} fill="#fff" icon={ICONS.CROSS} className="icon" />
            </button>
          )}
        </h2>

        <div className={`field-header ${showCategories ? '' : 'disabled'}`}>
          <button
            type="button"
            className="action-button add-field-button"
            onClick={() => this.handleAddFieldButton('category')}>
            <Icon size={16} fill="#fff" icon={ICONS.PLUS} className="icon" />
          </button>

          <h2 className="field-title">Categories</h2>
          <Toggle handleChange={() => this.props.toggleField('showCategories')} toggled={showCategories} />
        </div>

        {categories.length > 0 && (
          <FieldsRemoveGroup
            editMode={editMode}
            objects={categories}
            type="categories"
            dim={!showCategories}
            handleFieldClick={this.handleFieldClick}
            handleEditFieldButton={this.handleEditFieldButton}
          />
        )}

        <div className={`field-header ${showLocations ? '' : 'disabled'}`}>
          <button
            type="button"
            className="action-button add-field-button"
            onClick={() => this.handleAddFieldButton('location')}>
            <Icon size={16} fill="#fff" icon={ICONS.PLUS} className="icon" />
          </button>

          <h2 className="field-title">Locations</h2>
          <Toggle handleChange={() => this.props.toggleField('showLocations')} toggled={showLocations} />
        </div>

        {locations.length > 0 && (
          <FieldsRemoveGroup
            editMode={editMode}
            objects={locations}
            type="locations"
            dim={!showLocations}
            handleFieldClick={this.handleFieldClick}
            handleEditFieldButton={this.handleEditFieldButton}
          />
        )}

        <div className={`field-header ${showSources ? '' : 'disabled'}`}>
          <button
            type="button"
            className="action-button add-field-button"
            onClick={() => this.handleAddFieldButton('source')}>
            <Icon size={16} fill="#fff" icon={ICONS.PLUS} className="icon" />
          </button>

          <h2 className="field-title">Sources</h2>
          <Toggle handleChange={() => this.props.toggleField('showSources')} toggled={showSources} />
        </div>

        {sources.length > 0 && (
          <FieldsRemoveGroup
            editMode={editMode}
            objects={sources}
            type="sources"
            dim={!showSources}
            handleFieldClick={this.handleFieldClick}
            handleEditFieldButton={this.handleEditFieldButton}
          />
        )}

        <button
          onClick={buttonEnabled ? () => history.push('/settings/confirm-delete') : () => {}}
          id="delete-fields-btn"
          className={buttonEnabled ? '' : 'disabled'}>
          Delete Selected
        </button>

        <Route path="/settings/confirm-delete">
          <Overlay closeOverlay={history.goBack}>
            <ConfirmDeleteModal handleDelete={() => this.handleDelete()} />
          </Overlay>
        </Route>

        <Route path="/settings/add-field">
          <Overlay closeOverlay={history.goBack}>
            <FieldForm type={fieldToAdd} handleSubmit={this.handleAddField} />
          </Overlay>
        </Route>

        <Route path="/settings/edit-field">
          <Overlay closeOverlay={history.goBack}>
            <FieldForm
              type={fieldToEdit ? fieldToEdit.type : null}
              field={fieldToEdit ? fieldToEdit.object : null}
              handleSubmit={this.editField}
            />
          </Overlay>
        </Route>
      </section>
    );
  }
}

export default connect(null, {
  addCategory,
  addLocation,
  addSource,
  editCategory,
  editLocation,
  editSource
})(withRouter(Fields));

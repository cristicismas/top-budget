import React, { Component } from 'react';
import '../../../css/Fields.css';

import Toggle from './Toggle';
import OptionsRemoveGroup from './OptionsRemoveGroup';

export class Fields extends Component {
  constructor(props) {
    super(props);

    this.state = {
      categories: [],
      locations: [],
      sources: [],
      dimCategories: false,
      dimLocations: false,
      dimSources: false
    };
  }

  handleOptionClick = (type, object) => {
    const options = document.getElementById(`${type}-${object.id}`);

    if (options.classList.contains('selected')) {
      const currentStateArray = [...this.state[type]];
      const indexToRemove = currentStateArray.indexOf(object.id);

      currentStateArray.splice(indexToRemove, 1);

      this.setState({ [type]: currentStateArray });
    } else {
      this.setState({ [type]: [...this.state[type], object.id] });
    }

    options.classList.toggle('selected');
  };

  handleDelete = () => {
    const { categories, locations, sources } = this.state;

    categories.forEach(id => this.props.deleteCategory(id));
    locations.forEach(id => this.props.deleteLocation(id));
    sources.forEach(id => this.props.deleteSource(id));

    this.setState({
      categories: [],
      locations: [],
      sources: []
    });
  }

  render() {
    const data = this.props.expenses;
    const { categories, locations, sources } = data;

    const { dimCategories, dimLocations, dimSources } = this.state;

    return (
      <div id="fields" className="settings-group">
        <h2 className="sub-title">Fields</h2>

        <div className="field-header">
          <h2 className="field-title">Categories</h2>
          <Toggle
            handleChange={() =>
              this.setState({ dimCategories: !dimCategories })
            }
            toggled={!dimCategories}
          />
        </div>

        <OptionsRemoveGroup
          objects={categories}
          type="categories"
          dim={dimCategories}
          handleOptionClick={(type, object) =>
            this.handleOptionClick(type, object)
          }
        />

        <div className="field-header">
          <h2 className="field-title">Locations</h2>
          <Toggle
            handleChange={() => this.setState({ dimLocations: !dimLocations })}
            toggled={!dimLocations}
          />
        </div>

        <OptionsRemoveGroup
          objects={locations}
          type="locations"
          dim={dimLocations}
          handleOptionClick={(type, object) =>
            this.handleOptionClick(type, object)
          }
        />

        <div className="field-header">
          <h2 className="field-title">Sources</h2>
          <Toggle
            handleChange={() => this.setState({ dimSources: !dimSources })}
            toggled={!dimSources}
          />
        </div>

        <OptionsRemoveGroup
          objects={sources}
          type="sources"
          dim={dimSources}
          handleOptionClick={(type, object) =>
            this.handleOptionClick(type, object)
          }
        />

        {
          this.state.categories.length ||
          this.state.locations.length ||
          this.state.sources.length ? (
            <button onClick={() => this.handleDelete()} id="delete-options-btn">Delete Selected</button>
          ) : null
        }
      </div>
    );
  }
}

export default Fields;

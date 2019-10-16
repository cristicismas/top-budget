import React, { useMemo } from 'react';
import FIELDS from '../../../constants/fields';
import { Bar } from 'react-chartjs-2';
import './Chart.css';

import { getDatasets, getChartOptions, getLastSevenDays } from '../../../utils/chart';

const chartOptions = getChartOptions();

const Chart = props => {
  const { categories, locations, sources, expenses, userdata } = props;

  let fields, fieldType;

  switch (userdata.primaryField) {
    case FIELDS.CATEGORIES:
      fields = categories;
      fieldType = 'category';
      break;
    case FIELDS.LOCATIONS:
      fields = locations;
      fieldType = 'location';
      break;
    case FIELDS.SOURCES:
      fields = sources;
      fieldType = 'source';
      break;
    default:
      fields = null;
      fieldType = undefined;
  }

  const datasets = useMemo(() => getDatasets(fields, fieldType, expenses), [fields, fieldType, expenses]);

  const labels = getLastSevenDays().map(day => day.format('dddd'));

  let chartData = {
    datasets,
    labels: labels
  };

  return (
    <section id="expense-chart">
      <Bar data={chartData} options={chartOptions} />
    </section>
  );
};

export default Chart;

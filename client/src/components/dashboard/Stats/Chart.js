import React from 'react';
import { Bar } from 'react-chartjs-2';
import '../../../css/Chart.css';

import { getDatasets, getChartOptions, getLastSevenDays } from '../../../utils/chart';

const chartOptions = getChartOptions();

const Chart = props => {
  const { userdata } = props;
  const { categories, locations, sources, expenses } = props.expenses;

  let fields, fieldType;

  switch(userdata.primaryField) {
    case 'CATEGORIES':
      fields = categories;
      fieldType = 'category';
      break;
    case 'LOCATIONS':
      fields = locations;
      fieldType = 'location';
      break;
    case 'SOURCES':
      fields = sources;
      fieldType = 'source';
      break;
    default:
      fields = null;
      fieldType = undefined;
  }

  const datasets = getDatasets(fields, fieldType, expenses);
  const labels = getLastSevenDays().map(day => day.format('dddd'));

  let chartData = {
    datasets,
    labels: labels
  };

  return (
    <section id="expense-chart">
      <Bar data={chartData} options={chartOptions} height={450} />
    </section>
  );
};

export default Chart;

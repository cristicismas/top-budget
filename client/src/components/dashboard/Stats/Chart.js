import React from 'react';
import { Bar } from 'react-chartjs-2';
import '../../../css/Chart.css';

import { convertHexToRgb, getCategoryValues, getLastSevenDays } from '../../../utils/chart';

const chartOptions = {
  maintainAspectRatio: false,
  scales: {
    xAxes: [
      {
        stacked: true,
        barPercentage: 0.8,
        gridLines: {
          color: 'rgba(100, 100, 100, .2)'
        }
      }
    ],
    yAxes: [
      {
        stacked: true,
        gridLines: {
          color: 'rgba(100, 100, 100, .2)'
        }
      }
    ]
  }
};

const getDatasets = (categories, expenses) => {
  let datasets = [];
  const data = {};

  categories.forEach(category => {
    const categoryValues = getCategoryValues(category, expenses);
    data[category.name] = categoryValues;
  });

  categories.forEach(category => {
    const rgb = convertHexToRgb(category.color);

    const categoryColor = `rgba(${rgb}, .5)`;
    const hoverCategoryColor = `rgba(${rgb}, .7)`;

    datasets.push({
      label: category.name,
      backgroundColor: categoryColor,
      borderColor: categoryColor,
      borderWidth: 3,
      hoverBackgroundColor: hoverCategoryColor,
      hoverBorderColor: hoverCategoryColor,
      data: data[category.name]
    });
  });

  return datasets;
};

const Chart = props => {
  const { categories, expenses } = props.expenses;
  const datasets = getDatasets(categories, expenses);
  const labels = getLastSevenDays().map(day => day.format('dddd'));

  let chartData = {
    datasets,
    labels: labels
  };

  return (
    <section id="expense-chart">
      <Bar data={chartData} options={chartOptions} height={500} />
    </section>
  );
};

export default Chart;

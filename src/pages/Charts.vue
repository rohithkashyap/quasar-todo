<template>
  <q-page padding>
    <div class="row">
      <div class="col-xs-12 col-md-6 q-pa-md">
        <apexchart
          type="bar"
          height="500px"
          :options="barChartOptions"
          :series="barSeries"
        ></apexchart>
      </div>
      <div class="col-xs-12 col-md-6 q-pa-md">
        <apexchart
          type="area"
          height="500px"
          :options="areaChartOptions"
          :series="areaSeries"
        ></apexchart>
      </div>
      <div class="col-xs-12 col-md-6 q-pa-md">
        <apexchart
          type="line"
          height="500px"
          :options="lineChartOptions"
          :series="lineSeries"
        ></apexchart>
      </div>
      <div class="col-xs-12 col-md-6 q-pa-md">
        <apexchart
          type="donut"
          height="500px"
          :options="donutChartOptions"
          :series="donutSeries"
        ></apexchart>
      </div>
      <div class="col-xs-12 col-md-6 q-pa-md">
        <apexchart
          type="radar"
          height="500px"
          :options="radarChartOptions"
          :series="radarSeries"
        ></apexchart>
      </div>
    </div>
  </q-page>
</template>

<script>
import { ref } from "vue";
import VueApexCharts from "vue3-apexcharts";
import { getCssVar } from "quasar";

export default {
  name: "Charts",
  components: {
    apexchart: VueApexCharts,
  },
  setup() {
    const barChartOptions = ref({
      chart: {
        id: "bar",
      },
      title: {
        text: "ApexBar",
        align: "center",
      },
      theme: {
        mode: "dark",
      },
      colors: [getCssVar("negative")],

      xaxis: {
        categories: [1991, 1992, 1993, 1994, 1995, 1996, 1997, 1998],
      },
    });
    const areaChartOptions = ref({
      chart: {
        id: "area",
      },
      title: {
        text: "ApexArea",
        align: "center",
      },
      theme: {
        mode: "dark",
      },
      colors: [
        getCssVar("primary"),
        getCssVar("secondary"),
        getCssVar("negative"),
      ],

      xaxis: {
        categories: [1991, 1992, 1993, 1994, 1995, 1996, 1997, 1998],
      },
    });
    const lineChartOptions = ref({
      chart: {
        id: "line",
      },
      title: {
        text: "ApexLine",
        align: "center",
      },
      theme: {
        mode: "dark",
      },
      colors: [getCssVar("secondary")],
      markers: {
        size: 4,
        hover: {
          sizeOffset: 6,
        },
      },
      xaxis: {
        categories: [1991, 1992, 1993, 1994, 1995, 1996, 1997, 1998],
      },
    });
    const donutChartOptions = ref({
      chart: {
        id: "donut",
      },
      title: {
        text: "ApexDonut",
        align: "center",
      },
      theme: {
        mode: "dark",
      },
      colors: [
        getCssVar("primary"),
        getCssVar("secondary"),
        getCssVar("negative"),
        getCssVar("accent"),
      ],
      labels: ["Summer", "Fall", "Winter", "Spring"],
    });
    const radarChartOptions = ref({
      chart: {
        id: "radar",
      },
      title: {
        text: "ApexRadar",
        align: "center",
      },
      theme: {
        mode: "dark",
      },
      markers: {
        size: 5,
        hover: {
          size: 10,
        },
      },
      colors: [
        getCssVar("secondary"),
        getCssVar("negative"),
        getCssVar("accent"),
      ],
      labels: [
        "Shooting",
        "Passing",
        "Dribbling",
        "Pace",
        "Stamina",
        "Defence",
      ],
    });

    // Series
    const barSeries = ref([
      {
        name: "barSeries",
        data: [30, 40, 35, 50, 49, 60, 70, 91],
      },
    ]);

    const areaSeries = ref([
      {
        name: "areaSeries1",
        data: [30, 40, 35, 50, 49, 60, 70, 91],
      },
      {
        name: "areaSeries2",
        data: [60, 20, 28, 120, 42, 109, 100, 110],
      },

      {
        name: "areaSeries3",
        data: [100, 83, 95, 77, 12, 65, 120, 33],
      },
    ]);

    const lineSeries = ref([
      {
        name: "lineSeries",
        data: [10, 50, 30, 20, 90, 60, 70, 80],
      },
    ]);

    const donutSeries = ref([33, 17, 40, 10]);

    const radarSeries = ref([
      {
        name: "Player 1",
        data: [80, 70, 90, 100, 60, 10],
      },
      {
        name: "Player 2",
        data: [30, 90, 50, 60, 80, 95],
      },
    ]);

    return {
      barChartOptions,
      areaChartOptions,
      lineChartOptions,
      donutChartOptions,
      radarChartOptions,
      barSeries,
      areaSeries,
      lineSeries,
      donutSeries,
      radarSeries,
    };
  },
};
</script>

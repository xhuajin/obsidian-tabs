<template>
  <div class="download-chart">
    <div
      v-for="(item, index) in downloadData"
      class="download-data"
      :key="item.date"
    >
    <div
      class="chart-block-tooltip"
      :ref="el => tooltipRefs.push(el)"
    >{{ item.number }}</div>
    <div class="chart-block-wrapper" :style="{ height: `${item.number / current * 100}%`}">
      <div 
      class="chart-block"
      :download=item.number
      @click="toggleTooltip(index)"
      ></div>
    </div>
    <div class="download-date">{{ item.date }}</div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const current = ref(5487);
const downloadData = ref([
  { date: '2024-06-09', number: 124  },
  { date: '2024-06-16', number: 406  },
  { date: '2024-06-23', number: 610  },
  { date: '2024-06-30', number: 905  },
  { date: '2024-07-07', number: 1338 },
  { date: '2024-07-14', number: 1896 },
  { date: '2024-07-21', number: 3019 },
  { date: '2024-07-28', number: 4135 },
  { date: '2024-08-04', number: 5487 },
]);

const tooltipRefs = ref([]);

const toggleTooltip = (index) => {
  tooltipRefs.value[index].style.opacity = tooltipRefs.value[index].style.opacity === '1' ? '0' : '1';
};
</script>


<style>
.download-chart {
  display: grid;
  position: relative;
  width: 100%;
  height: 300px;
  border-bottom: 1px solid var(--vp-c-default-1);
  grid-template-columns: repeat(auto-fit, minmax(0, 1fr));
  align-items: end;
}

.download-data {
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  transform: translateY(29px);
}

.chart-block-wrapper {
  display: flex;
  width: 100%;
  height: 100%;
  padding: 0 10% 5px 10%;
  flex-direction: column;
  justify-content: end;
}

.chart-block {
  width: 100%;
  height: 100%;
  background-color: var(--vp-home-hero-name-color);
  animation: block-grow linear 0.6s;
}

@keyframes block-grow {
  0% {
    height: 0;
  }
  100% {
    height: 100%;
  }
}

.chart-block-tooltip {
  opacity: 0;
  /* margin-top: auto;
  margin-bottom: 10px; */
  margin: auto auto 10px;
  border-radius: 8px;
  font-size: 12px;
  text-align: center;
  background: var(--vp-c-default-3);
}

.chart-block-tooltip:has(+.chart-block-wrapper:hover) {
  opacity: 1;
  transition: opacity 0.3s;
}

.download-date {
  font-size: 10px;
  text-wrap: nowrap;
  transform: rotate(-12deg);
}

.chart-block-tooltip {
  /* Modify size here: */
  --size: 50px;
  position: relative;
  width: 80%;
  /* height: calc(var(--size) * 0.66); */
  background: #333;
  border-radius: 10px;
}

.chart-block-tooltip:after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 50%;
  width: 0;
  height: 0;
  border: calc(var(--size) * 0.13) solid transparent;
  border-top-color: #333;
  border-bottom: 0;
  margin-left: calc(var(--size) * 0.13 * -1);
  margin-bottom: calc(var(--size) * 0.13 * -1);
}

</style>
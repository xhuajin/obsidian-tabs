<template>
  <div class="download-chart">
    <div v-for="(item, index) in downloadData" class="download-data" :key="item.date">
      <div class="chart-block-tooltip" :ref="el => tooltipRefs.push(el)" @click="toggleTooltip(index)">{{ item.number }}
      </div>
      <div class="chart-block-wrapper" :style="{ height: `${item.number / current * 80}%` }">
        <div class="chart-block" :download=item.number @click="toggleTooltip(index)"></div>
      </div>
      <div class="download-date">{{ item.date }}</div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const downloadData = ref([
  { date: '2024-06-09', number: 124 },
  { date: '2024-06-16', number: 406 },
  { date: '2024-06-23', number: 610 },
  { date: '2024-06-30', number: 905 },
  { date: '2024-07-07', number: 1338 },
  { date: '2024-07-14', number: 1896 },
  { date: '2024-07-21', number: 3019 },
  { date: '2024-07-28', number: 4135 },
  { date: '2024-08-04', number: 5487 },
  { date: '2024-08-11', number: 6066 },
  { date: '2024-08-18', number: 6383 },
  { date: '2024-08-25', number: 6656 },
  { date: '2024-09-01', number: 6901 },
  { date: '2024-09-08', number: 7199 },
]);
const current = ref(6901);

const tooltipRefs = ref([]);

const toggleTooltip = (index) => {
  const tooltip = tooltipRefs.value[index];
  tooltip.classList.toggle('visible-tooltip');
};
</script>


<style>
.download-chart::before,
.download-chart::after {
  content: '';
  position: absolute;
  width: 0;
  height: 0;
  border-style: solid;
}

.download-chart::before {
  bottom: 398px;
  left: -6px;
  border-width: 0 6px 10px;
  border-color: transparent transparent var(--vp-c-default-1) transparent;
}

.download-chart::after {
  top: 395px;
  right: -10px;
  border-width: 6px 0 6px 10px;
  border-color: transparent transparent transparent var(--vp-c-default-1);
}


.download-chart {
  display: grid;
  position: relative;
  width: 100%;
  height: 400px;
  border-bottom: 1px solid var(--vp-c-default-1);
  border-left: 1px solid var(--vp-c-default-1);
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
  color: var(--vp-button-brand-text);
  margin: auto auto 10px;
  border-radius: 8px;
  font-size: 12px;
  text-align: center;
  background: var(--vp-c-default-3);
}

.visible-tooltip {
  opacity: 1;
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
  width: 100%;
  height: 24px;
  background: #333;
  border-radius: 10px;
}

.chart-block-tooltip:after {
  content: '';
  position: absolute;
  bottom: 1px;
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
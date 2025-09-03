<script>
import VueTableRow from './VueTableRow.vue';

export default {
  name: 'VueTable',

  components: {
    VueTableRow,
  },

  props: {
    cars: {
      type: Array,
      required: true,
      default: () => [],
    },
    selectedCar: {
      type: Object,
      default: null,
    },
  },

  methods: {
    isCarSelected(car) {
      return this.selectedCar && this.selectedCar.id === car.id;
    },

    shouldHighlightPrice(car) {
      if (!this.selectedCar) return false;

      return car.brand === this.selectedCar.brand && car.model === this.selectedCar.model;
    },

    handleSelectCar(car) {
      this.$emit('select-car', car);
    },
  },
};
</script>

<template>
  <div class="table-container">
    <div class="table-header">
      <div class="table-info">
        <span class="total-count">Всего: {{ cars.length }} автомобилей</span>
        <span v-if="selectedCar" class="selected-info">
          • Выбран: {{ selectedCar.brand }} {{ selectedCar.model }}
        </span>
      </div>
    </div>

    <div class="table-wrapper">
      <table class="cars-table">
        <thead>
          <tr>
            <th class="checkbox-column">
              <span>Выбор</span>
            </th>
            <th class="brand-column">
              <span>Марка</span>
            </th>
            <th class="model-column">
              <span>Модель</span>
            </th>
            <th class="price-column">
              <span>Цена</span>
            </th>
            <th class="shop-column">
              <span>Магазин</span>
            </th>
            <th class="phone-column">
              <span>Телефон</span>
            </th>
          </tr>
        </thead>
        <tbody>
          <vue-table-row
            v-for="car in cars"
            :key="car.id"
            :car="car"
            :is-selected="isCarSelected(car)"
            :should-highlight-price="shouldHighlightPrice(car)"
            @select="handleSelectCar"
          />
        </tbody>
      </table>
    </div>

    <div v-if="cars.length === 0" class="empty-state">
      <div class="empty-icon">🚗</div>
      <h3>Нет данных для отображения</h3>
      <p>Добавьте первый автомобиль, нажав кнопку "Добавить"</p>
    </div>
  </div>
</template>

<style scoped>
.table-container {
  background: white;
  border-radius: 10px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  overflow: hidden;
}

.table-header {
  padding: 20px 25px;
  background-color: #f8f9fa;
  border-bottom: 1px solid #e9ecef;
}

.table-info {
  display: flex;
  align-items: center;
  gap: 15px;
  flex-wrap: wrap;
}

.total-count {
  font-weight: 600;
  color: #495057;
  font-size: 14px;
}

.selected-info {
  font-size: 14px;
  color: #6c757d;
  font-style: italic;
}

.table-wrapper {
  overflow-x: auto;
  max-height: 600px;
  overflow-y: auto;
}

.cars-table {
  width: 100%;
  border-collapse: collapse;
  min-width: 800px;
}

.cars-table th {
  background-color: #007bff;
  color: white;
  font-weight: 600;
  font-size: 14px;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  padding: 18px 16px;
  position: sticky;
  top: 0;
  z-index: 10;
  text-align: left;
}

.cars-table th span {
  display: flex;
  align-items: center;
  gap: 8px;
}

.checkbox-column {
  width: 80px;
  min-width: 80px;
}
.brand-column {
  width: 150px;
  min-width: 150px;
}
.model-column {
  width: 150px;
  min-width: 150px;
}
.price-column {
  width: 180px;
  min-width: 180px;
}
.shop-column {
  width: 250px;
  min-width: 250px;
}
.phone-column {
  width: 200px;
  min-width: 200px;
}

.empty-state {
  padding: 60px 20px;
  text-align: center;
  color: #6c757d;
}

.empty-icon {
  font-size: 64px;
  margin-bottom: 20px;
  opacity: 0.5;
}

.empty-state h3 {
  font-size: 20px;
  font-weight: 600;
  margin: 0 0 10px 0;
  color: #495057;
}

.empty-state p {
  font-size: 16px;
  margin: 0;
  opacity: 0.8;
}

/* Стили для скроллбара */
.table-wrapper::-webkit-scrollbar {
  width: 8px;
  height: 8px;
}

.table-wrapper::-webkit-scrollbar-track {
  background: #f1f1f1;
  border-radius: 4px;
}

.table-wrapper::-webkit-scrollbar-thumb {
  background: #c1c1c1;
  border-radius: 4px;
}

.table-wrapper::-webkit-scrollbar-thumb:hover {
  background: #a8a8a8;
}

/* Адаптивность */
@media (max-width: 1024px) {
  .table-container {
    border-radius: 8px;
  }

  .table-header {
    padding: 15px 20px;
  }

  .cars-table th {
    padding: 14px 12px;
    font-size: 13px;
  }
}

@media (max-width: 768px) {
  .table-container {
    border-radius: 8px;
    margin: 0 -5px;
  }

  .table-header {
    padding: 12px 15px;
  }

  .table-info {
    flex-direction: column;
    align-items: flex-start;
    gap: 8px;
  }

  .empty-state {
    padding: 40px 15px;
  }

  .empty-icon {
    font-size: 48px;
  }

  .empty-state h3 {
    font-size: 18px;
  }

  .empty-state p {
    font-size: 14px;
  }
}

@media (max-width: 480px) {
  .table-wrapper {
    max-height: 500px;
  }

  .cars-table th {
    padding: 12px 10px;
    font-size: 12px;
  }

  .checkbox-column {
    width: 70px;
    min-width: 70px;
  }
  .brand-column {
    width: 130px;
    min-width: 130px;
  }
  .model-column {
    width: 130px;
    min-width: 130px;
  }
  .price-column {
    width: 150px;
    min-width: 150px;
  }
  .shop-column {
    width: 200px;
    min-width: 200px;
  }
  .phone-column {
    width: 180px;
    min-width: 180px;
  }
}
</style>

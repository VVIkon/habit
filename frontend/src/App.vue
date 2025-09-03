<script>
import { mapState, mapGetters, mapActions } from 'vuex';
import CarForm from './components/CarForm.vue';

export default {
  name: 'App',

  components: {
    CarForm,
  },

  data() {
    return {
      showModal: false,
      modalMode: 'add', // 'add' или 'edit'
    };
  },

  computed: {
    ...mapState(['cars', 'selectedCar', 'shops']),

    displayedCars() {
      if (this.selectedCar) {
        return this.$store.getters.carsWithHighlight(this.selectedCar.brand, this.selectedCar.model);
      }
      return this.cars.map((car) => ({ ...car, isSimilar: false }));
    },
  },

  async mounted() {
    await this.loadShops();
    await this.loadCars();
  },

  methods: {
    ...mapActions(['loadCars', 'loadShops']),

    formatPrice(price) {
      return new Intl.NumberFormat('ru-RU', {
        style: 'currency',
        currency: 'RUB',
        minimumFractionDigits: 0,
      }).format(price);
    },

    selectCar(car) {
      this.$store.commit('SET_SELECTED_CAR', car);
    },

    showAddForm() {
      this.$store.commit('SET_SELECTED_CAR', null);
      this.showModal = true;
    },

    showEditForm() {
      if (this.selectedCar) {
        this.showModal = true;
      }
    },

    hideModal() {
      this.showModal = false;
    },

    async refreshData() {
      await this.loadCars();
    },
  },
};
</script>

<template>
  <div id="app">
    <div class="container">
      <header>
        <h1>Магазины/Автомобили</h1>
      </header>

      <main>
        <div class="table-container">
          <table class="cars-table">
            <thead>
              <tr>
                <th>Выбор</th>
                <th>Марка</th>
                <th>Модель</th>
                <th>Цена</th>
                <th>Магазин</th>
                <th>Телефон</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="car in displayedCars" :key="car.id" :class="{ highlighted: car.isSimilar }">
                <td>
                  <input type="checkbox" :checked="selectedCar && selectedCar.id === car.id" @change="selectCar(car)" />
                </td>
                <td>{{ car.brand }}</td>
                <td>{{ car.model }}</td>
                <td :class="{ 'price-highlight': car.isSimilar }" class="price-cell">
                  {{ formatPrice(car.price) }}
                </td>
                <td>{{ car.shop }}</td>
                <td>{{ car.phone }}</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div class="actions-panel">
          <button @click="showAddForm" class="btn btn-primary">Добавить</button>
          <button @click="showEditForm" :disabled="!selectedCar" class="btn btn-secondary">Изменить</button>
        </div>
      </main>
    </div>

    <CarForm
			:visible="showModal"
			:car="selectedCar"
			:shops="shops"
			@close="hideModal"
			@saved="refreshData"
		/>
  </div>
</template>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: 'Arial', sans-serif;
  background-color: #f5f5f5;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
}

header {
  text-align: center;
  margin-bottom: 30px;
}

header h1 {
  color: #333;
  font-size: 2.5em;
  margin-bottom: 10px;
}

.table-container {
  background: white;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  margin-bottom: 20px;
}

.cars-table {
  width: 100%;
  border-collapse: collapse;
}

.cars-table th,
.cars-table td {
  padding: 12px;
  text-align: left;
  border-bottom: 1px solid #eee;
}

.cars-table th {
  background-color: #007bff;
  color: white;
  font-weight: bold;
}

.cars-table tr:hover {
  background-color: #f8f9fa;
}

.cars-table .highlighted {
  background-color: #fff3cd;
}

.cars-table .price-highlight {
  background-color: #ffc107;
  font-weight: bold;
}

.price-cell {
  text-align: right;
  font-family: 'Courier New', monospace;
}

.actions-panel {
  display: flex;
  gap: 10px;
  justify-content: center;
}

.btn {
  padding: 10px 20px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 14px;
  font-weight: bold;
  transition: background-color 0.3s;
}

.btn:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.btn-primary {
  background-color: #007bff;
  color: white;
}

.btn-primary:hover:not(:disabled) {
  background-color: #0056b3;
}

.btn-secondary {
  background-color: #6c757d;
  color: white;
}

.btn-secondary:hover:not(:disabled) {
  background-color: #545b62;
}
</style>

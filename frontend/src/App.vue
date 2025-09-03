<script>
import { mapState, mapActions } from 'vuex';
import VueTable from './components/VueTable.vue';
import CarForm from './components/CarForm.vue';

export default {
  name: 'App',

  components: {
    VueTable,
    CarForm
  },

  data() {
    return {
      showModal: false
    };
  },

  computed: {
    ...mapState(['cars', 'selectedCar', 'shops'])
  },

  async mounted() {
    await this.loadShops();
    await this.loadCars();
  },

  methods: {
    ...mapActions(['loadShops','loadCars', 'setSelectedCar']),

    selectCar(car) {
      this.setSelectedCar(car);
    },

    showAddForm() {
      this.setSelectedCar(null);
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

    async handleSave() {
      await this.loadCars();
      this.hideModal();
    }
  }
};
</script>

<template>
  <div id="app">
    <div class="container">
      <header>
        <h1>Магазины/Автомобили</h1>
      </header>

      <main>
        <vue-table
          :cars="cars"
          :selected-car="selectedCar"
          @select-car="selectCar"
        />

        <div class="actions-panel">
          <button
            @click="showAddForm"
            class="btn btn-primary"
            title="Добавить новый автомобиль"
          >
            Добавить
          </button>
          <button
            @click="showEditForm"
            :disabled="!selectedCar"
            class="btn btn-secondary"
            title="Редактировать выбранный автомобиль"
          >
            Изменить
          </button>
        </div>
      </main>
    </div>

    <car-form
      :visible="showModal"
      :car="selectedCar"
      :shops="shops"
      @close="hideModal"
      @saved="handleSave"
    />
  </div>
</template>

<style scoped>
#app {
  min-height: 100vh;
  background-color: #f5f5f5;
  padding: 20px 0;
}

.container {
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 20px;
}

header {
  text-align: center;
  margin-bottom: 30px;
  padding: 30px;
  background: white;
  border-radius: 10px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

header h1 {
  color: #333;
  font-size: 2.8em;
  margin: 0;
  font-weight: 700;
}

.actions-panel {
  display: flex;
  gap: 20px;
  justify-content: center;
  padding: 25px;
  background: white;
  border-radius: 10px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  margin-top: 20px;
}

.btn {
  padding: 16px 32px;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-size: 16px;
  font-weight: 600;
  transition: all 0.3s ease;
  min-width: 160px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
}

.btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
  transform: none !important;
}

.btn-primary {
  background-color: #007bff;
  color: white;
  box-shadow: 0 4px 15px rgba(0, 123, 255, 0.3);
}

.btn-primary:hover:not(:disabled) {
  background-color: #0056b3;
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(0, 123, 255, 0.4);
}

.btn-secondary {
  background-color: #6c757d;
  color: white;
  box-shadow: 0 4px 15px rgba(108, 117, 125, 0.3);
}

.btn-secondary:hover:not(:disabled) {
  background-color: #545b62;
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(108, 117, 125, 0.4);
}

.btn-icon {
  font-size: 18px;
  font-weight: bold;
}

/* Адаптивность */
@media (max-width: 1024px) {
  .container {
    padding: 0 15px;
  }

  header {
    padding: 25px;
  }

  header h1 {
    font-size: 2.4em;
  }
}

@media (max-width: 768px) {
  #app {
    padding: 15px 0;
  }

  .container {
    padding: 0 10px;
  }

  header {
    padding: 20px 15px;
    margin-bottom: 20px;
  }

  header h1 {
    font-size: 2em;
  }

  .actions-panel {
    flex-direction: column;
    gap: 15px;
    padding: 20px;
    margin-top: 15px;
  }

  .btn {
    width: 100%;
    min-width: auto;
    padding: 14px 24px;
  }
}

@media (max-width: 480px) {
  header h1 {
    font-size: 1.8em;
  }

  .btn {
    padding: 12px 20px;
    font-size: 15px;
  }

  .btn-icon {
    font-size: 16px;
  }
}
</style>

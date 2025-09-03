<script>
export default {
  name: 'CarForm',

  props: {
    visible: {
      type: Boolean,
      default: false,
    },
    car: {
      type: Object,
      default: null,
    },
    shops: {
      type: Array,
      required: true,
    },
  },

  data() {
    return {
      form: {
        brand: '',
        model: '',
        price: '',
        shop_id: '',
      },
    };
  },

  computed: {
    isEditMode() {
      return !!this.car;
    },
  },

  watch: {
    car: {
      handler(newCar) {
        if (newCar) {
          this.form = {
            brand: newCar.brand,
            model: newCar.model,
            price: newCar.price,
            shop_id: newCar.shop_id || this.shops[0]?.id,
          };
        } else {
          this.resetForm();
        }
      },
      immediate: true,
    },
  },

  methods: {
    resetForm() {
      this.form = {
        brand: '',
        model: '',
        price: '',
        shop_id: this.shops[0]?.id || '',
      };
    },

    close() {
      this.$emit('close');
      this.resetForm();
    },

    async submitForm() {
      try {
        if (this.isEditMode) {
          await this.$store.dispatch('updateCar', {
            ...this.form,
            id: this.car.id,
          });
        } else {
          await this.$store.dispatch('addCar', this.form);
        }

        this.close();
        this.$emit('saved');
      } catch (error) {
        console.error('Ошибка при сохранении:', error);
        alert('Ошибка при сохранении данных');
      }
    },
  },
};
</script>

<template>
  <div class="modal-overlay" v-if="visible" @click.self="close">
    <div class="modal-content">
      <h3>{{ isEditMode ? 'Редактирование автомобиля' : 'Добавление автомобиля' }}</h3>

      <form @submit.prevent="submitForm">
        <div class="form-group">
          <label>Марка:</label>
          <input v-model="form.brand" type="text" required class="form-input" />
        </div>

        <div class="form-group">
          <label>Модель:</label>
          <input v-model="form.model" type="text" required class="form-input" />
        </div>

        <div class="form-group">
          <label>Цена:</label>
          <input v-model="form.price" type="number" required min="0" class="form-input" />
        </div>

        <div class="form-group">
          <label>Магазин:</label>
          <select v-model="form.shop_id" required class="form-input">
            <option v-for="shop in shops" :key="shop.id" :value="shop.id">{{ shop.name }} ({{ shop.phone }})</option>
          </select>
        </div>

        <div class="form-actions">
          <button type="button" @click="close" class="btn btn-secondary">Выход</button>
          <button type="submit" class="btn btn-primary">Сохранить</button>
        </div>
      </form>
    </div>
  </div>
</template>

<style scoped>
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.modal-content {
  background: white;
  padding: 20px;
  border-radius: 8px;
  min-width: 400px;
  max-width: 500px;
}

h3 {
  margin-top: 0;
  color: #333;
}

.form-group {
  margin-bottom: 15px;
}

label {
  display: block;
  margin-bottom: 5px;
  font-weight: bold;
  color: #555;
}

.form-input {
  width: 100%;
  padding: 8px;
  border: 1px solid #ddd;
  border-radius: 4px;
  box-sizing: border-box;
}

.form-actions {
  display: flex;
  justify-content: flex-end;
  gap: 10px;
  margin-top: 20px;
}

.btn {
  padding: 8px 16px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-weight: bold;
}

.btn-primary {
  background-color: #007bff;
  color: white;
}

.btn-primary:hover {
  background-color: #0056b3;
}

.btn-secondary {
  background-color: #6c757d;
  color: white;
}

.btn-secondary:hover {
  background-color: #545b62;
}
</style>

/**
 * Vuex хранилище для управления состоянием автомобилей
 */
import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    cars: [],
    selectedCar: null,
    shops: [], // { id: 1, name: 'АвтоМир', phone: '+7 (495) 123-45-67' },
  },

  mutations: {
    /**
     * Установка shops
     */
    SET_SHOPS(state, shops) {
      state.shops = shops;
    },
    /**
     * Установка cars
     */
    SET_CARS(state, cars) {
      state.cars = cars;
    },

    /**
     * Установка car
     */
    SET_SELECTED_CAR(state, car) {
      state.selectedCar = car;
    },

    /**
     * Добавление car
     */
    ADD_CAR(state, car) {
      state.cars.push(car);
    },

    /**
     * Обновление car
     */
    UPDATE_CAR(state, updatedCar) {
      const index = state.cars.findIndex((car) => car.id === updatedCar.id);
      if (index !== -1) {
        state.cars.splice(index, 1, updatedCar);
      }
    },
  },

  actions: {
    /**
     * Загрузка cars
     */
    async loadCars({ commit }) {
      try {
        const response = await axios.get('/api/cars');
        commit('SET_CARS', response.data);
      } catch (error) {
        console.error('Ошибка при загрузке cars:', error);
      }
    },
    /**
     * Загрузка shops
     */
    async loadShops({ commit }) {
      try {
        const response = await axios.get('/api/shops');
        commit('SET_SHOPS', response.data);
      } catch (error) {
        console.error('Ошибка при загрузке shops:', error);
      }
    },

    /**
     * Добавление car
     */
    async addCar({ commit }, carData) {
      try {
				const payload = {
        ...carData,
        price: parseFloat(carData.price),
        shop_id: parseInt(carData.shop_id, 10)
      };
        const response = await axios.post('/api/cars/new', payload);
        commit('ADD_CAR', response.data);
        return response.data;
      } catch (error) {
        console.error('Ошибка при добавлении автомобиля:', error);
        throw error;
      }
    },

    /**
     * Обновление car
     */
    async updateCar({ commit }, carData) {
      try {
				const payload = {
        ...carData,
        price: parseFloat(carData.price),
        shop_id: parseInt(carData.shop_id, 10)
      };
        const response = await axios.post(`/api/cars/${carData.id}`, payload);
        commit('UPDATE_CAR', response.data);
        return response.data;
      } catch (error) {
        console.error('Ошибка при обновлении автомобиля:', error);
        throw error;
      }
    },
  },

  getters: {
    /**
     * Получение similar car
     */
    carsWithHighlight: (state) => (selectedBrand, selectedModel) => {
      return state.cars.map((car) => ({
        ...car,
        isSimilar: selectedBrand && selectedModel
										? car.brand === selectedBrand && car.model === selectedModel
										: false,
      }));
    },
  },
});

<script>
export default {
  name: 'VueTableRow',

  props: {
    car: {
      type: Object,
      required: true
    },
    isSelected: {
      type: Boolean,
      default: false
    },
    shouldHighlightPrice: {
      type: Boolean,
      default: false
    }
  },

  data() {
    return {
      isHovered: false
    };
  },

  methods: {
    formatPrice(price) {
      return new Intl.NumberFormat('ru-RU', {
        style: 'currency',
        currency: 'RUB',
        minimumFractionDigits: 0
      }).format(price);
    }
  }
};
</script>

<template>
  <tr
    :class="['table-row', { 'row-selected': isSelected, 'row-hover': !isSelected }]"
    @mouseenter="isHovered = true"
    @mouseleave="isHovered = false"
  >
    <td class="checkbox-cell">
      <label class="checkbox-wrapper">
        <input
          type="checkbox"
          :checked="isSelected"
          @change="$emit('select', car)"
          class="checkbox-input"
        >
        <span class="checkbox-custom"></span>
      </label>
    </td>
    <td class="brand-cell">
      <span class="brand-text">{{ car.brand }}</span>
    </td>
    <td class="model-cell">
      <span class="model-text">{{ car.model }}</span>
    </td>
    <td class="price-cell" :class="{ 'price-highlighted': shouldHighlightPrice }">
      <span class="price-value">{{ formatPrice(car.price) }}</span>
    </td>
    <td class="shop-cell">
      <span class="shop-name">{{ car.shop }}</span>
    </td>
    <td class="phone-cell">
      <a :href="`tel:${car.phone}`" class="phone-link">
        {{ car.phone }}
      </a>
    </td>
  </tr>
</template>

<style scoped>
.table-row {
  background: white;
  transition: all 0.3s ease;
  position: relative;
}

.table-row::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 1px;
  background-color: #f0f0f0;
}

.table-row:last-child::after {
  display: none;
}

.row-hover:hover {
  background-color: #f8f9fa;
}

.row-selected {
  background-color: #e3f2fd;
}

td {
  padding: 16px;
  border: none;
  font-size: 14px;
  vertical-align: middle;
}

/* Checkbox стили */
.checkbox-cell {
  text-align: center;
}

.checkbox-wrapper {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  position: relative;
}

.checkbox-input {
  position: absolute;
  opacity: 0;
  cursor: pointer;
}

.checkbox-custom {
  width: 20px;
  height: 20px;
  border: 2px solid #dee2e6;
  border-radius: 4px;
  background: white;
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  justify-content: center;
}

.checkbox-input:checked ~ .checkbox-custom {
  background: #007bff;
  border-color: #007bff;
}

.checkbox-input:checked ~ .checkbox-custom::after {
  content: '✓';
  color: white;
  font-size: 12px;
  font-weight: bold;
}

.checkbox-input:focus ~ .checkbox-custom {
  box-shadow: 0 0 0 3px rgba(0, 123, 255, 0.2);
}

/* Текстовые ячейки */
.brand-cell {
  font-weight: 600;
  color: #2c3e50;
}

.model-cell {
  color: #495057;
  font-weight: 500;
}

.price-cell {
  text-align: right;
  font-family: 'Courier New', 'Monaco', monospace;
  font-weight: 600;
  transition: background-color 0.3s ease;
}

.price-value {
  color: #007bff;
  padding: 4px 8px;
  border-radius: 4px;
  display: inline-block;
}

.price-highlighted {
  background-color: #fff3cd !important;
}

.price-highlighted .price-value {
  color: #856404;
  font-weight: 700;
}

.shop-cell {
  color: #6c757d;
}

.phone-cell {
  color: #495057;
}

.phone-link {
  color: inherit;
  text-decoration: none;
  transition: color 0.2s ease;
}

.phone-link:hover {
  color: #007bff;
  text-decoration: underline;
}

/* Адаптивность */
@media (max-width: 1024px) {
  td {
    padding: 14px 12px;
    font-size: 13px;
  }

  .checkbox-custom {
    width: 18px;
    height: 18px;
  }
}

@media (max-width: 768px) {
  td {
    padding: 12px 10px;
    font-size: 12px;
  }

  .brand-text,
  .model-text,
  .price-value {
    font-size: 11px;
  }

  .checkbox-custom {
    width: 16px;
    height: 16px;
  }

  .checkbox-input:checked ~ .checkbox-custom::after {
    font-size: 10px;
  }
}

@media (max-width: 480px) {
  td {
    padding: 10px 8px;
  }

  .phone-link::before {
    display: none;
  }
}
</style>

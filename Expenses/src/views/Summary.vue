<script setup>
import { ref, computed, onMounted } from 'vue';
import { collection, query, where, getDocs } from 'firebase/firestore';
import db from '../firebase/config';

const totalExpenses = ref(0);
const totalIncomes = ref(0);

const fetchTotalExpenses = async () => {
  const q = query(collection(db, 'expenses'), where('type', '==', 'expense'));
  const querySnapshot = await getDocs(q);
  let total = 0;
  querySnapshot.forEach(doc => {
    total += parseFloat(doc.data().amount);
  });
  totalExpenses.value = total;
};

const fetchTotalIncomes = async () => {
  const q = query(collection(db, 'expenses'), where('type', '==', 'income'));
  const querySnapshot = await getDocs(q);
  let total = 0;
  querySnapshot.forEach(doc => {
    total += parseFloat(doc.data().amount);
  });
  totalIncomes.value = total;
};

onMounted(() => {
  fetchTotalExpenses();
  fetchTotalIncomes();
});

const balance = computed(() => {
  return totalIncomes.value - totalExpenses.value;
});
</script>

<template>
      <div class="summary-container ">
        <h1 class="text-5xl text-center text-gray-800 mb-10">Summary</h1>
        <div class="summary-item bg-pink-200 rounded-lg p-6">
          <h2 class="text-3xl text-center text-gray-800 mb-4">Total Expenses</h2>
          <p class="text-xl text-center text-red-500 font-bold">{{ totalExpenses }}</p>
        </div>
        <div class="summary-item bg-pink-200 rounded-lg p-6">
          <h2 class="text-3xl text-center text-gray-800 mb-4">Total Incomes</h2>
          <p class="text-xl text-center text-green-500 font-bold">{{ totalIncomes }}</p>
        </div>
        <div class="summary-item bg-pink-200 rounded-lg p-6">
          <h2 class="text-3xl text-center text-gray-800 mb-4">Balance</h2>
          <p class="text-xl text-center font-bold" :class="{ 'text-red-500': balance < 0, 'text-green-100': balance >= 0 }">{{ balance }}</p>
        </div>
      </div>
</template>

<style scoped>

.summary-container {
  width: 100%;
  max-width: 800px; 
  margin: auto;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.summary-item {
  width: 100%;
  max-width: 400px; 
  padding: 20px;
  border-radius: 8px;
  margin: 20px 0;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease;
}

.summary-item:hover {
  transform: translateY(-5px);
}

h1, h2 {
  text-align: center;
  color: #007bff; 
}

p {
  text-align: center;
}

.text-red-500 {
  color: #dc3545; 
}

.text-green-500 {
  color: #28a745; 
}

.balance {
  font-size: 24px;
  font-weight: bold;
  text-align: center;
}

.balance.text-red-500 {
  color: #dc3545; 
}

.balance.text-green-500 {
  color: #28a745; 
}


.custom-container {
  width: 100%;
  max-width: 1200px;
  margin-top: 40px; 
  padding: 20px; 
  border-radius: 10px; 
}
</style>

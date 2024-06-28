<template>
    <div>
        <h1 class="text-5xl text-center text-gray-800 mb-10">Income Tracker</h1>
        <div class="total-incomes">Total Incomes: {{ totalIncomes }}</div>
        <div class="flex">
            <div class="flex-1 bg-blue-200 p-8 mr-8 max-w-lg">
                <h1 class="text-4xl text-center text-gray-800 mb-10">Add Income</h1>
                <input type="text" v-model="newIncome.name" placeholder="Name" class="input-field">
                <input type="text" v-model="amountInput" placeholder="₱" class="input-field">
                <div class="text-center">
                    <button @click="addOrUpdateIncome" class="btn-primary">
                        <svg v-if="editingIndex === null" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-plus-square-fill" viewBox="0 0 16 16">
                            <path d="M2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2zm6.5 4.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3a.5.5 0 0 1 1 0"/>
                        </svg>
                        <svg v-else xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pencil-square" viewBox="0 0 16 16">
                            <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/>
                            <path fill-rule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5z"/>
                        </svg>
                        {{ editingIndex === null ? '' : '' }}
                    </button>
                </div>
            </div>
            <div class="flex-1 relative">
                <div class="income-table-container border border-black">
                    <div class="income-table-wrapper">
                        <table class="w-full">
                            <thead class="header-row">
                                <tr>
                                    <th class="border border-black px-4 py-2">Name</th>
                                    <th class="border border-black px-4 py-2">Amount</th>
                                    <th class="border border-black px-4 py-2">Date & Time</th>
                                    <th class="border border-black px-4 py-2">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="(income, index) in incomes" :key="index">
                                    <td class="border border-black px-4 py-2">{{ income.name }}</td>
                                    <td class="border border-black px-4 py-2">₱{{ income.amount }}</td>
                                    <td class="border border-black px-4 py-2">{{ income.dateTime }}</td>
                                    <td class="px-4 py-2 flex justify-center items-center">
                                        <button @click="editIncome(index)" class="btn-secondary">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pencil-square" viewBox="0 0 16 16">
                                                <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/>
                                                <path fill-rule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5z"/>
                                            </svg>
                                        </button>
                                        <button @click="confirmDelete(income.id)" class="btn-danger">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash-fill" viewBox="0 0 16 16">
                                                <path d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5M8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5m3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0"/>
                                            </svg>
                                        </button>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>


<script setup>
import { ref, computed } from 'vue';
import { collection, query, orderBy, onSnapshot, addDoc, updateDoc, deleteDoc, doc } from 'firebase/firestore';
import db from '../firebase/config';

const incomes = ref([]);
const newIncome = ref({
    name: '',
    amount: 0,
});

const amountInput = ref('');
const editingIndex = ref(null);

const fetchIncomes = async () => {
    const q = query(collection(db, 'expenses'), orderBy('dateTime', 'desc'));
    const unsubscribe = onSnapshot(q, (snapshot) => {
        incomes.value = snapshot.docs
            .map(doc => ({ id: doc.id, ...doc.data() }))
            .filter(income => income.type === 'income'); 
    });
};

import { onMounted } from 'vue';
onMounted(fetchIncomes);

const addOrUpdateIncome = async () => {
    if (!newIncome.value.name || !amountInput.value) {
        alert('Please fill up all the fields.');
        return;
    }

    if (isNaN(parseFloat(amountInput.value))) {
        alert('Please enter a valid number for the amount.');
        return;
    }
    if (editingIndex.value === null) {
        await addIncome();
    } else {
        await updateIncome();
    }
};

const addIncome = async () => {
    const dateTime = new Date().toLocaleString();
    const income = { ...newIncome.value, amount: parseFloat(amountInput.value), dateTime, type: 'income' };
    try {
        const docRef = await addDoc(collection(db, 'expenses'), income);
        console.log('Income added with ID: ', docRef.id);
    } catch (error) {
        console.error('Error adding income: ', error);
    }
    newIncome.value = {
        name: '',
        amount: 0,
    };
    amountInput.value = '';
};

const updateIncome = async () => {
    const incomeId = incomes.value[editingIndex.value].id;
    const income = { ...newIncome.value, amount: parseFloat(amountInput.value) };
    try {
        await updateDoc(doc(db, 'expenses', incomeId), income);
        console.log('Income updated with ID: ', incomeId);
    } catch (error) {
        console.error('Error updating income: ', error);
    }
    newIncome.value = {
        name: '',
        amount: 0,
    };
    amountInput.value = '';
    editingIndex.value = null;
};

const deleteIncome = async (id) => {
    try {
        await deleteDoc(doc(db, 'expenses', id));
        console.log('Income deleted with ID: ', id);
    } catch (error) {
        console.error('Error deleting income: ', error);
    }
};

const confirmDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this income?')) {
        deleteIncome(id);
    }
};

const editIncome = (index) => {
    const income = incomes.value[index];
    newIncome.value = {
        name: income.name,
        amount: income.amount,
    };
    amountInput.value = income.amount;
    editingIndex.value = index;
};

const totalIncomes = computed(() => {
    return incomes.value.reduce((total, income) => total + parseFloat(income.amount), 0);
});
</script>

<style scoped>
.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
}

.input-field {
  width: 100%;
  padding: 10px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 5px;
}

.btn-primary {
  background-color: #4CAF50;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.btn-primary:hover {
  background-color: #45a049;
}


.flex {
  display: flex;
}

.flex-1 {
  flex: 1;
}

.max-w-lg {
  max-width: 32rem; 
}

.text-center {
  text-align: center;
}

.income-table-container {
  overflow-x: auto;
}

.income-table-wrapper {
  max-height: 400px; /* Adjust height as needed */
  overflow-y: auto;
}

.header-row th {
  background-color: #f2f2f2;
}

.header-row th,
td {
  border: 1px solid #ddd;
  padding: 8px;
  text-align: left;
}

.total-incomes {
  background-color: #f2f2f2;
  padding: 10px 20px;
  text-align: center;
  font-size: 18px;
  font-weight: bold;
  position: fixed;
  margin-top: 410px;
  margin-left: 63%;
  width: 20%;
}

</style>

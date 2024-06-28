<template>
  <div class="bg-gray-100 min-h-screen">
    <div class="container mx-auto py-8">
      <h1 class="text-5xl text-center text-gray-800 mb-10">Expense Tracker</h1>
      <div class="expense-flex-container">
        <div class="flex-1 mr-8 max-w-lg bg-blue-200 p-8">
          <h1 class="text-4xl text-center text-gray-800 mb-10">Add Expense</h1>
          <div class="mb-4">
            <input type="text" v-model="newExpense.item" placeholder="Item" class="input-field">
          </div>
          <div class="mb-4">
            <select v-model="newExpense.category" class="input-field">
              <option value="" disabled>Select Category</option>
              <option value="food">Food</option>
              <option value="clothes">Clothes</option>
              <option value="transportation">Transportation</option>
            </select>
          </div>
          <div class="mb-4">
            <input type="text" v-model="amountInput" placeholder="₱" class="input-field">
          </div>
          <div class="text-center">
            <button @click="addOrUpdateExpense" class="btn-primary">
              {{ editingIndex === null ? 'Add Expense' : 'Update Expense' }}
            </button>
          </div>
        </div>
        <div class="flex-1 relative">
          <div class="expense-table-container border border-black">
            <div class="expense-table-wrapper">
              <table class="w-full">
                <thead class="header-row ">
                  <tr>
                    <th class="fixed-header border border-black px-4 px-4 y-2">Date & Time</th>
                    <th class="fixed-header border border-black px-4 py-2">Item</th>
                    <th class="fixed-header border border-black px-4 py-2">Category</th>
                    <th class="fixed-header border border-black px-4 py-2">Amount</th> 
                    <th class="fixed-header border border-black px-4 py-2">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(expense, index) in expenses" :key="index">
                    <td class="border border-black px-4 py-2">{{ expense.dateTime }}</td>
                    <td class="border border-black px-4 py-2">{{ expense.item }}</td>
                    <td class="border border-black px-4 py-2">{{ expense.category }}</td>
                    <td class="border border-black px-4 py-2">₱{{ expense.amount }}</td>
                    <td class="px-6 py-6 border-black flex justify-center items-center">
                      <button @click="editExpense(index)" class="btn-secondary mr-2">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pencil-square" viewBox="0 0 16 16">
                          <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/>
                          <path fill-rule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5z"/>
                        </svg>
                      </button>
                      <button @click="confirmDelete(expense.id)" class="btn-danger">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash" viewBox="0 0 16 16">
                          <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0z"/>
                          <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4zM2.5 3h11V2h-11z"/>
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
      <div class="total-expenses bg-white  py-2 px-4">
        Total Expenses: ₱{{ totalExpenses.toFixed(2) }}
      </div>
    </div>
  </div>
</template>

<style scoped>
/* Styles for Expense Tracker */
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

/* Other Button Styles */

.expense-flex-container {
  display: flex;
  position: relative;
}

.expense-table-container {
  overflow-x: auto;
  flex: 1; /* Fill remaining space */
}

.expense-table-wrapper {
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

.total-expenses {
  background-color: #f2f2f2;
  padding: 10px 20px;
  text-align: center;
  font-size: 18px;
  font-weight: bold;
  position: fixed;
  margin-top: 10px;
  margin-left: 48%;
  width: 20%;
}

</style>
  
<script setup>
import { ref, computed } from 'vue';
import { collection, query, orderBy, onSnapshot, addDoc, updateDoc, deleteDoc, doc } from 'firebase/firestore';
import db from '../firebase/config';

const expenses = ref([]);
const newExpense = ref({
    item: '',
    category: '',
    amount: 0,
});
const amountInput = ref('');
const editingIndex = ref(null);

const fetchExpenses = async () => {
    const q = query(collection(db, 'expenses'), orderBy('dateTime', 'desc'));
    const unsubscribe = onSnapshot(q, (snapshot) => {
        expenses.value = snapshot.docs
            .map(doc => ({ id: doc.id, ...doc.data() }))
            .filter(expense => expense.type === 'expense'); 
    });
};

import { onMounted } from 'vue';
onMounted(fetchExpenses);

const addOrUpdateExpense = async () => {
    if (!newExpense.value.item || !newExpense.value.category || !amountInput.value) {
        alert('Please fill up all the fields.');
        return;
    }
    if (isNaN(parseFloat(amountInput.value))) {
        alert('Please enter a valid number for the amount.');
        return;
    }
    if (editingIndex.value === null) {
        await addExpense();
    } else {
        await updateExpense();
    }
};

const addExpense = async () => {
    const dateTime = new Date().toLocaleString();
    const expense = { ...newExpense.value, amount: parseFloat(amountInput.value), dateTime, type: 'expense' };
    try {
        const docRef = await addDoc(collection(db, 'expenses'), expense);
        console.log('Expense added with ID: ', docRef.id);
    } catch (error) {
        console.error('Error adding expense: ', error);
    }
    newExpense.value = {
        item: '',
        category: '',
        amount: 0,
    };
    amountInput.value = '';
};

const updateExpense = async () => {
    const expenseId = expenses.value[editingIndex.value].id;
    const expense = { ...newExpense.value, amount: parseFloat(amountInput.value) };
    try {
        await updateDoc(doc(db, 'expenses', expenseId), expense);
        console.log('Expense updated with ID: ', expenseId);
    } catch (error) {
        console.error('Error updating expense: ', error);
    }
    newExpense.value = {
        item: '',
        category: '',
        amount: 0,
    };
    amountInput.value = '';
    editingIndex.value = null;
};

const deleteExpense = async (id) => {
    try {
        await deleteDoc(doc(db, 'expenses', id));
        console.log('Expense deleted with ID: ', id);
    } catch (error) {
        console.error('Error deleting expense: ', error);
    }
};

const confirmDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this expense?')) {
        deleteExpense(id);
    }
};

const editExpense = (index) => {
    const expense = expenses.value[index];
    newExpense.value = {
        item: expense.item,
        category: expense.category,
        amount: expense.amount,
    };
    amountInput.value = expense.amount;
    editingIndex.value = index;
};

const totalExpenses = computed(() => {
    return expenses.value.reduce((total, expense) => total + parseFloat(expense.amount), 0);
});
</script>


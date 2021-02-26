"use strict";

function isNumbers(n) {
	return !isNaN(parseFloat(n)) && isFinite(n);
}
function isString(n) {
	return !isNaN(parseFloat(n)) && isFinite(n);
}


let start = document.getElementById('start'),
		cancel = document.getElementById('cancel'),
		btnPlus = document.getElementsByTagName('button'),
		incomePlus = btnPlus[0],
		expensesPlus = btnPlus[1],
		getCheckBox = document.querySelector('#deposit-check'),
		additionalIncomeItem = document.querySelectorAll('.additional_income-item'),
		budgetMonthValue = document.querySelector('.result-budget_month input'),
		budgetDayValue = document.querySelector('.result-budget_day input'),
		expensesMonthValue = document.querySelector('.result-expenses_month input'),
		additionalIncomevalue = document.querySelector('.result-additional_income input'),
		additionalExpensesvalue = document.querySelector('.result-additional_expenses input'),
		additionalExpensesItem = document.querySelector('.additional_expenses-item'),
		incomePeriodValue = document.querySelector('.result-income_period input'),
		targetMonthValue = document.querySelector('.result-target_month input'),
		salaryAmount = document.querySelector('.salary-amount'),
		getExpenseName = document.getElementsByClassName('expenses-title'),
		expensesItems = document.querySelectorAll('.expenses-items'),
		getTargetAmount = document.querySelector('.target-amount'),
		getSum = document.querySelector('.deposit-amount'),
		additionalExpenses = document.querySelector('.additional_expenses'),
		getProcent = document.querySelector('.deposit-percent'),
		incomeItems = document.querySelectorAll('.income-items'),
		periodSelect = document.querySelector('.period-select'),
		periodAmount = document.querySelector('.period-amount');
		


		let appData = {
				income: {},
				addIncome: [],
				expenses: {},
				deposit: false,
				incomeMonth: 0,
				precentDeposit: 0,
				moneyDeposit: 0,
				addExpenses: [],
				budget: 0,
				budgetDay: 0,
				budgetMonth: 0,
				expensesMonth: 0,
				
				check: function () { 
					if (salaryAmount !== ''){
						start.removeAttribute('disabled');
					}
				 },
				start : function() {

					if (salaryAmount === ''){
						start.setAttribute('disabled' , 'true');
						return;
					}
					let allInput = document.querySelectorAll('.data input[type = text]');
					allInput.forEach(function (item) { 
						item.setAttribute('disabled' , 'true');
					 });

					 incomePlus.setAttribute('disabled', 'true');
					 expensesPlus.setAttribute('disabled', 'true');
					 start.style.display('none');
					 cancel.style.display('block');

						
					this.budget = +salaryAmount.value;
					
					this.getIncome();
					this.getExpenses();
					this.getExpensesMonth();
					this.getAddExpenses();
					this.getAddIncome();
					this.getBudget();

					this.showResult();
				},
				showResult: function() {
					budgetMonthValue.value = this.budgetMonth;
					budgetDayValue.value = this.budgetDay;
					expensesMonthValue.value = this.expensesMonth;
					additionalExpensesvalue.value = this.addExpenses.join(', ');
					additionalIncomevalue.value = this.addIncome.join(', ');
					targetMonthValue.value = this.getTargetMonth();
					incomePeriodValue.value = this.calcPeriod();
					// 
					
					periodSelect.addEventListener('input', function () {
						incomePeriodValue.value = appData.calcPeriod();
					});
				
				},
				addExpensesBlock: function(){
					let cloneExpensesItem = expensesItems[0].cloneNode(true);
					expensesItems[0].parentNode.insertBefore(cloneExpensesItem, expensesPlus);
					expensesItems = document.querySelectorAll('.expenses-items');
					if(expensesItems.length === 3) {
						expensesPlus.style.display = 'none';
					}
				},
				getExpenses: function(){
					expensesItems.forEach(function(item){
						let itemExpenses = item.querySelector('.expenses-title').value;
						let cashExpenses = item.querySelector('.expenses-amount').value;
						if(itemExpenses !== '' && cashExpenses !== '') {
							appData.expenses[itemExpenses] = +cashExpenses;
						}
					});
				},
				addIncomeBlock: function () {
					// 
					let cloneIncomeItem = incomeItems[0].cloneNode(true);
					incomeItems[0].parentNode.insertBefore(cloneIncomeItem, incomePlus);
					incomeItems = document.querySelectorAll('.income-items');
					if(incomeItems.length === 3) {
						incomePlus.style.display = 'none';
					}
					// 
				},
				getIncome: function(){
						incomeItems.forEach(function(item){
						let itemIncome = item.querySelector('.income-title').value;
						let cashIncome = item.querySelector('.income-amount').value;
						if(itemIncome !== '' && cashIncome !== '') {
							appData.income[itemIncome] = cashIncome;
						}
					});
					// 
					for (let key in appData.income) {
						appData.incomeMonth += +appData.income[key];
					}
					// 
				},
				getAddExpenses: function(){
					let addExpenses = additionalExpensesItem.value.split(", ");
					addExpenses.forEach(function(item){
						item = item.trim();
						if (item !== '' ){
							appData.addExpenses.push(item);
						}
					});
				},

				getAddIncome: function(){
					 additionalIncomeItem.forEach(function(item) {
						let itemValue = item.value.trim();
						if (itemValue !== '' ) {
							appData.addIncome.push(itemValue);
						}
					});
				},
				reset: function (){
					let inputText = document.querySelectorAll('.data input[type=text]');
					let resultInputAll = document.querySelectorAll('.result input[type=text]');

					inputText.forEach(function(elem){
						elem.value = '';
						elem.removeAttribute('disabled');
						periodSelect.value = '0' ;
						periodAmount.innerHTML = periodSelect.value;
					});
					resultInputAll.forEach(function(elem){
						elem.value = '';
					});

					for (let i = 1; i < incomeItems.length; i++){
						incomeItems[i].parentNode.removeChild(incomeItems[i]);
						incomePlus.style.display = 'block';
					}
					for (let i = 1; i < expensesItems.length; i++){
						expensesItems[i].parentNode.removeChild(expensesItems[i]);
						expensesPlus.style.display = 'block';
					}
					
					this.budget = 0;
					this.budgetDay = 0;
					this.budgetMonth = 0;
					this.income = {};
					this.incomeMonth = 0;
					this.addIncome = [];
					this.expenses = {};
					this.expensesMonth = 0;
					this.precentDeposit = 0;
					this.moneyDeposit = 0;
					this.addExpenses = [];
		
					cancel.style.display = 'none';
					start.style.display = 'block';
					incomePlus.removeAttribute('disabled');
					expensesPlus.removeAttribute('disabled');
					getCheckBox.checked = false;
				},
				getExpensesMonth: function (){
					for ( let key in this.expenses) {
						this.expensesMonth += this.expenses[key];
					}
				},
				getBudget: function () {
					this.budgetMonth = this.budget + this.incomeMonth - this.expensesMonth;
					this.budgetDay = Math.floor(this.budgetMonth / 30);
					return;
				},
		
				getTargetMonth: function (){
					return Math.ceil(getTargetAmount.value / this.budgetMonth);
				},
			
				 getStatusIncome: function () {
					if (this.budgetDay >= 1200) {
						return("У вас высокий уровень дохода");
					} else if (this.budgetDay > 600 && this.budgetDay < 1200) {
						return('У вас средний уровень дохода');
					} else if (this.budgetDay <=600 && this.budgetDay  > 0) {
						return('К сожалению у вас уровень дохода ниже среднего');
					} else if (this.budgetDay < 0) {
						return('Что то пошло не так');
					}
				},
				getInfoDeposit: function () {
					if(this.deposit){
						do{
							this.precentDeposit = +prompt('Какой годовой процент?' , "10");
							 } while (!isNumbers(this.precentDeposit));//пока пользователь не введёт число
							 do{
								appData.moneyDeposit = +prompt('Какая сумма заложена?' , 10000);
								 } while (!isNumbers(this.moneyDeposit));//пока пользователь не введёт число
					}
				},
				calcPeriod: function () {
					return  this.budgetMonth * periodSelect.value;
				},
			};
			start.addEventListener('click', appData.start.bind.appData);
			expensesPlus.addEventListener('click' , appData.addExpensesBlock);
			incomePlus.addEventListener('click' , appData.addIncomeBlock);
			salaryAmount.addEventListener('keyup', appData.check);
			cancel.addEventListener('click' , appData.reset.bind.appData);
			
			periodSelect.addEventListener('input', function () {
				periodAmount.innerHTML = periodSelect.value;
			});
			
	// 				});
			// appData.getInfoDeposit();
			// appData.calcPeriod();
						
			// for (let keys in appData) {
			// 	console.log("Наша программа    включает в себя данные." + keys + " = " + appData[keys] + []);
			// }
			

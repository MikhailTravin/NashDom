function select() {
	const optionMenus = document.querySelectorAll('.select__menu');

	optionMenus.forEach(optionMenu => {
		const selectBtn = optionMenu.querySelector('.select__btn');
		const options = optionMenu.querySelectorAll('.select__option');
		const sBtntext = optionMenu.querySelector('.select__btntext input');
		const sBtnstext = optionMenu.querySelector('.select__btntext');

		// Открытие/закрытие выпадающего списка
		if (selectBtn) {
			selectBtn.addEventListener("click", function (e) {
				let elem_active = optionMenu.classList.contains("_active");
				optionMenus.forEach(opt => opt.classList.remove('_active'));
				optionMenu.classList.toggle("_active", !elem_active);
			});
		}

		// Обработка выбора опции
		options.forEach(option => {
			option.addEventListener("click", function (e) {
				const optionText = option.querySelector('.select__option-text');
				if (optionText) {
					sBtntext.value = optionText.textContent.trim();
				}
				options.forEach(el => el.classList.remove('_active'));
				option.classList.add("_active");
				optionMenu.classList.remove("_active");
			});
		});

		// Закрытие списка при клике вне области
		window.addEventListener('click', e => {
			const target = e.target;
			if (!target.closest('.select__options') && !target.closest('.select__menu')) {
				optionMenu.classList.remove("_active");
			}
		});
	});
}

// Инициализация
select();
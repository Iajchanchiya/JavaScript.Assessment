document.getElementById('bookingChoice').addEventListener('change', function() {
    const bookingChoice = this.value;
    const dynamicFields = document.getElementById('dynamicFields');

    // Clear previous dynamic fields
    while (dynamicFields.firstChild) {
        dynamicFields.removeChild(dynamicFields.firstChild);
    }

    // Create date field
    const dateLabel = document.createElement('label');
    dateLabel.setAttribute('for', 'date');
    dateLabel.textContent = 'Date:';
    dynamicFields.appendChild(dateLabel);

    const dateInput = document.createElement('input');
    dateInput.setAttribute('type', 'date');
    dateInput.setAttribute('id', 'date');
    dateInput.setAttribute('name', 'date');
    dateInput.setAttribute('required', 'required');
    dynamicFields.appendChild(dateInput);

    if (bookingChoice === 'Half day booking') {
        // Create slot field
        const slotLabel = document.createElement('label');
        slotLabel.setAttribute('for', 'slot');
        slotLabel.textContent = 'Slot:';
        dynamicFields.appendChild(slotLabel);

        const slotSelect = document.createElement('select');
        slotSelect.setAttribute('id', 'slot');
        slotSelect.setAttribute('name', 'slot');
        slotSelect.setAttribute('required', 'required');

        const slotOptions = ['', 'Breakfast', 'Lunch', 'Dinner'];
        slotOptions.forEach(optionText => {
            const option = document.createElement('option');
            option.setAttribute('value', optionText);
            option.textContent = optionText ? optionText : 'Select...';
            slotSelect.appendChild(option);
        });

        dynamicFields.appendChild(slotSelect);
    } else if (bookingChoice === 'Hourly booking') {
        // Create time field
        const timeLabel = document.createElement('label');
        timeLabel.setAttribute('for', 'time');
        timeLabel.textContent = 'Time:';
        dynamicFields.appendChild(timeLabel);

        const timeInput = document.createElement('input');
        timeInput.setAttribute('type', 'time');
        timeInput.setAttribute('id', 'time');
        timeInput.setAttribute('name', 'time');
        timeInput.setAttribute('required', 'required');
        dynamicFields.appendChild(timeInput);
    }
});

document.getElementById('bookingForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent the form from submitting the default way

    // Get form values
    const bookingChoice = document.getElementById('bookingChoice').value;
    const name = document.getElementById('name').value;
    const phone = document.getElementById('phone').value;
    const email = document.getElementById('email').value;
    const guests = document.getElementById('guests').value;
    const date = document.getElementById('date') ? document.getElementById('date').value : '';
    const slot = document.getElementById('slot') ? document.getElementById('slot').value : '';
    const time = document.getElementById('time') ? document.getElementById('time').value : '';

    // Form validation
    if (bookingChoice && name && phone && email && guests && date && (slot || time || bookingChoice === 'Full day booking')) {
        // Assuming form submission is successful
        const confirmationMessage = `Thank you, ${name}! Your booking (${bookingChoice}) for ${guests} guests on ${date}` +
            (slot ? ` (${slot} slot)` : (time ? ` at ${time}` : '')) + ` has been received.`;
        document.getElementById('confirmationMessage').textContent = confirmationMessage;
        document.getElementById('confirmationMessage').style.display = 'block';

        // Clear form
        document.getElementById('bookingForm').reset();
        while (dynamicFields.firstChild) {
            dynamicFields.removeChild(dynamicFields.firstChild);
        }
    } else {
        alert('Please fill out all required fields.');
    }
});

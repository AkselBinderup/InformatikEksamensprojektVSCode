function updateSliderValue(sliderId, displayId) {
    const slider = document.getElementById(sliderId);
    const sliderValue = document.getElementById(displayId);
    sliderValue.textContent = slider.value;
  }

  function toggleEquipmentView() {
    const selectedType = document.getElementById('equipmentType').value;
    const pcBox = document.getElementById('pcEquipmentBox');
    const networkBox = document.getElementById('networkEquipmentBox');

    pcBox.classList.add('hidden');
    networkBox.classList.add('hidden');

    if (selectedType === 'pc') {
      pcBox.classList.remove('hidden');
    } else if (selectedType === 'network') {
      networkBox.classList.remove('hidden');
    }
  }

  function calculateEstimate() {
    const numPeople = parseInt(document.getElementById('numPeople').value);
    const numPCs = parseInt(document.getElementById('numPCs').value);

    // PC-udstyr
    const pcCheckboxes = document.querySelectorAll('#pcEquipment input[type="checkbox"]');
    const selectedPCEquipment = Array.from(pcCheckboxes)
      .filter(checkbox => checkbox.checked)
      .map(checkbox => checkbox.value);

    // Netværksudstyr
    const networkCheckboxes = document.querySelectorAll('#networkEquipment input[type="checkbox"]');
    const selectedNetworkEquipment = Array.from(networkCheckboxes)
      .filter(checkbox => checkbox.checked)
      .map(checkbox => checkbox.value);

    if (!numPeople || !numPCs || (selectedPCEquipment.length === 0 && selectedNetworkEquipment.length === 0)) {
      alert('Vælg venligst antal personer, PC\'er og mindst ét udstyr.');
      return;
    }

    let estimate = `For ${numPeople} personer og ${numPCs} PC'er, skal du bruge:\n`;

    // PC-udstyr
    if (selectedPCEquipment.includes('monitor')) {
      estimate += `- ${numPCs} Skærme\n`;
    }
    if (selectedPCEquipment.includes('keyboard')) {
      estimate += `- ${numPCs} Tastaturer\n`;
    }
    if (selectedPCEquipment.includes('mouse')) {
      estimate += `- ${numPCs} Mus\n`;
    }
    if (selectedPCEquipment.includes('headset')) {
      estimate += `- ${numPCs} Headsets\n`;
    }
    if (selectedPCEquipment.includes('extensionCord')) {
      const cords = Math.ceil(numPeople / 5); // 1 forlængerledning pr. 5 personer
      estimate += `- ${cords} Forlængerledninger\n`;
    }

    // Netværksudstyr
    if (selectedNetworkEquipment.includes('router')) {
      estimate += `- 1 Router\n`;
    }
    if (selectedNetworkEquipment.includes('switch')) {
      const switches = Math.ceil(numPeople / 24); // 1 switch pr. 24 forbindelser
      estimate += `- ${switches} Netværksswitch(es)\n`;
    }
    if (selectedNetworkEquipment.includes('ethernet')) {
      estimate += `- ${numPeople} Ethernetkabler\n`;
    }
    if (selectedNetworkEquipment.includes('accessPoint')) {
      const accessPoints = Math.ceil(numPeople / 15); // 1 access point pr. 15 forbindelser
      estimate += `- ${accessPoints} Access Point(s)\n`;
    }

    // Båndbredde og omkostninger
    const bandwidth = numPeople * 10; // 10 Mbps pr. person
    estimate += `\nInternetbåndbredde: ${bandwidth} Mbps\n`;

    const costPerPC = 50; // Eksempelpris pr. PC
    const totalCost = numPCs * costPerPC;
    estimate += `\nEstimerede omkostninger: $${totalCost}`;

    document.getElementById('estimateText').innerText = estimate;
    document.getElementById('result').style.display = 'block';
  }
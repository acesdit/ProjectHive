document.addEventListener("DOMContentLoaded", () => {
    
    // --- DATA ---
    // This object holds all conversion logic.
    // 'base': The common unit all others are converted to/from (e.g., meters for length).
    // 'units': Contains all units for the category.
    // 'toBase': The factor to multiply by to get the 'base' unit.
    const conversionData = {
        length: {
            name: "Length",
            icon: "bi-rulers",
            base: "meters",
            units: {
                meters: { name: "Meters (m)", toBase: 1 },
                kilometers: { name: "Kilometers (km)", toBase: 1000 },
                centimeters: { name: "Centimeters (cm)", toBase: 0.01 },
                miles: { name: "Miles (mi)", toBase: 1609.34 },
                feet: { name: "Feet (ft)", toBase: 0.3048 },
                inches: { name: "Inches (in)", toBase: 0.0254 }
            }
        },
        mass: {
            name: "Mass",
            icon: "bi-speedometer2",
            base: "kilograms",
            units: {
                kilograms: { name: "Kilograms (kg)", toBase: 1 },
                grams: { name: "Grams (g)", toBase: 0.001 },
                milligrams: { name: "Milligrams (mg)", toBase: 0.000001 },
                pounds: { name: "Pounds (lb)", toBase: 0.453592 },
                ounces: { name: "Ounces (oz)", toBase: 0.0283495 }
            }
        },
        temperature: {
            name: "Temperature",
            icon: "bi-thermometer-half",
            base: "celsius", // Base for logic, not a multiplier
            units: {
                celsius: { name: "Celsius (°C)" },
                fahrenheit: { name: "Fahrenheit (°F)" },
                kelvin: { name: "Kelvin (K)" }
            }
        },
        speed: {
            name: "Speed",
            icon: "bi-broadcast",
            base: "m/s",
            units: {
                "m/s": { name: "Meters/second (m/s)", toBase: 1 },
                "km/h": { name: "Kilometers/hour (km/h)", toBase: 0.277778 },
                "mph": { name: "Miles/hour (mph)", toBase: 0.44704 },
                "knots": { name: "Knots", toBase: 0.514444 }
            }
        },
        time: {
            name: "Time",
            icon: "bi-clock-history",
            base: "seconds",
            units: {
                seconds: { name: "Seconds", toBase: 1 },
                minutes: { name: "Minutes", toBase: 60 },
                hours: { name: "Hours", toBase: 3600 },
                days: { name: "Days", toBase: 86400 }
            }
        },
        volume: {
            name: "Volume",
            icon: "bi-droplet-fill",
            base: "liters",
            units: {
                liters: { name: "Liters (L)", toBase: 1 },
                milliliters: { name: "Milliliters (mL)", toBase: 0.001 },
                gallons: { name: "US Gallons (gal)", toBase: 3.78541 },
                quarts: { name: "US Quarts (qt)", toBase: 0.946353 }
            }
        }
    };

    // --- DOM ELEMENTS ---
    const categorySelection = document.getElementById("category-selection");
    const categoryGrid = document.getElementById("category-grid");
    const converterInterface = document.getElementById("converter-interface");
    const converterTitle = document.getElementById("converter-title");
    const backButton = document.getElementById("back-button");
    const inputValue = document.getElementById("input-value");
    const outputValue = document.getElementById("output-value");
    const fromUnit = document.getElementById("from-unit");
    const toUnit = document.getElementById("to-unit");
    const swapButton = document.getElementById("swap-button");
    const errorMessage = document.getElementById("error-message");

    let currentCategory = null; // Stores the key of the selected category

    // --- FUNCTIONS ---

    /**
     * Initializes the app by creating category cards.
     */
    function init() {
        // Create a card for each category in the conversionData
        Object.keys(conversionData).forEach(key => {
            const category = conversionData[key];
            const col = document.createElement("div");
            col.className = "col";
            
            // Create the clickable card
            const card = document.createElement("a");
            card.href = "#";
            card.className = "category-card";
            card.dataset.category = key; // Store category key in data attribute
            
            card.innerHTML = `
                <i class="bi ${category.icon}"></i>
                <span>${category.name}</span>
            `;

            // Add click listener to show the converter interface
            card.addEventListener("click", (e) => {
                e.preventDefault();
                showConverterInterface(key);
            });

            col.appendChild(card);
            categoryGrid.appendChild(col);
        });

        // Add event listeners for the converter controls
        backButton.addEventListener("click", showCategorySelection);
        swapButton.addEventListener("click", handleSwap);
        inputValue.addEventListener("input", handleConversion);
        fromUnit.addEventListener("change", handleConversion);
        toUnit.addEventListener("change", handleConversion);
    }

    /**
     * Hides the converter and shows the category selection grid.
     */
    function showCategorySelection() {
        categorySelection.classList.remove("d-none");
        converterInterface.classList.add("d-none");
        currentCategory = null;
    }

    /**
     * Shows the converter interface for a specific category.
     * @param {string} categoryKey - The key of the category (e.g., "length").
     */
    function showConverterInterface(categoryKey) {
        currentCategory = categoryKey;
        const category = conversionData[categoryKey];

        // Set the title (e.g., "Length Converter")
        converterTitle.textContent = `${category.name} Converter`;

        // Populate the unit dropdowns
        populateUnitDropdowns(category.units);
        
        // Show the converter and hide categories
        categorySelection.classList.add("d-none");
        converterInterface.classList.remove("d-none");

        // Perform an initial conversion
        handleConversion();
    }

    /**
     * Populates the 'from' and 'to' dropdowns with units for the current category.
     * @param {object} units - The units object from conversionData.
     */
    function populateUnitDropdowns(units) {
        fromUnit.innerHTML = "";
        toUnit.innerHTML = "";

        // Create <option> for each unit
        Object.keys(units).forEach(unitKey => {
            const unit = units[unitKey];
            const option = new Option(unit.name, unitKey);
            
            fromUnit.add(option.cloneNode(true));
            toUnit.add(option);
        });

        // Set default values (e.g., first and second unit)
        fromUnit.selectedIndex = 0;
        toUnit.selectedIndex = 1;
    }

    /**
     * Swaps the 'from' and 'to' units and recalculates.
     */
    function handleSwap() {
        const fromIndex = fromUnit.selectedIndex;
        fromUnit.selectedIndex = toUnit.selectedIndex;
        toUnit.selectedIndex = fromIndex;
        handleConversion(); // Recalculate after swapping
    }

    /**
     * The main conversion logic.
     */
    function handleConversion() {
        const input = parseFloat(inputValue.value);
        const from = fromUnit.value;
        const to = toUnit.value;

        // Validate input
        if (isNaN(input) && inputValue.value !== "") {
            showError("Please enter a valid number.");
            outputValue.value = "";
            return;
        } else if (inputValue.value === "") {
             hideError();
             outputValue.value = "";
             return;
        }
        hideError();

        let result;
        const category = conversionData[currentCategory];

        // --- Special Case: Temperature ---
        if (currentCategory === "temperature") {
            let tempInCelsius;
            if (from === "fahrenheit") {
                tempInCelsius = (input - 32) * 5 / 9;
            } else if (from === "kelvin") {
                tempInCelsius = input - 273.15;
            } else { // Already Celsius
                tempInCelsius = input;
            }
            
            if (to === "fahrenheit") {
                result = (tempInCelsius * 9 / 5) + 32;
            } else if (to === "kelvin") {
                result = tempInCelsius + 273.15;
            } else { // Target is Celsius
                result = tempInCelsius;
            }
        } 
        // --- Standard Conversion Logic (for all other categories) ---
        else {
            const fromUnitData = category.units[from];
            const toUnitData = category.units[to];
            
            // 1. Convert 'from' unit to the base unit
            const valueInBase = input * fromUnitData.toBase;
            
            // 2. Convert from base unit to the 'to' unit
            result = valueInBase / toUnitData.toBase;
        }

        // Format the result to a reasonable number of decimal places
        outputValue.value = parseFloat(result.toFixed(6));
    }

    /**
     * Shows the error message box.
     * @param {string} message - The error message to display.
     */
    function showError(message) {
        errorMessage.textContent = message;
        errorMessage.classList.remove("d-none");
    }

   
    function hideError() {
        errorMessage.classList.add("d-none");
    }

    init();
});
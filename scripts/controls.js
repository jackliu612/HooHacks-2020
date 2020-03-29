/*
    TRANSMISSION RADIUS
 */
var transmissionRadiusSlider = document.getElementById("transmissionRadius");
var transmissionRadiusOutput = document.getElementById("transmissionRadiusLabel");
transmissionRadiusOutput.innerHTML = "" + 10;

transmissionRadiusSlider.oninput = function () {
    transmissionRadiusOutput.innerHTML = "" + (10 * (this.value) / 50);
    TRANSMISSION_RADIUS = 10 * (this.value) / 50;
};

/*
    LETHALITY
 */
var lethalitySlider = document.getElementById("lethality");
var lethalityOutput = document.getElementById("lethalityLabel");
lethalityOutput.innerHTML = "" + 0.01;

lethalitySlider.oninput = function () {
    var val = sliderFunc(50, this.value);
    lethalityOutput.innerHTML = truncate(0.01 * val);
    FATALITY_FACTOR = 0.01 * val;
};

/*
    RECOVERY
 */
var recoverySlider = document.getElementById("recovery");
var recoveryOutput = document.getElementById("recoveryLabel");
recoveryOutput.innerHTML = "" + 0.05;

recoverySlider.oninput = function () {
    var val = sliderFunc(4, this.value);
    recoveryOutput.innerHTML = truncate(0.05 * val);
    RECOVERY_FACTOR = 0.05 * val;
};

/*
    Population
 */
var populationSlider = document.getElementById("population");
var populationOutput = document.getElementById("populationLabel");
populationOutput.innerHTML = "" + 200;

populationSlider.oninput = function () {
    populationOutput.innerHTML = this.value;
    POP_SIZE = this.value;
};

/*
    TRAVEL RATE
 */
var travelRateSlider = document.getElementById("travelRate");
var travelRateOutput = document.getElementById("travelRateLabel");
travelRateOutput.innerHTML = "" + 0.05;

travelRateSlider.oninput = function () {
    var val = sliderFunc(8, this.value);
    travelRateOutput.innerHTML = truncate(0.05 * val);
    TRAVEL_RATE = 0.05 * val;
};

/*
    TRAVEL THRESHOLD
 */
var travelThresholdSlider = document.getElementById("travelThreshold");
var travelThresholdOutput = document.getElementById("travelThresholdLabel");
travelThresholdOutput.innerHTML = "" + 1 / 4;

travelThresholdSlider.oninput = function () {
    var val = sliderFunc(8, this.value);
    travelThresholdOutput.innerHTML = truncate(1 / 4 * val);
    TRAVEL_THRESHOLD = 1 / 4 * val;
};

function sliderFunc(b, x) {
    if (x == 0) {
        return 0;
    }
    return Math.pow(b, (x - 50) / 50);
}

function truncate(x) {
    return Math.floor(x * 100) / 100;
}
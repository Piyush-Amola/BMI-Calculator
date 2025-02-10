function calculate() {
  const weight = parseFloat(document.getElementById("weight").value);
  const height = parseFloat(document.getElementById("height").value);
  const age = parseInt(document.getElementById("age").value);
  const genderElement = document.querySelector('input[name="gender"]:checked');
  const error = "Please enter valid values";

  if (isNaN(weight) || weight <= 0) {
    document.getElementById("results").innerHTML =
      "Please enter a valid positive number for weight.";
    return;
  }

  if (isNaN(height) || height <= 0) {
    document.getElementById("results").innerHTML =
      "Please enter a valid positive number for height.";
    return;
  }

  if (age && (isNaN(age) || age <= 0)) {
    document.getElementById("results").innerHTML =
      "Please enter a valid positive number for age.";
    return;
  }

  if (!genderElement) {
    document.getElementById("results").innerHTML = "Please select a gender.";
    return;
  }

  const gender = genderElement.value;

  const heightInMeters = height / 100;

  let bmi = weight / (heightInMeters * heightInMeters);
  bmi = bmi.toFixed(1);

  const bmiPrime = (bmi / 25).toFixed(1);

  const ponderalIndex = (heightInMeters * 100) / Math.pow(weight, 1 / 3);
  const ponderalIndexFixed = ponderalIndex.toFixed(1);

  const healthyWeightLower = (18.5 * heightInMeters * heightInMeters).toFixed(
    1
  );
  const healthyWeightUpper = (25 * heightInMeters * heightInMeters).toFixed(1);

  let measure = "";

  if (bmi <= 18.4) {
    measure = "<span> BMI = " + bmi + "  kg/m2  </span>  (Underweight)";
    document.getElementById("results").classList.add("underweight");
  } else if (bmi >= 18.5 && bmi <= 24.9) {
    measure = "<span> BMI = " + bmi + " kg/m2  </span>  (Normal)";
    document.getElementById("results").classList.add("normal");
  } else if (bmi >= 25 && bmi <= 29.9) {
    measure = "<span> BMI = " + bmi + "  kg/m2   </span> (Overweight)";
    document.getElementById("results").classList.add("overweight");
  } else if (bmi >= 30) {
    measure = "<span> BMI = " + bmi + " kg/m2  </span> (Obese)";
    document.getElementById("results").classList.add("obese");
  }

  measure += `
  <span class="message">
  <br> 
    <br> Healthy weight for your height: ${healthyWeightLower} kg - ${healthyWeightUpper} kg
    <br> BMI Prime: ${bmiPrime}
    <br> Ponderal Index: ${ponderalIndexFixed} kg/m³
    <span>
  `;

  if (age && age >= 18) {
    if (bmi >= 30) {
      measure +=
        " <br> It's recommended to consult with a healthcare provider for weight management.";
    } else if (bmi >= 25) {
      measure +=
        " <br> Consider adopting a healthy eating plan and regular exercise.";
    } else if (bmi < 18.5) {
      measure +=
        " <br> It's a good idea to increase your caloric intake and consider consulting a dietitian.";
    }
  }

  document.getElementById("results").innerHTML = measure;
}

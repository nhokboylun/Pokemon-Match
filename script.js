let end = false;
let i = 1;
let total = 0;
while (!end) {
  const main = document.getElementById("main");
  let hour = prompt(
    `Please enter total hour of employee ${i} (Enter -1 or hit cancel to stop)`
  );
  let hourInt = parseFloat(hour);
  if (hour !== "-1" && !isNaN(hourInt) && hourInt >= 0) {
    hourInt = hourInt.toFixed(2);
    let totalPay = 0;
    if (hourInt <= 40) {
      totalPay = 15 * hourInt;
    } else {
      totalPay = 15 * 40 + ((15 * 3) / 2) * (hourInt - 40);
    }
    total += totalPay;
    main.innerHTML += `
    <tr>
      <td>${i}</td>
      <td>$15</td>
      <td>${hourInt}</td>
      <td>$${totalPay.toFixed(2)}</td>
    </tr>
    `;
    i++;
  } else if (hour === "-1" && i === 1) {
    if (
      confirm("You did not enter any hour yet, are you sure you want to stop?")
    ) {
      end = true;
    }
  } else if (hour === "-1" || hour === null) {
    end = true;
    const tableElement = document.querySelector("table");
    const newParagraph = document.createElement("h2");
    newParagraph.textContent = `In summary, the total amount you have to pay for employee is: $${total.toFixed(
      2
    )}`;
    newParagraph.style.textAlign = "center";
    tableElement.insertAdjacentElement("afterend", newParagraph);
  } else if (hourInt < 0) {
    alert("You input negative number, try again");
  } else if (isNaN(hourInt)) {
    alert("Your input is not a number, try again");
  }
}

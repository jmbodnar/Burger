(function(d) {
  "use strict";

  // ----- Variables ----- //

  const burgerForm = d.querySelector("#burger-form");
  const errorMessage = d.querySelector("#error-message");
  const uneatenList = d.querySelector("#uneaten-list");
  const eatenList = d.querySelector("#eaten-list");

  // ----- Functions ----- //

  const checkBurgerInput = input => {
    const inputValue = input.value.replace(/\bburger/gi, "").trim();
    const result = {
      valid: false,
      message: "",
      value: inputValue
    };

    if (inputValue.length < 2) {
      result.valid = false;
      result.message =
        "The first word in your burger's name must be more than 2 characters long.";
      return result;
    } else {
      result.valid = true;
      return result;
    }
  };

  const devourBurger = (id, devoured) => {
    fetch("/api/eatone", {
      method: "PUT",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ id, devoured })
    })
      .then(response => {
        if (response.ok) return response;
        else Promise.reject(response);
      })
      .then(result => {})
      .catch(error => {
        console.error(error);
      });
  };

  const barfBurger = id => {
    fetch("/api/barfone", {
      method: "PUT",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ id })
    })
      .then(response => {
        if (response.ok) return response;
        else Promise.reject(response);
      })
      .then(result => {})
      .catch(error => {
        console.error(error);
      });
  };

  const updateBurgerLists = () => {
    fetch("/api/all")
      .then(response => {
        if (response.ok) return response.json();
        else throw response;
      })
      .then(result => {
        updateUneaten(result);
        updateEaten(result);
      })
      .catch(error => {
        console.log(error);
      });
  };

  const updateUneaten = data => {
    let list = document.querySelector("#uneaten-list");
    let content = data
      .filter(datum => datum.devoured == "0")
      .map(datum => {
        return `<li class="list-group-item d-flex justify-content-between align-items-center">${datum.burger_name} Burger <button class="btn btn-outline-primary badge badge-outline-primary badge-pill" data-devoured="true" data-id="${datum.id}">Devour Burger</button></li>`;
      });
    list.innerHTML = content.join("");
  };

  const updateEaten = data => {
    let list = document.querySelector("#eaten-list");
    let content = data
      .filter(datum => datum.devoured == "1")
      .map(datum => {
        return `<li class="list-group-item d-flex justify-content-between align-items-center">${datum.burger_name} Burger <button class="btn btn-outline-primary badge badge-outline-primary badge-pill" data-devoured="true" data-id="${datum.id}">Barf Burger</button></li>`;
      });
    list.innerHTML = content.join("");
  };

  // ----- Inits & Listeners ----- //
  burgerForm.addEventListener(
    "submit",
    event => {
      event.preventDefault();
      let check = checkBurgerInput(burgerForm.querySelector("input"));
      if (!check.valid) {
        errorMessage.classList.add("alert", "alert-danger");
        errorMessage.textContent = check.message;

        setTimeout(() => {
          errorMessage.classList.remove("alert", "alert-danger");
          errorMessage.textContent = "";
        }, 5000);
      } else {
        burgerForm.querySelector("input").value = check.value;
        event.target.submit();
      }
    },
    {
      capture: false,
      once: false
    }
  );

  uneatenList.addEventListener(
    "click",
    event => {
      if (event.target.matches("button")) {
        const id = event.target.dataset.id;
        // const devoured = event.target.dataset.devoured;
        devourBurger(id);
        updateBurgerLists();
      }
    },
    {
      capture: false,
      once: false
    }
  );

  eatenList.addEventListener(
    "click",
    event => {
      if (event.target.matches("button")) {
        const id = event.target.dataset.id;
        barfBurger(id);
        updateBurgerLists();
      }
    },
    {
      capture: false,
      once: false
    }
  );
})(document);

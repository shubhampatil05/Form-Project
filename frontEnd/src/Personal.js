import React, { useEffect, useState } from "react";
import Users from "./Users";
import axios from "axios";
const Personal = () => {
  const [data, setData] = useState({
    abr: "",
    firstName: "",
    lastName: "",
    dob: "",
    userName: "",
    mobile: "",
    city: "",
    state: "",
    currentAge: { years: 0, months: 0, days: 0 },
  });

  const [addData, setAddData] = useState([]);
  const [user, setUser] = useState([]);
  const [disable, setDisable] = useState(true);
  const [search, setSearch] = useState("");
  const [toggle, setToggle] = useState(false);
  const [itemId, setItemId] = useState("");
  const [toggleSubmit, setToggleSubmit] = useState(true);
  const [index, setIndex] = useState();
  const [error, setError] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;

    setData({
      ...data,
      [name]: value,
    });

    if (data.firstName.length > 10) {
      setData({ ...data, firstName: data.firstName.slice(0, -1) });
    }

    if (data.lastName.length > 10) {
      setData({ ...data, lastName: data.lastName.slice(0, -1) });
    }

    if (data.userName.length > 10) {
      setData({ ...data, userName: data.userName.slice(0, -1) });
    }
    if (data.city.length > 15) {
      setData({ ...data, city: data.city.slice(0, -1) });
    }
    if (data.state.length > 15) {
      setData({ ...data, state: data.state.slice(0, -1) });
    }
    if (isNaN(data.mobile)) {
      setData({ ...data, mobile: data.mobile.slice(0, -1) });
    }

    if (data.mobile.length > 10) {
      setData({ ...data, mobile: data.mobile.slice(0, -1) });
    }
  };

  //---------------------

  const validation = (e) => {
    if (data.mobile.length > 10) {
      setData({ ...data, mobile: data.mobile.slice(0, -1) });
    }
    if (isNaN(data.mobile)) {
      setData({ ...data, mobile: data.mobile.slice(0, -1) });
    }
    if (data.mobile.charAt(0) < 7) {
      setData({ ...data, mobile: data.mobile.slice(0, -1) });
    } else {
      setError({ ...error, [e.target.name]: "" });
    }
    if (data.userName.length > 10) {
      setData({ ...data, userName: data.userName.slice(0, -1) });
    }
    if (data.city.length > 15) {
      setData({ ...data, city: data.city.slice(0, -1) });
    }
    if (data.state.length > 15) {
      setData({ ...data, state: data.state.slice(0, -1) });
    }
  };

  //---------------------

  // Valid mobile number..
  const handleValidation = (e) => {
    if (data.mobile.length < 10) {
      setError({ ...error, [e.target.name]: "Invalid Mobile Number" });
    } else {
      setError({ ...error, [e.target.name]: "" });
    }
  };

  // Find the current age of user..
  function calculateAge() {
    const birthDateObj = new Date(data.dob);
    const now = new Date();
    const diff = now - birthDateObj;

    const ageDate = new Date(diff);
    const years = Math.abs(ageDate.getUTCFullYear() - 1970);
    const months = ageDate.getUTCMonth();
    const days = ageDate.getUTCDate() - 1;

    setData({ ...data, currentAge: { years, months, days } });
  }

  const handleFields = () => {
    if (data.abr !== "") {
      setDisable(false);
    }
  };

  const handleSearch = () => {
    setToggle(true);
  };
  // Edit the use details..
  const handleEdit = (id) => {
    setItemId(id);
    setToggleSubmit(false);

    console.log(itemId);

    const editItem =
      user &&
      user.find((item, indx) => {
        return index === indx;
      });

    setData(editItem);
  };

  //-------------------
  // Disabled Future Date..
  const today = new Date();
  const maxDate = today.toISOString().slice(0, 10);
  // console.log(maxDate);
  //-------------------
  const handleSubmit = async (e) => {
    e.preventDefault();

    // If any field is empty then user see a alert msg..
    if (
      data.firstName === "" ||
      data.lastName === "" ||
      data.dob === "" ||
      data.mobile === "" ||
      data.city === "" ||
      data.state === ""
    ) {
      alert("Fill Out All Fields");
    } else {
      setAddData(() => {
        return [...addData, data];
      });
    }

    setDisable(true);
    setData({
      abr: "",
      firstName: "",
      lastName: "",
      city: "",
      dob: "",
      userName: "",
      mobile: "",
      state: "",
      currentAge: { years: 0, months: 0, days: 0 },
    });

    //----------Back-End Connection---------//

    const {
      abr,
      firstName,
      lastName,
      city,
      userName,
      mobile,
      state,
      currentAge,
      dob,
    } = data;

    // Post the user details in database..

    const res = await fetch("http://localhost:5200/ragister/:users", {
      method: "POST",

      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify({
        abr,
        firstName,
        lastName,
        currentAge,
        userName,
        mobile,
        city,
        state,
        dob,
      }),
    });

    const result = await res.json();

    // If user try to ragister with the mobile number which is already exist in database..it shows a alert the "USER ALREADY EXIST"

    const message = await result.message;

    if (message === "User already exits!!!") {
      alert("User Already Exist");
    } else if (message === "Form submitted sucessfully!!!") {
      alert("Form Has Been Submitted SuccessFully");
    }
  };

  // Get the data by using get method..
  const getUser = async () => {
    const res = await fetch("http://localhost:5200/ragister/:users", {
      method: "GET",

      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Headers":
          "Origin, X-Requested-With, Content-Type, Accept, Z-Key",
        "Access-Control-Allow-Methods": "GET, HEAD, POST, PUT, DELETE, OPTIONS",
      },
    });

    let result = await res.json();

    setUser(result);
  };

  useEffect(() => {
    getUser();
  });
  //------------------
  // Update the user details

  const handleUpdate = (e) => {
    e.preventDefault();
    setDisable(true);
    setToggleSubmit(true);

    setData({
      abr: "",
      firstName: "",
      lastName: "",
      city: "",
      userName: "",
      mobile: "",
      state: "",
      dob: "",

      currentAge: { years: 0, months: 0, days: 0 },
    });

    const {
      abr,
      firstName,
      lastName,
      city,
      userName,
      mobile,
      state,
      currentAge,
      dob,
    } = data;

    // Update the user details using "put" method..

    axios
      .put(`http://localhost:5200/ragister/:users/${itemId}`, {
        abr,
        firstName,
        lastName,
        city,
        userName,
        mobile,
        state,
        currentAge,
        dob,
      })
      .then((response) => {
        console.log("Document updated successfully:", response.data);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  return (
    <>
      <div className="Personal">
        <div className="form-name container mt-5">
          <form method="get">
            <div className="form-row">
              <div className="search-data">
                <input
                  type="text"
                  placeholder="Search Data"
                  onChange={(e) => {
                    setSearch(e.target.value);
                  }}
                />

                <i
                  className="fa-solid fa-magnifying-glass"
                  onClick={handleSearch}
                />
              </div>

              <div className="col-md-4 mb-3">
                <select
                  className="form-select mt-5"
                  aria-label="Default select example"
                  onChange={handleChange}
                  name="abr"
                  onClick={handleFields}
                  value={data.abr}
                >
                  <option disabled value="" selected>
                    Select
                  </option>
                  <option value="Mr.">Mr</option>
                  <option value="Mrs.">Mrs</option>
                  <option value="Miss.">Miss</option>
                </select>
              </div>

              <div className="col-md-4 mb-3">
                <label htmlFor="validationDefault01">First Name*</label>
                <input
                  type="text"
                  className="form-control"
                  id="validationDefault01"
                  placeholder="First Name"
                  required
                  autoComplete="off"
                  onChange={handleChange}
                  name="firstName"
                  value={data.firstName}
                  disabled={disable}
                />

                <span className="text-danger">{error.firstName}</span>
              </div>
              <div className="col-md-4 mb-3">
                <label htmlFor="validationDefault02">Last Name*</label>
                <input
                  type="text"
                  className="form-control"
                  id="validationDefault02"
                  placeholder="Last Name"
                  required
                  autoComplete="off"
                  onChange={handleChange}
                  name="lastName"
                  value={data.lastName}
                  disabled={disable}
                  onKeyUp={validation}
                />
                <span className="text-danger">{error.lastName}</span>
              </div>

              <div className="col-md-4 mb-3">
                <label htmlFor="validationDefault02">Check Your Name..</label>
                <input
                  type="text"
                  className="form-control fullname"
                  id="validationDefault02"
                  required
                  autoComplete="off"
                  value={`${data.abr} ${data.firstName} ${data.lastName}`}
                  readOnly
                  disabled={disable}
                />
              </div>

              <div className="col-md-4 md-3">
                <label>Select Date Of Birth</label>
                <br />
                <input
                  type="date"
                  onChange={handleChange}
                  name="dob"
                  value={data.dob}
                  max={maxDate}
                  onBlur={calculateAge}
                  disabled={disable}
                  onKeyUp={validation}
                />
              </div>

              <div className="col-md-4 mb-3">
                <label>Age</label>
                <br />

                <div className="age">
                  <table>
                    <thead>
                      <tr>
                        <th>Years</th>
                        <th>Months</th>
                        <th>Days</th>
                      </tr>
                    </thead>

                    <tbody>
                      <tr>
                        <td>
                          <input
                            type="number"
                            className="ages"
                            name="years"
                            value={data.currentAge.years}
                            readOnly
                            disabled={disable}
                          />
                        </td>
                        <td>
                          <input
                            type="number"
                            className="ages"
                            name="months"
                            value={data.currentAge.months}
                            readOnly
                            disabled={disable}
                          />
                        </td>
                        <td>
                          <input
                            type="number"
                            className="ages"
                            name="days"
                            value={data.currentAge.days}
                            readOnly
                            disabled={disable}
                          />
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>

            <div className="col-md-4 mb-3">
              <label htmlFor="validationDefaultUsername">Username</label>
              <div className="input-group">
                <div className="input-group-prepend">
                  <span className="input-group-text" id="inputGroupPrepend2">
                    @
                  </span>
                </div>
                <input
                  type="text"
                  className="form-control"
                  id="validationDefaultUsername"
                  placeholder="userName"
                  aria-describedby="inputGroupPrepend2"
                  required
                  autoComplete="off"
                  onChange={handleChange}
                  name="userName"
                  value={data.userName}
                  disabled={disable}
                  onKeyUp={validation}
                />
              </div>
            </div>

            <div className="col-md-4 mb-3">
              <label htmlFor="validationDefaultUsername">Mobile Number*</label>
              <div className="input-group">
                <div className="input-group-prepend"></div>
                <input
                  type="text"
                  className="form-control"
                  id="validationDefaultUsername"
                  placeholder="Enter Mobile Number"
                  aria-describedby="inputGroupPrepend2"
                  required
                  autoComplete="off"
                  onChange={handleChange}
                  name="mobile"
                  value={data.mobile}
                  disabled={disable}
                  onKeyUp={validation}
                  onBlur={handleValidation}
                />
              </div>
              <span className="text-danger">{error.mobile}</span>
            </div>

            <div className="Address">
              <div className="form-row">
                <div className="col-md-3 mb-3 city">
                  <label htmlFor="validationDefault03">City*</label>
                  <input
                    type="text"
                    className="form-control"
                    id="validationDefault03"
                    placeholder="City"
                    required
                    autoComplete="off"
                    onChange={handleChange}
                    name="city"
                    value={data.city}
                    disabled={disable}
                    onKeyUp={validation}
                  />
                  <span className="text-danger">{error.city}</span>
                </div>

                <div className="form-row">
                  <div className="col-md-3 mb-3 city">
                    <label htmlFor="validationDefault03">State*</label>
                    <input
                      type="text"
                      className="form-control"
                      id="validationDefault03"
                      placeholder="State"
                      required
                      autoComplete="off"
                      onChange={handleChange}
                      name="state"
                      value={data.state}
                      disabled={disable}
                      onKeyUp={validation}
                    />
                    <span className="text-danger">{error.state}</span>
                  </div>
                </div>
              </div>
            </div>

            {toggleSubmit ? (
              <button
                className="btn btn-primary"
                type="submit"
                onClick={handleSubmit}
              >
                Submit
              </button>
            ) : (
              <button
                className="btn btn-success"
                type="submit"
                onClick={handleUpdate}
              >
                Update
              </button>
            )}
          </form>
        </div>

        <Users
          data={data}
          users={user}
          search={search}
          setUser={setUser}
          toggle={toggle}
          handleEdit={handleEdit}
          setItemId={setItemId}
          setIndex={setIndex}
        />
      </div>
    </>
  );
};

export default Personal;

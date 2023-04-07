import React, { useState } from "react";

const Users = ({ users, search, toggle, handleEdit, setIndex }) => {
  return (
    <div className="user">
      {toggle ? (
        <table className="table table-striped table-dark mt-5 listData">
          <thead className="t-head">
            <tr>
              <th>Abr</th>
              <th>FirstName</th>
              <th>LastName</th>
              <th>Phone</th>
              <th>DOB</th>
              <th>Age</th>
              <th>UserName</th>
              <th>City</th>
              <th>State</th>
              <th>Edit</th>
            </tr>
          </thead>

          {users &&
            users
              .filter((item, index) => {
                if (search === "") {
                  return null;
                } else if (
                  item.userName.toLowerCase() === search.toLowerCase()
                ) {
                  setIndex(index);

                  return item;
                }
              })
              .map((item, index) => {
                const { years, months, days } = item.currentAge;

                return (
                  <tbody key={item._id} className="t-body">
                    <tr>
                      <td>{item.abr}</td>
                      <td>{item.firstName}</td>
                      <td>{item.lastName}</td>
                      <td>{item.mobile}</td>
                      <td>{item.dob}</td>
                      <td>
                        {years}Y/{months}M/{days}D
                      </td>
                      <td>{item.userName}</td>
                      <td>{item.city}</td>
                      <td>{item.state}</td>
                      <td>
                        <i
                          className="fa-solid fa-pen-to-square edit"
                          onClick={() => handleEdit(item._id)}
                        />
                      </td>
                    </tr>
                  </tbody>
                );
              })}
        </table>
      ) : null}
    </div>
  );
};

export default Users;

import React from "react";

// import { API } from "../../backend";

export const getEducationQualification = async () => {
  return fetch(`http://localhost:4002/education/geteducation`, {
    method: "GET",
  })
    .then((response) => {
      return response.json();
    })
    .catch((error) => console.log(error));
};

export const getDepartment = async () => {
  return fetch(`http://localhost:4002/department/getdepartment`, {
    method: "GET",
  })
    .then((response) => {
      return response.json();
    })
    .catch((error) => console.log(error));
};

export const getSalary = async () => {
  return fetch(`http://localhost:4002/salary/getsalary`, {
    method: "GET",
  })
    .then((response) => {
      return response.json();
    })
    .catch((error) => console.log(error));
};

export const addEmployee = async (user) => {
  //   console.log(API);
  console.log(user);
  return await fetch(`http://localhost:4002/user/registration`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },

    body: JSON.stringify(user),
  })
    .then((response) => {
      return response.json();
    })
    .catch((error) => {
      console.log(error);
    });
};



export const editEmployee = async (user) => {
  //   console.log(API);
  console.log(user);
  return await fetch(`http://localhost:4002/user/editUser/${user.id}`, {
    method: "PUT",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
 
    body: JSON.stringify(user),
  })
    .then((response) => {
      return response.json();
    })
    .catch((error) => {
      console.log(error);
    });
};

export const deleteEmployee = async (user) => {
  //   console.log(API);
  console.log(user);
  return await fetch(`http://localhost:4002/user/editdelete/${user.id}`, {
    method: "DELETE",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },

    body: JSON.stringify(user),
  })
    .then((response) => {
      return response.json();
    })
    .catch((error) => {
      console.log(error);
    });
};
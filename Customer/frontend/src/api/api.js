import axios from "axios";

const apiURL = process.env.BACKEND_URL || "http://localhost:5000";

export function signIn(formData) {
  return new Promise((resolve, reject) => {
    axios({
      url: `${apiURL}/auth/signin`,
      method: "POST",
      data: formData,
    })
      .then((res) => {
        resolve(res.data);
      })
      .catch((err) => {
        console.log(err);
        reject(err);
      });
  });
}

export function signUp(formData) {
  return new Promise((resolve, reject) => {
    axios({
      url: `${apiURL}/auth/signup`,
      method: "POST",
      data: formData,
    })
      .then((res) => {
        resolve(res.data);
      })
      .catch((err) => {
        console.log(err);
        reject(err);
      });
  });
}

export function googleAuth(formData) {
  return new Promise((resolve, reject) => {
    axios({
      url: `${apiURL}/auth/googleauth`,
      method: "POST",
      data: formData,
    })
      .then((res) => {
        resolve(res.data);
      })
      .catch((err) => {
        console.log(err);
        reject(err);
      });
  });
}

export function updateData(formData, token) {
  return new Promise((resolve, reject) => {
    axios({
      url: `${apiURL}/user/details`,
      method: "PUT",
      headers: {
        Authorization: "bearer " + token,
      },
      data: formData,
    })
      .then((res) => {
        resolve(res.data);
      })
      .catch((err) => {
        console.log(err);
        reject(err);
      });
  });
}

export function getOTP(formData) {
  return new Promise((resolve, reject) => {
    axios({
      url: `${apiURL}/auth/send-otp`,
      method: "POST",
      data: formData,
    })
      .then((res) => {
        resolve(res.data);
      })
      .catch((err) => {
        console.log(err);
        reject(err);
      });
  });
}

export function restPass(formData) {
  return new Promise((resolve, reject) => {
    axios({
      url: `${apiURL}/auth/change-password`,
      method: "POST",
      data: formData,
    })
      .then((res) => {
        resolve(res.data);
      })
      .catch((err) => {
        console.log(err);
        reject(err);
      });
  });
}


// export function dish() {
//   return new Promise((resolve, reject) => {
//     axios
//     .get("http://localhost:5000/auth/dish")
//     .then((res) => {
//        ;
//        console.log("hi")
//         // setDishes(res.data);
//     })
//     .catch((err) =>console.log(err))
//   });
// }
